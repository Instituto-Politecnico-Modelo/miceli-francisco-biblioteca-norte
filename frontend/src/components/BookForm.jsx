import { useEffect, useState } from "react";
import { validarLibro } from "../utils/validarLibro.js";

const libroVacio = { titulo: "", autor: "", categoria: "", estado: "disponible" };

export default function BookForm({ libro, submitting, onCancel, onSubmit }) {
  const [values, setValues] = useState(libroVacio);
  const [error, setError] = useState("");
  const editando = Boolean(libro);

  useEffect(() => {
    setValues(libro ? { ...libro } : libroVacio);
    setError("");
  }, [libro]);

  function cambiarCampo(event) {
    setValues((actuales) => ({ ...actuales, [event.target.name]: event.target.value }));
    setError("");
  }

  async function enviarFormulario(event) {
    event.preventDefault();
    const libroNormalizado = {
      titulo: values.titulo.trim(),
      autor: values.autor.trim(),
      categoria: values.categoria.trim(),
      estado: values.estado,
    };
    const errorValidacion = validarLibro(libroNormalizado);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    await onSubmit(libroNormalizado);
  }

  return (
    <section className="form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">CATÁLOGO</p>
          <h2 id="form-title">{editando ? "Editar libro" : "Sumar un libro"}</h2>
        </div>
        <span className="form-index" aria-hidden="true">{editando ? "02" : "01"}</span>
      </div>
      <form onSubmit={enviarFormulario} noValidate>
        <div className="form-field">
          <label htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" value={values.titulo} onChange={cambiarCampo} maxLength={120} required autoFocus />
        </div>
        <div className="form-field">
          <label htmlFor="autor">Autor/a</label>
          <input id="autor" name="autor" value={values.autor} onChange={cambiarCampo} maxLength={100} required />
        </div>
        <div className="form-field">
          <label htmlFor="categoria">Categoría</label>
          <input id="categoria" name="categoria" value={values.categoria} onChange={cambiarCampo} maxLength={60} required />
        </div>
        <div className="form-field">
          <label htmlFor="estado">Estado</label>
          <select id="estado" name="estado" value={values.estado} onChange={cambiarCampo}>
            <option value="disponible">Disponible</option>
            <option value="prestado">Prestado</option>
            <option value="reservado">Reservado</option>
            <option value="de_baja">Dado de baja</option>
          </select>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? "Guardando…" : editando ? "Guardar cambios" : "Agregar al catálogo"}
          </button>
          <button className="button button-quiet" type="button" onClick={onCancel} disabled={submitting}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}