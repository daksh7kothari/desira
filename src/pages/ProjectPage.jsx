import { projects } from "../data/index.js";
import Arrow from "../components/ui/Arrow.jsx";
import CaseStudy from "../components/work/CaseStudy.jsx";
import ProjectGallery from "../components/work/ProjectGallery.jsx";
import WeddingStory from "../components/work/WeddingStory.jsx";
import ScrollStory from "../components/experiences/ScrollStory.jsx";

export default function ProjectPage({ project, onEnquire }) {
  if (project.weddingStory)
    return <WeddingStory project={project} onEnquire={onEnquire} />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main className="detail-page">
      <a className="back-link" href="/work/">
        ← All selected work
      </a>
      <div className="detail-heading">
        <p className="eyebrow">{project.discipline}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {project.sample && (
          <p className="sample-notice">
            Sample concept — fictional client, created for this website preview.
          </p>
        )}
      </div>
      <div className={`detail-art detail-art-${project.slug}`}>
        <img
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          fetchPriority="high"
        />
      </div>
      {project.caseStudy && <CaseStudy project={project} />}
      <ProjectGallery project={project} />
      {project.slug === "coastal-celebration" && <ScrollStory />}
      <div className="project-story" data-reveal>
        <div>
          <p className="eyebrow">The idea</p>
          <h2>{project.storyTitle}</h2>
        </div>
        <div>
          <p>{project.story}</p>
          {project.source && (
            <a
              className="text-link"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              See the original project <Arrow diagonal />
            </a>
          )}
          <button
            className="button button-navy"
            onClick={() => onEnquire(project.service)}
          >
            Have something in mind? <Arrow diagonal />
          </button>
        </div>
      </div>
      <div className="next-project">
        <span>Keep exploring</span>
        <a href={`/work/${next.slug}/`}>
          {next.title}
          <Arrow diagonal />
        </a>
      </div>
    </main>
  );
}
