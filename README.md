# Biblioteca Popular Pueyrredon Norte

<p align="center">
  <img src="https://img.shields.io/badge/Estado-Entrega%203-4D6B45?style=for-the-badge" alt="Estado: Entrega 3">
  <img src="https://img.shields.io/badge/Dominio-Biblioteca%20popular-C1541A?style=for-the-badge" alt="Dominio: Biblioteca popular">
  <img src="https://img.shields.io/badge/JavaScript-MVC%20%2B%20Express-EDE0C4?style=for-the-badge&logo=javascript&logoColor=3A3227" alt="JavaScript: MVC + Express">
</p>

Proyecto de biblioteca popular. El backend usa el patrón MVC y Express para gestionar el catálogo,
los socios y el flujo de préstamos y devoluciones.

## Alcance

- Arquitectura en capas (MVC) bajo `backend/src`.
- Persistencia en memoria mediante arrays (sin base de datos).
- CRUD completo de `Libro`, registro de socios y gestión del historial de préstamos.
- Sitio público de solo lectura (`/`) y panel de administración protegido (`/admin`).
- Autenticación de administrador con código y token de sesión: las operaciones de gestión requieren sesión.
- Manejo centralizado de errores con clases `AppError` y mensajes en un enum.
- Los préstamos vencen a los 14 días corridos; un libro solo puede tener un préstamo activo.

## Cómo correr el backend

```bash
cd backend
npm install
npm start
```

El servidor levanta en `http://localhost:3000`.

Para ejecutar las pruebas automatizadas de socios y préstamos:

```bash
npm test
```

### Código de administrador

Para entrar a `/admin` (`http://localhost:5173/admin`) se usa un código de administrador.

> **Etapa de pruebas:** por ahora el código está fijo y publicado acá para poder probar el sistema.
> Antes de un uso real hay que cambiarlo y no publicarlo.

| Dato | Valor |
| ---- | ----- |
| Código de administrador (prueba) | `pueyrredon-admin-2026` |

Para usar otro código sin tocar el código fuente, definilo con la variable de entorno `ADMIN_CODIGO`:

```powershell
$env:ADMIN_CODIGO = "mi-codigo-secreto"; npm start
```

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

El estado `prestado` se asigna automáticamente al crear un préstamo y vuelve a `disponible` al
devolverlo. No se puede cambiar manualmente ese estado ni modificar el estado o eliminar un libro
mientras tenga un préstamo activo.

## Endpoints - `/api/usuarios`

| Método | Ruta             | Descripción         | Acceso        |
| ------ | ---------------- | ------------------- | ------------- |
| GET    | `/api/usuarios`  | Lista los socios    | Administrador |
| POST   | `/api/usuarios`  | Registra un socio   | Administrador |

El alta requiere `nombre`, `correo` y `telefono`. El correo se valida y no puede repetirse, sin
distinguir mayúsculas de minúsculas.

```json
{
  "nombre": "Ana Vecina",
  "correo": "ana@example.org",
  "telefono": "+54 11 4567-1234"
}
```

## Endpoints - `/api/prestamos`

| Método | Ruta                              | Descripción                                  | Acceso        |
| ------ | --------------------------------- | -------------------------------------------- | ------------- |
| GET    | `/api/prestamos`                  | Lista los préstamos activos y el historial   | Administrador |
| POST   | `/api/prestamos`                  | Registra un préstamo                         | Administrador |
| POST   | `/api/prestamos/:id/devolucion`   | Registra la devolución de un préstamo activo | Administrador |

Para prestar se envían los IDs de un socio existente y un libro disponible:

```json
{
  "usuarioId": 1,
  "libroId": 1
}
```

Cada préstamo guarda las fechas ISO de inicio y vencimiento, el estado (`activo` o `devuelto`) y,
al devolverlo, `fechaDevolucion`. No se puede prestar dos veces el mismo libro en simultáneo ni
devolver un préstamo más de una vez.

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

`estado` admite: `disponible`, `reservado`, `de_baja`. `prestado` es un estado gestionado por el
flujo de préstamos, no editable desde el formulario del catálogo.

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
- Casos de prueba HTTP del catálogo, socios y préstamos: `Documentacion/casos_prueba_http.md`.

## Entidades principales

- Biblioteca
- Usuario
- Administrador
- Libro
- Prestamo
- Evento
