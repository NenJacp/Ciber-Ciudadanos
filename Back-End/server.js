const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db'); // Database connection
const userRoutes = require('./routes/userRoutes'); // User routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// API Routes
app.use('/api/users', userRoutes);

// Function to create users table if it doesn't exist
const createUsersTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Tabla "users" verificada/creada exitosamente.');
    } catch (err) {
        console.error('Error al crear la tabla "users":', err.message);
    }
};

// Start server
app.listen(PORT, async () => {
    console.log(`Servidor backend corriendo en puerto ${PORT}`);
    // Connect to DB and create table on startup
    await createUsersTable();
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API de Ciber-Ciudadanos funcionando.');
});