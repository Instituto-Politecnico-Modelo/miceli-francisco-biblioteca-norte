import Icon from "./Icon.jsx";
import { tonoDeCategoria } from "../utils/libros.js";

export default function BookOfTheDay({ libro, onVer }) {
  if (!libro) return null;

  return (
    <section className="today-section" aria-labelledby="today-title">
      <div className={`today-cover tone-${tonoDeCategoria(libro.categoria)}`} aria-hidden="true">
        <span className="today-cover-category">{libro.categoria}</span>
        <span className="today-cover-title">{libro.titulo}</span>
        <span className="today-cover-author">{libro.autor}</span>
      </div>
      <div className="today-copy">
        <h2 id="today-title">Para leer hoy</h2>
        <p className="today-book">
          <strong>{libro.titulo}</strong>
          <span>{libro.autor}</span>
        </p>
        <p className="today-note">Cada día elegimos uno de los libros disponibles del catálogo. Mañana habrá otro.</p>
        <button className="button button-primary" type="button" onClick={() => onVer(libro.titulo)}>
          Ver en el catálogo <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </section>
  );
}
