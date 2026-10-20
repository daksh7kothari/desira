import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";
import HeroCarousel from "./HeroCarousel.jsx";
import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";

export default function Hero() {
  const scene = useRef(null);
  useScrollScene(scene);
  const hero = copy.hero;
  return (
    <section className="hero" aria-labelledby="hero-title" ref={scene}>
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
        <div className="hero-story-art"><HeroCarousel /></div>
      </div>
      <a className="hero-story-link" href="#process-story">
        <span>A good idea is only the beginning.</span>
        <span>See how it takes shape <Arrow /></span>
      </a>
    </section>
  );
}
