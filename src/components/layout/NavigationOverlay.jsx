import { useEffect, useRef } from 'react'
import FlowingMenu from '../reactbits/FlowingMenu.jsx'
import { experienceLinks, site, instagram } from '../../data/index.js'


export default function NavigationOverlay({ onClose, isHome }) {
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
