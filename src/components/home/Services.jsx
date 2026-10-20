import copy from "../../data/home.json";
import ServiceLinks from "../ui/ServiceLinks.jsx";
import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";
import projects from "../../data/projects.json";
export default function Services() {
  const scene = useRef(null);
  useScrollScene(scene);
  const preview = projects.find((project) => project.slug === "mora-coffee");
  return (
    <section
      id="services"
      className="services-section section-pad"
      aria-labelledby="services-title"
      ref={scene}
    >
      <div className="section-heading" data-reveal>
        <h2 id="services-title">{copy.services.title}</h2>
        <p>{copy.services.description}</p>
      </div>
      <div className="services-story-preview" aria-hidden="true">
        <img src={preview.caseStudy.before} alt="" width="1440" height="1080" loading="lazy" />
        <img src={preview.image} alt="" width="1440" height="1080" loading="lazy" />
        <img src={preview.caseStudy.application} alt="" width="1440" height="1080" loading="lazy" />
      </div>
      <div className="services-menu" data-reveal>
        <ServiceLinks />
      </div>
    </section>
  );
}
