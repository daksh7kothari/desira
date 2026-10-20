import { experienceLinks } from "../data/index.js";
import DepthScene from "../components/motion/DepthScene.jsx";
import MoveArrow from "../components/ui/Arrow.jsx";

export default function ExperienceGallery() {
  return (
    <main className="detail-page experience-gallery">
      <a href="/" className="back-link">
        ← Back to the studio
      </a>
      <div className="detail-heading">
        <p className="eyebrow">Explore Desira</p>
        <h1>
          Design you
          <br />
          can get into.
        </h1>
        <p>
          A closer look at the work, the details, and the possibilities. Choose
          a place to start.
        </p>
      </div>
      <div className="experience-grid">
        {experienceLinks.map((item, index) => (
          <DepthScene className="experience-tile-depth" key={item.title}>
            <a
              className={`experience-tile experience-tile-${index}`}
              href={item.href}
            >
              <div className="experience-tile-art">
                <img
                  src={item.image}
                  alt={item.alt}
                  width="1281"
                  height="1600"
                  loading="lazy"
                />
                <span aria-hidden="true">
                  <MoveArrow />
                </span>
              </div>
              <div className="experience-tile-heading">
                <h2>{item.title}</h2>
                <span>0{index + 1}</span>
              </div>
              <p>{item.description}</p>
            </a>
          </DepthScene>
        ))}
      </div>
    </main>
  );
}
