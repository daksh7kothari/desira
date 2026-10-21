import { useRef } from "react";
import useDepthScroll from "../../hooks/useDepthScroll.js";
import copy from "../../data/home.json";
import projects from "../../data/projects.json";
import Arrow from "../ui/Arrow.jsx";

const clamp = (value) => Math.max(0, Math.min(1, value));
const project = projects.find((item) => item.slug === "mora-coffee");
const study = project.caseStudy;
const artwork = [
  { image: study.before, alt: "The early Mora Coffee wordmark exploration" },
  { image: study.after, alt: project.alt },
  { image: study.application, alt: study.applicationAlt },
];

export default function ProcessStory() {
  const layout = useRef(null);
  const chapters = useRef([]);
  const frames = useRef([]);
  const progress = useRef(null);

  useDepthScroll(layout, ({ viewport, reduced }) => {
    const node = layout.current;
    if (!node) return;
    const animated = !reduced && window.innerWidth >= 900 && viewport >= 650;
    node.dataset.animated = String(animated);
    if (!animated) {
      node.removeAttribute("data-chapter");
      frames.current.forEach((frame) => {
        frame?.style.removeProperty("opacity");
        frame?.style.removeProperty("transform");
      });
      progress.current?.style.removeProperty("transform");
      return;
    }

    // Read chapter positions after changing layout mode, including on resize.
    const positions = chapters.current.map((chapter) => {
      const rect = chapter.getBoundingClientRect();
      return rect.top + rect.height / 2 - viewport * 0.53;
    });
    const blend = (index) => clamp(-positions[index] / Math.max(
      1, positions[index + 1] - positions[index],
    ));
    const first = blend(0);
    const second = blend(1);
    const weights = [1 - first, first * (1 - second), second];
    const active = weights.indexOf(Math.max(...weights));
    node.dataset.chapter = String(active);

    frames.current.forEach((frame, index) => {
      if (!frame) return;
      const weight = weights[index];
      frame.style.opacity = weight.toFixed(4);
      frame.style.transform = `translateY(${(1 - weight) * 24}px) scale(${0.96 + weight * 0.04}) rotate(${(1 - weight) * (index % 2 ? -2 : 2)}deg)`;
    });
    if (progress.current)
      progress.current.style.transform = `scaleX(${(first + second) / 2})`;
  });

  const story = copy.processStory;
  return (
    <section
      id="process-story"
      className="process-story"
      aria-labelledby="process-story-title"
    >
      <div className="process-story-heading" data-reveal>
        <h2 id="process-story-title">
          {story.title.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <p>{story.description}</p>
      </div>
      <div className="process-story-layout" ref={layout}>
        <div className="process-story-visual" aria-hidden="true">
          <div className="process-story-board">
            <div className="process-story-board-top">
              <span>{story.projectLabel}</span>
              <span>{story.sampleLabel}</span>
            </div>
            <div className="process-story-frames">
              {artwork.map((item, index) => (
                <div
                  className="process-story-frame"
                  key={item.image}
                  ref={(node) => { frames.current[index] = node; }}
                >
                  <img src={item.image} alt="" width="1440" height="1080" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="process-story-board-bottom">
              <span>{story.boardCaption}</span>
              <div className="process-story-palette">
                {study.palette.map((colour) => (
                  <span key={colour} style={{ backgroundColor: colour }} />
                ))}
              </div>
            </div>
            <div className="process-story-progress"><span ref={progress} /></div>
          </div>
          <div className="process-story-stage-labels">
            {story.chapters.map((chapter, index) => (
              <span key={chapter.title}>0{index + 1} / {chapter.label}</span>
            ))}
          </div>
        </div>
        <ol className="process-story-chapters">
          {story.chapters.map((chapter, index) => (
            <li
              key={chapter.title}
              ref={(node) => { chapters.current[index] = node; }}
              data-reveal
            >
              <span className="process-story-number" aria-hidden="true">0{index + 1}</span>
              <div className="process-story-chapter-copy">
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <p className="process-story-detail">{chapter.detail}</p>
              </div>
              <figure className="process-story-inline-art">
                <img src={artwork[index].image} alt={artwork[index].alt} width="1440" height="1080" loading="lazy" />
              </figure>
            </li>
          ))}
        </ol>
      </div>
      <div className="process-story-end" data-reveal>
        <p>{story.endNote}</p>
        <a className="text-link" href={`/work/${project.slug}/`}>
          {story.linkLabel}<Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
