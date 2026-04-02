// backend/routes/auth.js
// Authentication routes for the CineBook API.
// POST /api/auth/register — create a new user account with a hashed password.
// POST /api/auth/login    — verify credentials and return a signed JWT token.

const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const db      = require('../db/db');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  // TODO: Validate request body, check for duplicate email, hash the password with bcrypt, insert the new user into the database, and return the new user_id
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  // TODO: Validate request body, find the user by email, compare the password with bcrypt, sign a JWT token with user info, and return the token and user object
});

module.exports = router;
