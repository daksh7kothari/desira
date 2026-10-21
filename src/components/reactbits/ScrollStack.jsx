// Adapted from React Bits by David Haz. See THIRD_PARTY_NOTICES.md.
import { Children, Fragment, useEffect, useRef } from "react";
import "./ScrollStack.css";

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function ScrollStackItem({ children, itemClassName = "" }) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>
      {children}
      <span className="scroll-stack-card__shade" aria-hidden="true" />
    </div>
  );
}

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 88,
  itemStackDistance = 18,
  stackPosition = 96,
  itemScale = 0.035,
  baseScale = 0.88,
  dimAmount = 0.12,
  rotationAmount = 1.25,
}) {
  const root = useRef(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    const slots = Array.from(node.querySelectorAll("[data-stack-slot]"));
    const cards = slots.map((slot) => slot.firstElementChild);
    const staticLayout = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const clear = () => {
      cards.forEach((card) => {
        card?.style.removeProperty("transform");
        card?.style.removeProperty("--scroll-stack-dim");
      });
    };

    const update = () => {
      frame = 0;
      if (staticLayout.matches) {
        clear();
        return;
      }

      const heights = slots.map((slot) => slot.offsetHeight);
      const tops = slots.map((slot) => slot.getBoundingClientRect().top);
      const depths = slots.map(() => 0);

      for (let next = 1; next < slots.length; next += 1) {
        const pin = stackPosition + (next - 1) * itemStackDistance;
        const start = pin + heights[next - 1];
        const span = Math.max(1, heights[next - 1] - itemStackDistance);
        const cover = clamp((start - tops[next]) / span);
        for (let previous = 0; previous < next; previous += 1)
          depths[previous] += cover;
      }

      cards.forEach((card, index) => {
        if (!card) return;
        const depth = depths[index];
        const scale = Math.max(baseScale, 1 - depth * itemScale);
        const rotation =
          Math.min(depth, 1) * rotationAmount * (index % 2 ? -1 : 1);
        const dim = 1 - Math.pow(1 - clamp(dimAmount), depth);
        card.style.transform = `rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.setProperty("--scroll-stack-dim", dim.toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);
    slots.forEach((slot) => resizeObserver.observe(slot));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    staticLayout.addEventListener("change", schedule);
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      staticLayout.removeEventListener("change", schedule);
      clear();
    };
  }, [baseScale, dimAmount, itemScale, itemStackDistance, rotationAmount, stackPosition]);

  return (
    <div ref={root} className={`scroll-stack ${className}`.trim()}>
      <div className="scroll-stack__inner">
        {items.map((item, index) => (
          <Fragment key={item.key ?? index}>
            {index > 0 && (
              <div
                className="scroll-stack__gap"
                style={{
                  height: Math.max(
                    0,
                    itemDistance - (items.length - index) * itemStackDistance,
                  ),
                }}
                aria-hidden="true"
              />
            )}
            <div
              className="scroll-stack__slot"
              data-stack-slot=""
              style={{
                top: stackPosition + index * itemStackDistance,
                marginBottom: (items.length - 1 - index) * itemStackDistance,
                zIndex: index + 1,
              }}
            >
              {item}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
