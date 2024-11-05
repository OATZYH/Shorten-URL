const pool = require('../config/db');

const User = {
    create: async (username, hashedPassword, is_admin = false) => {
        const query = `
            INSERT INTO users (username, password, is_admin)
            VALUES ($1, $2, $3)
            RETURNING user_id, username, is_admin, created_at
        `;
        const values = [username, hashedPassword, is_admin];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    findByUsername: async (username) => {
        const query = `
            SELECT * FROM users WHERE username = $1
        `;
        const res = await pool.query(query, [username]);
        return res.rows[0];
    },

    findById: async (user_id) => {
        const query = `
            SELECT user_id, username, is_admin FROM users WHERE user_id = $1
        `;
        const res = await pool.query(query, [user_id]);
        return res.rows[0];
    },
};

module.exports = User;
