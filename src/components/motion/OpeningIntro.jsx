import { useCallback, useEffect, useRef, useState } from "react";
import copy from "../../data/home.json";
import Preloader from "../reactbits/Preloader.jsx";

const storageKey = "desira-intro-seen";

export default function OpeningIntro({ isHome }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const restorePage = useRef(() => {});

  const finish = useCallback(() => setLoading(false), []);

  const closeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch {
      /* The intro still dismisses when storage is unavailable. */
    }

    document.documentElement.removeAttribute("data-intro");
    restorePage.current();
    setVisible(false);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const page = document.getElementById("site-content");
    let seen = false;

    try {
      seen = sessionStorage.getItem(storageKey) === "true";
    } catch {
      /* Storage can be unavailable. */
    }

    if (
      !isHome ||
      !copy.intro.enabled ||
      seen ||
      reduced.matches ||
      window.location.hash
    ) {
      root.removeAttribute("data-intro");
      return undefined;
    }

    const focused = document.activeElement;
    const overflow = document.body.style.overflow;
    const oldAriaHidden = page?.getAttribute("aria-hidden");
    let restored = false;
    let activationFrame;

    root.dataset.intro = "play";
    document.body.style.overflow = "hidden";
    if (page) {
      page.inert = true;
      page.setAttribute("aria-hidden", "true");
    }

    restorePage.current = () => {
      if (restored) return;
      restored = true;
      document.body.style.overflow = overflow;

      if (page) {
        page.inert = false;
        if (oldAriaHidden === null) page.removeAttribute("aria-hidden");
        else page.setAttribute("aria-hidden", oldAriaHidden);
      }

      if (focused?.isConnected && focused !== document.body) focused.focus();
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") finish();
    };
    const onMotionChange = () => {
      if (reduced.matches) finish();
    };

    window.addEventListener("keydown", onKeyDown);
    reduced.addEventListener("change", onMotionChange);
    activationFrame = window.requestAnimationFrame(() => {
      setVisible(true);
      setLoading(true);
    });

    return () => {
      window.cancelAnimationFrame(activationFrame);
      window.removeEventListener("keydown", onKeyDown);
      reduced.removeEventListener("change", onMotionChange);
      restorePage.current();
      root.removeAttribute("data-intro");
    };
  }, [finish, isHome]);

  if (!isHome || !visible) return null;

  return (
    <Preloader
      loading={loading}
      variant="percentage"
      position="fixed"
      duration={Math.min(2500, Math.max(900, copy.intro.durationMs))}
      zIndex={200}
      bgColor="#061c49"
      percentagePosition="bottom-left"
      showProgressBar
      progressBarPosition="bottom"
      onComplete={finish}
      onLoadingComplete={closeIntro}
      respectReducedMotion
      reducedMotionFallback="fade"
      ariaLabel="Desira is loading"
      ariaLive="polite"
      textFadeThreshold={94}
      className="desira-preloader"
      customContent={(progress) => (
        <>
          <span className="desira-preloader__brand">
            {copy.intro.signature}
          </span>
          <p className="desira-preloader__message">{copy.intro.text}</p>
          <p className="desira-preloader__percentage" aria-hidden="true">
            {String(Math.round(progress)).padStart(2, "0")}
            <span>%</span>
          </p>
          <button
            type="button"
            className="desira-preloader__skip"
            onClick={finish}
          >
            {copy.intro.skipLabel}
          </button>
        </>
      )}
    />
  );
}
