import { useEffect, useRef, useState } from 'react'
import Carousel from './reactbits/Carousel.jsx'
import FlowingMenu from './reactbits/FlowingMenu.jsx'
import { projects, experienceLinks } from './content.js'
import { DepthScene } from './experiences.jsx'
import './BrandBits.css'

const heroProjects = projects.filter((project) => !project.sample)

export function HeroCarousel() {
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

export function NavigationOverlay({ onClose, isHome }) {
  const dialog = useRef(null)
  useEffect(() => {
    const node = dialog.current
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => { node.close(); document.body.style.overflow = overflow; if (previousFocus?.isConnected) previousFocus.focus() }
  }, [])
  const home = isHome ? '' : '/'
  const items = [
    { text: 'The work', marquee: 'Ideas with character', link: `${home}#work`, image: '/work/mora-coffee.svg' },
    { text: 'What we do', marquee: 'Let’s make it yours', link: `${home}#services`, image: '/work/after-hours.svg' },
    { text: 'The studio', marquee: 'Meet Sejal & Desira', link: '/studio/', image: '/desira-studio-logo.png' },
    { text: 'Explore', marquee: 'Design you can get into', link: '/experiences/', image: '/work/coastal-wedding.webp' },
    { text: 'Let’s talk', marquee: 'Your next good idea', link: '/contact/', image: '/work/print-design.webp' },
  ]
  return <dialog ref={dialog} id="studio-navigation" className="studio-menu-dialog" aria-labelledby="studio-menu-title" onCancel={(event) => { event.preventDefault(); onClose() }}>
    <div className="studio-menu-shell">
      <div className="studio-menu-top"><a href="/" onClick={onClose} aria-label="Desira home"><img src="/desira-nav.avif" width="173" height="124" alt="Desira" /></a><span id="studio-menu-title">A little creative exploring.</span><button type="button" className="studio-menu-close" onClick={onClose}>Close <span aria-hidden="true">×</span></button></div>
      <div className="studio-menu-body"><FlowingMenu items={items} onItemClick={onClose} textColor="#ffffff" bgColor="#061c49" marqueeBgColor="#ffbd3d" marqueeTextColor="#061c49" borderColor="rgba(255,255,255,.2)" align="left" showArrow imageShape="rounded" intro={false} speed={45} followCursor={0.3} ariaLabel="Expanded navigation" /></div>
      <div className="studio-menu-bottom"><div><p>Explore the details</p><div className="studio-menu-services">{experienceLinks.map((item) => <a key={item.href} href={item.href} onClick={onClose}>{item.title}</a>)}</div></div><a className="studio-menu-social" href="https://www.instagram.com/desira.ft/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
    </div>
  </dialog>
}
