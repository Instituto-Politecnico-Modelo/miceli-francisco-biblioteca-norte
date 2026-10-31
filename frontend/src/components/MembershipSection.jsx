import Icon from "./Icon.jsx";
import { membresia } from "../utils/siteContent.js";

export default function MembershipSection() {
  return (
    <section className="membership-section" id="asociarse" aria-labelledby="membership-title">
      <div className="membership-heading">
        <h2 id="membership-title">{membresia.titulo}</h2>
        <p>{membresia.descripcion}</p>
        <a className="button button-primary" href="#contacto">{membresia.accion} <Icon name="arrow-up-right" size={16} /></a>
      </div>
      <ol className="membership-steps">
        {membresia.pasos.map((paso, index) => (
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