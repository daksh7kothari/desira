import CaseStudy from "../components/work/CaseStudy.jsx";
import ExpandableImage from "../components/work/ExpandableImage.jsx";
import ProjectGallery from "../components/work/ProjectGallery.jsx";
import WeddingStory from "../components/work/WeddingStory.jsx";
import ScrollStory from "../components/experiences/ScrollStory.jsx";

export default function ProjectPage({ project }) {
  if (project.weddingStory) return <WeddingStory project={project} />;

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
        <ExpandableImage
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
    </main>
  );
}
