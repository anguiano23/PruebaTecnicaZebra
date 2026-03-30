//Validamos las credenciales del usuario respecto


var { sql, poolPromise } = require('../config/db');

// POST /auth/login
async function login(req, res) {
    var usuario_js = req.body.usuario;
    var password_js = req.body.password;

    // Verificar que no vengan vacíos
    if (!usuario_js || !password_js) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Por favor completa todos los campos.'
        });
    }

    try {
        //Obtenemos pool de conexiones
        var pool = await poolPromise;
        var resultado = await pool.request()
            .input('usuario', sql.VarChar, usuario_js)
            .input('password', sql.VarChar, password_js)
            .query('SELECT * FROM usuarios WHERE usuario = @usuario AND password = @password');

        // Si no encuentra el usuario
        if (resultado.recordset.length === 0) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Credenciales incorrectas.'
            });
        }

        // Guardar usuario en sesión
        req.session.usuario = resultado.recordset[0];

        return res.status(200).json({
            ok: true,
            mensaje: 'Inicio de sesión exitoso.',
            usuario: resultado.recordset[0]
        });

    } catch (err) {
        console.log('Error en login:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}

// POST /auth/logout
function logout(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cerrar sesión.'
            });
        }
        //Sesión destruida correctamente
        return res.status(200).json({
            ok: true,
            mensaje: 'Sesión cerrada correctamente.'
        });
    });
}

module.exports = { login, logout };