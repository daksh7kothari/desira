import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";

export default function Studio() {
  const studio = copy.studio;
  return (
    <section
      id="studio"
      className="studio-section section-pad"
      aria-labelledby="studio-title"
    >
      <div className="studio-artwork" aria-hidden="true">
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
      <div className="studio-copy">
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
