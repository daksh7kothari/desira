import { useState } from 'react'
import DepthScene from '../motion/DepthScene.jsx'
import MoveArrow from '../ui/Arrow.jsx'


export default function InvitationExperience() {
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
