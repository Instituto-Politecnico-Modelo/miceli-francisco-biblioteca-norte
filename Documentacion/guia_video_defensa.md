# Guía para grabar la defensa de Biblioteca Norte

## Qué tenés que entregar

Un video **MP4 de entre 5 y 10 minutos**, adjunto en la tarea de Teams. Apuntá a unos **7 minutos**: alcanza para demostrar el sistema y explicar el código sin apurarte.

El flujo elegido es:

**Ingresar como administrador → registrar un socio → prestar un libro → consultar el préstamo → registrar la devolución.**

No hace falta leer todos los archivos ni mostrar cada sección de la web en profundidad. El profesor pide explicar el mismo caso de uso desde la interfaz, el frontend y el backend.

## Antes de grabar

### Prepará la aplicación

Abrí dos terminales de PowerShell en la raíz del proyecto.

Terminal 1:

```powershell
Set-Location .\backend
npm.cmd start
```

Terminal 2:

```powershell
Set-Location .\frontend
npm.cmd run dev
```

Abrí la dirección que imprime Vite, normalmente `http://localhost:5173`. El backend debe estar en `http://localhost:3000`.

Se usa `npm.cmd` porque en esta computadora PowerShell bloquea el script `npm.ps1`; no hace falta cambiar la política de ejecución.

- Si faltan dependencias, ejecutá `npm.cmd install` en la carpeta correspondiente antes de iniciar.
- Si Vite usa otro puerto, usá esa dirección también para entrar a `/admin`.
- Si el puerto 3000 está ocupado, revisá si ya tenés el backend abierto en otra terminal. No levantes dos copias.
- El código administrativo de prueba está documentado en el [README](../README.md). Si definiste `ADMIN_CODIGO`, usá ese valor.
- Usá datos ficticios. No muestres datos personales, tokens ni credenciales reales.
- Para una demostración limpia, cerrá y volvé a iniciar **tu** backend antes de empezar. Los socios y préstamos están en memoria y se reinician junto con el servidor.
- **No reinicies el backend durante la grabación:** perderías el socio, el préstamo y la sesión.

### Prepará las ventanas

Dejá listas:

1. La página pública `/`.
2. El panel `/admin`, en otra pestaña del mismo navegador.
3. VS Code con los archivos de la sección “Mapa del código”.
4. Opcionalmente, DevTools con la pestaña **Network / Red**, el filtro **Fetch/XHR** y **Preserve log / Conservar registro**.

Probá el micrófono y grabá unos segundos antes. Aumentá el zoom de VS Code para que el código se lea. Cerrá notificaciones y ventanas ajenas al proyecto.

## Mapa rápido de la página

| Parte | Qué hace | Qué conviene contar |
| --- | --- | --- |
| Inicio | Presenta la biblioteca y permite buscar libros. | Es la entrada pública al sistema. |
| Colecciones y libro del día | Permiten explorar el catálogo. | Se construyen a partir de los libros cargados desde la API. |
| Catálogo público | Busca por título, autor o categoría; filtra disponibilidad y colección; ordena y cambia entre lista y grilla. | Los libros y sus estados vienen del backend. No ofrece operaciones administrativas. |
| Favoritos | Guarda una selección de libros en el navegador. | Usa `localStorage`; no representa un préstamo ni una cuenta de lector. |
| Información, servicios, novedades y contacto | Presentan la institución y cómo visitarla. | Son contenido informativo; no hay inscripción online a eventos ni registro público de socios. |
| Administración | Protege el acceso al catálogo editable, socios y préstamos. | Es el espacio de trabajo del equipo de la biblioteca. |
| Socios | Registra nombre, correo y teléfono, y lista las personas registradas. | El backend valida los datos y evita correos duplicados. |
| Préstamos | Selecciona un socio y un libro disponible, muestra préstamos activos y permite devolverlos. | El libro cambia de estado automáticamente; el historial aparece tras devolverlo. |
| Catálogo administrativo | Agrega, edita y elimina libros. | No permite asignar manualmente `prestado`; un libro con préstamo activo no se puede eliminar. |

**No presentes como implementadas** las cuentas para lectores, las reservas online, el CRUD de eventos o una base de datos. No forman parte del alcance de esta entrega.

## Guion sugerido de unos 7 minutos

Las frases son una ayuda: explicalas con tus palabras, no hace falta leerlas literalmente.

### 0:00–0:40 — Presentación y sitio público

**Mostrá:** inicio y catálogo.

**Podés decir:**

> “Este proyecto es un sistema para la Biblioteca Popular Pueyrredón Norte. Tiene una web pública para consultar libros y un panel para el equipo de la biblioteca. En esta entrega completé la gestión de socios, préstamos y devoluciones, integrada entre React y Express.”

Buscá **Don Quijote** y mostrale al profesor que aparece disponible. No recorras toda la página: el foco es la circulación del libro.

### 0:40–1:20 — Ingreso y registro del socio

**Mostrá:** `/admin`, ingreso y formulario de socios.

1. Ingresá con el código administrativo de prueba.
2. Registrá estos datos ficticios:

   | Campo | Dato |
   | --- | --- |
   | Nombre y apellido | Socio Demo |
   | Correo electrónico | socio.demo@example.org |
   | Teléfono | +54 11 4567-1234 |

3. Mostrá la confirmación y al socio en la lista.

**Podés decir:**

> “Estas operaciones requieren una sesión administrativa. El formulario envía los datos al backend; recién cuando la API confirma el alta, el socio aparece en la interfaz. El correo no puede repetirse.”

**Si usás Network:** abrilo antes de estas operaciones para conservar las peticiones.

### 1:20–2:20 — Préstamo y regla de negocio

**Mostrá:** formulario de préstamos, préstamo activo y catálogo.

1. Seleccioná **Socio Demo** y **Don Quijote de la Mancha**.
2. Presioná **Registrar préstamo**.
3. Mostrá el préstamo activo, el socio y la fecha de vencimiento.
4. Mostrá que el libro ya no está en la selección de libros disponibles.
5. Bajá al catálogo administrativo: ahora figura **Prestado**.
6. Como ejemplo de error, intentá eliminar ese libro y confirmá el intento. Mostrá el mensaje que impide la eliminación y que el libro sigue en el catálogo.

**Podés decir:**

> “El préstamo vence a los 14 días. Un socio puede llevar varios libros, pero un libro solo puede tener un préstamo activo. El backend también impide eliminarlo mientras está prestado; no alcanza con ocultar un botón en React.”

**Opcional:** volvé a la pestaña pública y recargala. Buscá el mismo libro y mostrá el estado `Prestado`. Una pestaña pública que ya estaba abierta necesita recargarse para consultar nuevamente la API; no hay actualización en tiempo real entre pestañas.

### 2:20–3:00 — Devolución e historial

**Mostrá:** panel de préstamos y catálogo.

1. Presioná **Registrar devolución** sobre el préstamo.
2. Mostrá la confirmación y que desaparece de los préstamos activos.
3. Abrí **Historial de devoluciones**: el préstamo sigue registrado.
4. Mostrá que el libro vuelve a **Disponible** en el catálogo y en la selección para nuevos préstamos.

**Podés decir:**

> “Devolver el libro no borra el préstamo: lo cierra, registra la fecha de devolución y libera el libro. Si se intentara devolver otra vez el mismo préstamo, el backend rechazaría la operación.”

No hay botón para volver a devolver un préstamo cerrado. Esa regla también se comprueba en las pruebas de la API.

### 3:00–4:40 — Cómo funciona en el backend

**Mostrá estos archivos en orden:**

1. [prestamoRoutes.js](../backend/src/routes/prestamoRoutes.js): las rutas y `requireAdmin`.
2. [PrestamoController.js](../backend/src/controllers/PrestamoController.js): recibe la petición, llama al servicio y devuelve la respuesta.
3. [PrestamoService.js](../backend/src/services/PrestamoService.js): `crear()` y `devolver()`.
4. [PrestamoRepository.js](../backend/src/repositories/PrestamoRepository.js): el array y la búsqueda de préstamo activo por libro.

**Podés decir:**

> “Las responsabilidades están separadas. La ruta define el endpoint y aplica el middleware de autenticación. El controlador comunica la petición con el servicio. Las reglas están en el servicio y el repositorio se ocupa de los datos en memoria.”

En `crear()`, señalá:

- Validación de IDs enteros y positivos.
- Existencia del socio y del libro.
- Disponibilidad y ausencia de otro préstamo activo.
- Cálculo del vencimiento a 14 días.
- Registro del préstamo y actualización del libro a `prestado`.

En `devolver()`, señalá:

- Existencia del préstamo y estado `activo`.
- Comprobación del estado del libro.
- Registro de la devolución y vuelta del libro a `disponible`.

**Errores:** mostrales brevemente [AppError.js](../backend/src/exceptions/AppError.js), [Messages.js](../backend/src/enums/Messages.js) y [errorHandler.js](../backend/src/middlewares/errorHandler.js).

> “Los errores de negocio usan clases propias y mensajes centralizados. El controlador los pasa al middleware de errores, que mantiene el mismo formato de respuesta HTTP.”

### 4:40–6:10 — Cómo funciona en React y cómo consume la API

**Mostrá estos archivos en orden:**

1. [PrestamosPanel.jsx](../frontend/src/components/PrestamosPanel.jsx): selección del socio y libro, envío del formulario, listado y botón de devolución.
2. [usePrestamos.js](../frontend/src/hooks/usePrestamos.js): `crear()` y `devolver()`, estados de carga y mensajes de éxito/error.
3. [prestamos.js](../frontend/src/services/prestamos.js): peticiones HTTP específicas.
4. [api.js](../frontend/src/services/api.js): `fetch`, token y procesamiento de la respuesta.
5. [Admin.jsx](../frontend/src/pages/Admin.jsx): recarga del catálogo tras prestar o devolver.

**Podés decir:**

> “El componente se ocupa del formulario y de mostrar los datos. El hook coordina la operación y su estado. Las peticiones están centralizadas en services. El cliente común agrega el token y procesa los errores. Cuando la operación se confirma, el panel actualiza el préstamo y vuelve a consultar los libros para reflejar su disponibilidad.”

**Si mostraste Network durante el recorrido**, señalá:

| Petición | Qué demuestra |
| --- | --- |
| `POST /api/usuarios` | El socio se registra en el backend. |
| `POST /api/prestamos` | El frontend envía `usuarioId` y `libroId`; recibe un préstamo real. |
| `GET /api/libros` | La interfaz consulta el catálogo actualizado. |
| `DELETE /api/libros/:id`, con respuesta `409` | El backend impide eliminar un libro con préstamo activo. |
| `POST /api/prestamos/:id/devolucion` | La devolución llega al backend y cierra el préstamo. |

Mostrá **Payload** y **Response**, no los tokens en los encabezados. Los IDs de las peticiones son los que generó esa ejecución: no tienen que ser siempre `1`.

El formato común es:

```json
{ "success": true, "data": {} }
```

Para el error de eliminación:

```json
{
  "success": false,
  "message": "No se puede modificar ni eliminar un libro con un préstamo activo."
}
```

### 6:10–7:00 — Pruebas, alcance y cierre

**Mostrá:** una terminal con las pruebas del backend y, si queda tiempo, el build del frontend.

Desde la raíz, en una terminal adicional:

```powershell
Set-Location .\backend
npm.cmd test
```

En otra terminal desde la raíz:

```powershell
Set-Location .\frontend
npm.cmd run build
```

El test de integración está en [circulacion.test.js](../backend/test/circulacion.test.js). Incluye datos inválidos, correo duplicado, referencias inexistentes, préstamo único por libro, vencimiento, protección del catálogo y devolución repetida.

**Podés cerrar así:**

> “El flujo puede hacerse completo desde React, sin depender de Postman. Las reglas se validan en el backend y el catálogo queda consistente con los préstamos. La persistencia sigue siendo en arrays, como en la entrega anterior: al reiniciar el servidor se pierden los datos. No implementé cuentas para lectores ni reservas online en este alcance.”

## Mapa del código para tener a mano

| Tema | Archivos |
| --- | --- |
| Páginas y navegación | [App.jsx](../frontend/src/App.jsx), [Home.jsx](../frontend/src/pages/Home.jsx), [Admin.jsx](../frontend/src/pages/Admin.jsx) |
| Registro de socios en React | [SociosPanel.jsx](../frontend/src/components/SociosPanel.jsx), [useSocios.js](../frontend/src/hooks/useSocios.js), [usuarios.js](../frontend/src/services/usuarios.js) |
| Validación y almacenamiento de socios | [UsuarioService.js](../backend/src/services/UsuarioService.js), [UsuarioRepository.js](../backend/src/repositories/UsuarioRepository.js) |
| Protección administrativa | [requireAdmin.js](../backend/src/middlewares/requireAdmin.js), [AuthService.js](../backend/src/services/AuthService.js) |
| Protección del estado de los libros | [LibroService.js](../backend/src/services/LibroService.js), [BookForm.jsx](../frontend/src/components/BookForm.jsx) |
| Modelo del préstamo | [Prestamo.js](../backend/src/models/Prestamo.js) |
| Respuestas consistentes | [ApiResponse.js](../backend/src/responses/ApiResponse.js) |
| Casos HTTP documentados | [casos_prueba_http.md](./casos_prueba_http.md) |

## Preguntas que podrían hacerte

**¿Por qué las reglas no están en el controlador?**

Porque el controlador recibe y responde peticiones; el servicio aplica las reglas del negocio. Esa separación permite mantener y comprobar la lógica sin mezclarla con la presentación.

**¿Por qué no alcanza con filtrar los libros disponibles en React?**

Porque se puede llamar a la API sin usar el formulario. Por eso el backend vuelve a comprobar la disponibilidad antes de registrar el préstamo.

**¿Qué pasa si edito el título del libro después del préstamo?**

El préstamo guarda el ID y una copia de los datos del libro al registrarlo. El historial conserva ese título, aunque el catálogo cambie después.

**¿Los favoritos se guardan en el backend?**

No: se guardan en `localStorage` del navegador. Los libros, socios y préstamos sí se consultan o gestionan mediante la API.

**¿El sistema tiene registro público o reservas online?**

No. El administrador registra socios y gestiona los préstamos; el visitante consulta el catálogo.

**¿Quedan guardados los datos al apagar el servidor?**

No. Se mantiene la persistencia temporal en memoria de la entrega anterior, no una base de datos.

## Checklist de entrega del video

- [ ] Se escucha bien y el código se lee.
- [ ] Dura entre 5 y 10 minutos.
- [ ] Se ve el flujo completo desde la interfaz.
- [ ] Se explica el backend y su separación por capas.
- [ ] Se explica React y las peticiones centralizadas.
- [ ] Se demuestra al menos un error o regla de negocio.
- [ ] Se muestra la devolución y el cambio de disponibilidad.
- [ ] No se muestran datos personales ni tokens reales.
- [ ] Se exportó o grabó en **MP4** y el archivo abre correctamente.
- [ ] Se adjuntó el archivo a la tarea de **Teams**; un enlace al repositorio no reemplaza el video.
