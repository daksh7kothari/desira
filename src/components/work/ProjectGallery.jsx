const imagePath = (gallery, number) =>
  `/client-work/${gallery.folder}/${String(number).padStart(2, "0")}.webp`;

export default function ProjectGallery({ project }) {
  const images = project.gallery
    ? Array.from(
        { length: project.gallery.imageCount - 1 },
        (_, index) => index + 2,
      )
    : [];
  const videos = project.videos || [];

  if (!images.length && !videos.length) return null;

  return (
    <section className="project-gallery" aria-labelledby="project-gallery-title">
      <div className="project-gallery-heading" data-reveal>
        <p className="eyebrow">Selected applications</p>
        <h2 id="project-gallery-title">The work, in full.</h2>
      </div>
      <div className="project-gallery-grid">
        {images.map((number) => (
          <figure className="project-gallery-item" key={number} data-reveal>
            <img
              src={imagePath(project.gallery, number)}
              alt={`${project.title} — project view ${number} of ${project.gallery.imageCount}`}
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
              aria-label={`${project.title} — campaign video ${index + 1}`}
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
