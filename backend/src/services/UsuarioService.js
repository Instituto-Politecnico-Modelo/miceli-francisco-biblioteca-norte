const usuarioRepository = require("../repositories/UsuarioRepository.js");
const Messages = require("../enums/Messages.js");
const { BadRequestError, ConflictError } = require("../exceptions/AppError.js");

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_VALIDO = /^\+?[\d\s().-]{7,24}$/;

function validarDatosUsuario(datos) {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }

    const nombre = typeof datos.nombre === "string" ? datos.nombre.trim() : "";
    const correo = typeof datos.correo === "string" ? datos.correo.trim() : "";
    const telefono = typeof datos.telefono === "string" ? datos.telefono.trim() : "";
    const cantidadDigitos = telefono.replace(/\D/g, "").length;

    if (
        !nombre
        || nombre.length > 120
        || !CORREO_VALIDO.test(correo)
        || correo.length > 254
        || !TELEFONO_VALIDO.test(telefono)
        || cantidadDigitos < 7
    ) {
        throw new BadRequestError(Messages.INVALID_DATA);
    }

    return { nombre, correo, telefono };
}

class UsuarioService {
    obtenerTodos() {
        return usuarioRepository.findAll();
    }

    crear(datos) {
        const datosValidados = validarDatosUsuario(datos);
        if (usuarioRepository.findByCorreo(datosValidados.correo)) {
            throw new ConflictError(Messages.SOCIO_DUPLICATED);
        }
        return usuarioRepository.create(datosValidados);
    }
}

module.exports = new UsuarioService();
