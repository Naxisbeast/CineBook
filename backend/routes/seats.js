// backend/routes/seats.js
// Seat availability routes for the CineBook API.
// GET /api/seats/:show_id — returns all seats for the show's screen,
//   each labelled as 'available' or 'booked'.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/seats/:show_id
router.get('/:show_id', async (req, res) => {
  try {
    const { show_id } = req.params;

    const [rows] = await db.query(
      `SELECT s.seat_id,
              s.seat_row,
              s.seat_number,
              s.seat_type,
              CASE WHEN bs.seat_id IS NULL THEN 'available' ELSE 'booked' END AS status
       FROM ShowSchedules ss
       JOIN Seats s ON s.screen_id = ss.screen_id
       LEFT JOIN BookingSeats bs
         ON bs.seat_id = s.seat_id AND bs.show_id = ss.show_id
       WHERE ss.show_id = ?
       ORDER BY s.seat_row, s.seat_number`,
      [show_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Show not found or has no seats.' });
    }

    res.json(rows);
  } catch (err) {
    console.error('Get seats error:', err);
    res.status(500).json({ message: 'Failed to fetch seat availability.' });
  }
});

module.exports = router;
