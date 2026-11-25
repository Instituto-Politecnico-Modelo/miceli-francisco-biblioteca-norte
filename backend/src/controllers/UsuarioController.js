const usuarioService = require("../services/UsuarioService.js");
const ApiResponse = require("../responses/ApiResponse.js");

class UsuarioController {
    listar(req, res, next) {
        try {
            const usuarios = usuarioService.obtenerTodos();
            return ApiResponse.success(res, usuarios);
        } catch (error) {
            return next(error);
        }
    }

    crear(req, res, next) {
        try {
            const usuario = usuarioService.crear(req.body);
            return ApiResponse.success(res, usuario, 201);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UsuarioController();
