const prestamoService = require("../services/PrestamoService.js");
const ApiResponse = require("../responses/ApiResponse.js");
const parseId = require("../utils/parseId.js");

class PrestamoController {
    listar(req, res, next) {
        try {
            const prestamos = prestamoService.obtenerTodos();
            return ApiResponse.success(res, prestamos);
        } catch (error) {
            return next(error);
        }
    }

    crear(req, res, next) {
        try {
            const prestamo = prestamoService.crear(req.body);
            return ApiResponse.success(res, prestamo, 201);
        } catch (error) {
            return next(error);
        }
    }

    devolver(req, res, next) {
        try {
            const id = parseId(req.params.id);
            const prestamo = prestamoService.devolver(id);
            return ApiResponse.success(res, prestamo);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new PrestamoController();
