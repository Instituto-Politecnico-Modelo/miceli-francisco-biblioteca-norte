export default function CollectionsSection({ colecciones, loading, onSelect }) {
  return (
    <section className="collections-section" id="colecciones" aria-labelledby="collections-title">
      <div className="section-heading">
        <div className="section-kicker"><span className="section-number">03</span><span>LECTURAS PARA DESCUBRIR</span></div>
        <h2 id="collections-title">Explorá nuestras colecciones</h2>
        <p>Elegí una categoría para ver los títulos disponibles en el catálogo.</p>
      </div>
      {loading ? (
        <p className="collections-message" role="status">Cargando colecciones…</p>
      ) : colecciones.length === 0 ? (
        <p className="collections-message">Las colecciones aparecerán acá cuando haya libros en el catálogo.</p>
      ) : (
        <>
          <div className="collections-grid">
            {colecciones.map((coleccion, index) => (
              <button
                className="collection-item"
                key={coleccion.categoria}
                type="button"
                onClick={() => onSelect(coleccion.categoria)}
                aria-label={`Ver colección ${coleccion.categoria}, ${coleccion.disponibles} disponibles de ${coleccion.cantidad} libros`}
              >
                <span className="collection-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="collection-name">{coleccion.categoria}</span>
                <span className="collection-count">{coleccion.disponibles} disponibles · {coleccion.cantidad} títulos</span>
                <span className="collection-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <button className="collections-link" type="button" onClick={() => onSelect("")}>Ver catálogo completo <span aria-hidden="true">→</span></button>
        </>
      )}
    </section>
  );
}