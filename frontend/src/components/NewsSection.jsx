import { news } from "../utils/siteContent.js";

export default function NewsSection() {
  return (
    <section className="news-section" id="novedades" aria-labelledby="news-title">
      <div className="section-heading">
        <h2 id="news-title">Novedades y agenda</h2>
        <p>Historias, actividades y propuestas para compartir en el barrio.</p>
      </div>
      <div className="news-grid">
        {news.map((item, index) => (
          <article className={`news-card${index === 0 ? " news-card-featured" : ""}`} key={item.title}>
            <div className="news-image-wrap">
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
            </div>
            <div className="news-card-body">
              <p className="news-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p className="news-description">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}