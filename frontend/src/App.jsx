import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";
import Toast from "./components/Toast.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import CollectionsSection from "./components/CollectionsSection.jsx";
import MembershipSection from "./components/MembershipSection.jsx";
import NewsSection from "./components/NewsSection.jsx";
import { actualizarLibro, crearLibro, eliminarLibro, obtenerLibros } from "./services/libros.js";
import heroImage from "./assets/hero-fachada.png";
import interiorImage from "./assets/nosotros-interior.png";

export default function App() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const librosFiltrados = libros.filter((libro) => {
    const texto = `${libro.titulo} ${libro.autor} ${libro.categoria}`.toLocaleLowerCase("es");
    return texto.includes(query.trim().toLocaleLowerCase("es"))
      && (!categoriaFiltro || libro.categoria === categoriaFiltro)
      && (estadoFiltro === "todos" || libro.estado === estadoFiltro);
  });
  const colecciones = Array.from(libros.reduce((grupos, libro) => {
    const grupo = grupos.get(libro.categoria) || { categoria: libro.categoria, cantidad: 0, disponibles: 0 };
    grupo.cantidad += 1;
    if (libro.estado === "disponible") grupo.disponibles += 1;
    grupos.set(libro.categoria, grupo);
    return grupos;
  }, new Map()).values()).sort((a, b) => a.categoria.localeCompare(b.categoria, "es"));

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
    setCategoriaFiltro(categoria);
    setQuery("");
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <main>
        <section
          className="hero"
          id="inicio"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(28, 38, 18, .88) 0%, rgba(28, 38, 18, .72) 42%, rgba(28, 38, 18, .08) 100%), url(${heroImage})` }}
        >
          <div className="hero-content">
            <p className="hero-kicker">VILLA PUEYRREDÓN · DESDE 1916</p>
            <h1>Un lugar para encontrarse con los libros.</h1>
            <p className="hero-copy">Una biblioteca de barrio, abierta a las historias y a las personas que las comparten.</p>
            <a className="button button-hero" href="#catalogo">Conocer el catálogo <span aria-hidden="true">↓</span></a>
          </div>
          <span className="hero-caption">Cochrane 2334 · “La Casita de Tucumán”</span>
        </section>

        <section className="intro-section" id="sobre">
          <div className="intro-label"><span className="section-number">01</span><span>LA BIBLIOTECA</span></div>
          <div className="intro-copy">
            <h2>Más de un siglo haciendo lugar a la cultura del barrio.</h2>
            <p>La Biblioteca Popular Pueyrredón Norte es una institución cultural comunitaria sin fines de lucro, fundada en 1916 por la Asociación Vecinal Pueyrredón Norte.</p>
            <p>Conocida como “la Casita de Tucumán” por su arquitectura neocolonial, forma parte de la identidad y la memoria del barrio. Sus colecciones, la sala de lectura y los talleres reúnen a vecinos de todas las edades.</p>
          </div>
          <img className="intro-image" src={interiorImage} alt="Interior de la Biblioteca Popular Pueyrredón Norte" />
          <a className="intro-link" href="#contacto">Conocé nuestra casa <span aria-hidden="true">↗</span></a>
        </section>

        <ServicesSection />

        <CollectionsSection colecciones={colecciones} loading={loading} onSelect={verColeccion} />

        <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
          <div className="catalog-topline">
            <div className="section-kicker"><span className="section-number">04</span><span>COLECCIÓN DE LA BIBLIOTECA</span></div>
            <span className="catalog-count">{loading ? "Actualizando…" : `${libros.length} ${libros.length === 1 ? "libro" : "libros"}`}</span>
          </div>
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">BUSCÁ TU PRÓXIMA LECTURA</p>
              <h2 id="catalog-title">Catálogo</h2>
            </div>
            <button className="button button-primary add-button" type="button" onClick={abrirNuevoLibro}>+ Agregar libro</button>
          </div>

          <div className="catalog-layout">
            <div className="catalog-results">
              <div className="catalog-controls">
                <div className="search-field">
                  <label htmlFor="buscar-libro">Buscar</label>
                  <input id="buscar-libro" type="search" placeholder="Título, autor o categoría" value={query} onChange={(event) => setQuery(event.target.value)} />
                </div>
                <div className="filter-field">
                  <label htmlFor="filtrar-categoria">Colección</label>
                  <select id="filtrar-categoria" value={categoriaFiltro} onChange={(event) => setCategoriaFiltro(event.target.value)}>
                    <option value="">Todas las colecciones</option>
                    {colecciones.map((coleccion) => <option key={coleccion.categoria} value={coleccion.categoria}>{coleccion.categoria}</option>)}
                  </select>
                </div>
                <div className="filter-field">
                  <label htmlFor="filtrar-estado">Disponibilidad</label>
                  <select id="filtrar-estado" value={estadoFiltro} onChange={(event) => setEstadoFiltro(event.target.value)}>
                    <option value="todos">Todos los estados</option>
                    <option value="disponible">Disponible</option>
                    <option value="prestado">Prestado</option>
                    <option value="reservado">Reservado</option>
                    <option value="de_baja">Dado de baja</option>
                  </select>
                </div>
              </div>
              <p className="results-label">{loading ? " " : `${librosFiltrados.length} resultados${categoriaFiltro ? ` · ${categoriaFiltro}` : ""}`}</p>
              <BookList
                libros={librosFiltrados}
                loading={loading}
                error={loadError}
                onRetry={cargarLibros}
                onEdit={editarLibro}
                onDelete={borrarLibro}
              />
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
            <p className="eyebrow"><span className="section-number">07</span> · TE ESPERAMOS</p>
            <h2>La próxima historia empieza acá.</h2>
          </div>
          <div className="contact-details">
            <a href="https://maps.google.com/?q=Cochrane+2334,+Villa+Pueyrred%C3%B3n,+Buenos+Aires" target="_blank" rel="noreferrer">Cochrane 2334, Villa Pueyrredón <span aria-hidden="true">↗</span></a>
            <a href="tel:01145729107">011 4572-9107</a>
            <span>Lunes a viernes · 17:00 a 20:00 hs.</span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>Biblioteca Popular Pueyrredón Norte</span>
        <span>Villa Pueyrredón, Buenos Aires · Desde 1916</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
      <Toast notification={notification} onDismiss={() => setNotification(null)} />
    </>
  );
}