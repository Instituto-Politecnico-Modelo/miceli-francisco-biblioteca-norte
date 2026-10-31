import { useEffect, useState } from "react";
import { cerrarSesionAdmin, iniciarSesionAdmin, verificarSesionAdmin } from "../services/auth.js";
import { SESION_EXPIRADA } from "../services/api.js";
import { borrarSesion, guardarSesion, leerSesion } from "../utils/sesion.js";

export function useAdmin(notificar) {
  const [autenticado, setAutenticado] = useState(() => Boolean(leerSesion()));
  const [verificando, setVerificando] = useState(() => Boolean(leerSesion()));
  const [ingresando, setIngresando] = useState(false);

  useEffect(() => {
    if (!leerSesion()) return;
    verificarSesionAdmin()
      .catch(() => {
        borrarSesion();
        setAutenticado(false);
      })
      .finally(() => setVerificando(false));
  }, []);

  useEffect(() => {
    const alExpirar = () => setAutenticado(false);
    window.addEventListener(SESION_EXPIRADA, alExpirar);
    return () => window.removeEventListener(SESION_EXPIRADA, alExpirar);
  }, []);

  async function entrar(codigo) {
    setIngresando(true);
    try {
      const { token } = await iniciarSesionAdmin(codigo);
      guardarSesion(token);
      setAutenticado(true);
      return true;
    } catch (fallo) {
      notificar({ type: "error", message: fallo.message });
      return false;
    } finally {
      setIngresando(false);
    }
  }

  async function salir() {
    try {
      await cerrarSesionAdmin();
    } catch {
      // Si el servidor ya no reconoce la sesión, igual se cierra en este navegador.
    }
    borrarSesion();
    setAutenticado(false);
    notificar({ type: "success", message: "Cerraste la sesión de administración." });
  }

  return { autenticado, verificando, ingresando, entrar, salir };
}
