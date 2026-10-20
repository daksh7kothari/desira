// Set before first paint so the once-per-session intro does not flash on return visits.
try {
  if (
    window.location.pathname === "/" &&
    !window.location.hash &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    sessionStorage.getItem("desira-intro-seen") !== "true"
  ) {
    document.documentElement.dataset.intro = "play";
    window.setTimeout(
      () => document.documentElement.removeAttribute("data-intro"),
      4000,
    );
  }
} catch {
  // Content remains available when storage is disabled.
}
