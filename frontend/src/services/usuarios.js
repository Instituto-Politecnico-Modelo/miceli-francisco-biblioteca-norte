import { request } from "./api.js";

export function obtenerUsuarios() {
  return request("/usuarios");
}

export function crearUsuario(usuario) {
  return request("/usuarios", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}
