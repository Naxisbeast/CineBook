// backend/routes/shows.js
// Show schedule routes for the CineBook API.
// GET /api/shows/:movie_id — returns all upcoming shows for a movie,
//   including theatre name, city, and screen name.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/shows/:movie_id
router.get('/:movie_id', async (req, res) => {
  try {
    const { movie_id } = req.params;

    const [rows] = await db.query(
      `SELECT ss.show_id,
              ss.movie_id,
              ss.show_date,
              ss.show_time,
              ss.price,
              sc.screen_id,
              sc.name        AS screen,
              sc.total_seats,
              t.theatre_id,
              t.name         AS theatre,
              t.city
       FROM ShowSchedules ss
       JOIN Screens  sc ON ss.screen_id  = sc.screen_id
       JOIN Theatres t  ON sc.theatre_id = t.theatre_id
       WHERE ss.movie_id = ? AND ss.show_date >= CURDATE()
       ORDER BY ss.show_date, ss.show_time`,
      [movie_id]
    );

    res.json(rows);
  } catch (err) {
    console.error('Get shows error:', err);
    res.status(500).json({ message: 'Failed to fetch shows.' });
  }
});

module.exports = router;
