const Libro = require("../models/Libro.js");
const createIdGenerator = require("../utils/idGenerator.js");

// In-memory persistence using an array, as required by the assignment.
const libros = [];
const generateId = createIdGenerator(1);

class LibroRepository {
    findAll() {
        return libros;
    }

    findById(id) {
        return libros.find((libro) => libro.id === id);
    }

    create({ titulo, autor, categoria, estado }) {
        const nuevoLibro = new Libro(generateId(), titulo, autor, categoria, estado);
        libros.push(nuevoLibro);
        return nuevoLibro;
    }

    update(id, cambios) {
        const libro = this.findById(id);
        if (!libro) {
            return null;
        }
        Object.assign(libro, cambios);
        return libro;
    }

    delete(id) {
        const index = libros.findIndex((libro) => libro.id === id);
        if (index === -1) {
            return false;
        }
        libros.splice(index, 1);
        return true;
    }
}

module.exports = new LibroRepository();
