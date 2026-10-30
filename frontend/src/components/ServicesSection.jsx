import { services } from "../utils/siteContent.js";

export default function ServicesSection() {
  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="section-heading">
        <div className="section-kicker"><span className="section-number">02</span><span>PARA COMPARTIR</span></div>
        <h2 id="services-title">Servicios para toda la comunidad</h2>
        <p>Un espacio para leer, aprender y encontrarnos.</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <article className="service-item" key={service.title}>
            <span className="service-index" aria-hidden="true">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}