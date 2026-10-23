import FadeContent from "../motion/FadeContent.jsx";
import Arrow from "../ui/Arrow.jsx";

export default function Hero() {
  return (
    <section className="hero-logo-stage" aria-label="Desira">
      <FadeContent
        className="hero-logo-frame"
        trigger="mount"
        delay={1}
        duration={3}
        ease="power2.out"
      >
        <img
          className="hero-logo"
          src="/Desira-scg.svg"
          alt="Desira"
          width="500"
          height="225"
        />
        <p className="hero-logo-tagline">Desira is an independent design studio.</p>
        <div className="hero-actions" aria-label="Explore Desira">
          {/* <a className="hero-action hero-action--gold" href="#poster-carousel">
            View Work
            <Arrow />
          </a> */}
          <a className="hero-action" href="/contact/">
            Start a Project
            <Arrow diagonal />
          </a>
        </div>
        <a
          className="hero-scroll-cue"
          href="#poster-carousel"
          aria-label="Scroll to selected work"
        >
          <span>Scroll</span>
          <Arrow />
        </a>
      </FadeContent>
    </section>
  );
}
