const Libro = require("../models/Libro.js");
const createIdGenerator = require("../utils/idGenerator.js");

// In-memory persistence using an array, as required by the assignment.
const librosIniciales = [
    { id: 1, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", categoria: "Clásico", estado: "disponible" },
    { id: 2, titulo: "Orgullo y prejuicio", autor: "Jane Austen", categoria: "Romance", estado: "disponible" },
    { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", categoria: "Realismo mágico", estado: "disponible" },
    { id: 4, titulo: "1984", autor: "George Orwell", categoria: "Ciencia ficción", estado: "disponible" },
    { id: 5, titulo: "El principito", autor: "Antoine de Saint-Exupéry", categoria: "Fábula", estado: "disponible" },
    { id: 6, titulo: "El señor de los anillos", autor: "J. R. R. Tolkien", categoria: "Fantasía", estado: "disponible" },
    { id: 7, titulo: "Crimen y castigo", autor: "Fiódor Dostoyevski", categoria: "Clásico", estado: "disponible" },
    { id: 8, titulo: "Matar a un ruiseñor", autor: "Harper Lee", categoria: "Novela", estado: "disponible" },
    { id: 9, titulo: "El gran Gatsby", autor: "F. Scott Fitzgerald", categoria: "Novela", estado: "disponible" },
    { id: 10, titulo: "La Odisea", autor: "Homero", categoria: "Épica", estado: "disponible" },
];
const libros = librosIniciales.map(({ id, titulo, autor, categoria, estado }) => (
    new Libro(id, titulo, autor, categoria, estado)
));
const generateId = createIdGenerator(libros.length + 1);

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
        // Whitelist fields so callers can never overwrite id or inject extra properties.
        const { titulo, autor, categoria, estado } = cambios;
        if (titulo !== undefined) libro.titulo = titulo;
        if (autor !== undefined) libro.autor = autor;
        if (categoria !== undefined) libro.categoria = categoria;
        if (estado !== undefined) libro.estado = estado;
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
