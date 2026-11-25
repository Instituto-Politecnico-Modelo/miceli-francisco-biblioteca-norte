# Casos de Prueba HTTP

Este documento resume casos de prueba para validar el catálogo, los socios y el flujo de préstamos
de la biblioteca.

## Precondiciones

- Ejecutar el backend desde `backend/` con `npm install` y `npm start`.
- Verificar que el servidor responda en `http://localhost:3000`.
- Tener disponible una herramienta para hacer requests: Postman, Thunder Client o `curl`.
- Los casos son independientes; reiniciar el backend después de las pruebas que eliminan o modifican libros.
- Las rutas `POST`, `PUT` y `DELETE` de `/api/libros` requieren un token de administrador en el header `Authorization: Bearer <token>`. El token se obtiene con `POST /api/auth/login` (ver CP-12 y CP-13).
- El código de administrador de prueba es `pueyrredon-admin-2026` (ver README). Se puede reemplazar con la variable de entorno `ADMIN_CODIGO`.

## Formato esperado de respuesta

### Respuesta exitosa

```json
{
  "success": true,
  "data": {}
}
```

### Respuesta con error

```json
{
  "success": false,
  "message": "..."
}
```

## Tabla de casos de prueba

| ID | Caso a validar | Método | Endpoint | Datos de entrada | Resultado esperado | Resultado obtenido | Estado |
| -- | -------------- | ------ | -------- | ---------------- | ------------------ | ------------------ | ------ |
| CP-01 | Listar el catálogo inicial | GET | `/api/libros` | Sin body | Status `200`. Body: `success: true` y `data` con los libros de ejemplo. | La API responde con `200` y devuelve el catálogo inicial. | Aprobado |
| CP-02 | Crear un libro con datos válidos | POST | `/api/libros` | `{ "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "categoria": "Novela", "estado": "disponible" }` | Status `201`. Body: `success: true` y `data` con `id`, `titulo`, `autor`, `categoria`, `estado`. | La API responde con `201` y devuelve el objeto creado con identificador numérico. | Aprobado |
| CP-03 | Obtener un libro existente por ID | GET | `/api/libros/1` | Sin body | Status `200`. Body: `success: true` y `data` con el libro solicitado. | La API responde con `200` y devuelve el libro correspondiente al ID solicitado. | Aprobado |
| CP-04 | Actualizar parcialmente un libro existente | PUT | `/api/libros/1` | `{ "titulo": "Don Quijote, edición revisada" }` | Status `200`. Body: `success: true` y `data.titulo` actualizado. | La API responde con `200` y actualiza solo el campo enviado, manteniendo el resto de los datos. | Aprobado |
| CP-05 | Eliminar un libro existente | DELETE | `/api/libros/1` | Sin body | Status `200`. Body: `success: true` y `data: null`. | La API responde con `200` y confirma la eliminación con `data: null`. | Aprobado |
| CP-06 | Buscar un libro inexistente | GET | `/api/libros/999` | Sin body | Status `404`. Body: `success: false` y `message: "El libro no existe."`. | La API responde con `404` y el mensaje esperado para recurso inexistente. | Aprobado |
| CP-07 | Eliminar un libro inexistente | DELETE | `/api/libros/999` | Sin body | Status `404`. Body: `success: false` y `message: "El libro no existe."`. | La API responde con `404` y mantiene el formato uniforme de error. | Aprobado |
| CP-08 | Enviar un ID no numérico | GET | `/api/libros/abc` | Sin body | Status `400`. Body: `success: false` y `message: "Los datos enviados son inválidos."`. | La API responde con `400` porque el ID no puede convertirse a entero. | Aprobado |
| CP-09 | Crear un libro con datos inválidos | POST | `/api/libros` | `{ "titulo": "", "autor": "A", "categoria": "Novela", "estado": "otro" }` | Status `400`. Body: `success: false` y `message: "Los datos enviados son inválidos."`. | La API responde con `400` al validar campos vacíos o estados no permitidos. | Aprobado |
| CP-10 | Acceder a una ruta inexistente | GET | `/api/noexiste` | Sin body | Status `404`. Body: `success: false` y `message: "El recurso solicitado no existe."`. | La API responde con `404` y el mensaje centralizado para rutas no registradas. | Aprobado |
| CP-11 | Crear, actualizar o eliminar un libro sin token | POST / PUT / DELETE | `/api/libros` y `/api/libros/1` | Sin header `Authorization` | Status `401`. Body: `success: false` y `message: "Tenés que ingresar como administrador para realizar esta acción."`. | Las tres rutas responden con `401` y no modifican los datos. | Aprobado |
| CP-12 | Iniciar sesión con un código incorrecto | POST | `/api/auth/login` | `{ "codigo": "incorrecto" }` | Status `401`. Body: `success: false` y `message: "El código de administrador no es válido."`. | La API responde con `401` y no entrega token. | Aprobado |
| CP-13 | Iniciar sesión con el código correcto | POST | `/api/auth/login` | `{ "codigo": "pueyrredon-admin-2026" }` | Status `200`. Body: `success: true` y `data` con `token` y `expiraEn`. | La API responde con `200` y un token de 64 caracteres. | Aprobado |
| CP-14 | Iniciar sesión sin enviar código | POST | `/api/auth/login` | `{}` | Status `400`. Body: `success: false` y `message: "Los datos enviados son inválidos."`. | La API responde con `400`. | Aprobado |
| CP-15 | Crear y eliminar un libro con token válido | POST / DELETE | `/api/libros` y `/api/libros/:id` | Header `Authorization: Bearer <token>` | Status `201` al crear y `200` al eliminar. | Ambas operaciones se ejecutan correctamente. | Aprobado |
| CP-16 | Usar un token falso o de una sesión cerrada | DELETE / POST | `/api/libros/1` y `/api/libros` | Token inventado, o token usado después de `POST /api/auth/logout` | Status `401`. Body: `success: false` y `message: "Tu sesión expiró. Ingresá nuevamente."`. | La API rechaza el token con `401`. | Aprobado |
| CP-17 | Listar socios con sesión administrativa | GET | `/api/usuarios` | Header `Authorization: Bearer <token>` | Status `200`. Body: `success: true` y `data` con la lista de socios. | La API devuelve la lista con el formato común. | Aprobado |
| CP-18 | Registrar un socio válido | POST | `/api/usuarios` | `{ "nombre": "Ana Vecina", "correo": "ana@example.org", "telefono": "+54 11 4567-1234" }` | Status `201`. Body con socio e identificador. | La API registra el socio y devuelve `201`. | Aprobado |
| CP-19 | Rechazar correo duplicado sin distinguir mayúsculas | POST | `/api/usuarios` | Repetir correo existente cambiando mayúsculas. | Status `409`. Body: `success: false` y mensaje de duplicado. | La API rechaza el duplicado. | Aprobado |
| CP-20 | Rechazar socio con datos inválidos | POST | `/api/usuarios` | Correo inválido o teléfono sin formato/dígitos suficientes. | Status `400`. Body: `success: false` y mensaje de datos inválidos. | La API responde `400`. | Aprobado |
| CP-21 | Registrar préstamos de libros disponibles | POST | `/api/prestamos` | `{ "usuarioId": 1, "libroId": 2 }` y luego otro libro distinto para el mismo socio. | Status `201`; ambos préstamos quedan `activo`, vencen a 14 días y los libros pasan a `prestado`. | El socio puede llevar varios libros, pero cada libro mantiene un solo préstamo activo. | Aprobado |
| CP-22 | Impedir préstamos simultáneos del mismo libro | POST | `/api/prestamos` | Enviar de nuevo el libro que tiene préstamo activo. | Status `409`; no se crea un segundo préstamo. | La API rechaza el préstamo duplicado. | Aprobado |
| CP-23 | Rechazar referencias inexistentes | POST | `/api/prestamos` | ID de socio o libro inexistente. | Status `404`; error en el formato común. | La API responde `404`. | Aprobado |
| CP-24 | Registrar una devolución | POST | `/api/prestamos/:id/devolucion` | ID de préstamo activo. | Status `200`; estado `devuelto`, fecha de devolución y libro `disponible`. | El historial conserva el préstamo y el catálogo libera el libro. | Aprobado |
| CP-25 | Impedir devolver dos veces | POST | `/api/prestamos/:id/devolucion` | ID de un préstamo ya devuelto. | Status `409`. | La API rechaza la segunda devolución. | Aprobado |
| CP-26 | Proteger libros con préstamo activo | PUT / DELETE | `/api/libros/:id` | Cambiar estado o eliminar un libro prestado. | Status `409`; libro e historial permanecen consistentes. | La API impide ambas operaciones. | Aprobado |
| CP-27 | Probar el recorrido desde React | Interfaz | `/admin` | Ingresar, registrar socio, prestar libro y devolverlo. | Confirmaciones visibles; los estados del catálogo se actualizan desde la API. | El flujo se completó desde el panel de administración. | Aprobado |

Los casos CP-17 a CP-26 cuentan con cobertura automatizada en `backend/test/circulacion.test.js`
y pruebas HTTP del flujo. CP-27 se verificó manualmente con ambos servidores activos.

## Ejemplos rápidos con curl

### Iniciar sesión como administrador

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"codigo":"pueyrredon-admin-2026"}'
```

### Crear un libro (requiere token)

```bash
curl -i -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"titulo":"Cien años de soledad","autor":"Gabriel García Márquez","categoria":"Novela","estado":"disponible"}'
```

### Obtener todos los libros

```bash
curl -i http://localhost:3000/api/libros
```

### Registrar un socio

```bash
curl -i -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"nombre":"Ana Vecina","correo":"ana@example.org","telefono":"+54 11 4567-1234"}'
```

### Registrar un préstamo y devolverlo

```bash
curl -i -X POST http://localhost:3000/api/prestamos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"usuarioId":1,"libroId":1}'

curl -i -X POST http://localhost:3000/api/prestamos/1/devolucion \
  -H "Authorization: Bearer <token>"
```

### Probar error por ID inválido

```bash
curl -i http://localhost:3000/api/libros/abc
```

## Observaciones para la entrega

- El endpoint `PUT` funciona como actualización parcial.
- La persistencia es en memoria, por lo que al reiniciar el servidor se pierden los datos cargados.
- Los mensajes de error están centralizados y mantienen un formato de respuesta consistente.