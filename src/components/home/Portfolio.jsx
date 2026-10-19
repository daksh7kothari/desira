import { useState } from 'react'
import { projects, services, experienceLinks, site, siteUrl, instagram } from '../../data/index.js'
import Arrow from '../ui/Arrow.jsx'
import ChromaGrid from '../reactbits/ChromaGrid.jsx'

const featuredProjects = projects.filter((project) => project.slug !== 'celebration-invitations')
export default function Portfolio() {
  const [filter, setFilter] = useState('All work')
  const filters = ['All work', 'Brand & print', 'Invitations', 'Events']
  const visible = filter === 'All work' ? featuredProjects : featuredProjects.filter((project) => project.category === filter)
  return <section id="work" className="work-section section-pad" aria-labelledby="work-title">
    <div className="section-heading" data-reveal><div><p className="eyebrow">Selected work</p><h2 id="work-title">Less ordinary.<br />More you.</h2></div><p>A few ideas that made it<br />out of the sketchbook.</p></div>
    <div className="work-filters" role="group" aria-label="Filter portfolio">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{filter === item && <span aria-hidden="true">↗</span>}</button>)}</div>
    <p className="sr-only" role="status">{visible.length} projects shown. {filter}.</p>
    <ChromaGrid key={filter} className="work-chroma" columns={2} minCardWidth={260} gap={32} radius={340} damping={0.22} fadeOut={0.45} grayscale={1} dim={0} glow={0.15} borderGlow={0.7} aspectRatio="4 / 3" cardRadius={8} theme="light" items={visible.map((project) => ({ image: project.image, alt: project.alt, title: project.title, subtitle: project.discipline, sample: project.sample, url: `/work/${project.slug}/`, accent: project.caseStudy?.palette[0] || '#ffbd3d' }))} />
    <div className="work-footnote"><span>More ideas. More experiments. More Desira.</span><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Follow the creative process <Arrow diagonal /></a></div>
  </section>
}
