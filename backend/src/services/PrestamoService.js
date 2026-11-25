const libroRepository = require("../repositories/LibroRepository.js");
const prestamoRepository = require("../repositories/PrestamoRepository.js");
const usuarioRepository = require("../repositories/UsuarioRepository.js");
const Messages = require("../enums/Messages.js");
const { BadRequestError, ConflictError, NotFoundError } = require("../exceptions/AppError.js");

const DIAS_PRESTAMO = 14;
const MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

function validarIds(datos) {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }
    if (!Number.isInteger(datos.usuarioId) || datos.usuarioId < 1
        || !Number.isInteger(datos.libroId) || datos.libroId < 1) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }
}

class PrestamoService {
    obtenerTodos() {
        return prestamoRepository.findAll();
    }

    crear(datos) {
        validarIds(datos);

        const usuario = usuarioRepository.findById(datos.usuarioId);
        if (!usuario) {
            throw new NotFoundError(Messages.SOCIO_NOT_FOUND);
        }

        const libro = libroRepository.findById(datos.libroId);
        if (!libro) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }

        if (libro.estado !== "disponible" || prestamoRepository.hasActiveByLibroId(libro.id)) {
            throw new ConflictError(Messages.LIBRO_NOT_AVAILABLE);
        }

        const fechaPrestamo = new Date();
        const fechaVencimiento = new Date(
            fechaPrestamo.getTime() + DIAS_PRESTAMO * MILISEGUNDOS_POR_DIA,
        );
        const prestamo = prestamoRepository.create({
            fechaPrestamo: fechaPrestamo.toISOString(),
            fechaVencimiento: fechaVencimiento.toISOString(),
            estado: "activo",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
            },
            libro: {
                id: libro.id,
                titulo: libro.titulo,
                autor: libro.autor,
            },
        });
        libroRepository.update(libro.id, { estado: "prestado" });
        return prestamo;
    }

    devolver(id) {
        const prestamo = prestamoRepository.findById(id);
        if (!prestamo) {
            throw new NotFoundError(Messages.PRESTAMO_NOT_FOUND);
        }
        if (prestamo.estado !== "activo") {
            throw new ConflictError(Messages.PRESTAMO_NOT_ACTIVE);
        }

        const libro = libroRepository.findById(prestamo.libro.id);
        if (!libro) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
        if (libro.estado !== "prestado") {
            throw new ConflictError(Messages.PRESTAMO_BOOK_INCONSISTENT);
        }

        const actualizado = prestamoRepository.devolver(id, new Date().toISOString());
        if (!actualizado) {
            throw new ConflictError(Messages.PRESTAMO_NOT_ACTIVE);
        }
        libroRepository.update(libro.id, { estado: "disponible" });
        return actualizado;
    }
}

module.exports = new PrestamoService();
