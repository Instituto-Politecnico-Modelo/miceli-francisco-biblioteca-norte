import { useEffect, useState } from "react";
import { contacto } from "../utils/siteContent.js";
import { estadoDeAtencion } from "../utils/horario.js";

export default function EstadoAtencion({ sobreOscuro = false }) {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(new Date()), 60000);
    return () => window.clearInterval(intervalo);
  }, []);

  const { abierto, mensaje } = estadoDeAtencion(ahora, contacto.atencion);

  return (
    <p className={`open-status${abierto ? " is-open" : ""}${sobreOscuro ? " on-dark" : ""}`}>
      <span className="open-dot" aria-hidden="true" />
      {mensaje}
    </p>
  );
}
