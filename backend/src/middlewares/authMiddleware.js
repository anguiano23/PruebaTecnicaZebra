// Middleware para verificar si el usuario tiene sesión activa

function verificarSesion(req, res, next) {
    if (req.session && req.session.usuario) {
        next(); // Tiene sesión activa, continuar
    } else {
        // No tiene sesión, acceso denegado
        res.status(401).json({
            ok: false,
            mensaje: 'No autorizado. Por favor inicia sesión.'
        });
    }
}

module.exports = { verificarSesion };