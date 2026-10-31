import { Link } from "react-router-dom";
import { institucion } from "../utils/siteContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>{institucion.nombre}</span>
      <span>{institucion.barrio}. Desde {institucion.fundacion}.</span>
      <nav className="footer-links" aria-label="Enlaces del pie">
        <a href="#inicio">Volver arriba</a>
        <Link to="/admin">Administración</Link>
      </nav>
    </footer>
  );
}
