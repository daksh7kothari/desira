import { useRef } from "react";
import useDepthScroll from "../../hooks/useDepthScroll.js";

export default function DepthScene({ children, className = "", id }) {
  const root = useRef(null);
  const surface = useRef(null);
  useDepthScroll(root, ({ offset, reduced, compact }) => {
    if (!surface.current) return;
    const strength = compact ? 0.45 : 1;
    surface.current.style.transform = reduced
      ? "none"
      : `translateY(${-offset * 12 * strength}px) rotateX(${-offset * 5 * strength}deg) rotateY(${offset * 2 * strength}deg)`;
  });
  return (
    <div id={id} className={`depth-scene ${className}`} ref={root}>
      <div className="depth-scene-content" ref={surface}>
        {children}
      </div>
    </div>
  );
}
