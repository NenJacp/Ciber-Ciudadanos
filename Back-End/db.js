const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'ciber_ciudadanos_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ciber_ciudadanos_db',
    password: process.env.DB_PASSWORD || 'ciber_ciudadanos_pass',
    port: process.env.DB_PORT || 5432,
    ssl: false,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;