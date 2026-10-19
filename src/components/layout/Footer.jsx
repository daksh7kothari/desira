import { projects, services, experienceLinks, site, siteUrl, instagram } from '../../data/index.js'
import Arrow from '../ui/Arrow.jsx'


export default function Footer({ onEnquire }) {
  return <footer id="contact" className="footer"><div className="footer-top"><p className="eyebrow">Something on your mind?</p><h2>Let’s make<br /><span>it a thing.</span></h2><button className="button button-gold" onClick={() => onEnquire()}>Start a conversation <Arrow diagonal /></button><p className="footer-aside">A brand. A celebration. A wild little idea.<br />We’d love to hear it.</p></div><div className="footer-links"><a href="/studio/">The studio</a><a href="/contact/">Start a project</a><a href="/experiences/">Design experiences</a></div><div className="footer-bottom"><a href="/" aria-label="Desira home"><img src="/desira-nav.avif" alt="Desira" width="173" height="124" /></a><p>© {new Date().getFullYear()} Desira.<br />Made with a little extra thought.</p><a href={instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a><a href="/#work">Back to the good stuff ↑</a></div></footer>
}
