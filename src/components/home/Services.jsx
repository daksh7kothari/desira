import { projects, services, experienceLinks, site, siteUrl, instagram } from '../../data/index.js'
import Arrow from '../ui/Arrow.jsx'


export default function Services() {
  return <section id="services" className="services-section section-pad" aria-labelledby="services-title">
    <div className="section-heading"><div><p className="eyebrow">What we do</p><h2 id="services-title">Got a thing?<br />Let’s design it.</h2></div><p>A new brand, a big celebration, or an idea<br className="desktop-break" /> that needs a little creative company.</p></div>
    <div className="service-list">{services.map((service) => <a className="service-row" data-reveal href={`/services/${service.slug}/`} key={service.slug}><span className="service-symbol" aria-hidden="true">{service.symbol}</span><h3>{service.title}</h3><p>{service.short}</p><span className="service-arrow"><Arrow diagonal /></span></a>)}</div>
  </section>
}
