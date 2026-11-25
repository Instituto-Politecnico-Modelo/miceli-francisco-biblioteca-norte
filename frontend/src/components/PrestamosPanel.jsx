import { useEffect, useMemo, useState } from "react";

function mostrarFecha(fecha) {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(new Date(fecha));
}

export default function PrestamosPanel({
  socios,
  sociosLoading,
  sociosError,
  onRetrySocios,
  libros,
  librosLoading,
  librosError,
  onRetryLibros,
  prestamos,
  loading,
  error,
  registrando,
  devolviendoId,
  onRetry,
  onCrear,
  onDevolver,
}) {
  const [usuarioId, setUsuarioId] = useState("");
  const [libroId, setLibroId] = useState("");
  const librosDisponibles = useMemo(
    () => libros.filter((libro) => libro.estado === "disponible"),
    [libros],
  );
  const activos = useMemo(
    () => prestamos.filter((prestamo) => prestamo.estado === "activo"),
    [prestamos],
  );
  const historial = useMemo(
    () => prestamos
      .filter((prestamo) => prestamo.estado === "devuelto")
      .slice()
      .sort((a, b) => Date.parse(b.fechaDevolucion) - Date.parse(a.fechaDevolucion)),
    [prestamos],
  );

  useEffect(() => {
    if (!socios.some((socio) => String(socio.id) === usuarioId)) {
      setUsuarioId(socios.length ? String(socios[0].id) : "");
    }
  }, [socios, usuarioId]);

  useEffect(() => {
    if (!librosDisponibles.some((libro) => String(libro.id) === libroId)) {
      setLibroId(librosDisponibles.length ? String(librosDisponibles[0].id) : "");
    }
  }, [librosDisponibles, libroId]);

  async function enviar(event) {
    event.preventDefault();
    const creado = await onCrear({
      usuarioId: Number(usuarioId),
      libroId: Number(libroId),
    });
    if (creado && librosDisponibles.length > 1) {
      setLibroId("");
    }
  }

  const ordenadosActivos = activos
    .slice()
    .sort((a, b) => Date.parse(a.fechaVencimiento) - Date.parse(b.fechaVencimiento));

  return (
    <section className="circulation-panel" aria-labelledby="prestamos-title">
      <div className="circulation-panel-heading">
        <div>
          <h2 id="prestamos-title">Préstamos</h2>
          <p>{activos.length} {activos.length === 1 ? "libro prestado" : "libros prestados"}</p>
        </div>
      </div>
      <form className="circulation-form loan-form" onSubmit={enviar}>
        <div className="form-field">
          <label htmlFor="prestamo-socio">Socio</label>
          <select
            id="prestamo-socio"
            value={usuarioId}
            onChange={(event) => setUsuarioId(event.target.value)}
            disabled={sociosLoading || socios.length === 0}
            required
          >
            <option value="" disabled>Elegí un socio</option>
            {socios.map((socio) => <option key={socio.id} value={socio.id}>{socio.nombre}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="prestamo-libro">Libro disponible</label>
          <select
            id="prestamo-libro"
            value={libroId}
            onChange={(event) => setLibroId(event.target.value)}
            disabled={librosLoading || librosDisponibles.length === 0}
            required
          >
            <option value="" disabled>Elegí un libro</option>
            {librosDisponibles.map((libro) => (
              <option key={libro.id} value={libro.id}>{libro.titulo}</option>
            ))}
          </select>
        </div>
        {sociosError && (
          <div className="form-hint circulation-error" role="alert">
            <span>{sociosError}</span>
            <button className="text-action" type="button" onClick={onRetrySocios}>Reintentar socios</button>
          </div>
        )}
        {(!sociosError && socios.length === 0 && !sociosLoading) && (
          <p className="form-hint">Registrá un socio antes de iniciar un préstamo.</p>
        )}
        {librosError && (
          <div className="form-hint circulation-error" role="alert">
            <span>{librosError}</span>
            <button className="text-action" type="button" onClick={onRetryLibros}>Reintentar catálogo</button>
          </div>
        )}
        {!librosLoading && !librosError && librosDisponibles.length === 0 && (
          <p className="form-hint">No hay libros disponibles para prestar.</p>
        )}
        <button
          className="button button-primary"
          type="submit"
          disabled={registrando || sociosLoading || librosLoading || socios.length === 0 || librosDisponibles.length === 0}
        >
          {registrando ? "Registrando…" : "Registrar préstamo"}
        </button>
      </form>

      <div className="circulation-list-wrap">
        <h3>Libros prestados</h3>
        {loading && <p className="circulation-state" role="status">Cargando préstamos…</p>}
        {!loading && error && (
          <div className="circulation-state circulation-error" role="alert">
            <p>{error}</p>
            <button className="text-action" type="button" onClick={onRetry}>Reintentar</button>
          </div>
        )}
        {!loading && !error && ordenadosActivos.length === 0 && (
          <p className="circulation-state">No hay préstamos activos.</p>
        )}
        {!loading && !error && ordenadosActivos.length > 0 && (
          <ul className="loan-list">
            {ordenadosActivos.map((prestamo) => (
              <li className="loan-row" key={prestamo.id}>
                <div className="loan-details">
                  <strong>{prestamo.libro.titulo}</strong>
                  <span>{prestamo.libro.autor} · {prestamo.usuario.nombre} · vence {mostrarFecha(prestamo.fechaVencimiento)}</span>
                </div>
                <button
                  className="button button-secondary loan-return"
                  type="button"
                  onClick={() => onDevolver(prestamo.id)}
                  disabled={devolviendoId === prestamo.id}
                >
                  {devolviendoId === prestamo.id ? "Devolviendo…" : "Registrar devolución"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!loading && !error && historial.length > 0 && (
        <details className="loan-history">
          <summary>Historial de devoluciones ({historial.length})</summary>
          <ul className="loan-list">
            {historial.map((prestamo) => (
              <li className="loan-row loan-row-returned" key={prestamo.id}>
                <div className="loan-details">
                  <strong>{prestamo.libro.titulo}</strong>
                  <span>{prestamo.libro.autor} · {prestamo.usuario.nombre} · devuelto {mostrarFecha(prestamo.fechaDevolucion)}</span>
                </div>
                <span className="status-tag">Devuelto</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
