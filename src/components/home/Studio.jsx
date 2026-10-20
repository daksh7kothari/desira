import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";
import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";

export default function Studio() {
  const scene = useRef(null);
  useScrollScene(scene);
  const studio = copy.studio;
  return (
    <section
      id="studio"
      className="studio-section section-pad"
      aria-labelledby="studio-title"
      ref={scene}
    >
      <div className="studio-artwork" aria-hidden="true" data-reveal>
        <img
          src={studio.image}
          alt=""
          width="1280"
          height="1600"
          loading="lazy"
        />
        <img
          src={studio.secondImage}
          alt=""
          width="1440"
          height="1080"
          loading="lazy"
        />
      </div>
      <div className="studio-copy" data-reveal>
        <p className="eyebrow">{studio.eyebrow}</p>
        <h2 id="studio-title">{studio.title}</h2>
        <p>{studio.description}</p>
        <a href="/studio/" className="text-link">
          {studio.linkLabel}
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
