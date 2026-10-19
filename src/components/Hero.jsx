import './Hero.css'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__portal hero__portal--outer" aria-hidden="true" />
      <div className="hero__portal hero__portal--inner" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span>Est. 2024</span>
          <span className="hero__eyebrow-rule" aria-hidden="true" />
          <span>India</span>
        </div>
        <h1 id="hero-title" className="hero__title">
          desira
        </h1>
        <div className="hero__footer">
          <p className="hero__tagline">A destination for your desired designs.</p>
          <span className="hero__index" aria-hidden="true">01 / 01</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
