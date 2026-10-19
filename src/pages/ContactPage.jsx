import { useState } from 'react'
import { services, instagram } from '../data/index.js'


export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [prepared, setPrepared] = useState('')
  const [error, setError] = useState('')
  async function prepare(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = `Hello Desira! I’m ${String(data.get('name')).trim()}.\nProject: ${data.get('service')}\nIdeal timeline: ${data.get('timeline')}\n\n${String(data.get('message')).trim()}`
    setPrepared(brief)
    try { await navigator.clipboard.writeText(brief); setCopied(true); setError('') }
    catch { setCopied(false); setError('Select and copy your prepared brief below, then paste it into an Instagram message.') }
  }
  return <main className="detail-page contact-page"><a className="back-link" href="/">← Back to the studio</a><div className="detail-heading"><p className="eyebrow">New ideas welcome</p><h1>Tell us<br />your thing.</h1><p>A new brand? A big day? Something you haven’t quite put into words? Start here.</p></div><div className="contact-layout"><aside><h2>Small studio.<br />Personal conversations.</h2><p>Share a little about your project. Prepare your brief here, then send it to Sejal on Instagram.</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">@desira.ft ↗</a></aside><form className="contact-form" onSubmit={prepare} onChange={() => { setCopied(false); setPrepared(''); setError('') }}><label>Your name<input name="name" autoComplete="name" required maxLength="100" placeholder="What should we call you?" /></label><label>I’m looking for<select name="service">{services.map((service) => <option key={service.slug}>{service.title}</option>)}<option>Something else</option></select></label><label>Ideal timeline<select name="timeline"><option>Let’s discuss it</option><option>Within a month</option><option>In 1–3 months</option><option>I’m exploring for now</option></select></label><label>A little about the idea<textarea name="message" required maxLength="4000" rows="5" placeholder="The project, the audience, the feeling you’re after…" /></label><button className="button button-navy" type="submit">{copied ? 'Brief copied ✓' : 'Prepare & copy my brief'}</button><p className="contact-status" role="status">{copied ? 'Copied! Open Instagram and paste your brief into a message to @desira.ft.' : error || 'Nothing is submitted automatically. Your details stay in this browser.'}</p>{prepared && <div className="prepared-brief"><label>Your prepared brief<textarea readOnly rows="7" value={prepared} onFocus={(event) => event.target.select()} /></label><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Open Instagram to send it ↗</a></div>}</form></div></main>
}
