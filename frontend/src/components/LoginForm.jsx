import { useState } from "react";

export default function LoginForm({ ingresando, onSubmit }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  async function enviar(event) {
    event.preventDefault();
    if (!codigo.trim()) {
      setError("Ingresá el código de administrador.");
      return;
    }
    const ingreso = await onSubmit(codigo);
    if (!ingreso) setCodigo("");
  }

  return (
    <section className="login-panel" aria-labelledby="login-title">
      <h1 id="login-title">Ingreso de administración</h1>
      <p>Esta sección es solo para el equipo de la biblioteca. Si querés ver el catálogo, volvé al sitio.</p>
      <form onSubmit={enviar} noValidate>
        <div className="form-field">
          <label htmlFor="codigo-admin">Código de administrador</label>
          <input
            id="codigo-admin"
            name="codigo"
            type="password"
            autoComplete="current-password"
            maxLength={100}
            value={codigo}
            onChange={(event) => { setCodigo(event.target.value); setError(""); }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "codigo-error" : undefined}
            autoFocus
          />
        </div>
        {error && <p className="form-error" id="codigo-error" role="alert">{error}</p>}
        <button className="button button-primary" type="submit" disabled={ingresando}>
          {ingresando ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
