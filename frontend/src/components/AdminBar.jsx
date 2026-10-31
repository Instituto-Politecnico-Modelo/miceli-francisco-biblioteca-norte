import { Link } from "react-router-dom";
import logo from "../assets/logoEDE0C4.png";
import Icon from "./Icon.jsx";

export default function AdminBar({ autenticado, onSalir }) {
  return (
    <header className="site-header admin-bar">
      <Link className="brand" to="/" aria-label="Biblioteca Popular Pueyrredón Norte, volver al sitio">
        <span className="brand-mark">
          <img src={logo} alt="" />
        </span>
        <span className="brand-name">Biblioteca Popular <strong>Pueyrredón Norte</strong></span>
      </Link>
      <div className="admin-bar-actions">
        <span className="admin-badge">Administración</span>
        <Link className="text-action" to="/">Ver el sitio <Icon name="arrow-up-right" size={14} /></Link>
        {autenticado && <button className="button button-secondary" type="button" onClick={onSalir}>Cerrar sesión</button>}
      </div>
    </header>
  );
}
