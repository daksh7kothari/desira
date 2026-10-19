
const questions = [
  ['What can I work with Desira on?', 'We create custom logos and brand identities, posters and print designs, wedding invitations and stationery, illustrations, and event graphics. Tell us what you have in mind and we’ll help define the right scope.'],
  ['How do we get started?', 'Start with a conversation. Share what you’re creating, the kind of design you need, any references you love, and your ideal deadline. We’ll discuss the brief and next steps with you.'],
  ['How much will my project cost?', 'Every project has its own scope. Your quote depends on the deliverables, complexity, and timeline. We’ll discuss those details before starting so you know what to expect.'],
  ['Can you create something completely custom?', 'Yes. Custom design is at the heart of Desira. Bring your story, your references, or even an idea you haven’t quite figured out yet. We’ll shape it together.'],
]
export default function Questions() {
  return <section className="faq-section section-pad" aria-labelledby="faq-title"><div><p className="eyebrow">A little clarity</p><h2 id="faq-title">Before we<br />make magic.</h2></div><div className="faq-list">{questions.map(([title, answer]) => <details key={title} data-reveal><summary>{title}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}
