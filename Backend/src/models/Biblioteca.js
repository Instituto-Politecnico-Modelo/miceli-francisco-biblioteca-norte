class Biblioteca {
    constructor(nombre, direccion, telefono, libros, usuarios, eventos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.libros = libros;
        this.usuarios = usuarios;
        this.eventos = eventos;
    }
}

module.exports = Biblioteca;