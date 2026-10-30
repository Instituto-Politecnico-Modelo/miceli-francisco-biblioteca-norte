const estadosValidos = ["disponible", "prestado", "reservado", "de_baja"];

export function validarLibro(libro) {
  if (!libro.titulo.trim()) return "Ingresá el título del libro.";
  if (!libro.autor.trim()) return "Ingresá el nombre del autor o autora.";
  if (!libro.categoria.trim()) return "Ingresá una categoría.";
  if (!estadosValidos.includes(libro.estado)) return "Seleccioná un estado válido.";
  return "";
}