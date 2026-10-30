const API_URL = import.meta.env.VITE_API_URL || "/api/libros";

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "No se pudo completar la operación.");
  }

  return payload.data;
}

export function obtenerLibros() {
  return request();
}

export function crearLibro(libro) {
  return request("", {
    method: "POST",
    body: JSON.stringify(libro),
  });
}

export function actualizarLibro(id, libro) {
  return request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(libro),
  });
}

export function eliminarLibro(id) {
  return request(`/${id}`, { method: "DELETE" });
}