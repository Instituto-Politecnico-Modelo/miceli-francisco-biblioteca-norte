function SocioForm({ guardando, onSubmit }) {
  async function enviar(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const valores = Object.fromEntries(new FormData(form).entries());
    const creado = await onSubmit({
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
      telefono: valores.telefono.trim(),
    });
    if (creado) form.reset();
  }

  return (
    <form className="circulation-form" onSubmit={enviar}>
      <div className="form-field">
        <label htmlFor="socio-nombre">Nombre y apellido</label>
        <input id="socio-nombre" name="nombre" autoComplete="name" maxLength={120} required />
      </div>
      <div className="form-field">
        <label htmlFor="socio-correo">Correo electrónico</label>
        <input id="socio-correo" name="correo" type="email" autoComplete="email" maxLength={254} required />
      </div>
      <div className="form-field">
        <label htmlFor="socio-telefono">Teléfono</label>
        <input id="socio-telefono" name="telefono" type="tel" autoComplete="tel" maxLength={24} required />
      </div>
      <button className="button button-primary" type="submit" disabled={guardando}>
        {guardando ? "Registrando…" : "Registrar socio"}
      </button>
    </form>
  );
}

export default function SociosPanel({ socios, loading, error, guardando, onRetry, onSubmit }) {
  return (
    <section className="circulation-panel" aria-labelledby="socios-title">
      <div className="circulation-panel-heading">
        <div>
          <h2 id="socios-title">Socios</h2>
          <p>{loading ? "Cargando socios…" : `${socios.length} ${socios.length === 1 ? "socio registrado" : "socios registrados"}`}</p>
        </div>
      </div>
      <SocioForm guardando={guardando} onSubmit={onSubmit} />
      <div className="circulation-list-wrap">
        <h3>Personas registradas</h3>
        {loading && <p className="circulation-state" role="status">Cargando la lista…</p>}
        {!loading && error && (
          <div className="circulation-state circulation-error" role="alert">
            <p>{error}</p>
            <button className="text-action" type="button" onClick={onRetry}>Reintentar</button>
          </div>
        )}
        {!loading && !error && socios.length === 0 && (
          <p className="circulation-state">Todavía no hay socios registrados.</p>
        )}
        {!loading && !error && socios.length > 0 && (
          <ul className="member-list">
            {socios.map((socio) => (
              <li className="member-row" key={socio.id}>
                <strong>{socio.nombre}</strong>
                <span>{socio.correo}</span>
                <span>{socio.telefono}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
