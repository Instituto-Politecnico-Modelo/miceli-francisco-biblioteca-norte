const CLAVE = "biblioteca-sesion-admin";

export function leerSesion() {
  try {
    return window.sessionStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

export function guardarSesion(token) {
  try {
    window.sessionStorage.setItem(CLAVE, token);
  } catch {
    // Sin almacenamiento disponible, la sesión no sobrevive a una recarga.
  }
}

export function borrarSesion() {
  try {
    window.sessionStorage.removeItem(CLAVE);
  } catch {
    // Nada que limpiar.
  }
}
