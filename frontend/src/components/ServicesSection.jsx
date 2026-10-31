import { services } from "../utils/siteContent.js";

export default function ServicesSection() {
  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="services-heading">
        <h2 id="services-title">Servicios para toda la comunidad</h2>
        <p>Un espacio para leer, aprender y encontrarnos.</p>
      </div>
      <ul className="services-list">
        {services.map((service) => (
          <li className="service-item" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}