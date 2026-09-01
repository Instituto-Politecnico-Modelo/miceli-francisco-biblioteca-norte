class Evento {
    constructor(id, titulo, fecha, descripcion, capacidad, participantes) {
        this.id = id;
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
        this.participantes = participantes;
    }
}

module.exports = Evento;