import { useRef, useState } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";
import { projects } from "../../data/index.js";
import copy from "../../data/home.json";
import ChromaGrid from "../reactbits/ChromaGrid.jsx";
import Arrow from "../ui/Arrow.jsx";

export default function Portfolio({ featured = false }) {
  const scene = useRef(null);
  useScrollScene(scene);
  const [filter, setFilter] = useState(() => {
    if (featured || typeof window === "undefined") return copy.portfolio.filters[0];
    const requested = new URLSearchParams(window.location.search).get("filter");
    return copy.portfolio.filters.includes(requested)
      ? requested
      : copy.portfolio.filters[0];
  });
  const selection = featured
    ? copy.portfolio.featuredSlugs
        .map((slug) => projects.find((project) => project.slug === slug))
        .filter(Boolean)
    : projects;
  const visible =
    featured || filter === copy.portfolio.filters[0]
      ? selection
      : selection.filter((project) => project.category === filter);
  return (
    <section
      id="work"
      className="work-section section-pad"
      aria-labelledby="work-title"
      ref={scene}
    >
      {featured && (
        <div className="section-heading" data-reveal>
          <h2 id="work-title">{copy.portfolio.title}</h2>
          <a className="text-link" href="/work/">
            {copy.portfolio.allWorkLabel}
            <Arrow diagonal />
          </a>
        </div>
      )}
      {!featured && (
        <>
          <h2 id="work-title" className="sr-only">
            All selected projects
          </h2>
          <div
            className="work-filters"
            role="group"
            aria-label="Filter portfolio"
          >
            {copy.portfolio.filters.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="sr-only" role="status">
        {visible.length} projects shown.
      </p>
      <ChromaGrid
        key={featured ? "featured" : filter}
        className="work-chroma"
        columns={2}
        minCardWidth={260}
        gap={32}
        radius={340}
        grayscale={0.2}
        dim={0}
        glow={0.08}
        cardRadius={4}
        theme="light"
        items={visible.map((project) => ({
          image: project.image,
          alt: project.alt,
          title: project.title,
          subtitle: project.discipline,
          sample: project.sample,
          scrollReveal: featured,
          url: `/work/${project.slug}/`,
          accent: project.caseStudy?.palette[0] || "#ffbd3d",
        }))}
      />
    </section>
  );
}
