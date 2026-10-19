import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/index.js'
import useDepthScroll from '../hooks/useDepthScroll.js'
import MoveArrow from '../components/ui/Arrow.jsx'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))
const deskPieces = ['coastal-celebration', 'print-stories', 'a-story-in-illustration'].map((slug) => projects.find((project) => project.slug === slug))
export default function DesignDesk() {
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
