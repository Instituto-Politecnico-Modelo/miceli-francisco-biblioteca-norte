import { borrarSesion, leerSesion } from "../utils/sesion.js";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const SESION_EXPIRADA = "sesion:expirada";

export async function request(path, options = {}) {
  const token = leerSesion();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (response.status === 401 && token) {
    borrarSesion();
    window.dispatchEvent(new Event(SESION_EXPIRADA));
  }

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "No se pudo completar la operación.");
  }

  return payload.data;
}
