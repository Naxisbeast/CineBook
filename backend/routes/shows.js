// backend/routes/shows.js
// Show schedule routes for the CineBook API.
// GET /api/shows/:movie_id — returns all upcoming shows for a movie,
//   including theatre name, city, and screen name.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/shows/:movie_id
router.get('/:movie_id', async (req, res) => {
  // TODO: Query all upcoming show schedules for the given movie_id, joining screens and theatres, and return the results as JSON
});

module.exports = router;
