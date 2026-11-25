# Plan técnico: circulación de libros

## Enfoque

Extender el backend por capas y usar los arrays en memoria que ya requiere el proyecto. El servicio de préstamos coordinará la disponibilidad del libro y el historial del préstamo; ambas operaciones deberán validar todo antes de mutar los arrays para evitar estados parciales. Las nuevas rutas quedarán protegidas con el middleware administrativo existente. React consumirá los endpoints desde `frontend/src/services`, y el panel reflejará los cambios sin recargar la aplicación.

## Componentes y orden de implementación

1. **Socios (backend):** repositorio con array y generador de IDs; validación y reglas en servicio; controlador/rutas para listar y registrar, con autenticación y respuestas centralizadas.
2. **Préstamos (backend):** repositorio e integración con los repositorios de libros y socios; registrar, listar historial y devolver. Aplicar vencimiento a 14 días, estados activo/devuelto, unicidad de préstamo activo por libro y sincronización del estado del libro.
3. **Consistencia del catálogo:** impedir eliminar libros con préstamos activos o cambiar manualmente su estado a uno incompatible. El estado `prestado` será resultado de un préstamo, no una edición manual.
4. **Integración React:** agregar métodos HTTP de socios y préstamos, hooks para carga/acciones y controles dentro del panel de administración para registrar socios, prestar, revisar historial y devolver.
5. **Verificación y documentación:** ejecutar build; probar el flujo y sus errores en la interfaz y el API; actualizar README y casos de prueba HTTP con endpoints, reglas y limitaciones de persistencia en memoria.

## Dependencias

- Socios precede a préstamos porque cada préstamo debe referenciar un socio existente.
- El backend debe exponer y verificar sus reglas antes de conectar los formularios del frontend.
- La integración de la devolución depende de que la operación del servicio actualice correctamente el préstamo y el libro.
- Las ediciones del catálogo y los préstamos comparten el estado de libros; sus reglas deben implementarse en conjunto para evitar contradicciones.

## Riesgos y mitigaciones

- **Estados inconsistentes entre libro y préstamo:** centralizar la transición en el servicio de préstamos y bloquear cambios incompatibles en el servicio de libros.
- **IDs recibidos en formatos incorrectos o relaciones inexistentes:** reutilizar el parser de IDs, validar socio/libro y responder con los errores centralizados.
- **Cambios de estado manuales en el panel existente:** retirar `prestado` de las opciones editables y mantener la validación correspondiente en backend.
- **Pérdida de datos al reiniciar:** mantener la persistencia en memoria, informar esta limitación en la documentación y no prometer persistencia durable.
- **Fallo de compilación o integración del frontend:** ejecutar `npm run build` tras integrar los componentes y recorrer el flujo completo con ambos servidores activos.

## Paralelización y puntos de verificación

No conviene paralelizar los cambios de préstamos, socios y libros: sus repositorios comparten arrays y las reglas de consistencia requieren una única secuencia de integración. Verificar por etapas: reglas de socios; reglas de préstamo/devolución y errores; build del frontend; flujo integral socio → préstamo → catálogo actualizado → devolución → catálogo disponible. No se incorporará un framework de pruebas nuevo salvo que la implementación o una validación lo requiera.

## Comandos de verificación

```powershell
# Desde backend/
npm test

# Desde frontend/
npm run build

# Desde backend/
npm start

# Desde frontend/, en otra terminal
npm run dev
```

## Tareas

- [x] **Tarea 1: Implementar el dominio de socios**
  - Aceptación: servicio y repositorio en memoria registran y listan socios; el backend valida nombre, correo, teléfono, formato de correo y duplicados sin distinguir mayúsculas/minúsculas; usa mensajes y errores centralizados.
  - Verificar: iniciar el backend con `npm start`; las pruebas HTTP se ejecutarán cuando las rutas estén conectadas en la Tarea 2.
  - Archivos: `backend/src/enums/Messages.js`, `backend/src/repositories/UsuarioRepository.js`, `backend/src/services/UsuarioService.js`.

- [x] **Tarea 2: Exponer la API de socios**
  - Aceptación: `GET /api/usuarios` y `POST /api/usuarios` requieren sesión administrativa y responden con el formato y status HTTP existentes.
  - Verificar: probar listado, alta, datos inválidos, duplicado y falta de token.
  - Archivos: `backend/src/controllers/UsuarioController.js`, `backend/src/routes/usuarioRoutes.js`, `backend/src/routes/index.js`.
  - Depende de: Tarea 1.

- [x] **Tarea 3: Implementar reglas de préstamos y consistencia de libros**
  - Aceptación: un servicio registra préstamos activos de socios y libros existentes, calcula vencimiento a 14 días, impide prestar libros no disponibles, conserva el historial al devolver y sincroniza los estados. Rechaza borrar o cambiar manualmente un libro de forma incompatible con un préstamo activo.
  - Verificar: revisar que el backend inicia con `npm start`; probar los escenarios del flujo cuando estén disponibles las rutas de la Tarea 4.
  - Archivos: `backend/src/models/Prestamo.js`, `backend/src/repositories/PrestamoRepository.js`, `backend/src/services/PrestamoService.js`, `backend/src/services/LibroService.js`.
  - Depende de: Tarea 1.

- [x] **Tarea 4: Exponer la API de préstamos**
  - Aceptación: endpoints protegidos permiten listar historial, registrar préstamo y devolver un préstamo activo; los errores conservan el formato común.
  - Verificar: probar préstamo válido, libro ocupado/inexistente, socio inexistente, devolución, devolución repetida y falta de token.
  - Archivos: `backend/src/controllers/PrestamoController.js`, `backend/src/routes/prestamoRoutes.js`, `backend/src/routes/index.js`.
  - Depende de: Tarea 3.

- [x] **Tarea 5: Conectar clientes HTTP y estado de socios/préstamos**
  - Aceptación: todas las peticiones nuevas usan el cliente común de `frontend/src/services/api.js`; hooks cargan datos y exponen estados de carga, error y resultado de acciones.
  - Verificar: `npm run build` desde `frontend/`.
  - Archivos: `frontend/src/services/usuarios.js`, `frontend/src/services/prestamos.js`, `frontend/src/hooks/useSocios.js`, `frontend/src/hooks/usePrestamos.js`.
  - Depende de: Tareas 2 y 4.

- [x] **Tarea 6: Integrar el flujo en el panel**
  - Aceptación: desde el panel, el administrador puede registrar socios, iniciar préstamos, consultar historial y devolver libros; la interfaz refleja los cambios y ofrece mensajes de éxito/error. El formulario de libros ya no permite marcar manualmente `prestado`.
  - Verificar: recorrer el flujo completo en la interfaz; ejecutar `npm run build`.
  - Archivos: `frontend/src/pages/Admin.jsx`, `frontend/src/components/SociosPanel.jsx`, `frontend/src/components/PrestamosPanel.jsx`, `frontend/src/components/BookForm.jsx`, `frontend/src/styles/admin.css`.
  - Depende de: Tarea 5.

- [x] **Tarea 7: Añadir pruebas de integración del backend**
  - Aceptación: el proyecto puede ejecutar con el runner nativo de Node pruebas que cubren autenticación, validación de socios, préstamo único activo por libro, vencimiento, consistencia de estado y devolución.
  - Verificar: ejecutar `npm test` desde `backend/`.
  - Archivos: `backend/package.json`, `backend/test/circulacion.test.js`.
  - Depende de: Tareas 2 y 4.

- [x] **Tarea 8: Documentar API y validación de entrega**
  - Aceptación: README y casos HTTP explican nuevos endpoints, reglas, acceso y persistencia en memoria; los resultados de prueba describen el flujo integrado.
  - Verificar: ejecutar `npm test` y `npm run build`; contrastar documentación con las rutas reales y completar el recorrido de prueba del plan.
  - Archivos: `README.md`, `Documentacion/casos_prueba_http.md`.
  - Depende de: Tareas 2, 4, 6 y 7.
