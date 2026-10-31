import { useEffect, useRef, useState } from "react";
import { enfocarEnEscritorio } from "../utils/foco.js";
import { validarLibro } from "../utils/validarLibro.js";

const libroVacio = { titulo: "", autor: "", categoria: "", estado: "disponible" };

export default function BookForm({ libro, submitting, onCancel, onSubmit }) {
  const [values, setValues] = useState(libroVacio);
  const [errores, setErrores] = useState({});
  const tituloRef = useRef(null);
  const editando = Boolean(libro);

  useEffect(() => {
    setValues(libro ? { ...libro } : libroVacio);
    setErrores({});
    enfocarEnEscritorio(tituloRef.current);
  }, [libro]);

  function cambiarCampo(event) {
    const { name, value } = event.target;
    setValues((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: undefined }));
  }

  async function enviarFormulario(event) {
    event.preventDefault();
    const libroNormalizado = {
      titulo: values.titulo.trim(),
      autor: values.autor.trim(),
      categoria: values.categoria.trim(),
      estado: values.estado,
    };
    const erroresValidacion = validarLibro(libroNormalizado);
    const primerCampo = Object.keys(erroresValidacion)[0];
    if (primerCampo) {
      setErrores(erroresValidacion);
      document.getElementById(primerCampo)?.focus();
      return;
    }
    await onSubmit(libroNormalizado);
  }

  function propiedadesDeCampo(nombre) {
    return {
      id: nombre,
      name: nombre,
      value: values[nombre],
      onChange: cambiarCampo,
      autoComplete: "off",
      "aria-invalid": Boolean(errores[nombre]),
      "aria-describedby": errores[nombre] ? `${nombre}-error` : undefined,
    };
  }

  return (
    <section className="form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <h2 id="form-title">{editando ? "Editar libro" : "Sumar un libro"}</h2>
      </div>
      <form onSubmit={enviarFormulario} noValidate>
        <div className="form-field">
          <label htmlFor="titulo">Título</label>
          <input {...propiedadesDeCampo("titulo")} ref={tituloRef} maxLength={120} placeholder="Ej.: Cien años de soledad…" required />
          {errores.titulo && <p className="field-error" id="titulo-error" role="alert">{errores.titulo}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="autor">Autor/a</label>
          <input {...propiedadesDeCampo("autor")} maxLength={100} placeholder="Ej.: Gabriel García Márquez…" required />
          {errores.autor && <p className="field-error" id="autor-error" role="alert">{errores.autor}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="categoria">Categoría</label>
          <input {...propiedadesDeCampo("categoria")} maxLength={60} placeholder="Ej.: Novela…" required />
          {errores.categoria && <p className="field-error" id="categoria-error" role="alert">{errores.categoria}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="estado">Estado</label>
          <select {...propiedadesDeCampo("estado")}>
            <option value="disponible">Disponible</option>
            <option value="prestado">Prestado</option>
            <option value="reservado">Reservado</option>
            <option value="de_baja">Dado de baja</option>
          </select>
          {errores.estado && <p className="field-error" id="estado-error" role="alert">{errores.estado}</p>}
        </div>
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