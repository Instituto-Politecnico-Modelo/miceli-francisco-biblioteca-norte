const crypto = require("crypto");
const Messages = require("../enums/Messages.js");
const { BadRequestError, UnauthorizedError, TooManyRequestsError } = require("../exceptions/AppError.js");

const DURACION_SESION_MS = 8 * 60 * 60 * 1000;
const MAX_INTENTOS_FALLIDOS = 5;
const VENTANA_INTENTOS_MS = 15 * 60 * 1000;
const LARGO_MAXIMO_CODIGO = 100;

function huella(valor) {
    return crypto.createHash("sha256").update(String(valor)).digest();
}

class AuthService {
    constructor() {
        this.codigoDefinidoPorEntorno = Boolean(process.env.ADMIN_CODIGO);
        this.codigoAdministrador = process.env.ADMIN_CODIGO || crypto.randomBytes(6).toString("hex");
        this.sesiones = new Map();
        this.intentosFallidos = new Map();
    }

    obtenerCodigoGenerado() {
        return this.codigoDefinidoPorEntorno ? null : this.codigoAdministrador;
    }

    iniciarSesion(codigo, origen) {
        if (typeof codigo !== "string" || !codigo.trim() || codigo.length > LARGO_MAXIMO_CODIGO) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }

        this.depurar();
        this.validarIntentos(origen);

        const coincide = crypto.timingSafeEqual(huella(codigo), huella(this.codigoAdministrador));
        if (!coincide) {
            this.registrarIntentoFallido(origen);
            throw new UnauthorizedError(Messages.INVALID_CREDENTIALS);
        }

        this.intentosFallidos.delete(origen);
        const token = crypto.randomBytes(32).toString("hex");
        const expiraEn = Date.now() + DURACION_SESION_MS;
        this.sesiones.set(token, expiraEn);
        return { token, expiraEn };
    }

    verificarSesion(token) {
        if (!token) {
            throw new UnauthorizedError(Messages.UNAUTHORIZED);
        }
        const expiraEn = this.sesiones.get(token);
        if (!expiraEn || expiraEn <= Date.now()) {
            this.sesiones.delete(token);
            throw new UnauthorizedError(Messages.SESSION_EXPIRED);
        }
    }

    cerrarSesion(token) {
        this.sesiones.delete(token);
    }

    validarIntentos(origen) {
        const registro = this.intentosFallidos.get(origen);
        if (registro && registro.cantidad >= MAX_INTENTOS_FALLIDOS) {
            throw new TooManyRequestsError(Messages.TOO_MANY_ATTEMPTS);
        }
    }

    registrarIntentoFallido(origen) {
        const registro = this.intentosFallidos.get(origen) || { cantidad: 0, reiniciaEn: Date.now() + VENTANA_INTENTOS_MS };
        registro.cantidad += 1;
        this.intentosFallidos.set(origen, registro);
    }

    depurar() {
        const ahora = Date.now();
        this.sesiones.forEach((expiraEn, token) => {
            if (expiraEn <= ahora) this.sesiones.delete(token);
        });
        this.intentosFallidos.forEach((registro, origen) => {
            if (registro.reiniciaEn <= ahora) this.intentosFallidos.delete(origen);
        });
    }
}

module.exports = new AuthService();
