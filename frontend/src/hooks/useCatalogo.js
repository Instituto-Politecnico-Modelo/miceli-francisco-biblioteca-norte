import { useEffect, useMemo, useState } from "react";

export const LIBROS_POR_PAGINA = 10;

const ordenadores = {
  titulo: (a, b) => a.titulo.localeCompare(b.titulo, "es"),
  autor: (a, b) => a.autor.localeCompare(b.autor, "es"),
  disponibles: (a, b) => (b.estado === "disponible") - (a.estado === "disponible") || a.titulo.localeCompare(b.titulo, "es"),
  recientes: (a, b) => Number(b.id) - Number(a.id),
};

function agruparColecciones(libros) {
  const grupos = new Map();
  libros.forEach((libro) => {
    const grupo = grupos.get(libro.categoria) || { categoria: libro.categoria, cantidad: 0, disponibles: 0 };
    grupo.cantidad += 1;
    if (libro.estado === "disponible") grupo.disponibles += 1;
    grupos.set(libro.categoria, grupo);
  });
  return Array.from(grupos.values()).sort((a, b) => a.categoria.localeCompare(b.categoria, "es"));
}

export function useCatalogo(libros, favoritosIds) {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todos");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("titulo");
  const [vista, setVista] = useState("lista");
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [visibles, setVisibles] = useState(LIBROS_POR_PAGINA);

  useEffect(() => {
    setVisibles(LIBROS_POR_PAGINA);
  }, [query, estado, categoria, orden, soloFavoritos]);

  const colecciones = useMemo(() => agruparColecciones(libros), [libros]);

  const coincidencias = useMemo(() => {
    const busqueda = query.trim().toLocaleLowerCase("es");
    return libros.filter((libro) => {
      const texto = `${libro.titulo} ${libro.autor} ${libro.categoria}`.toLocaleLowerCase("es");
      return texto.includes(busqueda)
        && (!categoria || libro.categoria === categoria)
        && (!soloFavoritos || favoritosIds.includes(libro.id));
    });
  }, [libros, query, categoria, soloFavoritos, favoritosIds]);

  const conteos = useMemo(() => coincidencias.reduce(
    (cuenta, libro) => ({ ...cuenta, [libro.estado]: (cuenta[libro.estado] || 0) + 1 }),
    { todos: coincidencias.length },
  ), [coincidencias]);

  const filtrados = useMemo(
    () => coincidencias.filter((libro) => estado === "todos" || libro.estado === estado).sort(ordenadores[orden]),
    [coincidencias, estado, orden],
  );

  const hayFiltros = Boolean(query.trim() || categoria || estado !== "todos" || soloFavoritos);
  const mensajeVacio = soloFavoritos && favoritosIds.length === 0
    ? { titulo: "Todavía no guardaste favoritos", detalle: "Tocá el corazón de un libro para guardarlo y encontrarlo rápido." }
    : { titulo: "No encontramos libros con esos filtros", detalle: "Probá con otra búsqueda, quitá algún filtro o agregá un libro al catálogo." };

  function limpiar() {
    setQuery("");
    setEstado("todos");
    setCategoria("");
    setSoloFavoritos(false);
  }

  function buscar(texto) {
    limpiar();
    setQuery(texto);
  }

  function seleccionarColeccion(nombre) {
    limpiar();
    setCategoria(nombre);
  }

  return {
    query, setQuery,
    estado, setEstado,
    categoria, setCategoria,
    orden, setOrden,
    vista, setVista,
    soloFavoritos, setSoloFavoritos,
    visibles, verMas: () => setVisibles((actual) => actual + LIBROS_POR_PAGINA),
    colecciones, conteos, filtrados, hayFiltros, mensajeVacio,
    limpiar, buscar, seleccionarColeccion,
  };
}
