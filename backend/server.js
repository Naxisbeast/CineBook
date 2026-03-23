// backend/server.js
// Entry point for the CineBook Express.js API server.
// Loads environment variables, mounts all route modules, and starts listening.

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const db       = require('./db/db');
const auth     = require('./routes/auth');
const movies   = require('./routes/movies');
const shows    = require('./routes/shows');
const seats    = require('./routes/seats');
const bookings = require('./routes/bookings');
const payments = require('./routes/payments');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api', (_req, res) => {
  res.json({ message: 'CineBook API is running' });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     auth);
app.use('/api/movies',   movies);
app.use('/api/shows',    shows);
app.use('/api/seats',    seats);
app.use('/api',          bookings);
app.use('/api',          payments);

// ── Start server & verify database connection ─────────────────────────────────
app.listen(PORT, async () => {
  console.log(`CineBook server started on port ${PORT}`);
  try {
    await db.query('SELECT 1');
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});

module.exports = app;
