const { Pool } = require('pg');
require('dotenv').config();
const jsonDb = require('./data/jsonDb');

let _db; // Internal variable to hold the database instance

const initializeDB = async () => {
    if (_db) return _db; // Return existing instance if already initialized

    const pgPool = new Pool({
        user: process.env.DB_USER || 'ciber_ciudadanos_user',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'ciber_ciudadanos_db',
        password: process.env.DB_PASSWORD || 'ciber_ciudadanos_pass',
        port: process.env.DB_PORT || 5432,
        ssl: false,
    });

    try {
        await pgPool.query('SELECT 1'); // Test the connection
        console.log('Connected to PostgreSQL database.');
        _db = pgPool;

        pgPool.on('error', (err) => {
            console.error('Unexpected error on idle PostgreSQL client', err);
            process.exit(-1);
        });

    } catch (err) {
        console.error('Failed to connect to PostgreSQL. Using JSON file fallback:', err.message);
        _db = jsonDb;
    }
    return _db;
};

module.exports = initializeDB;