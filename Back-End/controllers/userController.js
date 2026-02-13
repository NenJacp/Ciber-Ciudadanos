const pool = require('../db');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, confirmPassword } = req.body;

    // Consistency check: password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Las contraseñas no coinciden.' });
    }

    try {
        // Check if email already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ msg: 'El email ya está registrado.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to database
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        res.status(201).json({
            msg: 'Usuario registrado exitosamente',
            user: newUser.rows[0]
        });

    } catch (err) {
        console.error('Error al registrar usuario:', err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.loginUser = async (req, res) => {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        const storedUser = user.rows[0];

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, storedUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        // If login successful, return user info (excluding hashed password)
        res.json({
            msg: 'Inicio de sesión exitoso',
            user: {
                id: storedUser.id,
                username: storedUser.username,
                email: storedUser.email,
            }
        });

    } catch (err) {
        console.error('Error al iniciar sesión:', err.message);
        res.status(500).send('Error del servidor');
    }
};