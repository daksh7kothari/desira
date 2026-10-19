import { services } from '../data/index.js'
import Process from '../components/home/Process.jsx'


export default function AboutPage({ onEnquire }) {
  return <main className="detail-page about-page"><a className="back-link" href="/">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">Meet Desira</p><h1>A little studio.<br />A lot of heart.</h1><p>Independent graphic design by Sejal. For brands, celebrations and ideas that deserve their own visual voice.</p></div>
    <section className="founder-layout" aria-labelledby="founder-title"><div className="founder-art"><div className="founder-sheet" aria-hidden="true"><span>hello,<br />I’m Sejal.</span><svg viewBox="0 0 160 160"><path d="M80 12v136M12 80h136M32 32l96 96M32 128l96-96" stroke="currentColor" strokeWidth="18" /></svg><small>Ideas, made personal.</small></div></div><div className="founder-copy" data-reveal><h2 id="founder-title">The person behind<br />the pixels.</h2><p>I’m Sejal, the founder of Desira. I create custom logos, posters, invitations and event graphics, helping ideas find a visual language of their own.</p><p>Desira brings a personal approach to graphic design: a conversation about your story, a considered creative direction, and care for the details that make the final piece feel like you.</p><p className="founder-signature">Let’s make something with character.</p><button className="button button-navy" onClick={() => onEnquire()}>Tell me your idea</button></div></section><Process /><section className="about-services" data-reveal><h2>From a first hello<br />to a forever keepsake.</h2><div>{services.map((service) => <a href={`/services/${service.slug}/`} key={service.slug}>{service.title}<span aria-hidden="true">↗</span></a>)}</div></section>
  </main>
}
