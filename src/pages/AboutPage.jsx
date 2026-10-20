import { services } from "../data/index.js";
import copy from "../data/studio.json";
import Process from "../components/home/Process.jsx";

export default function AboutPage({ onEnquire }) {
  return (
    <main className="detail-page about-page">
      <a className="back-link" href="/">
        ← Back to Desira
      </a>
      <div className="detail-heading">
        <h1 className="preserve-lines">{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <section className="founder-layout" aria-labelledby="founder-title">
        <div className="founder-art">
          <div className="founder-sheet" aria-hidden="true">
            <span className="preserve-lines">{copy.founderGreeting}</span>
            <svg viewBox="0 0 160 160">
              <path
                d="M80 12v136M12 80h136M32 32l96 96M32 128l96-96"
                stroke="currentColor"
                strokeWidth="18"
              />
            </svg>
            <small>{copy.founderNote}</small>
          </div>
        </div>
        <div className="founder-copy">
          <h2 className="preserve-lines" id="founder-title">
            {copy.founderTitle}
          </h2>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="founder-signature">{copy.signature}</p>
          <button className="button button-navy" onClick={() => onEnquire()}>
            {copy.buttonLabel}
          </button>
        </div>
      </section>
      <Process />
      <section className="about-services">
        <h2 className="preserve-lines">{copy.servicesTitle}</h2>
        <div>
          {services.map((service) => (
            <a href={`/services/${service.slug}/`} key={service.slug}>
              {service.title}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
