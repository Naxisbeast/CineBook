// backend/routes/movies.js
// Movie routes for the CineBook API.
// GET /api/movies      — returns the full list of movies.
// GET /api/movies/:id  — returns a single movie and its upcoming show schedules.

const express = require('express');
const db      = require('../db/db');

const router = express.Router();

// GET /api/movies
router.get('/', async (_req, res) => {
  // TODO: Query all movies from the database ordered by title and return them as JSON
});

// GET /api/movies/:id
router.get('/:id', async (req, res) => {
  // TODO: Query the movie by id and its upcoming show schedules (joined with screens and theatres), return 404 if not found, otherwise return the movie and shows as JSON
});

module.exports = router;
