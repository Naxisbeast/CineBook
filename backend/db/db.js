// backend/db/db.js
// Creates a MySQL2 connection pool using environment variables loaded from .env.
// Exports the pool and a convenience query() helper function.

const mysql = require('mysql2/promise');
require('dotenv').config();

// TODO: Create a MySQL2 connection pool using env variables and export it together with a query() helper function

module.exports = { pool, query };
