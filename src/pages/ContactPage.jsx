import { instagram, site } from "../data/index.js";
import copy from "../data/contact.json";
import ProjectBriefForm from "../components/forms/ProjectBriefForm.jsx";
import Questions from "../components/home/Questions.jsx";
import Arrow from "../components/ui/Arrow.jsx";

const phone = site.contact.phone.replace(/[^\d+]/g, "");
const whatsapp = site.contact.whatsapp.replace(/\D/g, "");

const channels = [
  {
    label: "Call",
    detail: site.contact.phone,
    href: `tel:${phone}`,
  },
  {
    label: "WhatsApp",
    detail: "Quick questions and project chats",
    href: `https://wa.me/${whatsapp}`,
    external: true,
  },
  {
    label: "Instagram",
    detail: site.contact.instagram.handle,
    href: instagram,
    external: true,
  },
  {
    label: "Message",
    detail: "Send a detailed project brief",
    href: "#message",
  },
];

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
        <nav className="contact-channels" aria-label="Ways to contact Desira">
          {channels.map((channel, index) => (
            <a
              className="contact-channel"
              href={channel.href}
              key={channel.label}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noreferrer" : undefined}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{channel.label}</strong>
              <small>{channel.detail}</small>
              <Arrow diagonal={channel.external} />
            </a>
          ))}
        </nav>
        <section
          className="contact-message"
          id="message"
          aria-labelledby="message-title"
        >
          <h2 id="message-title">{copy.messageTitle}</h2>
          <p>{copy.messageDescription}</p>
          <ProjectBriefForm />
        </section>
      </div>
      <Questions />
    </main>
  );
}
