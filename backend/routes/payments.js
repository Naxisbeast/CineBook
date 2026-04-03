// backend/routes/payments.js
// Payment routes for the CineBook API (all routes require a valid JWT).
// POST /api/payments — inserts a payment record for the given booking and
//   updates the booking status to 'confirmed'.

const express     = require('express');
const rateLimit   = require('express-rate-limit');
const db          = require('../db/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// POST /api/payments (protected)
router.post('/payments', verifyToken, async (req, res) => {
  // TODO: Validate booking_id and payment_method, confirm the booking belongs to the logged-in user, insert a Payments record, update the booking status to 'confirmed', and return the new payment_id
});

module.exports = router;
