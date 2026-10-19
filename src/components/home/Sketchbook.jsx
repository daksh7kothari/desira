import content from '../../data/home-additions.json'
import DepthScene from '../motion/DepthScene.jsx'
import '../../styles/home-additions.css'

export default function Sketchbook() {
  const book = content.sketchbook
  return <section className="home-sketchbook home-addition-section" id="sketchbook" aria-labelledby="sketchbook-title">
    <div className="home-addition-heading"><div><p className="home-addition-eyebrow">{book.eyebrow}</p><h2 className="home-addition-title" id="sketchbook-title">{book.title}</h2></div><div><p className="home-addition-description">{book.description}</p>{book.sample && <span className="home-addition-sample">{book.sampleLabel}</span>}</div></div>
    <div className="home-sketchbook-collage">
      <DepthScene className="home-sketchbook-poster"><figure><img src={book.poster.image} alt={book.poster.alt} width="700" height="950" loading="lazy" /><figcaption>{book.poster.label}</figcaption></figure></DepthScene>
      <DepthScene className="home-sketchbook-letterform"><figure><img src={book.letterform.image} alt={book.letterform.alt} width="800" height="600" loading="lazy" /><figcaption>{book.letterform.label}</figcaption></figure></DepthScene>
      <div className="home-sketchbook-note"><span>{book.note.eyebrow}</span><p>{book.note.text}</p><small>{book.note.signature}</small></div>
      <div className="home-sketchbook-palette"><p>{book.palette.label}</p><div>{book.palette.colours.map((colour) => <div key={colour.value} style={{ backgroundColor: colour.value, color: colour.text }}><span>{colour.name}</span><small>{colour.value}</small></div>)}</div></div>
      <DepthScene className="home-sketchbook-illustration"><figure><img src={book.illustration.image} alt={book.illustration.alt} width="1280" height="1600" loading="lazy" /><figcaption><span>{book.illustration.label}</span><small>{book.illustration.credit}</small></figcaption></figure></DepthScene>
    </div>
  </section>
}
