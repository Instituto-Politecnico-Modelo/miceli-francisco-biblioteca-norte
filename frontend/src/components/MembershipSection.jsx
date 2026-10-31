import Icon from "./Icon.jsx";

const pasos = [
  {
    title: "Acercate",
    description: "Visitá la biblioteca en Cochrane 2334, de lunes a viernes entre las 17:00 y las 20:00.",
  },
  {
    title: "Consultá cómo asociarte",
    description: "El equipo puede contarte los requisitos y las modalidades disponibles para hacerte socio.",
  },
  {
    title: "Elegí tu próxima lectura",
    description: "Explorá el catálogo y consultá en la biblioteca por préstamos y disponibilidad.",
  },
];

export default function MembershipSection() {
  return (
    <section className="membership-section" id="asociarse" aria-labelledby="membership-title">
      <div className="membership-heading">
        <h2 id="membership-title">Hacete socio y encontrá tu próximo libro.</h2>
        <p>Acercate para conocer la propuesta y conversar con el equipo de la biblioteca.</p>
        <a className="button button-primary" href="#contacto">Planificar una visita <Icon name="arrow-up-right" size={16} /></a>
      </div>
      <ol className="membership-steps">
        {pasos.map((paso, index) => (
          <li className="membership-step" key={paso.title}>
            <span className="membership-number" aria-hidden="true">{index + 1}</span>
            <h3>{paso.title}</h3>
            <p>{paso.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}