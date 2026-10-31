import Icon from "./Icon.jsx";
import { contacto } from "../utils/siteContent.js";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contacto">
      <div>
        <h2>{contacto.titulo}</h2>
        <p className="contact-lead">{contacto.descripcion}</p>
      </div>
      <div className="contact-details">
        <a href={contacto.mapaUrl} target="_blank" rel="noreferrer">{contacto.direccion} <Icon name="arrow-up-right" size={15} /></a>
        <a href={contacto.telefonoHref}>{contacto.telefono}</a>
        <span>{contacto.horario}</span>
      </div>
    </section>
  );
}
