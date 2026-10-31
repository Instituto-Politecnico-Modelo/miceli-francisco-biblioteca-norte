# Casos de Prueba HTTP

Este documento resume casos de prueba manuales para validar las respuestas HTTP del CRUD de `Libro`.

## Precondiciones

- Ejecutar el backend desde `backend/` con `npm install` y `npm start`.
- Verificar que el servidor responda en `http://localhost:3000`.
- Tener disponible una herramienta para hacer requests: Postman, Thunder Client o `curl`.
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
| CP-01 | Listar libros cuando no hay registros | GET | `/api/libros` | Sin body | Status `200`. Body: `success: true` y `data: []`. | La API responde con `200` y lista vacía cuando no hay registros cargados. | Aprobado |
| CP-02 | Crear un libro con datos válidos | POST | `/api/libros` | `{ "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "categoria": "Novela", "estado": "disponible" }` | Status `201`. Body: `success: true` y `data` con `id`, `titulo`, `autor`, `categoria`, `estado`. | La API responde con `201` y devuelve el objeto creado con identificador numérico. | Aprobado |
| CP-03 | Obtener un libro existente por ID | GET | `/api/libros/1` | Sin body | Status `200`. Body: `success: true` y `data` con el libro solicitado. | La API responde con `200` y devuelve el libro correspondiente al ID solicitado. | Aprobado |
| CP-04 | Actualizar parcialmente un libro existente | PUT | `/api/libros/1` | `{ "estado": "prestado" }` | Status `200`. Body: `success: true` y `data.estado = "prestado"`. | La API responde con `200` y actualiza solo el campo enviado, manteniendo el resto de los datos. | Aprobado |
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

### Probar error por ID inválido

```bash
curl -i http://localhost:3000/api/libros/abc
```

## Observaciones para la entrega

- El endpoint `PUT` funciona como actualización parcial.
- La persistencia es en memoria, por lo que al reiniciar el servidor se pierden los datos cargados.
- Los mensajes de error están centralizados y mantienen un formato de respuesta consistente.