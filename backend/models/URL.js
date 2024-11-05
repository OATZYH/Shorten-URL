const pool = require('../config/db');

class Url {
  static async create(shortCode, longUrl, userId) {
    const query = `
      INSERT INTO urls (short_code, long_url, user_id)
      VALUES ($1, $2, $3)
      RETURNING url_id, short_code, long_url, user_id, click_count, created_at
    `;
    const values = [shortCode, longUrl, userId];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  static async findByShortCode(shortCode) {
    const query = `
      SELECT url_id, short_code, long_url, user_id, click_count, created_at
      FROM urls
      WHERE short_code = $1
    `;
    const res = await pool.query(query, [shortCode]);
    return res.rows[0] || null;
  }

  static async findByUserId(userId) {
    const query = `
      SELECT url_id, short_code, long_url, user_id, click_count, created_at
      FROM urls
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const res = await pool.query(query, [userId]);
    return res.rows;
  }

  static async incrementClickCount(urlId) {
    const query = `
      UPDATE urls
      SET click_count = click_count + 1
      WHERE url_id = $1
    `;
    await pool.query(query, [urlId]);
  }

  static async deleteById(urlId) {
    const query = `
      DELETE FROM urls
      WHERE url_id = $1
    `;
    await pool.query(query, [urlId]);
  }
}

module.exports = Url;
