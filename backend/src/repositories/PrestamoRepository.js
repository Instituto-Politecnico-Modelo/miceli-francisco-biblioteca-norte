const Prestamo = require("../models/Prestamo.js");
const createIdGenerator = require("../utils/idGenerator.js");

const prestamos = [];
const generateId = createIdGenerator();

class PrestamoRepository {
    findAll() {
        return prestamos;
    }

    findById(id) {
        return prestamos.find((prestamo) => prestamo.id === id);
    }

    hasActiveByLibroId(libroId) {
        return prestamos.some((prestamo) => (
            prestamo.libro.id === libroId && prestamo.estado === "activo"
        ));
    }

    create({ fechaPrestamo, fechaVencimiento, estado, usuario, libro }) {
        const nuevoPrestamo = new Prestamo(
            generateId(),
            fechaPrestamo,
            fechaVencimiento,
            estado,
            usuario,
            libro,
        );
        prestamos.push(nuevoPrestamo);
        return nuevoPrestamo;
    }

    devolver(id, fechaDevolucion) {
        const prestamo = this.findById(id);
        if (!prestamo || prestamo.estado !== "activo") {
            return null;
        }
        prestamo.estado = "devuelto";
        prestamo.fechaDevolucion = fechaDevolucion;
        return prestamo;
    }
}

module.exports = new PrestamoRepository();
