# Biblioteca Popular Pueyrredon Norte

<p align="center">
  <img src="https://img.shields.io/badge/Estado-Entrega%202-4D6B45?style=for-the-badge" alt="Estado: Entrega 2">
  <img src="https://img.shields.io/badge/Dominio-Biblioteca%20popular-C1541A?style=for-the-badge" alt="Dominio: Biblioteca popular">
  <img src="https://img.shields.io/badge/JavaScript-MVC%20%2B%20Express-EDE0C4?style=for-the-badge&logo=javascript&logoColor=3A3227" alt="JavaScript: MVC + Express">
</p>

Proyecto de biblioteca popular. La primera entrega modelaba el dominio; esta entrega organiza
el backend con el patrón MVC y expone un CRUD de `Libro` sobre Express.

## Alcance

- Arquitectura en capas (MVC) bajo `backend/src`.
- Persistencia en memoria mediante arrays (sin base de datos).
- CRUD completo de la entidad `Libro`.
- Sitio público de solo lectura (`/`) y panel de administración protegido (`/admin`).
- Autenticación de administrador con código y token de sesión: crear, editar y eliminar libros exige ser administrador.
- Manejo centralizado de errores con clases `AppError` y mensajes en un enum.

## Cómo correr el backend

```bash
cd backend
npm install
npm start
```

El servidor levanta en `http://localhost:3000`.

### Código de administrador

Para entrar a `/admin`, el servidor usa el código de la variable de entorno `ADMIN_CODIGO`:

```powershell
$env:ADMIN_CODIGO = "mi-codigo-secreto"; npm start
```

Si no la definís, el servidor genera un código aleatorio y lo muestra en la consola al iniciar (válido hasta que se reinicie).

## Cómo correr el frontend

En otra terminal, desde `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Abrí la URL que muestra Vite (por defecto `http://localhost:5173`). El backend debe estar
activo en `http://localhost:3000`; durante el desarrollo, Vite redirige `/api` al backend.
Para cambiar la URL de la API, definí `VITE_API_URL` (por ejemplo, `http://localhost:3000/api`).

## Endpoints - `/api/libros`

| Método | Ruta              | Descripción                    | Acceso        |
| ------ | ----------------- | ------------------------------- | ------------- |
| GET    | `/api/libros`     | Lista todos los libros          | Público       |
| GET    | `/api/libros/:id` | Obtiene un libro por id         | Público       |
| POST   | `/api/libros`     | Crea un libro                   | Administrador |
| PUT    | `/api/libros/:id` | Actualiza un libro (parcial)    | Administrador |
| DELETE | `/api/libros/:id` | Elimina un libro                | Administrador |

## Endpoints - `/api/auth`

| Método | Ruta               | Descripción                                          | Acceso        |
| ------ | ------------------ | ---------------------------------------------------- | ------------- |
| POST   | `/api/auth/login`  | Recibe `{ "codigo": "..." }` y devuelve un token      | Público       |
| GET    | `/api/auth/sesion` | Verifica que el token siga vigente                   | Administrador |
| POST   | `/api/auth/logout` | Cierra la sesión y anula el token                    | Administrador |

Las rutas de administrador esperan el header `Authorization: Bearer <token>`. La sesión dura 8 horas y,
tras 5 intentos fallidos desde una misma dirección, el login se bloquea temporalmente.

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
|-- backend/
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
