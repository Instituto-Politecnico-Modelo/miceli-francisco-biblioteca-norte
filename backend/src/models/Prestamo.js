class Prestamo {
    constructor(id, fechaPrestamo, fechaVencimiento, estado, usuario, libro) {
        this.id = id;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
        this.usuario = usuario;
        this.libro = libro;
    }
}

module.exports = Prestamo;