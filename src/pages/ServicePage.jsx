import { projects } from "../data/index.js";
import Arrow from "../components/ui/Arrow.jsx";
import InvitationExperience from "../components/experiences/InvitationExperience.jsx";

export default function ServicePage({ service, onEnquire }) {
  const related = projects
    .filter(
      (project) =>
        project.service === service.title ||
        project.category === service.category,
    )
    .slice(0, 2);
  return (
    <main className="detail-page service-detail">
      <a className="back-link" href="/#services">
        ← What we do
      </a>
      <div className="detail-heading">
        <p className="eyebrow">Custom graphic design by Desira</p>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <button
          className="button button-navy"
          onClick={() => onEnquire(service.title)}
        >
          Tell us about your project <Arrow diagonal />
        </button>
      </div>
      {service.slug === "wedding-invitations" && <InvitationExperience />}
      <div className="service-editorial" data-reveal>
        <h2>{service.heading}</h2>
        <div>
          <p>{service.body}</p>
          <ul>
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="project-grid">
        {related.map((project) => (
          <a
            className="project"
            key={project.slug}
            href={`/work/${project.slug}/`}
          >
            <div className="project-image">
              {project.sample && (
                <span className="sample-badge">Sample concept</span>
              )}
              <img
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                loading="lazy"
              />
            </div>
            <div className="project-caption">
              <h3>{project.title}</h3>
              <Arrow diagonal />
            </div>
          </a>
        ))}
      </div>
      <div className="service-process">
        <p className="eyebrow">A thoughtful process</p>
        <h2>
          From “what if”
          <br />
          to “that’s the one.”
        </h2>
        <ol>
          <li>
            <h3>Tell us your story.</h3>
            <p>
              We discuss your goals, audience, references, scope, and timeline.
            </p>
          </li>
          <li>
            <h3>Find the direction.</h3>
            <p>
              We develop a visual approach around your brief and agree on the
              way forward.
            </p>
          </li>
          <li>
            <h3>Make it yours.</h3>
            <p>
              We refine the details together and prepare the agreed final
              deliverables.
            </p>
          </li>
        </ol>
      </div>
    </main>
  );
}
