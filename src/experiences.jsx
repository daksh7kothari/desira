import { useEffect, useRef, useState } from 'react'
import { experienceLinks, projects } from './content.js'
import './experiences.css'

function MoveArrow() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

// Scroll events only schedule one frame, and offscreen scenes do no animation work.
// All content is visible before JavaScript and when motion is reduced.
export function useDepthScroll(ref, onFrame, disabled = false) {
  const callback = useRef(onFrame)
  useEffect(() => { callback.current = onFrame }, [onFrame])
  useEffect(() => {
    const node = ref.current
    if (!node || disabled) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let visible = true
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      callback.current({
        rect,
        viewport,
        reduced: reduced.matches,
        compact: window.innerWidth < 760,
        progress: clamp((viewport * .85 - rect.top) / (rect.height + viewport * .45)),
        offset: clamp((viewport * .5 - rect.top - rect.height * .5) / (viewport * .5 + rect.height * .5), -1, 1),
      })
    }
    const request = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const preferenceChanged = () => { cancelAnimationFrame(frame); update() }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) request()
    }, { rootMargin: '150px' })
    observer.observe(node)
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', preferenceChanged)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      reduced.removeEventListener('change', preferenceChanged)
    }
  }, [ref, disabled])
}

export function DepthScene({ children, className = '', id }) {
  const root = useRef(null)
  const surface = useRef(null)
  useDepthScroll(root, ({ offset, reduced, compact }) => {
    if (!surface.current) return
    const strength = compact ? .45 : 1
    surface.current.style.transform = reduced ? 'none' : `translateY(${-offset * 12 * strength}px) rotateX(${-offset * 5 * strength}deg) rotateY(${offset * 2 * strength}deg)`
  })
  return <div id={id} className={`depth-scene ${className}`} ref={root}><div className="depth-scene-content" ref={surface}>{children}</div></div>
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
    <DepthScene className="invitation-depth"><div className="invitation-scene"><div className={`invitation-object ${open ? 'is-open' : ''}`}>
      <div id="invitation-artwork" className="invitation-artwork" aria-hidden={!open}><img src="/work/coastal-wedding.webp" alt="Ananya and Chirag’s coastal wedding stationery with their personal monogram, palms and seashells" width="1281" height="1600" loading="lazy" /></div>
      <div className="invitation-flap invitation-flap-left" aria-hidden="true"><span /></div><div className="invitation-flap invitation-flap-right" aria-hidden="true"><span /></div>
      <div className="invitation-seal" aria-hidden="true"><img src="/favicon.svg?v=desira-mark" alt="" width="64" height="64" /></div>
    </div><span className="invitation-scene-note" aria-hidden="true">{open ? 'A story, made personal.' : 'Every detail starts somewhere.'}</span></div></DepthScene>
  </section>
}

const storyChapters = [
  { title: 'A mark that belongs to them.', description: 'The AC monogram gives Ananya and Chirag’s celebration its own signature. Personal, recognisable, and at the centre of the design.' },
  { title: 'A little sense of place.', description: 'Palms, seashells, and coastal colours carry the feeling of the shore into the artwork. The setting becomes part of the story.' },
  { title: 'One story, in every detail.', description: 'The complete composition brings the monogram, illustration, and names together into a visual identity for the couple’s celebration.' },
]

export function ScrollStory() {
  const root = useRef(null)
  const paper = useRef(null)
  const artwork = useRef(null)
  const progressBar = useRef(null)
  const [active, setActive] = useState(0)
  useDepthScroll(root, ({ rect, viewport, reduced, compact, offset }) => {
    const progress = reduced ? 0 : clamp((viewport * .3 - rect.top) / Math.max(1, rect.height - viewport * .7))
    const nextActive = Math.min(2, Math.floor(progress * 3))
    setActive((previous) => previous === nextActive ? previous : nextActive)
    if (paper.current) paper.current.style.transform = reduced ? 'none' : compact
      ? `rotateX(${-offset * 3}deg) rotateY(${offset * 2}deg)`
      : `rotateX(${8 - progress * 14}deg) rotateY(${-10 + progress * 20}deg) rotateZ(${-2 + progress * 4}deg)`
    if (artwork.current) artwork.current.style.transform = reduced || compact ? 'none' : `scale(${1 + Math.sin(progress * Math.PI) * .08}) translateY(${-Math.sin(progress * Math.PI) * 2}%)`
    if (progressBar.current) progressBar.current.style.transform = `scaleX(${reduced ? 1 : progress})`
  })
  return <section id="design-story" className="scroll-story" aria-labelledby="story-title">
    <div className="experience-heading"><p className="eyebrow">Look a little closer</p><h2 id="story-title">A story in<br />three details.</h2><p>Scroll through the little things that make this design theirs.</p></div>
    <div className="story-layout" ref={root}>
      <div className="story-visual"><div className="story-depth-stage"><div className="story-paper" ref={paper}><span className="story-paper-layer story-paper-layer-back" aria-hidden="true" /><span className="story-paper-layer story-paper-layer-middle" aria-hidden="true" /><div className="story-art-frame"><img ref={artwork} src="/work/coastal-wedding.webp" alt="The coastal wedding identity, featuring Ananya and Chirag’s monogram and seashell illustrations" width="1281" height="1600" loading="lazy" /></div></div></div><div className="story-progress" aria-hidden="true"><span ref={progressBar} /></div><p className="experience-caption">Ananya & Chirag · Wedding identity</p></div>
      <div className="story-chapters">{storyChapters.map((chapter, index) => <article className={`story-chapter ${index === active ? 'is-active' : ''}`} key={chapter.title}><span className="chapter-number" aria-hidden="true">0{index + 1}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></article>)}</div>
    </div>
  </section>
}

export function ExperienceGallery() {
  return <main className="detail-page experience-gallery"><a href="/" className="back-link">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">Explore Desira</p><h1>Design you<br />can get into.</h1><p>A closer look at the work, the details, and the possibilities. Choose a place to start.</p></div><div className="experience-grid">{experienceLinks.map((item, index) => <DepthScene className="experience-tile-depth" key={item.title}><a className={`experience-tile experience-tile-${index}`} href={item.href}><div className="experience-tile-art"><img src={item.image} alt={item.alt} width="1281" height="1600" loading="lazy" /><span aria-hidden="true"><MoveArrow /></span></div><div className="experience-tile-heading"><h2>{item.title}</h2><span>0{index + 1}</span></div><p>{item.description}</p></a></DepthScene>)}</div></main>
}

const deskPieces = ['coastal-celebration', 'print-stories', 'a-story-in-illustration'].map((slug) => projects.find((project) => project.slug === slug))

export function DesignDesk() {
  const [view, setView] = useState({ tilt: 42, turn: -18 })
  const [manual, setManual] = useState(false)
  const manualView = useRef(false)
  const stage = useRef(null)
  const plane = useRef(null)
  useDepthScroll(stage, ({ progress, reduced }) => {
    if (!plane.current || manualView.current) return
    const entrance = reduced ? 0 : clamp(1 - progress * 2)
    plane.current.style.setProperty('--desk-scroll-tilt', `${entrance * 10}deg`)
    plane.current.style.setProperty('--desk-scroll-turn', `${entrance * -7}deg`)
  }, manual)
  function changeView(nextView) {
    manualView.current = true
    setManual(true)
    plane.current?.style.setProperty('--desk-scroll-tilt', '0deg')
    plane.current?.style.setProperty('--desk-scroll-turn', '0deg')
    setView(nextView)
  }
  return <main className="detail-page design-desk-page"><a className="back-link" href="/experiences/">← All experiences</a><div className="desk-heading"><div><p className="eyebrow">A different perspective</p><h1>Welcome to<br />the design desk.</h1></div><p>Invitation, print, illustration. Explore a few pieces from the studio, then open a project to see the full story.</p></div>
    <div className="desk-stage" ref={stage}><div className="desk-plane" ref={plane} style={{ '--desk-tilt': `${view.tilt}deg`, '--desk-turn': `${view.turn}deg` }}><span className="desk-label" aria-hidden="true">Desira / In the making</span>{deskPieces.map((project, index) => <a className={`desk-piece desk-piece-${index}`} href={`/work/${project.slug}/`} key={project.slug} aria-label={`View ${project.title}`}><img src={project.image} alt={project.alt} width={project.width} height={project.height} /><span>{project.discipline}</span></a>)}<span className="desk-swatch desk-swatch-one" aria-hidden="true" /><span className="desk-swatch desk-swatch-two" aria-hidden="true" /><span className="desk-studio-note" aria-hidden="true">Ideas, taking shape.</span></div></div>
    <div className="desk-controls"><label>Viewing angle<input type="range" min="0" max="52" value={view.tilt} onChange={(event) => changeView({ ...view, tilt: Number(event.target.value) })} /></label><label>Turn the desk<input type="range" min="-28" max="28" value={view.turn} onChange={(event) => changeView({ ...view, turn: Number(event.target.value) })} /></label><button type="button" onClick={() => changeView({ tilt: 0, turn: 0 })}>View from above</button><button type="button" onClick={() => changeView({ tilt: 42, turn: -18 })}>Reset view</button></div><p className="desk-help">Adjust the view, then select a design to explore its project.</p>
    <div className="desk-project-links" aria-label="Projects on the design desk">{deskPieces.map((project, index) => <a href={`/work/${project.slug}/`} key={project.slug}><span className="desk-project-number">0{index + 1}</span><span><small>{project.discipline}</small><strong>{project.title}</strong></span><MoveArrow /></a>)}</div>
  </main>
}
