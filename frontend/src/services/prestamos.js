import { request } from "./api.js";

export function obtenerPrestamos() {
  return request("/prestamos");
}

export function crearPrestamo(datos) {
  return request("/prestamos", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export function registrarDevolucion(id) {
  return request(`/prestamos/${id}/devolucion`, { method: "POST" });
}
