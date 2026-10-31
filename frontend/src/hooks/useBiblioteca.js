import { useCatalogo } from "./useCatalogo.js";
import { useFavoritos } from "./useFavoritos.js";
import { useLibros } from "./useLibros.js";

export function useBiblioteca(notificar) {
  const datos = useLibros(notificar);
  const favoritos = useFavoritos();
  const catalogo = useCatalogo(datos.libros, favoritos.ids);
  return { datos, favoritos, catalogo };
}
