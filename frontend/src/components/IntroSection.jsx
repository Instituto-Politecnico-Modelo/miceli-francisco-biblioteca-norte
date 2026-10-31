import Icon from "./Icon.jsx";
import { intro } from "../utils/siteContent.js";

export default function IntroSection({ imagen }) {
  return (
    <section className="intro-section" id="sobre">
      <div className="intro-copy">
        <h2>{intro.titulo}</h2>
        {intro.parrafos.map((parrafo) => <p key={parrafo}>{parrafo}</p>)}
        <a className="intro-link" href="#contacto">{intro.enlace} <Icon name="arrow-right" size={16} /></a>
      </div>
      <img className="intro-image" src={imagen} alt={intro.imagenAlt} width="1200" height="800" loading="lazy" />
    </section>
  );
}
