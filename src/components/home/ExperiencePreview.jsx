import content from '../../data/home-additions.json'
import Arrow from '../ui/Arrow.jsx'
import DepthScene from '../motion/DepthScene.jsx'
import '../../styles/home-additions.css'

function ExperienceArtwork({ item }) {
  return <div className={`home-experience-art home-experience-art-${item.id}`}>
    {item.id === 'invitation' && <div className="home-preview-envelope"><img src={item.image} alt={item.alt} width="1281" height="1600" loading="lazy" /><div className="home-preview-envelope-cover" aria-hidden="true"><span>{item.visualLabel}</span><i /></div></div>}
    {item.id === 'story' && <div className="home-preview-story"><span className="home-preview-story-paper" aria-hidden="true" /><img src={item.image} alt={item.alt} width="1281" height="1600" loading="lazy" /><span className="home-preview-story-label" aria-hidden="true">{item.visualLabel}</span></div>}
    {item.id === 'desk' && <div className="home-preview-desk"><img className="home-preview-desk-main" src={item.image} alt={item.alt} width="1440" height="1080" loading="lazy" />{item.secondaryImages.map((image, index) => <img className={`home-preview-desk-piece-${index}`} src={image} alt="" aria-hidden="true" width="1280" height="1600" loading="lazy" key={image} />)}<span aria-hidden="true">{item.visualLabel}</span></div>}
    <span className="home-experience-number" aria-hidden="true">{item.number}</span>
  </div>
}

export default function ExperiencePreview() {
  const preview = content.experiencePreview
  return <section className="home-experience-preview home-addition-section" id="explore-preview" aria-labelledby="explore-preview-title">
    <div className="home-addition-heading"><div><p className="home-addition-eyebrow">{preview.eyebrow}</p><h2 className="home-addition-title" id="explore-preview-title">{preview.title}</h2></div><div><p className="home-addition-description">{preview.description}</p><a className="home-addition-link" href={preview.href}>{preview.linkLabel}<Arrow /></a></div></div>
    <div className="home-experience-preview-grid">{preview.items.map((item) => <DepthScene key={item.id}><a className="home-experience-preview-item" href={item.href}><ExperienceArtwork item={item} /><div className="home-experience-preview-title"><h3>{item.title}</h3><Arrow /></div><p>{item.description}</p></a></DepthScene>)}</div>
  </section>
}
