const libroRepository = require("../repositories/LibroRepository.js");
const prestamoRepository = require("../repositories/PrestamoRepository.js");
const Messages = require("../enums/Messages.js");
const { BadRequestError, ConflictError, NotFoundError } = require("../exceptions/AppError.js");

const ESTADOS_VALIDOS = ["disponible", "prestado", "reservado", "de_baja"];

function validarDatosLibro(datos, { parcial = false } = {}) {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }

    const { titulo, autor, categoria, estado } = datos;
    if (!parcial || titulo !== undefined) {
        if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
    if (!parcial || autor !== undefined) {
        if (!autor || typeof autor !== "string" || !autor.trim()) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
    if (!parcial || categoria !== undefined) {
        if (!categoria || typeof categoria !== "string" || !categoria.trim()) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
    if (!parcial || estado !== undefined) {
        if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
}

class LibroService {
    obtenerTodos() {
        return libroRepository.findAll();
    }

    obtenerPorId(id) {
        const libro = libroRepository.findById(id);
        if (!libro) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
        return libro;
    }

    crear(datos) {
        validarDatosLibro(datos);
        if (datos.estado === "prestado") {
            throw new BadRequestError(Messages.LIBRO_STATUS_MANAGED);
        }
        return libroRepository.create(datos);
    }

    actualizar(id, datos) {
        validarDatosLibro(datos, { parcial: true });
        const libro = libroRepository.findById(id);
        if (!libro) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
        if (datos.estado === "prestado") {
            throw new BadRequestError(Messages.LIBRO_STATUS_MANAGED);
        }
        if (datos.estado !== undefined && prestamoRepository.hasActiveByLibroId(id)) {
            throw new ConflictError(Messages.LIBRO_ACTIVE_LOAN);
        }
        const libroActualizado = libroRepository.update(id, datos);
        return libroActualizado;
    }

    eliminar(id) {
        const libro = libroRepository.findById(id);
        if (!libro) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
        if (prestamoRepository.hasActiveByLibroId(id)) {
            throw new ConflictError(Messages.LIBRO_ACTIVE_LOAN);
        }
        const eliminado = libroRepository.delete(id);
        if (!eliminado) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
    }
}

module.exports = new LibroService();
