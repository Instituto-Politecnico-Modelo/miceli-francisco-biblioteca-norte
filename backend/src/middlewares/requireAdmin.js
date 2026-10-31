const authService = require("../services/AuthService.js");

function requireAdmin(req, res, next) {
    try {
        const [esquema, token] = (req.headers.authorization || "").split(" ");
        const tokenValido = esquema === "Bearer" ? token : null;
        authService.verificarSesion(tokenValido);
        req.token = tokenValido;
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = requireAdmin;
