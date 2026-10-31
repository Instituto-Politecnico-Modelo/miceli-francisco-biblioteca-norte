import { request } from "./api.js";

export function obtenerLibros() {
  return request("/libros");
}

export function crearLibro(libro) {
  return request("/libros", {
    method: "POST",
    body: JSON.stringify(libro),
  });
}

export function actualizarLibro(id, libro) {
  return request(`/libros/${id}`, {
    method: "PUT",
    body: JSON.stringify(libro),
  });
}

export function eliminarLibro(id) {
  return request(`/libros/${id}`, { method: "DELETE" });
}
