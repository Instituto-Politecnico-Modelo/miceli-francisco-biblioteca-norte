import { useEffect, useState } from "react";
import logo from "../assets/logoEDE0C4.png";
import Icon from "./Icon.jsx";

const enlaces = [
  { id: "sobre", label: "La biblioteca" },
  { id: "servicios", label: "Servicios" },
  { id: "colecciones", label: "Colecciones" },
  { id: "catalogo", label: "Catálogo" },
  { id: "asociarse", label: "Asociarse" },
  { id: "novedades", label: "Novedades" },
  { id: "contacto", label: "Contacto" },
];

function useSeccionActiva() {
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const secciones = enlaces.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((entrada) => entrada.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, .25, .5, 1] },
    );
    secciones.forEach((seccion) => observador.observe(seccion));
    return () => observador.disconnect();
  }, []);

  return activa;
}

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const activa = useSeccionActiva();

  useEffect(() => {
    if (!abierto) return undefined;
    const cerrarConEscape = (event) => event.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", cerrarConEscape);
    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Biblioteca Popular Pueyrredón Norte, inicio">
        <span className="brand-mark">
          <img src={logo} alt="" width="400" height="400" />
        </span>
        <span className="brand-name" translate="no">Biblioteca Popular <strong>Pueyrredón Norte</strong></span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={abierto}
        aria-controls="navegacion-principal"
        onClick={() => setAbierto((actual) => !actual)}
      >
        <Icon name={abierto ? "close" : "menu"} size={20} />
        <span>{abierto ? "Cerrar" : "Menú"}</span>
      </button>
      <nav id="navegacion-principal" className={`main-nav${abierto ? " is-open" : ""}`} aria-label="Navegación principal">
        {enlaces.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={activa === id ? "location" : undefined} onClick={() => setAbierto(false)}>{label}</a>
        ))}
      </nav>
      <a className="header-cta" href="#catalogo">Explorar libros <Icon name="arrow-up-right" size={15} /></a>
    </header>
  );
}