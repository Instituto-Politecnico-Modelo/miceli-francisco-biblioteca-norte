const libroRepository = require("../repositories/LibroRepository.js");
const Messages = require("../enums/Messages.js");
const { BadRequestError, NotFoundError } = require("../exceptions/AppError.js");

const ESTADOS_VALIDOS = ["disponible", "prestado", "reservado", "de_baja"];

function validarDatosLibro({ titulo, autor, categoria, estado }, { parcial = false } = {}) {
    if (!parcial || titulo !== undefined) {
        if (!titulo || typeof titulo !== "string") {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
    if (!parcial || autor !== undefined) {
        if (!autor || typeof autor !== "string") {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
    if (!parcial || categoria !== undefined) {
        if (!categoria || typeof categoria !== "string") {
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
        return libroRepository.create(datos);
    }

    actualizar(id, datos) {
        validarDatosLibro(datos, { parcial: true });
        const libroActualizado = libroRepository.update(id, datos);
        if (!libroActualizado) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
        return libroActualizado;
    }

    eliminar(id) {
        const eliminado = libroRepository.delete(id);
        if (!eliminado) {
            throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
        }
    }
}

module.exports = new LibroService();
