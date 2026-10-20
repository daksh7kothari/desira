import copy from "../../data/home.json";

export default function Questions() {
  return (
    <section className="faq-section section-pad" aria-labelledby="faq-title">
      <h2 id="faq-title">{copy.faq.title}</h2>
      <div className="faq-list">
        {copy.faq.items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
