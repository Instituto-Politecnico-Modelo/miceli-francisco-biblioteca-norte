import BackToTop from "../components/BackToTop.jsx";
import CatalogSection from "../components/CatalogSection.jsx";
import CollectionsSection from "../components/CollectionsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Hero from "../components/Hero.jsx";
import IntroSection from "../components/IntroSection.jsx";
import MembershipSection from "../components/MembershipSection.jsx";
import NewsSection from "../components/NewsSection.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import { useCatalogo } from "../hooks/useCatalogo.js";
import { useFavoritos } from "../hooks/useFavoritos.js";
import { useLibros } from "../hooks/useLibros.js";
import heroImage from "../assets/hero-fachada.png";
import interiorImage from "../assets/nosotros-interior.png";

function irAlCatalogo() {
  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home({ notificar }) {
  const datos = useLibros(notificar);
  const favoritos = useFavoritos();
  const catalogo = useCatalogo(datos.libros, favoritos.ids);

  function buscarDesdeInicio(texto) {
    catalogo.buscar(texto);
    irAlCatalogo();
  }

  function verColeccion(categoria) {
    catalogo.seleccionarColeccion(categoria);
    irAlCatalogo();
  }

  return (
    <>
      <main>
        <Hero imagen={heroImage} onBuscar={buscarDesdeInicio} />
        <IntroSection imagen={interiorImage} />
        <ServicesSection />
        <CollectionsSection colecciones={catalogo.colecciones} loading={datos.loading} onSelect={verColeccion} />
        <CatalogSection datos={datos} catalogo={catalogo} favoritos={favoritos} />
        <MembershipSection />
        <NewsSection />
        <ContactSection />
      </main>
      <BackToTop />
    </>
  );
}
