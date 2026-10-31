import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import BackToTop from "./components/BackToTop.jsx";
import CatalogControls from "./components/CatalogControls.jsx";
import Icon from "./components/Icon.jsx";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";
import Toast from "./components/Toast.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import CollectionsSection from "./components/CollectionsSection.jsx";
import MembershipSection from "./components/MembershipSection.jsx";
import NewsSection from "./components/NewsSection.jsx";
import { useFavoritos } from "./hooks/useFavoritos.js";
import { actualizarLibro, crearLibro, eliminarLibro, obtenerLibros } from "./services/libros.js";
import heroImage from "./assets/hero-fachada.png";
import interiorImage from "./assets/nosotros-interior.png";

const LIBROS_POR_PAGINA = 10;

const ordenadores = {
  titulo: (a, b) => a.titulo.localeCompare(b.titulo, "es"),
  autor: (a, b) => a.autor.localeCompare(b.autor, "es"),
  disponibles: (a, b) => (b.estado === "disponible") - (a.estado === "disponible") || a.titulo.localeCompare(b.titulo, "es"),
  recientes: (a, b) => Number(b.id) - Number(a.id),
};

export default function App() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [orden, setOrden] = useState("titulo");
  const [vista, setVista] = useState("lista");
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [visibles, setVisibles] = useState(LIBROS_POR_PAGINA);
  const [formOpen, setFormOpen] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const favoritos = useFavoritos();

  async function cargarLibros() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await obtenerLibros();
      setLibros(data);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarLibros();
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeout = window.setTimeout(() => setNotification(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    setVisibles(LIBROS_POR_PAGINA);
  }, [query, estadoFiltro, categoriaFiltro, orden, soloFavoritos]);

  const colecciones = useMemo(() => Array.from(libros.reduce((grupos, libro) => {
    const grupo = grupos.get(libro.categoria) || { categoria: libro.categoria, cantidad: 0, disponibles: 0 };
    grupo.cantidad += 1;
    if (libro.estado === "disponible") grupo.disponibles += 1;
    grupos.set(libro.categoria, grupo);
    return grupos;
  }, new Map()).values()).sort((a, b) => a.categoria.localeCompare(b.categoria, "es")), [libros]);

  const coincidencias = useMemo(() => {
    const busqueda = query.trim().toLocaleLowerCase("es");
    return libros.filter((libro) => {
      const texto = `${libro.titulo} ${libro.autor} ${libro.categoria}`.toLocaleLowerCase("es");
      return texto.includes(busqueda)
        && (!categoriaFiltro || libro.categoria === categoriaFiltro)
        && (!soloFavoritos || favoritos.ids.includes(libro.id));
    });
  }, [libros, query, categoriaFiltro, soloFavoritos, favoritos.ids]);

  const conteos = useMemo(() => coincidencias.reduce(
    (cuenta, libro) => ({ ...cuenta, [libro.estado]: (cuenta[libro.estado] || 0) + 1 }),
    { todos: coincidencias.length },
  ), [coincidencias]);

  const librosFiltrados = useMemo(
    () => coincidencias.filter((libro) => estadoFiltro === "todos" || libro.estado === estadoFiltro).sort(ordenadores[orden]),
    [coincidencias, estadoFiltro, orden],
  );
  const hayFiltros = Boolean(query.trim() || categoriaFiltro || estadoFiltro !== "todos" || soloFavoritos);
  const mensajeVacio = soloFavoritos && favoritos.ids.length === 0
    ? { titulo: "Todavía no guardaste favoritos", detalle: "Tocá el corazón de un libro para guardarlo y encontrarlo rápido." }
    : { titulo: "No encontramos libros con esos filtros", detalle: "Probá con otra búsqueda, quitá algún filtro o agregá un libro al catálogo." };

  function limpiarFiltros() {
    setQuery("");
    setEstadoFiltro("todos");
    setCategoriaFiltro("");
    setSoloFavoritos(false);
  }

  function buscarDesdeInicio(texto) {
    limpiarFiltros();
    setQuery(texto);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function abrirNuevoLibro() {
    setLibroEditando(null);
    setFormOpen(true);
  }

  async function guardarLibro(datos) {
    setSubmitting(true);
    try {
      if (libroEditando) {
        const actualizado = await actualizarLibro(libroEditando.id, datos);
        setLibros((actuales) => actuales.map((libro) => libro.id === actualizado.id ? actualizado : libro));
        setNotification({ type: "success", message: "Los cambios del libro se guardaron correctamente." });
      } else {
        const creado = await crearLibro(datos);
        setLibros((actuales) => [...actuales, creado]);
        setNotification({ type: "success", message: "El libro se agregó al catálogo." });
      }
      setFormOpen(false);
      setLibroEditando(null);
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function borrarLibro(libro) {
    const confirmado = window.confirm(`¿Eliminar “${libro.titulo}” del catálogo? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    try {
      await eliminarLibro(libro.id);
      setLibros((actuales) => actuales.filter((item) => item.id !== libro.id));
      if (libroEditando?.id === libro.id) {
        setFormOpen(false);
        setLibroEditando(null);
      }
      setNotification({ type: "success", message: "El libro se eliminó del catálogo." });
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    }
  }

  function editarLibro(libro) {
    setLibroEditando(libro);
    setFormOpen(true);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  function cancelarFormulario() {
    setFormOpen(false);
    setLibroEditando(null);
  }

  function verColeccion(categoria) {
    limpiarFiltros();
    setCategoriaFiltro(categoria);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <main>
        <Hero imagen={heroImage} onBuscar={buscarDesdeInicio} />

        <section className="intro-section" id="sobre">
          <div className="intro-copy">
            <h2>Más de un siglo haciendo lugar a la cultura del barrio.</h2>
            <p>La Biblioteca Popular Pueyrredón Norte es una institución cultural comunitaria sin fines de lucro, fundada en 1916 por la Asociación Vecinal Pueyrredón Norte.</p>
            <p>Conocida como “la Casita de Tucumán” por su arquitectura neocolonial, forma parte de la identidad y la memoria del barrio. Sus colecciones, la sala de lectura y los talleres reúnen a vecinos de todas las edades.</p>
            <a className="intro-link" href="#contacto">Conocé nuestra casa <Icon name="arrow-right" size={16} /></a>
          </div>
          <img className="intro-image" src={interiorImage} alt="Interior de la Biblioteca Popular Pueyrredón Norte" />
        </section>

        <ServicesSection />

        <CollectionsSection colecciones={colecciones} loading={loading} onSelect={verColeccion} />

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
              <CatalogControls
                query={query} onQuery={setQuery}
                categoria={categoriaFiltro} onCategoria={setCategoriaFiltro} colecciones={colecciones}
                estado={estadoFiltro} onEstado={setEstadoFiltro} conteos={conteos}
                orden={orden} onOrden={setOrden}
                vista={vista} onVista={setVista}
                soloFavoritos={soloFavoritos} onSoloFavoritos={setSoloFavoritos} totalFavoritos={favoritos.ids.length}
                hayFiltros={hayFiltros} onLimpiar={limpiarFiltros}
              />
              <p className="results-label" aria-live="polite">{loading ? " " : `${librosFiltrados.length} ${librosFiltrados.length === 1 ? "resultado" : "resultados"}${categoriaFiltro ? ` en ${categoriaFiltro}` : ""}`}</p>
              <BookList
                libros={librosFiltrados.slice(0, visibles)}
                vista={vista}
                favoritos={favoritos.ids}
                onToggleFavorito={favoritos.alternar}
                loading={loading}
                error={loadError}
                onRetry={cargarLibros}
                onEdit={editarLibro}
                onDelete={borrarLibro}
                mensajeVacio={mensajeVacio}
              />
              {!loading && !loadError && librosFiltrados.length > visibles && (
                <button className="button button-secondary show-more" type="button" onClick={() => setVisibles((actual) => actual + LIBROS_POR_PAGINA)}>
                  Ver {Math.min(LIBROS_POR_PAGINA, librosFiltrados.length - visibles)} más <span className="show-more-total">({librosFiltrados.length - visibles} restantes)</span>
                </button>
              )}
            </div>
            {formOpen && (
              <BookForm
                libro={libroEditando}
                submitting={submitting}
                onCancel={cancelarFormulario}
                onSubmit={guardarLibro}
              />
            )}
          </div>
        </section>

        <MembershipSection />

        <NewsSection />

        <section className="contact-section" id="contacto">
          <div>
            <h2>La próxima historia empieza acá.</h2>
            <p className="contact-lead">Pasá por la biblioteca, recorré la sala de lectura y conocé a quienes la cuidan.</p>
          </div>
          <div className="contact-details">
            <a href="https://maps.google.com/?q=Cochrane+2334,+Villa+Pueyrred%C3%B3n,+Buenos+Aires" target="_blank" rel="noreferrer">Cochrane 2334, Villa Pueyrredón <Icon name="arrow-up-right" size={15} /></a>
            <a href="tel:01145729107">011 4572-9107</a>
            <span>Lunes a viernes, de 17:00 a 20:00 hs.</span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>Biblioteca Popular Pueyrredón Norte</span>
        <span>Villa Pueyrredón, Buenos Aires. Desde 1916.</span>
        <a href="#inicio">Volver arriba</a>
      </footer>
      <BackToTop />
      <Toast notification={notification} onDismiss={() => setNotification(null)} />
    </>
  );
}