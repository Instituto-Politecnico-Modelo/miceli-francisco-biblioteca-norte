import { useCallback, useEffect, useState } from "react";
import { crearUsuario, obtenerUsuarios } from "../services/usuarios.js";

export function useSocios(notificar) {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSocios(await obtenerUsuarios());
    } catch (fallo) {
      setError(fallo.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function crear(datos) {
    setGuardando(true);
    try {
      const socio = await crearUsuario(datos);
      setSocios((actuales) => [...actuales, socio]);
      notificar({ type: "success", message: "El socio quedó registrado." });
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    } finally {
      setGuardando(false);
    }
  }

  return { socios, loading, error, guardando, recargar: cargar, crear };
}
