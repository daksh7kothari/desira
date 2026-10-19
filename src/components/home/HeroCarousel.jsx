import { useState } from 'react'
import Carousel from '../reactbits/Carousel.jsx'
import DepthScene from '../motion/DepthScene.jsx'
import { projects } from '../../data/index.js'

const heroProjects = projects.filter((project) => !project.sample)
export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  return <DepthScene className="hero-carousel-wrap" id="interactive-showcase">
    <Carousel
      className="desira-carousel"
      baseWidth="100%"
      aspectRatio={1.05}
      radius={8}
      frame={false}
      effect="tilt"
      indicator="bars"
      arrows
      loop
      autoplay={false}
      onChange={setActive}
      items={heroProjects.map((project, index) => <a className="hero-art-card" href={`/work/${project.slug}/`} key={project.slug} draggable={false}>
        <div className="hero-art-image"><img src={project.image} alt={project.alt} width={project.width} height={project.height} fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} draggable={false} /></div>
        <span className="hero-art-caption"><span>{project.discipline}</span><span aria-hidden="true">↗</span></span>
      </a>)}
    />
    <div className="hero-carousel-meta"><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(heroProjects.length).padStart(2, '0')}</span><span>Drag to explore. Click to look closer.</span></div>
  </DepthScene>
}
