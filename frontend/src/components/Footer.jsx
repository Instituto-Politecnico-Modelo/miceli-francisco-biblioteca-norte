import { institucion } from "../utils/siteContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>{institucion.nombre}</span>
      <span>{institucion.barrio}. Desde {institucion.fundacion}.</span>
      <a href="#inicio">Volver arriba</a>
    </footer>
  );
}
