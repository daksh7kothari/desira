import { useEffect, useRef, useState } from 'react'
import { services } from './content.js'
import './enhancements.css'

const instagram = 'https://www.instagram.com/desira.ft/'

export function PageMotion({ pathname }) {
  const progress = useRef(null)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nodes = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.remove('motion-pending'); observer.unobserve(target) }
      })
    }, { threshold: 0.06 })
    if (!reduced.matches) nodes.forEach((node) => {
      if (node.getBoundingClientRect().top > window.innerHeight) { node.classList.add('motion-pending'); observer.observe(node) }
    })
    const revealAll = () => { if (reduced.matches) nodes.forEach((node) => node.classList.remove('motion-pending')) }
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', revealAll)
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request)
      reduced.removeEventListener('change', revealAll)
      nodes.forEach((node) => node.classList.remove('motion-pending'))
    }
  }, [pathname])
  return <div className="reading-progress" aria-hidden="true"><span ref={progress} /></div>
}

export function Process() {
  return <section className="process-home section-pad" aria-labelledby="process-home-title">
    <div className="section-heading" data-reveal><div><p className="eyebrow">Working together</p><h2 id="process-home-title">A good idea.<br />A thoughtful way there.</h2></div><p>You bring the story.<br />We help find its visual voice.</p></div>
    <ol className="process-steps">
      {[
        ['The conversation', 'Tell us what you’re making, who it’s for and what you want it to feel like. We shape a clear brief together.'],
        ['The creative direction', 'We explore the idea through type, colour and composition, then build a direction around your story.'],
        ['The finishing touches', 'We refine the details with your feedback and prepare the agreed artwork for its next chapter.'],
      ].map(([title, body], i) => <li key={title} data-reveal><span className="process-count" aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}
    </ol>
  </section>
}

const sampleQuotes = [
  { quote: 'It finally feels like the brand we had in our heads.', name: 'Sample brand client', project: 'Brand identity — fictional feedback' },
  { quote: 'The little details made the whole celebration feel like us.', name: 'Sample wedding client', project: 'Wedding stationery — fictional feedback' },
  { quote: 'One idea, carried beautifully across every format.', name: 'Sample campaign client', project: 'Poster campaign — fictional feedback' },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const item = sampleQuotes[index]
  return <section className="testimonials section-pad" aria-labelledby="testimonial-title" data-reveal>
    <div className="testimonial-heading"><h2 id="testimonial-title">Good design.<br />Good company.</h2><p className="sample-notice">Sample testimonials for this preview.<br />Real client feedback will replace these.</p></div>
    <div className="quote-panel"><div aria-live="polite" aria-atomic="true"><blockquote key={index}>{item.quote}</blockquote><p className="quote-person">{item.name}<span>{item.project}</span></p></div><div className="quote-controls" role="group" aria-label="Choose sample testimonial">{sampleQuotes.map((quote, i) => <button type="button" key={quote.name} aria-label={`Sample testimonial ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)}><span /></button>)}</div></div>
  </section>
}

export function CaseStudy({ project }) {
  const study = project.caseStudy
  const [position, setPosition] = useState(50)
  if (!study) return null
  return <section className="case-study" aria-label="Inside the concept project">
    <div className="case-facts" data-reveal><div><span>Concept client</span><p>{study.client}</p></div><div><span>The scope</span><p>{study.scope}</p></div><div><span>Project type</span><p>Self-initiated sample concept</p></div></div>
    <div className="case-brief" data-reveal><h2>Behind the design.</h2><div><h3>The brief</h3><p>{study.brief}</p><h3>The challenge</h3><p>{study.challenge}</p><h3>The direction</h3><p>{study.direction}</p></div></div>
    <div className="comparison-section" data-reveal><div className="section-heading"><h2>From first thought<br />to full character.</h2><p>Move the slider to compare the sample starting point with the finished concept.</p></div>
      <div className="design-comparison" style={{ '--comparison': `${position}%` }}>
        <img src={study.after} alt={`Finished concept for ${study.client}`} width="1440" height="1080" loading="lazy" />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src={study.before} alt={`Early sample direction for ${study.client}`} width="1440" height="1080" loading="lazy" /></div>
        <span className="comparison-label comparison-label-before">First thought</span><span className="comparison-label comparison-label-after">The concept</span><div className="comparison-line" aria-hidden="true"><span>↔</span></div>
      </div>
      <label className="comparison-control">Compare the design stages<input type="range" min="0" max="100" value={position} aria-valuetext={`${position}% early direction visible`} onChange={(event) => setPosition(Number(event.target.value))} /></label>
    </div>
    <div className="case-decisions" data-reveal><div><h2>The details<br />do the talking.</h2><div className="case-palette" aria-label="Concept colour palette">{study.palette.map((colour) => <span key={colour} style={{ background: colour }} title={colour}><span className="sr-only">{colour}</span></span>)}</div></div><ul>{study.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <figure className="case-application" data-reveal><img src={study.application} alt={study.applicationAlt} width="1440" height="1080" loading="lazy" /><figcaption>One idea, across its touchpoints. Sample design applications.</figcaption></figure>
    <div className="case-deliverables" data-reveal><h2>All the pieces.</h2><ul>{study.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
  </section>
}

export function AboutPage({ onEnquire }) {
  return <main className="detail-page about-page"><a className="back-link" href="/">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">Meet Desira</p><h1>A little studio.<br />A lot of heart.</h1><p>Independent graphic design by Sejal. For brands, celebrations and ideas that deserve their own visual voice.</p></div>
    <section className="founder-layout" aria-labelledby="founder-title"><div className="founder-art"><div className="founder-sheet" aria-hidden="true"><span>hello,<br />I’m Sejal.</span><svg viewBox="0 0 160 160"><path d="M80 12v136M12 80h136M32 32l96 96M32 128l96-96" stroke="currentColor" strokeWidth="18" /></svg><small>Ideas, made personal.</small></div><p>Portrait placeholder — Sejal’s photograph will go here.</p></div><div className="founder-copy" data-reveal><p className="sample-notice">Draft studio introduction for review</p><h2 id="founder-title">The person behind<br />the pixels.</h2><p>I’m Sejal, the founder of Desira. I create custom logos, posters, invitations and event graphics, helping ideas find a visual language of their own.</p><p>Desira brings a personal approach to graphic design: a conversation about your story, a considered creative direction, and care for the details that make the final piece feel like you.</p><p className="founder-signature">Let’s make something with character.</p><button className="button button-navy" onClick={() => onEnquire()}>Tell me your idea</button></div></section><Process /><section className="about-services" data-reveal><h2>From a first hello<br />to a forever keepsake.</h2><div>{services.map((service) => <a href={`/services/${service.slug}/`} key={service.slug}>{service.title}<span aria-hidden="true">↗</span></a>)}</div></section>
  </main>
}

export function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [prepared, setPrepared] = useState('')
  const [error, setError] = useState('')
  async function prepare(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = `Hello Desira! I’m ${String(data.get('name')).trim()}.\nProject: ${data.get('service')}\nIdeal timeline: ${data.get('timeline')}\n\n${String(data.get('message')).trim()}`
    setPrepared(brief)
    try { await navigator.clipboard.writeText(brief); setCopied(true); setError('') }
    catch { setCopied(false); setError('Select and copy your prepared brief below, then paste it into an Instagram message.') }
  }
  return <main className="detail-page contact-page"><a className="back-link" href="/">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">New ideas welcome</p><h1>Tell us<br />your thing.</h1><p>A new brand? A big day? Something you haven’t quite put into words? Start here.</p></div><div className="contact-layout"><aside><h2>Small studio.<br />Personal conversations.</h2><p>Share a little about your project. Prepare your brief here, then send it to Sejal on Instagram.</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">@desira.ft ↗</a><div className="contact-pending"><span>Business contact details</span><p>Email and WhatsApp will be added once confirmed.</p></div></aside><form className="contact-form" onSubmit={prepare} onChange={() => { setCopied(false); setPrepared(''); setError('') }}><label>Your name<input name="name" autoComplete="name" required maxLength="100" placeholder="What should we call you?" /></label><label>I’m looking for<select name="service">{services.map((service) => <option key={service.slug}>{service.title}</option>)}<option>Something else</option></select></label><label>Ideal timeline<select name="timeline"><option>Let’s discuss it</option><option>Within a month</option><option>In 1–3 months</option><option>I’m exploring for now</option></select></label><label>A little about the idea<textarea name="message" required maxLength="4000" rows="5" placeholder="The project, the audience, the feeling you’re after…" /></label><button className="button button-navy" type="submit">{copied ? 'Brief copied ✓' : 'Prepare & copy my brief'}</button><p className="contact-status" role="status">{copied ? 'Copied! Open Instagram and paste your brief into a message to @desira.ft.' : error || 'Nothing is submitted automatically. Your details stay in this browser.'}</p>{prepared && <div className="prepared-brief"><label>Your prepared brief<textarea readOnly rows="7" value={prepared} onFocus={(event) => event.target.select()} /></label><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Open Instagram to send it ↗</a></div>}</form></div></main>
}
