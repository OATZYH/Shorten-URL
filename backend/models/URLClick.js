const pool = require('../config/db');

class UrlClick {

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

  static async deleteByUrlId(urlId) {
    const query = `
      DELETE FROM url_clicks
      WHERE url_id = $1
    `;
    await pool.query(query, [urlId]);
  }
}

module.exports = UrlClick;
