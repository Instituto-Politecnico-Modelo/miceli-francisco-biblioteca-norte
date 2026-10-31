import Icon from "./Icon.jsx";
import { tonoDeCategoria } from "../utils/libros.js";

const etiquetasEstado = {
  disponible: "Disponible",
  prestado: "Prestado",
  reservado: "Reservado",
  de_baja: "Dado de baja",
};

function BotonFavorito({ libro, activo, onToggle }) {
  return (
    <button
      type="button"
      className="favorite-button"
      aria-pressed={activo}
      aria-label={activo ? `Quitar “${libro.titulo}” de favoritos` : `Guardar “${libro.titulo}” en favoritos`}
      onClick={() => onToggle(libro.id)}
    >
      <Icon name="heart" size={18} />
    </button>
  );
}

function Acciones({ libro, onEdit, onDelete }) {
  if (!onEdit && !onDelete) return null;

  return (
    <div className="book-actions">
      <button type="button" className="text-action" onClick={() => onEdit(libro)} aria-label={`Editar ${libro.titulo}`}><Icon name="edit" size={14} /> Editar</button>
      <button type="button" className="text-action text-action-danger" onClick={() => onDelete(libro)} aria-label={`Eliminar ${libro.titulo}`}><Icon name="trash" size={14} /> Eliminar</button>
    </div>
  );
}

export default function BookList({ libros, vista, favoritos, onToggleFavorito, loading, error, onRetry, onEdit, onDelete, mensajeVacio }) {
  if (loading) {
    return (
      <div className="skeleton-list" role="status">
        <span className="visually-hidden">Cargando el catálogo…</span>
        {Array.from({ length: 5 }, (_, indice) => (
          <div className="skeleton-row" key={indice} aria-hidden="true">
            <span className="skeleton-bar skeleton-title" />
            <span className="skeleton-bar skeleton-sub" />
          </div>
        ))}
      </div>
    );
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
        <span className="empty-mark" aria-hidden="true"><Icon name="search" size={20} /></span>
        <h3>{mensajeVacio.titulo}</h3>
        <p>{mensajeVacio.detalle}</p>
      </div>
    );
  }

  return (
    <ul className={`book-list book-list-${vista}`} aria-label="Libros del catálogo">
      {libros.map((libro) => {
        const esFavorito = favoritos.includes(libro.id);
        return vista === "grilla" ? (
          <li className="book-card" key={libro.id}>
            <div className={`book-cover tone-${tonoDeCategoria(libro.categoria)}`}>
              {esFavorito && <span className="bookmark" aria-hidden="true" />}
              <span className="book-cover-category">{libro.categoria}</span>
              <span className="book-cover-title">{libro.titulo}</span>
              <span className="book-cover-author">{libro.autor}</span>
              <BotonFavorito libro={libro} activo={esFavorito} onToggle={onToggleFavorito} />
            </div>
            <div className="book-card-footer">
              <span className={`status-tag status-${libro.estado}`}>{etiquetasEstado[libro.estado]}</span>
              <Acciones libro={libro} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </li>
        ) : (
          <li className="book-row" key={libro.id}>
            <span className={`book-spine tone-${tonoDeCategoria(libro.categoria)}`} aria-hidden="true" />
            <div className="book-details">
              <h3>{libro.titulo}</h3>
              <p>{libro.autor}<span className="book-category">{libro.categoria}</span></p>
            </div>
            <span className={`status-tag status-${libro.estado}`}>{etiquetasEstado[libro.estado]}</span>
            <BotonFavorito libro={libro} activo={esFavorito} onToggle={onToggleFavorito} />
            <Acciones libro={libro} onEdit={onEdit} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}