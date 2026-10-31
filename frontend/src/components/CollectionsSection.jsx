import Icon from "./Icon.jsx";
import { hashTexto } from "../utils/libros.js";

export default function CollectionsSection({ colecciones, loading, onSelect }) {
  return (
    <section className="collections-section" id="colecciones" aria-labelledby="collections-title">
      <div className="section-heading">
        <h2 id="collections-title">Explorá nuestras colecciones</h2>
        <p>Cada lomo es una colección. Elegí uno para ver sus títulos en el catálogo.</p>
      </div>
      {loading ? (
        <p className="collections-message" role="status">Cargando colecciones…</p>
      ) : colecciones.length === 0 ? (
        <p className="collections-message">Las colecciones aparecerán acá cuando haya libros en el catálogo.</p>
      ) : (
        <>
          <ul className="shelf">
            {colecciones.map((coleccion, index) => {
              const variacion = hashTexto(coleccion.categoria);
              return (
                <li key={coleccion.categoria} className="shelf-slot">
                  <button
                    className={`spine tone-${index % 5}`}
                    style={{ "--alto": `${208 + (variacion % 5) * 16}px`, "--ancho": `${64 + (variacion % 3) * 8}px` }}
                    type="button"
                    onClick={() => onSelect(coleccion.categoria)}
                    aria-label={`Ver colección ${coleccion.categoria}, ${coleccion.disponibles} disponibles de ${coleccion.cantidad} libros`}
                  >
                    <span className="spine-total">{coleccion.cantidad}</span>
                    <span className="spine-name">{coleccion.categoria}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="collections-link" type="button" onClick={() => onSelect("")}>Ver catálogo completo <Icon name="arrow-right" size={16} /></button>
        </>
      )}
    </section>
  );
}