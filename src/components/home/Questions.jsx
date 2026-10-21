import { useState } from "react";
import copy from "../../data/home.json";

export default function Questions() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <section className="faq-section section-pad" aria-labelledby="faq-title">
      <div className="faq-intro">
        <h2 id="faq-title">{copy.faq.title}</h2>
        <p>Small answers for the questions that usually arrive first.</p>
      </div>
      <div className="faq-chat" aria-label="Frequently asked questions">
        <p className="faq-chat__timestamp">Every day, 9:01 AM</p>
        {copy.faq.items.map((item) => (
          <details
            key={item.question}
            open={openQuestion === item.question}
          >
            <summary
              onClick={(event) => {
                event.preventDefault();
                setOpenQuestion((current) =>
                  current === item.question ? null : item.question
                );
              }}
            >
              <span className="faq-chat__question">{item.question}</span>
              <span className="faq-chat__toggle" aria-hidden="true">
                <span className="faq-chat__plus">+</span>
                <span className="faq-chat__minus">−</span>
              </span>
            </summary>
            <div className="faq-chat__answer-wrap">
              <p className="faq-chat__answer">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
