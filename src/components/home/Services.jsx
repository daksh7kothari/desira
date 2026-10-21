import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { services } from "../../data/index.js";
import copy from "../../data/home.json";
import ScrollStack, { ScrollStackItem } from "../reactbits/ScrollStack.jsx";
import Arrow from "../ui/Arrow.jsx";

export default function Services() {
  const section = useRef(null);

  useEffect(() => {
    const root = section.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const animations = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const pieces = entry.target.querySelectorAll("[data-service-piece]");
          animations.push(
            animate(pieces, {
              opacity: { from: 0 },
              y: { from: 22 },
              duration: 720,
              delay: stagger(70),
              ease: "out(4)",
            }),
          );
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 18% 0px", threshold: 0.15 },
    );

    root
      .querySelectorAll("[data-service-card]")
      .forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.revert());
    };
  }, []);

  return (
    <section
      id="services"
      className="services-section services-stack-section"
      aria-labelledby="services-title"
      ref={section}
    >
      <div className="services-stack-heading">
        <h2 id="services-title">{copy.services.title}</h2>
        <p>{copy.services.description}</p>
      </div>
      <ScrollStack className="services-stack">
        {services.map((service, index) => (
          <ScrollStackItem
            key={service.slug}
            itemClassName={`service-stack-card service-stack-card--${index + 1}`}
          >
            <article data-service-card>
              <a
                className="service-stack-card__link"
                href={`/services/${service.slug}/`}
                aria-labelledby={`service-${service.slug}`}
              >
                <div className="service-stack-card__copy">
                  <h3 id={`service-${service.slug}`} data-service-piece>
                    {service.title}
                  </h3>
                  <p data-service-piece>{service.short}</p>
                  <span className="service-stack-card__action" data-service-piece>
                    See what is included <Arrow diagonal />
                  </span>
                </div>
                <figure className="service-stack-card__art" data-service-piece>
                  <img
                    src={service.image}
                    alt={service.alt}
                    width="900"
                    height="700"
                    loading="lazy"
                  />
                </figure>
              </a>
            </article>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
