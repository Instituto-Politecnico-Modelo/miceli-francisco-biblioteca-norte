class Prestamo {
    constructor(id, fechaPrestamo, fechaVencimiento, estado, usuario, libro, fechaDevolucion = null) {
        this.id = id;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
        this.usuario = usuario;
        this.libro = libro;
        this.fechaDevolucion = fechaDevolucion;
    }
}

module.exports = Prestamo;