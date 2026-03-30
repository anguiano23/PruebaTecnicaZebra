// Importamos las librerías instaladas

var express = require('express');
var session = require('express-session');
var cors = require('cors');
require('dotenv').config();

// Importamos las rutas de autenticación y clientes

var authRoutes = require('./routes/authRoutes');
var clientesRoutes = require('./routes/clientesRoutes');

var app = express();

//Middlewares
//Habilitamos los cors para permitirpeticiones desde Angular
app.use(cors({
    origin: 'http://localhost:4200', // Puerto de Angular
    credentials: true// enviamos y recibimos cookies de sesión
}));

//Permitimos recibir datos en formato JSON en el body de las peticiones
app.use(express.json());
// Permitimos recibir datos de formularios HTML
app.use(express.urlencoded({ extended: true }));


// Configuración de sesión 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // La sesión dura abierta 1 hora
    }
}));

// Rutas , registramos /auth y /clientes
app.use('/auth', authRoutes);
app.use('/clientes', clientesRoutes);

module.exports = app;