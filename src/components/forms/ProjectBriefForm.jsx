import { useEffect, useRef, useState } from "react";
import { site, services, instagram } from "../../data/index.js";
import copy from "../../data/contact.json";
import Arrow from "../ui/Arrow.jsx";

export default function ProjectBriefForm({ initialService = "" }) {
  const [prepared, setPrepared] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const revision = useRef(0);

  useEffect(
    () => () => {
      revision.current += 1;
    },
    [],
  );

  async function prepare(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ["name", "message"]) {
      const field = form.elements.namedItem(name);
      if (!field.value.trim()) {
        field.setCustomValidity(
          name === "name"
            ? "Please enter your name."
            : "Please tell us a little about your project.",
        );
        field.reportValidity();
        return;
      }
    }
    const data = new FormData(form);
    const brief = `Hello ${site.name}! I’m ${String(data.get("name")).trim()}.\nProject: ${data.get("service")}\nIdeal timeline: ${data.get("timeline")}\n\n${String(data.get("message")).trim()}`;
    const currentRevision = ++revision.current;
    setPrepared(brief);
    setCopied(false);
    setCopying(true);
    setStatus("");
    try {
      await navigator.clipboard.writeText(brief);
      if (currentRevision !== revision.current) return;
      setCopied(true);
      setStatus(copy.copiedStatus);
    } catch {
      if (currentRevision !== revision.current) return;
      setCopied(false);
      setStatus(copy.copyError);
    } finally {
      if (currentRevision === revision.current) setCopying(false);
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={prepare}
      onChange={(event) => {
        event.target.setCustomValidity?.("");
        revision.current += 1;
        setPrepared("");
        setStatus("");
        setCopied(false);
        setCopying(false);
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
      <button
        className="button button-navy"
        type="submit"
        disabled={copying}
        aria-busy={copying}
      >
        {copying ? "Copying brief…" : copied ? copy.copiedLabel : copy.submitLabel}
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
