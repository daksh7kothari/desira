import { useState } from "react";
import copy from "../../data/home.json";

export default function Questions() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <section className="faq-section section-pad" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <h2 id="faq-title">{copy.faq.title}</h2>
        <p>Small answers for the questions that usually arrive first.</p>
      </div>
      <div className="faq-chat" aria-label="Frequently asked questions" data-reveal>
        <p className="faq-chat__timestamp">Every day, 9:01 AM</p>
        {copy.faq.items.map((item, index) => {
          const open = openQuestion === item.question;
          const answerId = `faq-answer-${index}`;
          return (
            <div
              className={`faq-chat__item${open ? " is-open" : ""}`}
              key={item.question}
            >
              <button
                type="button"
                className="faq-chat__trigger"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => {
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
              </button>
              <div
                className="faq-chat__answer-wrap"
                id={answerId}
                role="region"
                aria-hidden={!open}
              >
                <div className="faq-chat__answer-clip">
                  <p className="faq-chat__answer">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
