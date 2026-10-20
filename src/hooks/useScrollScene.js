import useDepthScroll from "./useDepthScroll.js";

const clamp = (value) => Math.max(0, Math.min(1, value));

// CSS owns each scene's composition. Scroll only supplies bounded progress.
export default function useScrollScene(ref) {
  useDepthScroll(ref, ({ rect, viewport, reduced }) => {
    if (!ref.current) return;
    const enter = reduced
      ? 1
      : clamp((viewport * 0.9 - rect.top) / (viewport * 0.7));
    const exit = reduced ? 0 : clamp(-rect.top / Math.max(1, rect.height));
    ref.current.style.setProperty("--scene-enter", enter.toFixed(4));
    ref.current.style.setProperty("--scene-exit", exit.toFixed(4));
  });
}
