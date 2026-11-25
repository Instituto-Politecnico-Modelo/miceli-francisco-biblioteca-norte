const Usuario = require("../models/Usuario.js");
const createIdGenerator = require("../utils/idGenerator.js");

const usuarios = [];
const generateId = createIdGenerator();

class UsuarioRepository {
    findAll() {
        return usuarios;
    }

    findById(id) {
        return usuarios.find((usuario) => usuario.id === id);
    }

    findByCorreo(correo) {
        const correoNormalizado = correo.toLowerCase();
        return usuarios.find((usuario) => usuario.correo.toLowerCase() === correoNormalizado);
    }

    create({ nombre, correo, telefono }) {
        const nuevoUsuario = new Usuario(generateId(), nombre, correo, telefono);
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
}

module.exports = new UsuarioRepository();
