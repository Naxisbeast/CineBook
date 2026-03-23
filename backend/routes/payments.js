// backend/routes/payments.js
// Payment routes for the CineBook API (all routes require a valid JWT).
// POST /api/payments — inserts a payment record for the given booking and
//   updates the booking status to 'confirmed'.

const express     = require('express');
const rateLimit   = require('express-rate-limit');
const db          = require('../db/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Rate limiter: max 20 payment attempts per 15 minutes per IP
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many payment attempts. Please try again later.' },
});

// POST /api/payments (protected)
router.post('/payments', paymentLimiter, verifyToken, async (req, res) => {
  try {
    const { booking_id, payment_method } = req.body;
    const userId = req.user.user_id;

    if (!booking_id || !payment_method) {
      return res.status(400).json({ message: 'booking_id and payment_method are required.' });
    }

    // Confirm the booking belongs to the requesting user
    const [bookingRows] = await db.query(
      'SELECT * FROM Bookings WHERE booking_id = ? AND user_id = ?',
      [booking_id, userId]
    );

    if (bookingRows.length === 0) {
      return res.status(404).json({ message: 'Booking not found or does not belong to this user.' });
    }

    const booking = bookingRows[0];

    if (booking.status === 'confirmed') {
      return res.status(409).json({ message: 'This booking has already been paid.' });
    }

    // Insert payment record
    const [paymentResult] = await db.query(
      `INSERT INTO Payments (booking_id, amount, payment_method, payment_status, paid_at)
       VALUES (?, ?, ?, 'completed', NOW())`,
      [booking_id, booking.total_amount, payment_method]
    );

    // Update booking status to confirmed
    await db.query(
      "UPDATE Bookings SET status = 'confirmed' WHERE booking_id = ?",
      [booking_id]
    );

    res.status(201).json({
      message:    'Payment successful. Booking confirmed.',
      payment_id: paymentResult.insertId,
      booking_id,
    });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Failed to process payment.' });
  }
});

module.exports = router;
