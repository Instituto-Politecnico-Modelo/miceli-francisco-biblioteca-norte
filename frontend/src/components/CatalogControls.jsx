import Icon from "./Icon.jsx";

const estados = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "disponible", etiqueta: "Disponibles" },
  { valor: "prestado", etiqueta: "Prestados" },
  { valor: "reservado", etiqueta: "Reservados" },
  { valor: "de_baja", etiqueta: "De baja" },
];

export default function CatalogControls({ catalogo, totalFavoritos }) {
  const {
    query, setQuery: onQuery,
    categoria, setCategoria: onCategoria, colecciones,
    estado, setEstado: onEstado, conteos,
    orden, setOrden: onOrden,
    vista, setVista: onVista,
    soloFavoritos, setSoloFavoritos: onSoloFavoritos,
    hayFiltros, limpiar: onLimpiar,
  } = catalogo;

  return (
    <div className="catalog-controls">
      <div className="control-row">
        <div className="search-field">
          <label htmlFor="buscar-libro">Buscar</label>
          <div className="input-with-icon">
            <Icon name="search" size={18} />
            <input id="buscar-libro" name="q" type="search" autoComplete="off" enterKeyHint="search" placeholder="Título, autor o categoría…" value={query} onChange={(event) => onQuery(event.target.value)} />
          </div>
        </div>
        <div className="filter-field">
          <label htmlFor="filtrar-categoria">Colección</label>
          <select id="filtrar-categoria" value={categoria} onChange={(event) => onCategoria(event.target.value)}>
            <option value="">Todas</option>
            {colecciones.map((coleccion) => <option key={coleccion.categoria} value={coleccion.categoria}>{coleccion.categoria}</option>)}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="ordenar-libros">Ordenar por</label>
          <select id="ordenar-libros" value={orden} onChange={(event) => onOrden(event.target.value)}>
            <option value="titulo">Título (A a Z)</option>
            <option value="autor">Autor (A a Z)</option>
            <option value="disponibles">Disponibles primero</option>
            <option value="recientes">Agregados recientemente</option>
          </select>
        </div>
      </div>

      <div className="control-row control-row-chips">
        <div className="chip-group" role="group" aria-label="Filtrar por disponibilidad">
          {estados.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type="button"
              className="chip"
              aria-pressed={estado === valor}
              onClick={() => onEstado(valor)}
            >
              {etiqueta} <span className="chip-count">{conteos[valor] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="control-tools">
          <button type="button" className="chip chip-favorites" aria-pressed={soloFavoritos} onClick={() => onSoloFavoritos(!soloFavoritos)}>
            <Icon name="heart" size={15} /> Mis favoritos <span className="chip-count">{totalFavoritos}</span>
          </button>
          <div className="view-toggle" role="group" aria-label="Vista del catálogo">
            <button type="button" aria-pressed={vista === "lista"} onClick={() => onVista("lista")} aria-label="Ver como lista"><Icon name="list" size={18} /></button>
            <button type="button" aria-pressed={vista === "grilla"} onClick={() => onVista("grilla")} aria-label="Ver como grilla"><Icon name="grid" size={18} /></button>
          </div>
        </div>
      </div>

      {hayFiltros && (
        <button type="button" className="text-action clear-filters" onClick={onLimpiar}>Limpiar filtros</button>
      )}
    </div>
  );
}
