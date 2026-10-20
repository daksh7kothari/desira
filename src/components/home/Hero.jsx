import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";
import HeroCarousel from "./HeroCarousel.jsx";

export default function Hero() {
  const hero = copy.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-intro">{hero.eyebrow}</p>
          <h1 id="hero-title">
            {hero.title.map((line) => (
              <span className="hero-line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero-copy-bottom">
            <p className="hero-description">{hero.description}</p>
            <a className="text-link" href="#work">
              {hero.linkLabel}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <HeroCarousel />
      </div>
    </section>
  );
}
