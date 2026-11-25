const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { once } = require("node:events");

process.env.ADMIN_CODIGO = "codigo-test-circulacion";
const app = require("../src/app.js");

let server;
let apiBase;
let headers;

async function request(path, { method = "GET", body, authenticated = true } = {}) {
    const response = await fetch(`${apiBase}${path}`, {
        method,
        headers: {
            ...(authenticated && headers),
            ...(body && { "Content-Type": "application/json" }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });
    const payload = await response.json();
    return { status: response.status, payload };
}

before(async () => {
    server = app.listen(0);
    await once(server, "listening");
    apiBase = `http://127.0.0.1:${server.address().port}/api`;

    const response = await request("/auth/login", {
        method: "POST",
        body: { codigo: "codigo-test-circulacion" },
        authenticated: false,
    });
    assert.equal(response.status, 200);
    headers = { Authorization: `Bearer ${response.payload.data.token}` };
});

after(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
        });
    }
});

test("administra socios, préstamos, devoluciones y consistencia del catálogo", async () => {
    const accesoSinSesion = await request("/usuarios", { authenticated: false });
    assert.equal(accesoSinSesion.status, 401);
    const prestamosSinSesion = await request("/prestamos", { authenticated: false });
    assert.equal(prestamosSinSesion.status, 401);

    const socioInvalido = await request("/usuarios", {
        method: "POST",
        body: { nombre: "Socio", correo: "correo-invalido", telefono: "123" },
    });
    assert.equal(socioInvalido.status, 400);

    const socioCreado = await request("/usuarios", {
        method: "POST",
        body: { nombre: "Ana Ejemplo", correo: "ana@example.org", telefono: "+54 11 4567-1234" },
    });
    assert.equal(socioCreado.status, 201);
    assert.equal(socioCreado.payload.data.id, 1);

    const sociosListados = await request("/usuarios");
    assert.equal(sociosListados.status, 200);
    assert.equal(sociosListados.payload.data.length, 1);

    const correoDuplicado = await request("/usuarios", {
        method: "POST",
        body: { nombre: "Ana Repetida", correo: "ANA@example.org", telefono: "+54 11 4567-1234" },
    });
    assert.equal(correoDuplicado.status, 409);

    const socioInexistente = await request("/prestamos", {
        method: "POST",
        body: { usuarioId: 999, libroId: 1 },
    });
    assert.equal(socioInexistente.status, 404);

    const libroInexistente = await request("/prestamos", {
        method: "POST",
        body: { usuarioId: socioCreado.payload.data.id, libroId: 999 },
    });
    assert.equal(libroInexistente.status, 404);

    const prestamoCreado = await request("/prestamos", {
        method: "POST",
        body: { usuarioId: socioCreado.payload.data.id, libroId: 1 },
    });
    assert.equal(prestamoCreado.status, 201);
    assert.equal(prestamoCreado.payload.data.estado, "activo");
    assert.equal(prestamoCreado.payload.data.libro.titulo, "Don Quijote de la Mancha");
    assert.equal(
        Date.parse(prestamoCreado.payload.data.fechaVencimiento)
            - Date.parse(prestamoCreado.payload.data.fechaPrestamo),
        14 * 24 * 60 * 60 * 1000,
    );

    const prestamoOtroLibro = await request("/prestamos", {
        method: "POST",
        body: { usuarioId: socioCreado.payload.data.id, libroId: 2 },
    });
    assert.equal(prestamoOtroLibro.status, 201);

    const segundoPrestamo = await request("/prestamos", {
        method: "POST",
        body: { usuarioId: socioCreado.payload.data.id, libroId: 1 },
    });
    assert.equal(segundoPrestamo.status, 409);

    const tituloActualizado = await request("/libros/1", {
        method: "PUT",
        body: { titulo: "Don Quijote, edición revisada" },
    });
    assert.equal(tituloActualizado.status, 200);
    assert.equal(prestamoCreado.payload.data.libro.titulo, "Don Quijote de la Mancha");

    const cambioEstadoInvalido = await request("/libros/1", {
        method: "PUT",
        body: { estado: "disponible" },
    });
    assert.equal(cambioEstadoInvalido.status, 409);

    const estadoPrestadoManual = await request("/libros", {
        method: "POST",
        body: { titulo: "Libro manual", autor: "Autora", categoria: "Prueba", estado: "prestado" },
    });
    assert.equal(estadoPrestadoManual.status, 400);

    const eliminacionInvalida = await request("/libros/1", { method: "DELETE" });
    assert.equal(eliminacionInvalida.status, 409);

    const libroPrestado = await request("/libros/1", { authenticated: false });
    assert.equal(libroPrestado.payload.data.estado, "prestado");

    const devolucion = await request(`/prestamos/${prestamoCreado.payload.data.id}/devolucion`, {
        method: "POST",
    });
    assert.equal(devolucion.status, 200);
    assert.equal(devolucion.payload.data.estado, "devuelto");
    assert.ok(devolucion.payload.data.fechaDevolucion);

    const libroDisponible = await request("/libros/1", { authenticated: false });
    assert.equal(libroDisponible.payload.data.estado, "disponible");

    const devolucionRepetida = await request(`/prestamos/${prestamoCreado.payload.data.id}/devolucion`, {
        method: "POST",
    });
    assert.equal(devolucionRepetida.status, 409);

    const devolucionOtroLibro = await request(`/prestamos/${prestamoOtroLibro.payload.data.id}/devolucion`, {
        method: "POST",
    });
    assert.equal(devolucionOtroLibro.status, 200);

    const prestamosListados = await request("/prestamos");
    assert.equal(prestamosListados.status, 200);
    assert.equal(prestamosListados.payload.data.length, 2);
    assert.ok(prestamosListados.payload.data.every((prestamo) => prestamo.estado === "devuelto"));
});
