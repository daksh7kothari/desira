import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";
import copy from "../../data/home.json";
import projects from "../../data/projects.json";
import Arrow from "../ui/Arrow.jsx";

const project = projects.find((item) => item.slug === "popice-branding");
const artwork = [
  {
    image: "/client-work/popice-branding/03.webp",
    alt: "The repeating ice-lolly pattern created for Popice",
  },
  {
    image: "/client-work/popice-branding/05.webp",
    alt: "The rounded Popice wordmark",
  },
  { image: project.image, alt: project.alt },
];

export default function ProcessStory() {
  const scene = useRef(null);
  const story = copy.processStory;
  useScrollScene(scene);

  return (
    <section
      id="process-story"
      className="process-story process-story--compact"
      aria-labelledby="process-story-title"
      ref={scene}
    >
      <div className="process-story-heading">
        <h2 id="process-story-title">
          {story.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{story.description}</p>
      </div>
      <div className="process-story-layout process-story-layout--compact">
        <div className="process-story-collage">
          {artwork.map((item, index) => (
            <figure key={item.image}>
              <img
                src={item.image}
                alt={item.alt}
                width="1440"
                height="1080"
                loading="lazy"
              />
              <figcaption>{story.chapters[index].label}</figcaption>
            </figure>
          ))}
        </div>
        <ol className="process-story-chapters">
          {story.chapters.map((chapter, index) => (
            <li key={chapter.title}>
              <span className="process-story-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="process-story-chapter-copy">
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <p className="process-story-detail">{chapter.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="process-story-end">
        <p>{story.endNote}</p>
        {/* <a className="text-link" href={`/work/${project.slug}/`}>
          {story.linkLabel}
          <Arrow diagonal />
        </a> */}
      </div>
    </section>
  );
}
