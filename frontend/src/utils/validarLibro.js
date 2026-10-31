const estadosValidos = ["disponible", "prestado", "reservado", "de_baja"];

export function validarLibro(libro) {
  const errores = {};
  if (!libro.titulo.trim()) errores.titulo = "Ingresá el título del libro.";
  if (!libro.autor.trim()) errores.autor = "Ingresá el nombre del autor o autora.";
  if (!libro.categoria.trim()) errores.categoria = "Ingresá una categoría.";
  if (!estadosValidos.includes(libro.estado)) errores.estado = "Seleccioná un estado válido.";
  return errores;
}