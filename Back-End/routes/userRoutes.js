const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
    '/register',
    [
        body('username')
            .trim()
            .isLength({ min: 3 })
            .withMessage('El username debe tener al menos 3 caracteres.'),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Por favor ingresa un email válido.')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 })
            .withMessage('La contraseña debe tener al menos 8 caracteres.')
            .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
            .withMessage('La contraseña debe contener al menos una mayúscula y un número.'),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Las contraseñas no coinciden.');
                }
                return true;
            }),
        body('humanityTestAnswer')
            .isInt()
            .withMessage('La respuesta de humanidad debe ser un número.')
            .custom((value, { req }) => {
                if (parseInt(value) !== parseInt(req.body.humanityTestAnswer)) {
                    throw new Error('La prueba de humanidad es incorrecta.');
                }
                return true;
            })
    ],
    userController.registerUser
);

router.post(
    '/login',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Por favor ingresa un email válido.')
            .normalizeEmail(),
        body('password')
            .notEmpty()
            .withMessage('La contraseña es requerida.')
    ],
    userController.loginUser
);

module.exports = router;