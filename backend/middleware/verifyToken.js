// backend/middleware/verifyToken.js
// JWT authentication middleware.
// Reads the Bearer token from the Authorization header, verifies it,
// and attaches the decoded payload to req.user for downstream route handlers.

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // TODO: Extract the Bearer token from the Authorization header, verify it with JWT_SECRET, attach the decoded payload to req.user, and call next(); respond with 401/403 on failure
}

module.exports = verifyToken;
