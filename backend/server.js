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

// TODO: Add cors() and express.json() as global middleware

// TODO: Mount each route module at its correct API path

// TODO: Start the server on PORT and verify the database connection inside the callback

module.exports = app;
