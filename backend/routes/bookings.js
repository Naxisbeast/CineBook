// backend/routes/bookings.js
// Booking routes for the CineBook API (all routes require a valid JWT).
// GET  /api/my-bookings — returns the logged-in user's booking history.
// POST /api/bookings    — creates a new booking inside a MySQL transaction;
//   handles duplicate seat errors (UNIQUE constraint violation) gracefully.

const express     = require('express');
const rateLimit   = require('express-rate-limit');
const db          = require('../db/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Rate limiter: max 30 requests per 15 minutes per IP
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: 'Too many requests. Please try again later.' },
});

// GET /api/my-bookings (protected)
router.get('/my-bookings', bookingLimiter, verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await db.query(
      `SELECT b.booking_id,
              m.title        AS movie,
              ss.show_date,
              ss.show_time,
              t.name         AS theatre,
              t.city,
              b.total_amount,
              b.status       AS booking_status,
              b.booked_at,
              COALESCE(p.payment_status, 'no payment') AS payment_status,
              GROUP_CONCAT(CONCAT(s.seat_row, s.seat_number) ORDER BY s.seat_row, s.seat_number) AS seats
       FROM Bookings b
       JOIN ShowSchedules ss ON b.show_id      = ss.show_id
       JOIN Movies        m  ON ss.movie_id    = m.movie_id
       JOIN Screens       sc ON ss.screen_id   = sc.screen_id
       JOIN Theatres      t  ON sc.theatre_id  = t.theatre_id
       LEFT JOIN BookingSeats bs ON bs.booking_id = b.booking_id
       LEFT JOIN Seats        s  ON s.seat_id     = bs.seat_id
       LEFT JOIN Payments     p  ON p.booking_id  = b.booking_id
       WHERE b.user_id = ?
       GROUP BY b.booking_id, m.title, ss.show_date, ss.show_time,
                t.name, t.city, b.total_amount, b.status, b.booked_at, p.payment_status
       ORDER BY b.booked_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});

// POST /api/bookings (protected)
router.post('/bookings', bookingLimiter, verifyToken, async (req, res) => {
  const { show_id, seat_ids } = req.body;
  const userId = req.user.user_id;

  if (!show_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
    return res.status(400).json({ message: 'show_id and a non-empty seat_ids array are required.' });
  }

  // Fetch the ticket price for this show
  const [showRows] = await db.query(
    'SELECT price, screen_id FROM ShowSchedules WHERE show_id = ?',
    [show_id]
  );
  if (showRows.length === 0) {
    return res.status(404).json({ message: 'Show not found.' });
  }

  const price       = parseFloat(showRows[0].price);
  const screenId    = showRows[0].screen_id;
  const totalAmount = price * seat_ids.length;

  // Validate that all requested seats belong to the show's screen
  const [validSeats] = await db.query(
    `SELECT seat_id FROM Seats WHERE screen_id = ? AND seat_id IN (${seat_ids.map(() => '?').join(',')})`,
    [screenId, ...seat_ids]
  );
  if (validSeats.length !== seat_ids.length) {
    return res.status(400).json({ message: 'One or more seat IDs are invalid for this show.' });
  }

  // Use a dedicated connection so we can manage the transaction manually
  const connection = await db.pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert the booking record
    const [bookingResult] = await connection.execute(
      'INSERT INTO Bookings (user_id, show_id, total_amount, status) VALUES (?, ?, ?, ?)',
      [userId, show_id, totalAmount, 'pending']
    );
    const bookingId = bookingResult.insertId;

    // Insert one row per seat into BookingSeats
    for (const seatId of seat_ids) {
      await connection.execute(
        'INSERT INTO BookingSeats (booking_id, seat_id, show_id) VALUES (?, ?, ?)',
        [bookingId, seatId, show_id]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Booking created successfully.', booking_id: bookingId, total_amount: totalAmount });
  } catch (err) {
    await connection.rollback();

    // MySQL error 1062 = duplicate entry — seat already booked
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'One or more selected seats are no longer available.' });
    }

    console.error('Create booking error:', err);
    res.status(500).json({ message: 'Failed to create booking.' });
  } finally {
    connection.release();
  }
});

module.exports = router;
