import { useMemo } from "react";
import BackToTop from "../components/BackToTop.jsx";
import BookOfTheDay from "../components/BookOfTheDay.jsx";
import CatalogSection from "../components/CatalogSection.jsx";
import CollectionsSection from "../components/CollectionsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Hero from "../components/Hero.jsx";
import IntroSection from "../components/IntroSection.jsx";
import MembershipSection from "../components/MembershipSection.jsx";
import NewsSection from "../components/NewsSection.jsx";
import ReadingProgress from "../components/ReadingProgress.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import { useBiblioteca } from "../hooks/useBiblioteca.js";
import { elegirLibroDelDia } from "../utils/libros.js";
import heroImage from "../assets/hero-fachada.png";
import interiorImage from "../assets/nosotros-interior.png";

function irAlCatalogo() {
  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home({ notificar }) {
  const { datos, favoritos, catalogo } = useBiblioteca(notificar);
  const libroDelDia = useMemo(() => elegirLibroDelDia(datos.libros), [datos.libros]);

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
      <ReadingProgress />
      <main>
        <Hero imagen={heroImage} onBuscar={buscarDesdeInicio} />
        <IntroSection imagen={interiorImage} />
        <ServicesSection />
        <CollectionsSection colecciones={catalogo.colecciones} loading={datos.loading} onSelect={verColeccion} />
        <BookOfTheDay libro={libroDelDia} onVer={buscarDesdeInicio} />
        <CatalogSection datos={datos} catalogo={catalogo} favoritos={favoritos} />
        <MembershipSection />
        <NewsSection />
        <ContactSection />
      </main>
      <BackToTop />
    </>
  );
}
