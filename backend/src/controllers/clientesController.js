var { sql, poolPromise } = require('../config/db');

// GET clientes (listamos clientes)
async function getClientes(req, res) {
    try {
        var pool = await poolPromise;
        var resultado = await pool.request()
            .query('SELECT * FROM clientes ORDER BY id ASC');

        return res.status(200).json({
            ok: true,
            clientes: resultado.recordset
        });

    } catch (err) {
        console.log('Error al obtener clientes:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

// GETclientes (usamos su id)
async function getClienteById(req, res) {
    var id_js = req.params.id;

    try {
        var pool = await poolPromise;
        var resultado = await pool.request()
            .input('id', sql.Int, id_js)
            .query('SELECT * FROM clientes WHERE id = @id');

        // Si no encuentra el cliente
        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Cliente no encontrado.'
            });
        }

        return res.status(200).json({
            ok: true,
            cliente: resultado.recordset[0]
        });

    } catch (err) {
        console.log('Error al obtener cliente:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

// POST /clientes (creamos a nuestros nuevos clientes)
async function createCliente(req, res) {
    var nombre_js   = req.body.nombre;
    var correo_js   = req.body.correo;
    var telefono_js = req.body.telefono;
    var estatus_js  = req.body.estatus;

    // Verificar campos vacíos
    if (!nombre_js || !correo_js || !telefono_js || !estatus_js) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Por favor completa todos los campos.'
        });
    }

    try {
        var pool = await poolPromise;

        // Insertamos el nuevo cliente en la base de datos
        await pool.request()
            .input('nombre',   sql.VarChar, nombre_js)
            .input('correo',   sql.VarChar, correo_js)
            .input('telefono', sql.VarChar, telefono_js)
            .input('estatus',  sql.VarChar, estatus_js)
            .query('INSERT INTO clientes (nombre, correo, telefono, estatus) VALUES (@nombre, @correo, @telefono, @estatus)');

        return res.status(201).json({
            ok: true,
            mensaje: 'Cliente creado correctamente.'
        });

    } catch (err) {
        console.log('Error al crear cliente:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

// PUT /clientes/:id (Actializamos cliente)
async function updateCliente(req, res) {
    var id_js       = req.params.id;
    var nombre_js   = req.body.nombre;
    var correo_js   = req.body.correo;
    var telefono_js = req.body.telefono;
    var estatus_js  = req.body.estatus;

    // Verificar campos vacíos
    if (!nombre_js || !correo_js || !telefono_js || !estatus_js) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Por favor completa todos los campos.'
        });
    }

    try {
        var pool = await poolPromise;
        var resultado = await pool.request()
            .input('id',       sql.Int,     id_js)
            .input('nombre',   sql.VarChar, nombre_js)
            .input('correo',   sql.VarChar, correo_js)
            .input('telefono', sql.VarChar, telefono_js)
            .input('estatus',  sql.VarChar, estatus_js)
            .query('UPDATE clientes SET nombre = @nombre, correo = @correo, telefono = @telefono, estatus = @estatus WHERE id = @id');

        // Si no encuentra el cliente
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Cliente no encontrado.'
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Cliente actualizado correctamente.'
        });

    } catch (err) {
        console.log('Error al actualizar cliente:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

// DELETE /clientes/:id (Eliminamos el cliente)
async function deleteCliente(req, res) {
    var id_js = req.params.id;

    try {
        var pool = await poolPromise;
        var resultado = await pool.request()
            .input('id', sql.Int, id_js)
            .query('DELETE FROM clientes WHERE id = @id');

        // Si no encuentra el cliente
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Cliente no encontrado.'
            });
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Cliente eliminado correctamente.'
        });

    } catch (err) {
        console.log('Error al eliminar cliente:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

module.exports = { getClientes, getClienteById, createCliente, updateCliente, deleteCliente };