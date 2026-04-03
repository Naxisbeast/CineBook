// backend/routes/seats.js
// Seat availability routes for the CineBook API.
// GET /api/seats/:show_id — returns all seats for the show's screen,
//   each labelled as 'available' or 'booked'.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/seats/:show_id
router.get('/:show_id', async (req, res) => {
  // TODO: Query all seats belonging to the show's screen and label each as 'available' or 'booked' based on existing BookingSeats rows, return 404 if the show has no seats
});

module.exports = router;
