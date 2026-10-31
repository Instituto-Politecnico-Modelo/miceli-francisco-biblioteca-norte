export function hashTexto(texto = "") {
  let suma = 0;
  for (const caracter of texto) suma += caracter.charCodeAt(0);
  return suma;
}

export function tonoDeCategoria(categoria) {
  return hashTexto(categoria) % 5;
}

export function elegirLibroDelDia(libros, ahora = new Date()) {
  const disponibles = libros
    .filter((libro) => libro.estado === "disponible")
    .sort((a, b) => Number(a.id) - Number(b.id));
  if (disponibles.length === 0) return null;

  const diasDesdeEpoca = Math.floor((ahora.getTime() - ahora.getTimezoneOffset() * 60000) / 86400000);
  return disponibles[diasDesdeEpoca % disponibles.length];
}
