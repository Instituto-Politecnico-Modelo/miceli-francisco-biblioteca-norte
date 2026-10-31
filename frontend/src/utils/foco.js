export function enfocarEnEscritorio(elemento) {
  if (elemento && window.matchMedia("(pointer: fine)").matches) elemento.focus();
}
