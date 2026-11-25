import { useCallback, useEffect, useState } from "react";
import { crearPrestamo, obtenerPrestamos, registrarDevolucion } from "../services/prestamos.js";

export function usePrestamos(notificar) {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrando, setRegistrando] = useState(false);
  const [devolviendoId, setDevolviendoId] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setPrestamos(await obtenerPrestamos());
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
    setRegistrando(true);
    try {
      const prestamo = await crearPrestamo(datos);
      setPrestamos((actuales) => [prestamo, ...actuales]);
      notificar({ type: "success", message: "El préstamo quedó registrado." });
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    } finally {
      setRegistrando(false);
    }
  }

  async function devolver(id) {
    setDevolviendoId(id);
    try {
      const prestamoDevuelto = await registrarDevolucion(id);
      setPrestamos((actuales) => actuales.map((prestamo) => (
        prestamo.id === prestamoDevuelto.id ? prestamoDevuelto : prestamo
      )));
      notificar({ type: "success", message: "La devolución quedó registrada y el libro está disponible." });
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    } finally {
      setDevolviendoId(null);
    }
  }

  return {
    prestamos,
    loading,
    error,
    registrando,
    devolviendoId,
    recargar: cargar,
    crear,
    devolver,
  };
}
