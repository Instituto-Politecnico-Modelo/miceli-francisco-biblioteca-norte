const libroService = require("../services/LibroService.js");
const ApiResponse = require("../responses/ApiResponse.js");
const parseId = require("../utils/parseId.js");

class LibroController {
    listar(req, res, next) {
        try {
            const libros = libroService.obtenerTodos();
            return ApiResponse.success(res, libros);
        } catch (error) {
            return next(error);
        }
    }

    obtenerPorId(req, res, next) {
        try {
            const id = parseId(req.params.id);
            const libro = libroService.obtenerPorId(id);
            return ApiResponse.success(res, libro);
        } catch (error) {
            return next(error);
        }
    }

    crear(req, res, next) {
        try {
            const libro = libroService.crear(req.body);
            return ApiResponse.success(res, libro, 201);
        } catch (error) {
            return next(error);
        }
    }

    actualizar(req, res, next) {
        try {
            const id = parseId(req.params.id);
            const libro = libroService.actualizar(id, req.body);
            return ApiResponse.success(res, libro);
        } catch (error) {
            return next(error);
        }
    }

    eliminar(req, res, next) {
        try {
            const id = parseId(req.params.id);
            libroService.eliminar(id);
            return ApiResponse.success(res, null);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new LibroController();
