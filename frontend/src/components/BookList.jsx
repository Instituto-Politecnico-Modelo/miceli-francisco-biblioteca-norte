const etiquetasEstado = {
  disponible: "Disponible",
  prestado: "Prestado",
  reservado: "Reservado",
  de_baja: "Dado de baja",
};

export default function BookList({ libros, loading, error, onRetry, onEdit, onDelete }) {
  if (loading) {
    return <div className="catalog-message" role="status"><span className="spinner" />Cargando el catálogo…</div>;
  }

  if (error) {
    return (
      <div className="catalog-message catalog-error" role="alert">
        <p>{error}</p>
        <button className="button button-secondary" type="button" onClick={onRetry}>Volver a intentar</button>
      </div>
    );
  }

  if (libros.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">B</span>
        <h3>No encontramos libros con esos filtros</h3>
        <p>Probá con otra búsqueda o agregá un libro al catálogo.</p>
      </div>
    );
  }

  return (
    <div className="book-list" aria-label="Libros del catálogo">
      {libros.map((libro) => (
        <article className="book-row" key={libro.id}>
          <span className="book-spine" aria-hidden="true" />
          <div className="book-details">
            <h3>{libro.titulo}</h3>
            <p>{libro.autor} <span aria-hidden="true">·</span> {libro.categoria}</p>
          </div>
          <span className={`status-tag status-${libro.estado}`}>{etiquetasEstado[libro.estado]}</span>
          <div className="book-actions">
            <button type="button" className="text-action" onClick={() => onEdit(libro)} aria-label={`Editar ${libro.titulo}`}>Editar</button>
            <button type="button" className="text-action text-action-danger" onClick={() => onDelete(libro)} aria-label={`Eliminar ${libro.titulo}`}>Eliminar</button>
          </div>
        </article>
      ))}
    </div>
  );
}