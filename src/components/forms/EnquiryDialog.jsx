import { useEffect, useRef, useState } from 'react'
import { projects, services, experienceLinks, site, siteUrl, instagram } from '../../data/index.js'
import Arrow from '../ui/Arrow.jsx'


export default function EnquiryDialog({ service, onClose }) {
  const dialog = useRef(null)
  const returnFocus = useRef(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [prepared, setPrepared] = useState('')
  const [brief, setBrief] = useState({ name: '', service: service || 'Logo & brand identity', message: '' })
  useEffect(() => {
    const node = dialog.current
    if (!returnFocus.current) {
      const active = document.activeElement
      const menuToggle = document.querySelector('.menu-toggle')
      returnFocus.current = active !== document.body && active?.getClientRects().length
        ? active
        : menuToggle?.getClientRects().length ? menuToggle : active
    }
    const previousOverflow = document.body.style.overflow
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      node.close()
      document.body.style.overflow = previousOverflow
      if (returnFocus.current?.isConnected) returnFocus.current.focus()
    }
  }, [])
  async function copyBrief(event) {
    event.preventDefault()
    const text = `Hello Desira! I’m ${brief.name}.\nI’m looking for: ${brief.service}.\n\n${brief.message}`
    setPrepared(text)
    try { await navigator.clipboard.writeText(text); setCopied(true); setError('') } catch { setError('Select and copy your prepared brief below, then paste it into an Instagram message.') }
  }
  return <dialog ref={dialog} className="enquiry-dialog" aria-labelledby="enquiry-title" aria-describedby="enquiry-description" onCancel={onClose} onClick={(event) => { if (event.target === dialog.current) onClose() }}><div className="dialog-content"><button className="dialog-close" onClick={onClose} aria-label="Close project enquiry">×</button><p className="eyebrow">Good things start with hello</p><h2 id="enquiry-title">What are you<br />dreaming up?</h2><p id="enquiry-description">Prepare your brief, then send it to us on Instagram.</p><form onSubmit={copyBrief} onChange={() => { setCopied(false); setPrepared(''); setError('') }}><label>Your name<input autoComplete="name" name="name" maxLength="100" required value={brief.name} onChange={(e) => setBrief({ ...brief, name: e.target.value })} placeholder="What should we call you?" /></label><label>I’m looking for<select value={brief.service} onChange={(e) => setBrief({ ...brief, service: e.target.value })}>{services.map((item) => <option key={item.title}>{item.title}</option>)}<option>Something else</option></select></label><label>A little about your idea<textarea name="message" required maxLength="4000" rows="4" value={brief.message} onChange={(e) => setBrief({ ...brief, message: e.target.value })} placeholder="The idea, the occasion, your ideal timeline…" /></label><button className="button button-navy" type="submit">{copied ? 'Brief copied ✓' : 'Copy my project brief'}<Arrow /></button><p role="status" className="form-status">{copied ? 'Ready! Open Instagram and paste your brief into a message to @desira.ft.' : error || 'Your brief stays in your browser. Nothing is sent automatically.'}</p>{prepared && <div className="prepared-brief"><label>Your prepared brief<textarea readOnly rows="6" value={prepared} onFocus={(event) => event.target.select()} /></label></div>}<a href={instagram} className="text-link" target="_blank" rel="noreferrer">Open @desira.ft on Instagram <Arrow diagonal /></a></form></div></dialog>
}
