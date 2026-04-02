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

// GET /api/my-bookings (protected)
router.get('/my-bookings', verifyToken, async (req, res) => {
  // TODO: Query all bookings for the logged-in user (from req.user.user_id), joining shows, movies, theatres, seats, and payments, and return them as JSON ordered by most recent first
});

// POST /api/bookings (protected)
router.post('/bookings', verifyToken, async (req, res) => {
  // TODO: Validate show_id and seat_ids from the request body, calculate the total amount, open a database transaction, insert a Booking record and one BookingSeats row per seat, commit on success or rollback on error (handle duplicate seat conflicts with a 409 response)
});

module.exports = router;
