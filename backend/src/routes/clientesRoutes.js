// Definimos las rutas protegidas del club a los clientes

var express = require('express');
var router = express.Router();
var { verificarSesion } = require('../middlewares/authMiddleware');
var { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../controllers/clientesController');

// Todas las rutas de clientes están protegidas por sesión
router.get('/',     verificarSesion, getClientes);
router.get('/:id',  verificarSesion, getClienteById);
router.post('/',    verificarSesion, createCliente);
router.put('/:id',  verificarSesion, updateCliente);
router.delete('/:id', verificarSesion, deleteCliente);

module.exports = router;