import { useRef, useState } from "react";
import { services } from "../../data/index.js";
import copy from "../../data/contact.json";
import Arrow from "../ui/Arrow.jsx";

export default function ProjectBriefForm({ initialService = "" }) {
  const [status, setStatus] = useState({
    state: "idle",
    message: copy.privacy,
  });
  const submitting = useRef(false);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    if (!endpoint) {
      setStatus({ state: "error", message: copy.setupError });
      return;
    }

    const data = new FormData(form);
    if (data.get("website")) return;

    submitting.current = true;
    setStatus({ state: "sending", message: copy.sendingLabel });

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(data),
      });
      form.reset();
      setStatus({ state: "success", message: copy.sentStatus });
    } catch {
      setStatus({ state: "error", message: copy.errorStatus });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      action={endpoint}
      method="post"
      onSubmit={submit}
      onChange={(event) => {
        event.target.setCustomValidity?.("");
        if (status.state !== "sending")
          setStatus({ state: "idle", message: copy.privacy });
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
        {copy.fields.email}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={copy.placeholders.email}
        />
      </label>
      <label>
        {copy.fields.phone}
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={30}
          placeholder={copy.placeholders.phone}
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
      <label className="contact-form-wide">
        {copy.fields.timeline}
        <select name="timeline">
          {copy.timelineOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="contact-form-wide contact-form-message">
        {copy.fields.message}
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={5}
          placeholder={copy.placeholders.message}
        />
      </label>
      <input
        className="contact-honeypot"
        type="text"
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        className="button button-navy"
        type="submit"
        disabled={status.state === "sending"}
        aria-busy={status.state === "sending"}
      >
        {status.state === "sending" ? copy.sendingLabel : copy.submitLabel}
        <Arrow />
      </button>
      <p className="contact-status" data-state={status.state} role="status">
        {status.message}
      </p>
    </form>
  );
}
