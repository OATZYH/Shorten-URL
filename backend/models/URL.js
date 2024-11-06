const pool = require('../config/db');
const { generateRandomString } = require('../utils/encoding'); 

class URL {
  static async create(longUrl, userId) {
    // Get the next value of the url_id sequence
    const idQuery = `SELECT nextval('urls_url_id_seq') AS id`;
    const idRes = await pool.query(idQuery);
    const url_id = idRes.rows[0].id;

    // Generate short_code using Base62 encoding of url_id
    const shortCode = generateRandomString(url_id);

    // Insert the record with url_id and short_code
    const query = `
      INSERT INTO urls (url_id, short_code, long_url, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING url_id, short_code, long_url, user_id, click_count, created_at
    `;
    const values = [url_id, shortCode, longUrl, userId];
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

  // --- Click Methods ---

  static async recordClick(urlId) {
    const query = `
      INSERT INTO url_clicks (url_id)
      VALUES ($1)
      RETURNING click_id, url_id, clicked_at
    `;
    const values = [urlId];
    const res = await pool.query(query, values);
    return res.rows[0];
  }

  static async getClicksByUrlId(urlId) {
    const query = `
      SELECT click_id, url_id, clicked_at
      FROM url_clicks
      WHERE url_id = $1
      ORDER BY clicked_at DESC
    `;
    const res = await pool.query(query, [urlId]);
    return res.rows;
  }

  static async deleteClicksByUrlId(urlId) {
    const query = `
      DELETE FROM url_clicks
      WHERE url_id = $1
    `;
    await pool.query(query, [urlId]);
  }
}

module.exports = URL;
