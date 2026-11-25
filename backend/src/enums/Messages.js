const Messages = Object.freeze({
    LIBRO_NOT_FOUND: "El libro no existe.",
    LIBRO_DUPLICATED: "Ya existe un libro con ese identificador.",
    LIBRO_ACTIVE_LOAN: "No se puede modificar ni eliminar un libro con un préstamo activo.",
    LIBRO_NOT_AVAILABLE: "El libro no está disponible para préstamo.",
    LIBRO_STATUS_MANAGED: "El estado prestado se asigna al registrar un préstamo.",
    SOCIO_NOT_FOUND: "El socio no existe.",
    SOCIO_DUPLICATED: "Ya existe un socio con ese correo.",
    PRESTAMO_NOT_FOUND: "El préstamo no existe.",
    PRESTAMO_NOT_ACTIVE: "El préstamo no está activo.",
    PRESTAMO_BOOK_INCONSISTENT: "El estado del libro no coincide con el préstamo.",
    INVALID_DATA: "Los datos enviados son inválidos.",
    INVALID_CREDENTIALS: "El código de administrador no es válido.",
    UNAUTHORIZED: "Tenés que ingresar como administrador para realizar esta acción.",
    SESSION_EXPIRED: "Tu sesión expiró. Ingresá nuevamente.",
    TOO_MANY_ATTEMPTS: "Demasiados intentos fallidos. Probá de nuevo en unos minutos.",
    INTERNAL_ERROR: "Ocurrió un error interno en el servidor.",
    ROUTE_NOT_FOUND: "El recurso solicitado no existe."
});

module.exports = Messages;
