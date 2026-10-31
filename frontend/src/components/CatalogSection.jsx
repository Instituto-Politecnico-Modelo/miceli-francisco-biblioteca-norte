import { useState } from "react";
import BookForm from "./BookForm.jsx";
import BookList from "./BookList.jsx";
import CatalogControls from "./CatalogControls.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import Icon from "./Icon.jsx";
import { LIBROS_POR_PAGINA } from "../hooks/useCatalogo.js";

export default function CatalogSection({ datos, catalogo, favoritos }) {
  const [formOpen, setFormOpen] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [libroAEliminar, setLibroAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const { libros, loading, error, guardando } = datos;
  const { colecciones, filtrados, visibles } = catalogo;
  const restantes = filtrados.length - visibles;

  function abrirNuevoLibro() {
    setLibroEditando(null);
    setFormOpen(true);
  }

  function editarLibro(libro) {
    setLibroEditando(libro);
    setFormOpen(true);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function cerrarFormulario() {
    setFormOpen(false);
    setLibroEditando(null);
  }

  async function guardarLibro(valores) {
    if (await datos.guardar(valores, libroEditando)) cerrarFormulario();
  }

  async function confirmarEliminacion() {
    setEliminando(true);
    const eliminado = await datos.eliminar(libroAEliminar);
    setEliminando(false);
    if (eliminado && libroEditando?.id === libroAEliminar.id) cerrarFormulario();
    setLibroAEliminar(null);
  }

  return (
    <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
      <div className="catalog-heading">
        <div>
          <h2 id="catalog-title">Catálogo</h2>
          <p className="catalog-count">{loading ? "Actualizando…" : `${libros.length} ${libros.length === 1 ? "libro" : "libros"} en ${colecciones.length} ${colecciones.length === 1 ? "colección" : "colecciones"}`}</p>
        </div>
        <button className="button button-primary add-button" type="button" onClick={abrirNuevoLibro}><Icon name="plus" size={18} /> Agregar libro</button>
      </div>

      <div className="catalog-layout">
        <div className="catalog-results">
          <CatalogControls catalogo={catalogo} totalFavoritos={favoritos.ids.length} />
          <p className="results-label" aria-live="polite">{loading ? " " : `${filtrados.length} ${filtrados.length === 1 ? "resultado" : "resultados"}${catalogo.categoria ? ` en ${catalogo.categoria}` : ""}`}</p>
          <BookList
            libros={filtrados.slice(0, visibles)}
            vista={catalogo.vista}
            favoritos={favoritos.ids}
            onToggleFavorito={favoritos.alternar}
            loading={loading}
            error={error}
            onRetry={datos.recargar}
            onEdit={editarLibro}
            onDelete={setLibroAEliminar}
            mensajeVacio={catalogo.mensajeVacio}
          />
          {!loading && !error && restantes > 0 && (
            <button className="button button-secondary show-more" type="button" onClick={catalogo.verMas}>
              Ver {Math.min(LIBROS_POR_PAGINA, restantes)} más <span className="show-more-total">({restantes} restantes)</span>
            </button>
          )}
        </div>
        {formOpen && (
          <BookForm
            libro={libroEditando}
            submitting={guardando}
            onCancel={cerrarFormulario}
            onSubmit={guardarLibro}
          />
        )}
      </div>

      <ConfirmDialog
        abierto={Boolean(libroAEliminar)}
        titulo="¿Eliminar este libro?"
        mensaje={libroAEliminar ? `“${libroAEliminar.titulo}” se quitará del catálogo. Esta acción no se puede deshacer.` : ""}
        confirmar="Eliminar libro"
        procesando={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={() => setLibroAEliminar(null)}
      />
    </section>
  );
}
