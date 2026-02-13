const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const initializeDB = require('./db'); // Database initialization function
const userRoutes = require('./routes/userRoutes'); // User routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// API Routes
// Note: userRoutes will internally get the DB instance.
app.use('/api/users', userRoutes);

let db; // Global variable to hold the initialized DB instance

// Function to create users table if it doesn't exist
// This function will only run if using PostgreSQL
const createUsersTable = async () => {
    // Only attempt to create table if it's a PostgreSQL connection
    // For jsonDb, table creation is not applicable.
    if (db && typeof db.query === 'function' && db.constructor.name === 'Pool') {
        try {
            await db.query(`
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
    } else {
        console.log('Using JSON file fallback, skipping "users" table creation.');
    }
};

// Start server
const startServer = async () => {
    db = await initializeDB(); // Initialize the database here
    await createUsersTable(); // Create table after DB is initialized

    app.listen(PORT, () => {
        console.log(`Servidor backend corriendo en puerto ${PORT}`);
    });
};

startServer(); // Call the async function to start the server

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API de Ciber-Ciudadanos funcionando.');
});