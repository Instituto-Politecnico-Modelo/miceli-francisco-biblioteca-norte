import { useCallback, useEffect, useState } from "react";
import { actualizarLibro, crearLibro, eliminarLibro, obtenerLibros } from "../services/libros.js";

export function useLibros(notificar) {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setLibros(await obtenerLibros());
    } catch (fallo) {
      setError(fallo.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function guardar(datos, libroEditando) {
    setGuardando(true);
    try {
      if (libroEditando) {
        const actualizado = await actualizarLibro(libroEditando.id, datos);
        setLibros((actuales) => actuales.map((libro) => (libro.id === actualizado.id ? actualizado : libro)));
        notificar({ type: "success", message: "Los cambios del libro se guardaron correctamente." });
      } else {
        const creado = await crearLibro(datos);
        setLibros((actuales) => [...actuales, creado]);
        notificar({ type: "success", message: "El libro se agregó al catálogo." });
      }
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(libro) {
    try {
      await eliminarLibro(libro.id);
      setLibros((actuales) => actuales.filter((item) => item.id !== libro.id));
      notificar({ type: "success", message: "El libro se eliminó del catálogo." });
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    }
  }

  return { libros, loading, error, guardando, recargar: cargar, guardar, eliminar };
}
