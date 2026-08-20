class Prestamo {
    constructor(id, fechaPrestamo, fechaVencimiento, estado, idUsuario, idLibro) {
        this.id = id;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
        this.idUsuario = idUsuario;
        this.idLibro = idLibro;
    }
}

module.exports = Prestamo;