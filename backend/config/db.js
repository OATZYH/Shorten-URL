const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

module.exports = pool;