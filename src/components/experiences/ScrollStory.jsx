import content from "../../data/experience-content.json";
import { projects } from "../../data/index.js";
import { useRef, useState } from "react";
import useDepthScroll from "../../hooks/useDepthScroll.js";

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const storyChapters = content.storyChapters;

export default function ScrollStory() {
  const project = projects.find(item => item.slug === content.storyProjectSlug) || projects[0];
  const root = useRef(null);
  const paper = useRef(null);
  const artwork = useRef(null);
  const progressBar = useRef(null);
  const [active, setActive] = useState(0);
  useDepthScroll(root, ({ rect, viewport, reduced, compact, offset }) => {
    const progress = reduced
      ? 0
      : clamp(
          (viewport * 0.3 - rect.top) /
            Math.max(1, rect.height - viewport * 0.7),
        );
    const nextActive = Math.min(2, Math.floor(progress * 3));
    setActive((previous) => (previous === nextActive ? previous : nextActive));
    if (paper.current)
      paper.current.style.transform = reduced
        ? "none"
        : compact
          ? `rotateX(${-offset * 3}deg) rotateY(${offset * 2}deg)`
          : `rotateX(${8 - progress * 14}deg) rotateY(${-10 + progress * 20}deg) rotateZ(${-2 + progress * 4}deg)`;
    if (artwork.current)
      artwork.current.style.transform =
        reduced || compact
          ? "none"
          : `scale(${1 + Math.sin(progress * Math.PI) * 0.08}) translateY(${-Math.sin(progress * Math.PI) * 2}%)`;
    if (progressBar.current)
      progressBar.current.style.transform = `scaleX(${reduced ? 1 : progress})`;
  });
  return (
    <section
      id="design-story"
      className="scroll-story"
      aria-labelledby="story-title"
    >
      <div className="experience-heading">
        <p className="eyebrow">Look a little closer</p>
        <h2 id="story-title">
          A story in
          <br />
          three details.
        </h2>
        <p>Scroll through the little things that make this design theirs.</p>
      </div>
      <div className="story-layout" ref={root}>
        <div className="story-visual">
          <div className="story-depth-stage">
            <div className="story-paper" ref={paper}>
              <span
                className="story-paper-layer story-paper-layer-back"
                aria-hidden="true"
              />
              <span
                className="story-paper-layer story-paper-layer-middle"
                aria-hidden="true"
              />
              <div className="story-art-frame">
                <img
                  ref={artwork}
                  src={project.image} alt={project.alt} width={project.width} height={project.height}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="story-progress" aria-hidden="true">
            <span ref={progressBar} />
          </div>
          <p className="experience-caption">
            Ananya & Chirag · Wedding identity
          </p>
        </div>
        <div className="story-chapters">
          {storyChapters.map((chapter, index) => (
            <article
              className={`story-chapter ${index === active ? "is-active" : ""}`}
              key={chapter.title}
            >
              <span className="chapter-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
