// backend/db/db.js
// Creates a MySQL2 connection pool using environment variables loaded from .env.
// Exports the pool and a convenience query() helper function.

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:            process.env.DB_HOST     || 'localhost',
  user:            process.env.DB_USER     || 'root',
  password:        process.env.DB_PASSWORD || '',
  database:        process.env.DB_NAME     || 'cinebook_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:          0,
});

/**
 * Convenience wrapper around pool.execute().
 * @param {string} sql    - Parameterised SQL string
 * @param {Array}  params - Bound parameter values
 * @returns {Promise<[rows, fields]>}
 */
async function query(sql, params = []) {
  return pool.execute(sql, params);
}

module.exports = { pool, query };
