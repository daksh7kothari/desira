import { useEffect, useRef } from "react";

export default function PageMotion({ pathname }) {
  const progress = useRef(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const fallbackTimers = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.remove("motion-pending");
            observer.unobserve(target);
            const timer = fallbackTimers.get(target);
            if (timer) window.clearTimeout(timer);
            fallbackTimers.delete(target);
          }
        });
      },
      { threshold: 0.06 },
    );
    if (!reduced.matches)
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top > window.innerHeight) {
          node.classList.add("motion-pending");
          observer.observe(node);
          fallbackTimers.set(
            node,
            window.setTimeout(() => {
              node.classList.remove("motion-pending");
              observer.unobserve(node);
              fallbackTimers.delete(node);
            }, 2600),
          );
        }
      });
    const revealAll = () => {
      if (reduced.matches)
        nodes.forEach((node) => node.classList.remove("motion-pending"));
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduced.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      fallbackTimers.forEach((timer) => window.clearTimeout(timer));
      fallbackTimers.clear();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduced.removeEventListener("change", revealAll);
      nodes.forEach((node) => node.classList.remove("motion-pending"));
    };
  }, [pathname]);
  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={progress} />
    </div>
  );
}
