import { useState } from "react";
import Carousel from "../reactbits/Carousel.jsx";
import DepthScene from "../motion/DepthScene.jsx";
import { projects } from "../../data/index.js";
import copy from "../../data/home.json";

const heroProjects = copy.hero.projectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter(Boolean);
export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  return (
    <DepthScene className="hero-carousel-wrap" id="interactive-showcase">
      <Carousel
        className="desira-carousel"
        baseWidth="100%"
        aspectRatio={1.05}
        radius={8}
        frame={false}
        effect="tilt"
        indicator="bars"
        arrows
        loop
        autoplay={false}
        onChange={setActive}
        items={heroProjects.map((project, index) => (
          <a
            className="hero-art-card"
            href={`/work/${project.slug}/`}
            key={project.slug}
            draggable={false}
          >
            <div className="hero-art-image">
              {project.sample && (
                <span className="sample-badge">Sample concept</span>
              )}
              <img
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
            <span className="hero-art-caption">
              <span>{project.discipline}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      />
      <div className="hero-carousel-meta">
        <span aria-live="polite" aria-atomic="true">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(heroProjects.length).padStart(2, "0")}
        </span>
        <span>{copy.hero.carouselHelp}</span>
      </div>
    </DepthScene>
  );
}
