import { useState } from 'react'


export default function CaseStudy({ project }) {
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
