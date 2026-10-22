import ExpandableImage from "./ExpandableImage.jsx";

export default function ProjectGallery({ project }) {
  const images = project.assets?.filter((asset) => !asset.endsWith(".mp4")) || [];
  const videos = project.assets?.filter((asset) => asset.endsWith(".mp4")) || [];

  if (!images.length && !videos.length) return null;

  return (
    <section className="project-gallery" aria-labelledby="project-gallery-title">
      <div className="project-gallery-heading" data-reveal>
        <p className="eyebrow">Selected applications</p>
        <h2 id="project-gallery-title">The work, in full.</h2>
      </div>
      <div className="project-gallery-grid">
        {images.map((image, index) => (
          <figure className="project-gallery-item" key={image} data-reveal>
            <ExpandableImage
              src={image}
              alt={`${project.title} — project view ${index + 2} of ${images.length + 1}`}
              loading="lazy"
            />
          </figure>
        ))}
        {videos.map((video, index) => (
          <figure
            className="project-gallery-item project-gallery-video"
            key={video}
            data-reveal
          >
            <video
              src={video}
              aria-label={`${project.title} — video ${index + 1}`}
              controls
              muted
              playsInline
              preload="metadata"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
