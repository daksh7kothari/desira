import { projects, services, experienceLinks, site, siteUrl, instagram } from '../../data/index.js'
import Arrow from '../ui/Arrow.jsx'


export default function Studio() {
  return <section id="studio" className="studio-section section-pad" aria-labelledby="studio-title">
    <div className="studio-mark"><img src="/desira-studio-logo.png" alt="Desira — Destination for your Desired Designs" width="500" height="500" loading="lazy" /><span className="studio-mark-note">A small studio.<br />A world of possibilities.</span></div>
    <div className="studio-copy" data-reveal><p className="eyebrow">The people behind the pixels</p><h2 id="studio-title">Thoughtfully made.<br />Personally yours.</h2><p>Desira is a graphic design studio owned by Sejal, built around a simple belief: the best designs feel like you.</p><p>From a brand’s first hello to an invitation you’ll keep forever, we bring your ideas to life through colour, character, and a careful eye for the little things.</p><a href="/studio/" className="text-link">More about Sejal & the studio <Arrow diagonal /></a></div>
  </section>
}
