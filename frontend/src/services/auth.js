import { request } from "./api.js";

export function iniciarSesionAdmin(codigo) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ codigo }),
  });
}

export function verificarSesionAdmin() {
  return request("/auth/sesion");
}

export function cerrarSesionAdmin() {
  return request("/auth/logout", { method: "POST" });
}
