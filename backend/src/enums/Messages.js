const Messages = Object.freeze({
    LIBRO_NOT_FOUND: "El libro no existe.",
    LIBRO_DUPLICATED: "Ya existe un libro con ese identificador.",
    INVALID_DATA: "Los datos enviados son inválidos.",
    INVALID_CREDENTIALS: "El código de administrador no es válido.",
    UNAUTHORIZED: "Tenés que ingresar como administrador para realizar esta acción.",
    SESSION_EXPIRED: "Tu sesión expiró. Ingresá nuevamente.",
    TOO_MANY_ATTEMPTS: "Demasiados intentos fallidos. Probá de nuevo en unos minutos.",
    INTERNAL_ERROR: "Ocurrió un error interno en el servidor.",
    ROUTE_NOT_FOUND: "El recurso solicitado no existe."
});

module.exports = Messages;
