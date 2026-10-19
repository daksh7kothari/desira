import content from '../../data/home-additions.json'
import notes from '../../data/notes.json'
import Arrow from '../ui/Arrow.jsx'
import DepthScene from '../motion/DepthScene.jsx'
import '../../styles/home-additions.css'

export default function DesignNotes() {
  const journal = content.designNotes
  return <section className="home-design-notes home-addition-section" id="design-notes" aria-labelledby="design-notes-title">
    <div className="home-addition-heading"><div><p className="home-addition-eyebrow">{journal.eyebrow}</p><h2 className="home-addition-title" id="design-notes-title">{journal.title}</h2></div><div><p className="home-addition-description">{journal.description}</p><span className="home-addition-sample">{journal.sampleLabel}</span></div></div>
    <div className="home-design-notes-grid">{notes.map((note) => <article className="home-design-note" key={note.slug}><a href={`/notes/${note.slug}/`}><DepthScene><div className="home-design-note-image"><img src={note.image} alt={note.imageAlt} width="1000" height="700" loading="lazy" /></div></DepthScene><div className="home-design-note-meta"><span>{note.category}</span><span>{note.readingTime}</span></div><h3>{note.title}</h3><p>{note.excerpt}</p><span className="home-addition-link">{journal.readLabel}<Arrow /></span></a></article>)}</div>
  </section>
}
