

export default function Process() {
  return <section className="process-home section-pad" aria-labelledby="process-home-title">
    <div className="section-heading" data-reveal><div><p className="eyebrow">Working together</p><h2 id="process-home-title">A good idea.<br />A thoughtful way there.</h2></div><p>You bring the story.<br />We help find its visual voice.</p></div>
    <ol className="process-steps">
      {[
        ['The conversation', 'Tell us what you’re making, who it’s for and what you want it to feel like. We shape a clear brief together.'],
        ['The creative direction', 'We explore the idea through type, colour and composition, then build a direction around your story.'],
        ['The finishing touches', 'We refine the details with your feedback and prepare the agreed artwork for its next chapter.'],
      ].map(([title, body], i) => <li key={title} data-reveal><span className="process-count" aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}
    </ol>
  </section>
}
