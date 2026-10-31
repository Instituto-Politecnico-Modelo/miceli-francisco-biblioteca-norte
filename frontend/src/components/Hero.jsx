import { useState } from "react";
import Icon from "./Icon.jsx";

export default function Hero({ imagen, onBuscar }) {
  const [texto, setTexto] = useState("");

  function enviar(event) {
    event.preventDefault();
    onBuscar(texto);
  }

  return (
    <section
      className="hero"
      id="inicio"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(22, 36, 24, .92) 0%, rgba(22, 36, 24, .74) 46%, rgba(22, 36, 24, .1) 100%), url(${imagen})` }}
    >
      <div className="hero-content">
        <p className="hero-kicker">Villa Pueyrredón, desde 1916</p>
        <h1>Un lugar para encontrarse con los libros.</h1>
        <p className="hero-copy">Una biblioteca de barrio, abierta a las historias y a las personas que las comparten.</p>
        <form className="hero-search" role="search" onSubmit={enviar}>
          <label htmlFor="buscar-hero">Buscar en el catálogo</label>
          <div className="hero-search-box">
            <Icon name="search" size={20} />
            <input id="buscar-hero" type="search" placeholder="Título, autor o categoría" value={texto} onChange={(event) => setTexto(event.target.value)} />
            <button className="button button-hero" type="submit">Buscar</button>
          </div>
        </form>
        <a className="hero-link" href="#catalogo">Ver todo el catálogo <Icon name="arrow-down" size={16} /></a>
      </div>
      <span className="hero-caption">Cochrane 2334, “La Casita de Tucumán”</span>
    </section>
  );
}
