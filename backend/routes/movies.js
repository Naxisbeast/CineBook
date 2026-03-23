// backend/routes/movies.js
// Movie routes for the CineBook API.
// GET /api/movies      — returns the full list of movies.
// GET /api/movies/:id  — returns a single movie and its upcoming show schedules.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/movies
router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Movies ORDER BY title'
    );
    res.json(rows);
  } catch (err) {
    console.error('Get movies error:', err);
    res.status(500).json({ message: 'Failed to fetch movies.' });
  }
});

// GET /api/movies/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [movieRows] = await db.query(
      'SELECT * FROM Movies WHERE movie_id = ?',
      [id]
    );

    if (movieRows.length === 0) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    const [showRows] = await db.query(
      `SELECT ss.show_id, ss.show_date, ss.show_time, ss.price,
              sc.name AS screen, t.name AS theatre, t.city
       FROM ShowSchedules ss
       JOIN Screens sc  ON ss.screen_id  = sc.screen_id
       JOIN Theatres t  ON sc.theatre_id = t.theatre_id
       WHERE ss.movie_id = ? AND ss.show_date >= CURDATE()
       ORDER BY ss.show_date, ss.show_time`,
      [id]
    );

    res.json({ movie: movieRows[0], shows: showRows });
  } catch (err) {
    console.error('Get movie error:', err);
    res.status(500).json({ message: 'Failed to fetch movie details.' });
  }
});

module.exports = router;
