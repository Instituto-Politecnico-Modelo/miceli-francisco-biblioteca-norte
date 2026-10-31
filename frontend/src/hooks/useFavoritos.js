import { useCallback, useEffect, useState } from "react";

const CLAVE = "biblioteca-favoritos";

function leerGuardados() {
  try {
    const guardados = JSON.parse(window.localStorage.getItem(CLAVE));
    return Array.isArray(guardados) ? guardados : [];
  } catch {
    return [];
  }
}

export function useFavoritos() {
  const [ids, setIds] = useState(leerGuardados);

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(ids));
    } catch {
      // Sin almacenamiento disponible, los favoritos duran solo la sesión.
    }
  }, [ids]);

  const alternar = useCallback((id) => {
    setIds((actuales) => (actuales.includes(id) ? actuales.filter((item) => item !== id) : [...actuales, id]));
  }, []);

  return { ids, alternar };
}
