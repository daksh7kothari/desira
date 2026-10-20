import { instagram, site } from "../data/index.js";
import copy from "../data/contact.json";
import ProjectBriefForm from "../components/forms/ProjectBriefForm.jsx";
import Questions from "../components/home/Questions.jsx";

export default function ContactPage() {
  return (
    <main className="detail-page contact-page">
      <a className="back-link" href="/">
        ← Back to Desira
      </a>
      <div className="detail-heading">
        <h1 className="preserve-lines">{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <div className="contact-layout">
        <aside>
          <h2 className="preserve-lines">{copy.asideTitle}</h2>
          <p>{copy.asideBody}</p>
          <a
            className="text-link"
            href={instagram}
            target="_blank"
            rel="noreferrer"
          >
            {site.contact.instagram.handle} ↗
          </a>
          {site.contact.email && (
            <p>
              <a className="text-link" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
          )}
          {site.contact.whatsapp && (
            <p>
              <a
                className="text-link"
                href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ↗
              </a>
            </p>
          )}
        </aside>
        <ProjectBriefForm />
      </div>
      <Questions />
    </main>
  );
}
