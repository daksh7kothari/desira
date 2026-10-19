import { useEffect, useRef, useState } from 'react'
import { experienceLinks, projects } from './content.js'
import './experiences.css'

function MoveArrow() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function TiltSurface({ children, className = '', id }) {
  function move(event) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - .5) * 8
    const y = ((event.clientY - rect.top) / rect.height - .5) * -8
    event.currentTarget.style.setProperty('--tilt-x', `${y.toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x.toFixed(2)}deg`)
  }
  function reset(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }
  return <div id={id} className={`tilt-surface ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>
}

export function InvitationExperience() {
  const [open, setOpen] = useState(false)
  return <section id="invitation-experience" className="invitation-experience" aria-labelledby="invitation-title">
    <div className="invitation-copy"><p className="eyebrow">A first look at forever</p><h2 id="invitation-title">Some stories<br />deserve an opening.</h2><p>Explore the coastal invitation artwork with an interactive cover. A little glimpse of how a personal design can set the mood for a celebration.</p><button type="button" className="button button-navy" aria-expanded={open} aria-controls="invitation-artwork" onClick={() => setOpen(!open)}>{open ? 'Close the invitation' : 'Open the invitation'}<MoveArrow /></button><p className="experience-caption">Interactive presentation of the original artwork.</p></div>
    <div className="invitation-scene"><div className={`invitation-object ${open ? 'is-open' : ''}`}>
      <div id="invitation-artwork" className="invitation-artwork" aria-hidden={!open}><img src="/work/coastal-wedding.webp" alt="Ananya and Chirag’s coastal wedding stationery with their personal monogram, palms and seashells" width="1281" height="1600" loading="lazy" /></div>
      <div className="invitation-flap invitation-flap-left" aria-hidden="true"><span /></div><div className="invitation-flap invitation-flap-right" aria-hidden="true"><span /></div>
      <div className="invitation-seal" aria-hidden="true"><img src="/favicon.svg?v=desira-mark" alt="" width="64" height="64" /></div>
    </div><span className="invitation-scene-note" aria-hidden="true">{open ? 'A story, made personal.' : 'Every detail starts somewhere.'}</span></div>
  </section>
}

function useStoryProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      frame = 0
      if (reduced.matches || window.innerWidth < 760) { setProgress(1); return }
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const distance = Math.max(1, rect.height - window.innerHeight * .7)
      setProgress(Math.max(0, Math.min(1, (window.innerHeight * .3 - rect.top) / distance)))
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', request)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', request); window.removeEventListener('resize', request); reduced.removeEventListener('change', request) }
  }, [ref])
  return progress
}

const storyChapters = [
  { title: 'A mark that belongs to them.', description: 'The AC monogram gives Ananya and Chirag’s celebration its own signature. Personal, recognisable, and at the centre of the design.' },
  { title: 'A little sense of place.', description: 'Palms, seashells, and coastal colours carry the feeling of the shore into the artwork. The setting becomes part of the story.' },
  { title: 'One story, in every detail.', description: 'The complete composition brings the monogram, illustration, and names together into a visual identity for the couple’s celebration.' },
]

export function ScrollStory() {
  const root = useRef(null)
  const progress = useStoryProgress(root)
  const active = Math.min(2, Math.floor(progress * 3))
  const scale = 1 + Math.sin(progress * Math.PI) * .22
  return <section id="design-story" className="scroll-story" aria-labelledby="story-title">
    <div className="experience-heading"><p className="eyebrow">Look a little closer</p><h2 id="story-title">A story in<br />three details.</h2><p>Scroll through the little things that make this design theirs.</p></div>
    <div className="story-layout" ref={root}>
      <div className="story-visual"><div className="story-art-frame"><img src="/work/coastal-wedding.webp" alt="The coastal wedding identity, featuring Ananya and Chirag’s monogram and seashell illustrations" width="1281" height="1600" loading="lazy" style={{ transform: `scale(${scale})` }} /></div><div className="story-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div><p className="experience-caption">Ananya & Chirag · Wedding identity</p></div>
      <div className="story-chapters">{storyChapters.map((chapter, index) => <article className={`story-chapter ${index === active ? 'is-active' : ''}`} key={chapter.title}><span className="chapter-number" aria-hidden="true">0{index + 1}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></article>)}</div>
    </div>
  </section>
}

export function ExperienceGallery() {
  return <main className="detail-page experience-gallery"><a href="/" className="back-link">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">Explore Desira</p><h1>Design you<br />can get into.</h1><p>A closer look at the work, the details, and the possibilities. Choose a place to start.</p></div><div className="experience-grid">{experienceLinks.map((item, index) => <a className={`experience-tile experience-tile-${index}`} href={item.href} key={item.title}><div className="experience-tile-art"><img src={item.image} alt={item.alt} width="1281" height="1600" loading="lazy" /><span aria-hidden="true"><MoveArrow /></span></div><div className="experience-tile-heading"><h2>{item.title}</h2><span>0{index + 1}</span></div><p>{item.description}</p></a>)}</div></main>
}

const deskPieces = [projects[0], projects[1], projects[2]]

export function DesignDesk() {
  const [view, setView] = useState({ tilt: 42, turn: -18 })
  return <main className="detail-page design-desk-page"><a className="back-link" href="/experiences/">← All experiences</a><div className="desk-heading"><div><p className="eyebrow">A different perspective</p><h1>Welcome to<br />the design desk.</h1></div><p>Invitation, print, illustration. Explore a few pieces from the studio, then open a project to see the full story.</p></div>
    <div className="desk-stage"><div className="desk-plane" style={{ '--desk-tilt': `${view.tilt}deg`, '--desk-turn': `${view.turn}deg` }}><span className="desk-label" aria-hidden="true">Desira / In the making</span>{deskPieces.map((project, index) => <a className={`desk-piece desk-piece-${index}`} href={`/work/${project.slug}/`} key={project.slug} aria-label={`View ${project.title}`}><img src={project.image} alt={project.alt} width={project.width} height={project.height} /><span>{project.discipline}</span></a>)}<span className="desk-swatch desk-swatch-one" aria-hidden="true" /><span className="desk-swatch desk-swatch-two" aria-hidden="true" /><span className="desk-studio-note" aria-hidden="true">Ideas, taking shape.</span></div></div>
    <div className="desk-controls"><label>Viewing angle<input type="range" min="0" max="52" value={view.tilt} onChange={(event) => setView({ ...view, tilt: Number(event.target.value) })} /></label><label>Turn the desk<input type="range" min="-28" max="28" value={view.turn} onChange={(event) => setView({ ...view, turn: Number(event.target.value) })} /></label><button type="button" onClick={() => setView({ tilt: 0, turn: 0 })}>View from above</button><button type="button" onClick={() => setView({ tilt: 42, turn: -18 })}>Reset view</button></div><p className="desk-help">Adjust the view, then select a design to explore its project.</p>
  </main>
}
