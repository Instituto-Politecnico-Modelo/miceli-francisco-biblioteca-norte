# Casos de Prueba HTTP

Este documento resume casos de prueba manuales para validar las respuestas HTTP del CRUD de `Libro`.

## Precondiciones

- Ejecutar el backend desde `Backend/` con `npm install` y `npm start`.
- Verificar que el servidor responda en `http://localhost:3000`.
- Tener disponible una herramienta para hacer requests: Postman, Thunder Client o `curl`.

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

## Ejemplos rápidos con curl

### Crear un libro

```bash
curl -i -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
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