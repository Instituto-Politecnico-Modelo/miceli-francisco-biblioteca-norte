Objetivo

Transformar el dominio creado en la primera entrega en una aplicación organizada utilizando el patrón MVC.


Parte 1 - Implementación del patrón MVC

Crear la estructura del proyecto respetando las siguientes carpetas backend/src: controllers, services, repositories, models, routes, middlewares, responses, exceptions, enums, utils

Cada capa deberá cumplir una única responsabilidad.


Parte 2 - CRUD de una entidad

Elegir una entidad principal del dominio e implementar las siguientes operaciones:

    Obtener todos los registros.
    Obtener un registro por ID.
    Crear un registro.
    Modificar un registro.
    Eliminar un registro.

Toda la información deberá almacenarse en memoria mediante arrays.


Parte 3 - Manejo centralizado de errores

La aplicación deberá implementar un manejo de errores centralizado.


Messages.js (Enum)


Un archivo que centralice todos los mensajes de la aplicación, ej:

export const Messages = Object.freeze({

    USER_NOT_FOUND: "El usuario no existe.",

    PRODUCT_NOT_FOUND: "El producto no existe.",

    INVALID_DATA: "Los datos enviados son inválidos.",

    DUPLICATED_RESOURCE: "El recurso ya existe."

});
AppError.js

Crear una clase personalizada para representar errores de la aplicación, ej:

class AppError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

    }


...


export class BadRequestError extends AppError {

    constructor(message) {

        super(message, 400)

    }

}


...


}

export default AppError;

Parte 4 - Respuestas HTTP

Todas las respuestas de la API deberán mantener un formato consistente.

Ejemplo:

{

    "success": true,

    "data": { ... }

}


y para errores:

{

    "success": false,

    "message": "El usuario no existe."

}

Criterios de evaluación
Se evaluará:

    Organización correcta de la arquitectura MVC.
    Separación de responsabilidades entre capas.
    Correcta implementación del CRUD.
    Uso adecuado de arrays como persistencia temporal.
    Centralización de mensajes mediante un Enum (Messages.js).
    Uso de la clase AppError.
    Manejo centralizado de errores.
    Código prolijo, legible y correctamente indentado.