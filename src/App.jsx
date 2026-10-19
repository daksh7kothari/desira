import { useEffect, useRef, useState } from 'react'
import { projects, services, siteUrl } from './content.js'
import './App.css'

const instagram = 'https://www.instagram.com/desira.ft/'

function Arrow({ diagonal = false }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Header({ onEnquire, isHome }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const home = isHome ? '' : '/'
  return <header className="header-wrap"><nav className="navigation" aria-label="Main navigation">
    <a href="/" className="brand" aria-label="Desira home"><img src="/desira-nav.avif" alt="Desira" width="173" height="124" /></a>
    <div className="nav-descriptor">Graphic design.<br />With a little personality.</div>
    <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <div id="nav-links" className={`nav-links ${open ? 'is-open' : ''}`}>
      {[['Work', 'work'], ['What we do', 'services'], ['The studio', 'studio']].map(([label, id]) => <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <button className="button button-gold nav-cta" onClick={() => { setOpen(false); onEnquire() }}>Let’s talk <Arrow diagonal /></button>
    </div>
  </nav></header>
}

function Hero() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="hero-intro">Independent graphic design studio</p>
        <h1 id="hero-title"><span className="hero-line"><span>Good ideas.</span></span><span className="hero-line"><span>Bold design.</span></span></h1>
        <div className="hero-copy-bottom"><p className="hero-description">Brand identities, posters, and invitations.<br />Designed with purpose. Made to stand out.</p><a className="button button-navy" href="#work">Explore our work <Arrow diagonal /></a></div>
      </div>
      <div className="showcase">
        <div className="showcase-canvas">
          <a key={project.slug} href={`/work/${project.slug}/`} className="showcase-main" aria-label={`Explore ${project.title}`}><img src={project.image} alt={project.alt} width={project.width} height={project.height} fetchPriority="high" /><span className="showcase-view">Take a closer look <Arrow diagonal /></span></a>
        </div>
        <div className="showcase-bottom"><div className="showcase-caption" aria-live="polite" aria-atomic="true"><span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><p>{project.discipline}</p></div><div className="showcase-controls"><button type="button" aria-label="Previous project" onClick={() => setActive((active + projects.length - 1) % projects.length)}><Arrow /></button><button type="button" aria-label="Next project" onClick={() => setActive((active + 1) % projects.length)}><Arrow /></button></div></div>
      </div>
    </div>
    <div className="hero-bottom"><span>Independent graphic design by Sejal.</span><a href="#work">Keep it scrolling <span aria-hidden="true">↓</span></a></div>
  </section>
}

function Portfolio() {
  const [filter, setFilter] = useState('All work')
  const filters = ['All work', 'Brand & print', 'Invitations', 'Events']
  const visible = filter === 'All work' ? projects : projects.filter((project) => project.category === filter)
  return <section id="work" className="work-section section-pad" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Less ordinary.<br />More you.</h2></div><p>A few ideas that made it<br />out of the sketchbook.</p></div>
    <div className="work-filters" role="group" aria-label="Filter portfolio">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{filter === item && <span aria-hidden="true">↗</span>}</button>)}</div>
    <div className="project-grid" aria-live="polite" aria-atomic="false">
      {visible.map((project) => <a href={`/work/${project.slug}/`} className={`project project-${project.slug}`} key={project.slug}>
        <div className="project-image"><img src={project.image} alt={project.alt} width={project.width} height={project.height} loading="lazy" /><span className="project-open" aria-hidden="true"><Arrow diagonal /></span></div>
        <div className="project-caption"><div><h3>{project.title}</h3><p>{project.discipline}</p></div><Arrow diagonal /></div>
      </a>)}
    </div>
    <div className="work-footnote"><span>More ideas. More experiments. More Desira.</span><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Follow the creative process <Arrow diagonal /></a></div>
  </section>
}

function Services() {
  return <section id="services" className="services-section section-pad" aria-labelledby="services-title">
    <div className="section-heading"><div><p className="eyebrow">What we do</p><h2 id="services-title">Got a thing?<br />Let’s design it.</h2></div><p>A new brand, a big celebration, or an idea<br className="desktop-break" /> that needs a little creative company.</p></div>
    <div className="service-list">{services.map((service) => <a className="service-row" href={`/services/${service.slug}/`} key={service.slug}><span className="service-symbol" aria-hidden="true">{service.symbol}</span><h3>{service.title}</h3><p>{service.short}</p><span className="service-arrow"><Arrow diagonal /></span></a>)}</div>
  </section>
}

function Studio() {
  return <section id="studio" className="studio-section section-pad" aria-labelledby="studio-title">
    <div className="studio-mark"><img src="/desira-studio-logo.png" alt="Desira — Destination for your Desired Designs" width="500" height="500" loading="lazy" /><span className="studio-mark-note">A small studio.<br />A world of possibilities.</span></div>
    <div className="studio-copy"><p className="eyebrow">The people behind the pixels</p><h2 id="studio-title">Thoughtfully made.<br />Personally yours.</h2><p>Desira is a graphic design studio owned by Sejal, built around a simple belief: the best designs feel like you.</p><p>From a brand’s first hello to an invitation you’ll keep forever, we bring your ideas to life through colour, character, and a careful eye for the little things.</p><a href={instagram} className="text-link" target="_blank" rel="noreferrer">Meet our creative world <Arrow diagonal /></a></div>
  </section>
}

const questions = [
  ['What can I work with Desira on?', 'We create custom logos and brand identities, posters and print designs, wedding invitations and stationery, illustrations, and event graphics. Tell us what you have in mind and we’ll help define the right scope.'],
  ['How do we get started?', 'Start with a conversation. Share what you’re creating, the kind of design you need, any references you love, and your ideal deadline. We’ll discuss the brief and next steps with you.'],
  ['How much will my project cost?', 'Every project has its own scope. Your quote depends on the deliverables, complexity, and timeline. We’ll discuss those details before starting so you know what to expect.'],
  ['Can you create something completely custom?', 'Yes. Custom design is at the heart of Desira. Bring your story, your references, or even an idea you haven’t quite figured out yet. We’ll shape it together.'],
]

function Questions() {
  return <section className="faq-section section-pad" aria-labelledby="faq-title"><div><p className="eyebrow">A little clarity</p><h2 id="faq-title">Before we<br />make magic.</h2></div><div className="faq-list">{questions.map(([title, answer]) => <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function Footer({ onEnquire }) {
  return <footer id="contact" className="footer"><div className="footer-top"><p className="eyebrow">Something on your mind?</p><h2>Let’s make<br /><span>it a thing.</span></h2><button className="button button-gold" onClick={() => onEnquire()}>Start a conversation <Arrow diagonal /></button><p className="footer-aside">A brand. A celebration. A wild little idea.<br />We’d love to hear it.</p></div><div className="footer-bottom"><a href="/" aria-label="Desira home"><img src="/desira-nav.avif" alt="Desira" width="173" height="124" /></a><p>© {new Date().getFullYear()} Desira.<br />Made with a little extra thought.</p><a href={instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a><a href="/#work">Back to the good stuff ↑</a></div></footer>
}

function EnquiryDialog({ service, onClose }) {
  const dialog = useRef(null)
  const returnFocus = useRef(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [brief, setBrief] = useState({ name: '', service: service || 'Logo & brand identity', message: '' })
  useEffect(() => {
    const node = dialog.current
    if (!returnFocus.current) {
      const active = document.activeElement
      const menuToggle = document.querySelector('.menu-toggle')
      returnFocus.current = active !== document.body && active?.getClientRects().length
        ? active
        : menuToggle?.getClientRects().length ? menuToggle : active
    }
    const previousOverflow = document.body.style.overflow
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      node.close()
      document.body.style.overflow = previousOverflow
      if (returnFocus.current?.isConnected) returnFocus.current.focus()
    }
  }, [])
  async function copyBrief(event) {
    event.preventDefault()
    const text = `Hello Desira! I’m ${brief.name}.\nI’m looking for: ${brief.service}.\n\n${brief.message}`
    try { await navigator.clipboard.writeText(text); setCopied(true); setError('') } catch { setError('Copy isn’t available in this browser. You can select your message and paste it into Instagram.') }
  }
  return <dialog ref={dialog} className="enquiry-dialog" aria-labelledby="enquiry-title" aria-describedby="enquiry-description" onCancel={onClose} onClick={(event) => { if (event.target === dialog.current) onClose() }}><div className="dialog-content"><button className="dialog-close" onClick={onClose} aria-label="Close project enquiry">×</button><p className="eyebrow">Good things start with hello</p><h2 id="enquiry-title">What are you<br />dreaming up?</h2><p id="enquiry-description">Prepare your brief, then send it to us on Instagram.</p><form onSubmit={copyBrief} onChange={() => { setCopied(false); setError('') }}><label>Your name<input autoComplete="name" name="name" required value={brief.name} onChange={(e) => setBrief({ ...brief, name: e.target.value })} placeholder="What should we call you?" /></label><label>I’m looking for<select value={brief.service} onChange={(e) => setBrief({ ...brief, service: e.target.value })}>{services.map((item) => <option key={item.title}>{item.title}</option>)}<option>Something else</option></select></label><label>A little about your idea<textarea name="message" required rows="4" value={brief.message} onChange={(e) => setBrief({ ...brief, message: e.target.value })} placeholder="The idea, the occasion, your ideal timeline…" /></label><button className="button button-navy" type="submit">{copied ? 'Brief copied ✓' : 'Copy my project brief'}<Arrow /></button><p role="status" className="form-status">{copied ? 'Ready! Open Instagram and paste your brief into a message to @desira.ft.' : error || 'Your brief stays in your browser. Nothing is sent automatically.'}</p><a href={instagram} className="text-link" target="_blank" rel="noreferrer">Open @desira.ft on Instagram <Arrow diagonal /></a></form></div></dialog>
}

function ProjectPage({ project, onEnquire }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <><main className="detail-page"><a className="back-link" href="/#work">← All selected work</a><div className="detail-heading"><p className="eyebrow">{project.discipline}</p><h1>{project.title}</h1><p>{project.description}</p></div><div className={`detail-art detail-art-${project.slug}`}><img src={project.image} alt={project.alt} width={project.width} height={project.height} fetchPriority="high" /></div><div className="project-story"><div><p className="eyebrow">The idea</p><h2>{project.storyTitle}</h2></div><div><p>{project.story}</p>{project.source && <a className="text-link" href={project.source} target="_blank" rel="noreferrer">See the original project <Arrow diagonal /></a>}<button className="button button-navy" onClick={() => onEnquire(project.service)}>Have something in mind? <Arrow diagonal /></button></div></div><div className="next-project"><span>Keep exploring</span><a href={`/work/${next.slug}/`}>{next.title}<Arrow diagonal /></a></div></main><Footer onEnquire={onEnquire} /></>
}

function ServicePage({ service, onEnquire }) {
  const related = projects.filter((project) => project.service === service.title || project.category === service.category).slice(0, 2)
  return <><main className="detail-page service-detail"><a className="back-link" href="/#services">← What we do</a><div className="detail-heading"><p className="eyebrow">Custom graphic design by Desira</p><h1>{service.title}</h1><p>{service.description}</p><button className="button button-navy" onClick={() => onEnquire(service.title)}>Tell us about your project <Arrow diagonal /></button></div><div className="service-editorial"><h2>{service.heading}</h2><div><p>{service.body}</p><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className="project-grid">{related.map((project) => <a className="project" key={project.slug} href={`/work/${project.slug}/`}><div className="project-image"><img src={project.image} alt={project.alt} width={project.width} height={project.height} loading="lazy" /></div><div className="project-caption"><h3>{project.title}</h3><Arrow diagonal /></div></a>)}</div><div className="service-process"><p className="eyebrow">A thoughtful process</p><h2>From “what if”<br />to “that’s the one.”</h2><ol><li><h3>Tell us your story.</h3><p>We discuss your goals, audience, references, scope, and timeline.</p></li><li><h3>Find the direction.</h3><p>We develop a visual approach around your brief and agree on the way forward.</p></li><li><h3>Make it yours.</h3><p>We refine the details together and prepare the agreed final deliverables.</p></li></ol></div></main><Footer onEnquire={onEnquire} /></>
}

export function getPage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const project = projects.find((item) => path === `/work/${item.slug}`)
  const service = services.find((item) => path === `/services/${item.slug}`)
  if (project) return { title: `${project.title} — Desira Design Studio`, description: project.description, image: project.image, project }
  if (service) return { title: `${service.title} — Desira Design Studio`, description: service.description, image: '/work/coastal-wedding.webp', service }
  if (path !== '/') return { title: 'Page not found — Desira', description: 'Explore original graphic design by Desira.', notFound: true }
  return { title: 'Desira — Custom Logos, Posters & Wedding Invitations', description: 'Thoughtfully made. Personally yours. Explore custom logos, brand identities, posters, wedding invitations and event graphics from Sejal’s graphic design studio, Desira.', image: '/work/coastal-wedding.webp' }
}

export default function App({ pathname = '/' }) {
  const [enquiry, setEnquiry] = useState(null)
  const page = getPage(pathname)
  const onEnquire = (service = '') => setEnquiry({ service })
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header onEnquire={onEnquire} isHome={pathname === '/'} /><div id="main-content" tabIndex="-1">{page.project ? <ProjectPage project={page.project} onEnquire={onEnquire} /> : page.service ? <ServicePage service={page.service} onEnquire={onEnquire} /> : page.notFound ? <main className="not-found"><p className="eyebrow">A little off the canvas</p><h1>This page isn’t here.</h1><a className="button button-navy" href="/">Back to Desira <Arrow /></a></main> : <><main><Hero /><Portfolio /><Services /><Studio /><Questions /></main><Footer onEnquire={onEnquire} /></>}</div>{enquiry && <EnquiryDialog service={enquiry.service} onClose={() => setEnquiry(null)} />}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Desira', url: siteUrl, logo: `${siteUrl}/desira-logo.png`, description: 'Graphic design studio owned by Sejal. Custom logos, posters, wedding invitations and event graphics.', sameAs: [instagram, 'https://desiraft.wixsite.com/desira'] }) }} /></>
}
