const authService = require("../services/AuthService.js");
const ApiResponse = require("../responses/ApiResponse.js");

class AuthController {
    login(req, res, next) {
        try {
            const sesion = authService.iniciarSesion(req.body?.codigo, req.ip);
            return ApiResponse.success(res, sesion);
        } catch (error) {
            return next(error);
        }
    }

    sesion(req, res) {
        return ApiResponse.success(res, { rol: "administrador" });
    }

    logout(req, res) {
        authService.cerrarSesion(req.token);
        return ApiResponse.success(res, null);
    }
}

module.exports = new AuthController();
