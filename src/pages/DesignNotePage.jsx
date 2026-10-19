import notes from '../data/notes.json'
import Arrow from '../components/ui/Arrow.jsx'
import '../styles/home-additions.css'

export default function DesignNotePage({ note }) {
  const relatedNotes = notes.filter((item) => item.slug !== note.slug)
  return <main className="detail-page design-note-page">
    <a href="/#design-notes" className="back-link">&larr; All design notes</a>
    <article>
      <header className="design-note-page-heading"><div className="home-design-note-meta"><span>{note.category}</span><span>{note.readingTime}</span></div><h1>{note.title}</h1><p>{note.excerpt}</p>{note.sample && <span className="home-addition-sample">{note.sampleLabel}</span>}</header>
      <img className="design-note-page-cover" src={note.image} alt={note.imageAlt} width="1000" height="700" fetchPriority="high" />
      <div className="design-note-page-layout"><div className="design-note-page-body"><p className="design-note-page-intro">{note.intro}</p>{note.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<p className="design-note-takeaway">{note.takeaway}</p><a className="home-addition-link" href={note.relatedService.href}>{note.relatedService.label}<Arrow /></a></div><aside className="design-note-page-aside" aria-label="More design notes"><p>Keep the ideas going.</p>{relatedNotes.map((related) => <a href={`/notes/${related.slug}/`} key={related.slug}><img src={related.image} alt="" width="1000" height="700" loading="lazy" /><span>{related.category}</span><h2>{related.title}</h2><Arrow /></a>)}</aside></div>
    </article>
  </main>
}
