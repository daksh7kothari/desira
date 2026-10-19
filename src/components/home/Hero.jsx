import Arrow from '../ui/Arrow.jsx'
import HeroCarousel from './HeroCarousel.jsx'


export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="hero-intro">Independent graphic design studio</p>
        <h1 id="hero-title"><span className="hero-line"><span>Good ideas.</span></span><span className="hero-line"><span>Bold design.</span></span></h1>
        <div className="hero-copy-bottom"><p className="hero-description">Brand identities, posters, and invitations.<br />Designed with purpose. Made to stand out.</p><a className="button button-navy" href="#work">Explore our work <Arrow diagonal /></a></div>
      </div>
      <HeroCarousel />
    </div>
    <div className="hero-bottom"><span>Independent graphic design by Sejal.</span><a href="#work">Keep it scrolling <span aria-hidden="true">↓</span></a></div>
  </section>
}
