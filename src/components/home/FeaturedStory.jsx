import content from "../../data/home-additions.json";
// import Arrow from "../ui/Arrow.jsx";
import DepthScene from "../motion/DepthScene.jsx";
import "../../styles/home-additions.css";

export default function FeaturedStory() {
  const story = content.featuredStory;
  return (
    <section
      className="home-featured-story"
      id="featured-story"
      aria-labelledby="featured-story-title"
    >
      <div className="home-featured-copy">
        <p className="home-addition-eyebrow">{story.eyebrow}</p>
        <h2 id="featured-story-title" className="home-addition-title">
          {story.title}
        </h2>
        <p className="home-addition-description">{story.description}</p>
        <ul className="home-featured-details">
          {story.details.map((detail, index) => (
            <li key={detail}>
              <span aria-hidden="true">0{index + 1}</span>
              {detail}
            </li>
          ))}
        </ul>
        {/* <a className="home-addition-link" href={story.href}>
          {story.linkLabel}
          <Arrow />
        </a> */}
      </div>
      <DepthScene className="home-featured-depth">
        <figure className="home-featured-board">
          <div className="home-featured-back-paper" aria-hidden="true">
            <span>{story.paperNote}</span>
          </div>
          <div className="home-featured-monogram" aria-hidden="true">
            <span>{story.initials}</span>
            <i />
          </div>
          <img
            className="home-featured-artwork"
            src={story.image}
            alt={story.imageAlt}
            width={story.imageWidth}
            height={story.imageHeight}
            loading="lazy"
          />
          <figcaption>
            <strong>{story.projectLabel}</strong>
            <span>{story.discipline}</span>
          </figcaption>
          {story.sample && (
            <span className="home-featured-sample">{story.sampleLabel}</span>
          )}
        </figure>
      </DepthScene>
    </section>
  );
}
