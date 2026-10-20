import { useState } from "react";
import { site, services, instagram } from "../../data/index.js";
import copy from "../../data/contact.json";
import Arrow from "../ui/Arrow.jsx";

export default function ProjectBriefForm({ initialService = "" }) {
  const [prepared, setPrepared] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  async function prepare(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = `Hello ${site.name}! I’m ${String(data.get("name")).trim()}.\nProject: ${data.get("service")}\nIdeal timeline: ${data.get("timeline")}\n\n${String(data.get("message")).trim()}`;
    setPrepared(brief);
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setStatus(copy.copiedStatus);
    } catch {
      setCopied(false);
      setStatus(copy.copyError);
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={prepare}
      onChange={() => {
        setPrepared("");
        setStatus("");
        setCopied(false);
      }}
    >
      <label>
        {copy.fields.name}
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={copy.placeholders.name}
        />
      </label>
      <label>
        {copy.fields.service}
        <select
          name="service"
          defaultValue={initialService || services[0].title}
        >
          {services.map((service) => (
            <option key={service.slug}>{service.title}</option>
          ))}
          <option>{copy.otherService}</option>
        </select>
      </label>
      <label>
        {copy.fields.timeline}
        <select name="timeline">
          {copy.timelineOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        {copy.fields.message}
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={4}
          placeholder={copy.placeholders.message}
        />
      </label>
      <button className="button button-navy" type="submit">
        {copied ? copy.copiedLabel : copy.submitLabel}
        <Arrow />
      </button>
      <p className="contact-status" role="status">
        {status || copy.privacy}
      </p>
      {prepared && (
        <div className="prepared-brief">
          <label>
            {copy.fields.prepared}
            <textarea
              readOnly
              rows={7}
              value={prepared}
              onFocus={(event) => event.target.select()}
            />
          </label>
          <a
            className="text-link"
            href={instagram}
            target="_blank"
            rel="noreferrer"
          >
            {copy.instagramLabel}
            <Arrow diagonal />
          </a>
        </div>
      )}
    </form>
  );
}
