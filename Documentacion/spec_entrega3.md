# Especificación: circulación de libros

## Objetivo

Completar Biblioteca Popular Pueyrredón Norte para que el administrador pueda gestionar socios y recorrer desde el panel de React el flujo de préstamo, consulta y devolución de libros. El estado del catálogo deberá reflejar los préstamos reales y las reglas críticas deberán validarse en el backend.

## Stack y alcance

- Backend: Node.js, Express y JavaScript CommonJS.
- Frontend: React, Vite y JavaScript ES modules.
- Persistencia en memoria mediante arrays, como en la Entrega 2.
- Se reutilizan la autenticación administrativa, el catálogo y el formato de respuestas y errores actuales.
- Las operaciones de socios y préstamos se realizan desde el panel de administración protegido. No se agregan cuentas de lectores, reservas online ni gestión de eventos.
- Un socio tiene nombre, correo y teléfono obligatorios. El correo se valida y no puede duplicarse.
- Cada préstamo vence a los 14 días corridos. Un socio puede tener varios préstamos activos, pero un libro solo uno.
- Se mantiene el historial de préstamos. Registrar una devolución cierra el préstamo activo y deja disponible el libro.

## Comandos

Desde `backend/`:

```powershell
npm start
npm test
```

Desde `frontend/`:

```powershell
npm run dev
npm run build
```

El backend agrega pruebas de integración con el runner integrado de Node.js. La validación también incluye el build existente y el recorrido manual desde la interfaz.

## Estructura del proyecto

- Backend: `backend/src/{controllers,services,repositories,models,routes,middlewares,responses,exceptions,enums,utils}`. Las nuevas entidades deben seguir la arquitectura por capas existente.
- Frontend: `frontend/src/services` para peticiones HTTP, `frontend/src/hooks` para estado y operaciones de interfaz, y `frontend/src/components` o `frontend/src/pages` para las pantallas.
- Documentación de esta entrega: `Documentacion/`.

## Estilo de código

Conservar los patrones existentes: clases de error de `AppError`, mensajes centralizados, respuestas `ApiResponse`, controladores delgados, validaciones y reglas de negocio en servicios, y acceso a arrays encapsulado en repositorios. Mantener el estilo de módulos de cada lado (CommonJS en backend y ES modules en frontend).

Ejemplo del patrón actual de servicio:

```js
obtenerPorId(id) {
    const libro = libroRepository.findById(id);
    if (!libro) {
        throw new NotFoundError(Messages.LIBRO_NOT_FOUND);
    }
    return libro;
}
```

## Estrategia de pruebas

1. Ejecutar `npm test` en `backend/` y `npm run build` en `frontend/`.
2. Iniciar backend y frontend, ingresar al panel de administración y crear un socio válido.
3. Registrar un préstamo para ese socio y un libro disponible; verificar confirmación, vencimiento y estado `prestado` en el catálogo.
4. Consultar el préstamo y registrar su devolución; verificar el historial y que el libro vuelva a `disponible`.
5. Comprobar errores desde la API y la interfaz: correo duplicado o inválido, socio/libro inexistente, préstamo de libro ocupado, devolución repetida y operaciones sin sesión administrativa.
6. Confirmar que no se pueda borrar un libro ni cambiar manualmente su estado de forma que contradiga un préstamo activo.

## Límites

- **Siempre:** respetar MVC y los servicios HTTP centralizados; validar reglas de negocio en backend; proteger las operaciones nuevas con la sesión administrativa existente; informar éxitos y errores en la interfaz; preservar el historial y mantener sincronizado el estado del libro.
- **Consultar antes:** incorporar persistencia en base de datos, cuentas o permisos para lectores, reservas, gestión de eventos, o cambiar la duración/límites acordados.
- **Nunca:** confiar solo en validaciones del frontend, simular operaciones principales, eliminar el CRUD o la autenticación existentes, o permitir estados de libro inconsistentes con préstamos activos.

## Criterios de aceptación

- El administrador puede registrar y consultar socios desde el panel; el backend rechaza datos inválidos y correos duplicados.
- El administrador puede registrar y consultar préstamos, y devolver un préstamo activo desde la interfaz.
- El backend rechaza préstamos si el socio o libro no existen, si el libro no está disponible o si ya tiene un préstamo activo.
- Un préstamo válido actualiza el libro a `prestado`; una devolución válida cierra el préstamo y actualiza el libro a `disponible`.
- Las acciones principales consumen endpoints reales, muestran resultados y errores claros, y respetan la autenticación y el formato de respuesta existente.
- Se conservan el catálogo y el CRUD actual de libros, sin inconsistencias con el nuevo flujo.
