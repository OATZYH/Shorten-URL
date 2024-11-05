const pool = require('../config/db');

const URL = {
    createWithoutShortCode: async (long_url, user_id) => {
        const query = `
            INSERT INTO urls (long_url, user_id)
            VALUES ($1, $2)
            RETURNING url_id
        `;
        const values = [long_url, user_id];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    updateShortCode: async (short_code, url_id) => {
        const query = `
            UPDATE urls
            SET short_code = $1
            WHERE url_id = $2
            RETURNING *
        `;
        const values = [short_code, url_id];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    findByShortCode: async (short_code) => {
        const query = `
            SELECT * FROM urls WHERE short_code = $1
        `;
        const res = await pool.query(query, [short_code]);
        return res.rows[0];
    },

    findByUserId: async (user_id) => {
        const query = `
            SELECT * FROM urls WHERE user_id = $1
        `;
        const res = await pool.query(query, [user_id]);
        return res.rows;
    },

    deleteByShortCode: async (short_code) => {
        const query = `
            DELETE FROM urls WHERE short_code = $1
            RETURNING *
        `;
        const res = await pool.query(query, [short_code]);
        return res.rows[0];
    },
};

module.exports = URL;
