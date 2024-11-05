const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {

  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING user_id, username, is_admin, created_at
    `;
    const values = [username, hashedPassword];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  static async findByUsername(username) {
    const query = `
      SELECT user_id, username, password, is_admin, created_at
      FROM users
      WHERE username = $1
    `;
    const res = await pool.query(query, [username]);
    return res.rows[0] || null;
  }

  static async findById(id) {
    const query = `
      SELECT user_id, username, is_admin, created_at
      FROM users
      WHERE user_id = $1
    `;
    const res = await pool.query(query, [id]);
    return res.rows[0] || null;
  }
}

module.exports = User;
