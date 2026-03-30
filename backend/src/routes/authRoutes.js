//Definisimos las rutas prublicas del personal


var express = require('express');
var router = express.Router();
var { login, logout } = require('../controllers/authController');

// Rutas de autenticación
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;