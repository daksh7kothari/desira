import Arrow from "../ui/Arrow.jsx";
import ExpandableImage from "./ExpandableImage.jsx";
import ProjectGallery from "./ProjectGallery.jsx";
import { projects } from "../../data/index.js";
import { useEffect, useRef, useState } from "react";

export default function WeddingStory({ project }) {
  const story = project.weddingStory;
  const pageImages = [project.image, ...(project.assets || [])].filter(
    (asset) => !asset.endsWith(".mp4"),
  );
  const pageCount = pageImages.length;
  const pages = Array.from({ length: pageCount }, (_, index) => ({
    image: pageImages[index],
    title: story.pageTitles[index] || `Invitation page ${index + 1}`,
    note: story.notes[index % story.notes.length],
  }));
  const related = projects.filter(
    (item) => item.weddingStory && item.slug !== project.slug,
  );
  const detailPages = pages.slice(1);
  const pagesSection = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [scrollReady, setScrollReady] = useState(false);
  const nextSection = pageCount > 1 ? "#invitation-pages" : "#story-notes";

  useEffect(() => {
    const section = pagesSection.current;
    if (!section || detailPages.length === 0) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const next = Math.max(
        0,
        Math.min(
          detailPages.length - 1,
          Math.round(-section.getBoundingClientRect().top / window.innerHeight),
        ),
      );
      setActivePage((current) => (current === next ? current : next));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    setScrollReady(true);
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [detailPages.length]);

  return (
    <main className="wedding-story">
      <div className="wedding-story-shell">
        <a className="back-link" href="/work/?filter=Weddings">
          ← All wedding projects
        </a>
        <header className="wedding-story-hero">
          <div className="wedding-story-intro">
            <p className="wedding-story-discipline">{project.discipline}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <a className="text-link" href={nextSection}>
              {pageCount > 1 ? "Open the full invitation" : "Explore the design"}
              <Arrow diagonal />
            </a>
          </div>
          <figure className="wedding-story-cover">
            <div className="wedding-story-art">
              <ExpandableImage
                src={pages[0].image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Page 1 of {pageCount}</span>
              <strong>{pages[0].title}</strong>
              <p>{pages[0].note}</p>
            </figcaption>
          </figure>
        </header>
      </div>

      {pageCount > 1 && (
        <section
          id="invitation-pages"
          className="wedding-pages"
          aria-label="Invitation pages"
          data-enhanced={scrollReady}
          ref={pagesSection}
          style={{ "--wedding-page-count": detailPages.length }}
        >
          <div className="wedding-pages-stage">
            {detailPages.map((page, index) => (
              <article
                className={`wedding-page${index === activePage ? " is-active" : ""}`}
                key={page.image}
                aria-hidden={scrollReady && index !== activePage}
              >
                <div className="wedding-page-copy">
                  <span>
                    Page {index + 2} of {pageCount}
                  </span>
                  <h2>{page.title}</h2>
                  <p>{page.note}</p>
                </div>
                <div className="wedding-page-art">
                  <ExpandableImage
                    src={page.image}
                    alt={`${page.title} from ${project.title}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </article>
            ))}
          </div>
          <div className="wedding-pages-track" aria-hidden="true">
            {detailPages.map((page) => (
              <span key={page.image} />
            ))}
          </div>
        </section>
      )}

      <section id="story-notes" className="wedding-story-close">
        <div>
          <h2>{project.storyTitle}</h2>
          <p>{project.story}</p>
        </div>
        <a className="button button-navy" href="/contact/">
          Plan your invitation <Arrow diagonal />
        </a>
      </section>

      {project.videos?.length > 0 && <ProjectGallery project={project} />}

      <section className="wedding-related" aria-labelledby="more-weddings">
        <div className="wedding-related-heading">
          <h2 id="more-weddings">More wedding stories.</h2>
          <p>Every invitation opens into its complete page-by-page story.</p>
        </div>
        <div className="wedding-related-grid">
          {related.map((item) => (
            <a
              className="wedding-related-card"
              href={`/work/${item.slug}/`}
              key={item.slug}
            >
              <div>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                />
              </div>
              <span>
                <strong>{item.title}</strong>
                <Arrow diagonal />
              </span>
              <small>{item.discipline}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
