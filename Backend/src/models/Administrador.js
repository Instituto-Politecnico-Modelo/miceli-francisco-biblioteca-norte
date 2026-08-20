const Usuario = require("./Usuario.js");

class Administrador extends Usuario {
    constructor(id, nombre, correo, telefono, codigoAdministrador) {
        super(id, nombre, correo, telefono);
        this.codigoAdministrador = codigoAdministrador;
    }
}

module.exports = Administrador;