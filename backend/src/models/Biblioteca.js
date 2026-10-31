class Biblioteca {
    constructor(nombre, direccion, telefono, libros, usuarios, eventos, prestamos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.libros = libros;
        this.usuarios = usuarios;
        this.eventos = eventos;
        this.prestamos = prestamos;
    }
}

module.exports = Biblioteca;