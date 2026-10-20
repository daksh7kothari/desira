import copy from "../../data/home.json";

export default function Process() {
  return (
    <section
      className="process-home section-pad"
      aria-labelledby="process-title"
    >
      <div className="section-heading">
        <h2 id="process-title">{copy.process.title}</h2>
        <p>{copy.process.description}</p>
      </div>
      <ol className="process-steps">
        {copy.process.steps.map((step, index) => (
          <li key={step.title} data-reveal>
            <span className="process-count" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
