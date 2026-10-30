import logo from "../assets/logoEDE0C4.png";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Biblioteca Popular Pueyrredón Norte, inicio">
        <span className="brand-mark">
          <img src={logo} alt="" />
        </span>
        <span className="brand-name">Biblioteca Popular <strong>Pueyrredón Norte</strong></span>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#sobre">La biblioteca</a>
        <a href="#servicios">Servicios</a>
        <a href="#colecciones">Colecciones</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#asociarse">Asociarse</a>
        <a href="#novedades">Novedades</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="header-cta" href="#catalogo">Explorar libros <span aria-hidden="true">↗</span></a>
    </header>
  );
}