# Biblioteca Popular Pueyrredon Norte

<p align="center">
  <img src="https://img.shields.io/badge/Estado-Entrega%202-4D6B45?style=for-the-badge" alt="Estado: Entrega 2">
  <img src="https://img.shields.io/badge/Dominio-Biblioteca%20popular-C1541A?style=for-the-badge" alt="Dominio: Biblioteca popular">
  <img src="https://img.shields.io/badge/JavaScript-MVC%20%2B%20Express-EDE0C4?style=for-the-badge&logo=javascript&logoColor=3A3227" alt="JavaScript: MVC + Express">
</p>

Proyecto de biblioteca popular. La primera entrega modelaba el dominio; esta entrega organiza
el backend con el patrón MVC y expone un CRUD de `Libro` sobre Express.

## Alcance

- Arquitectura en capas (MVC) bajo `Backend/src`.
- Persistencia en memoria mediante arrays (sin base de datos).
- CRUD completo de la entidad `Libro`.
- Manejo centralizado de errores con clases `AppError` y mensajes en un enum.

## Cómo correr el backend

```bash
cd Backend
npm install
npm start
```

El servidor levanta en `http://localhost:3000`.

## Endpoints - `/api/libros`

| Método | Ruta              | Descripción                    |
| ------ | ----------------- | ------------------------------- |
| GET    | `/api/libros`     | Lista todos los libros          |
| GET    | `/api/libros/:id` | Obtiene un libro por id         |
| POST   | `/api/libros`     | Crea un libro                   |
| PUT    | `/api/libros/:id` | Actualiza un libro (parcial)    |
| DELETE | `/api/libros/:id` | Elimina un libro                |

Body esperado para crear/actualizar:

```json
{
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "categoria": "Novela",
  "estado": "disponible"
}
```

`estado` acepta: `disponible`, `prestado`, `reservado`, `de_baja`.

Todas las respuestas siguen el formato:

```json
{ "success": true, "data": { } }
```

o, en caso de error:

```json
{ "success": false, "message": "El libro no existe." }
```

## Estructura general

```text
.
|-- Backend/
|   `-- src/
|       |-- controllers/
|       |-- services/
|       |-- repositories/
|       |-- models/
|       |-- routes/
|       |-- middlewares/
|       |-- responses/
|       |-- exceptions/
|       |-- enums/
|       `-- utils/
`-- Documentacion/
```

## Documentacion

- Diagrama de clases del dominio.
- Maqueta HTML de referencia.
- Imagenes usadas por la maqueta.
- Casos de prueba HTTP del CRUD: `Documentacion/casos_prueba_http.md`.

## Entidades principales

- Biblioteca
- Usuario
- Administrador
- Libro
- Prestamo
- Evento
