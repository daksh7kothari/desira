import copy from "../../data/home.json";
import ServiceLinks from "../ui/ServiceLinks.jsx";
export default function Services() {
  return (
    <section
      id="services"
      className="services-section section-pad"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <h2 id="services-title">{copy.services.title}</h2>
        <p>{copy.services.description}</p>
      </div>
      <div className="services-menu">
        <ServiceLinks />
      </div>
    </section>
  );
}
