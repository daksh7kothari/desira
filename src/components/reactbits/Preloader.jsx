import { useEffect, useRef, useState } from "react";
import "./Preloader.css";

const EXIT_DURATION = 560;

export default function Preloader({
  loading = false,
  variant = "percentage",
  position = "absolute",
  duration = 2500,
  loadingText = "Loading your next level experience",
  zIndex = 50,
  bgColor,
  percentagePosition = "center",
  showPercentageSign = true,
  showProgressBar = true,
  progressBarPosition = "bottom",
  onComplete,
  onLoadingStart,
  onLoadingComplete,
  respectReducedMotion = false,
  reducedMotionFallback = "fade",
  ariaLabel = "Loading content",
  ariaLive = "polite",
  textFadeThreshold = 99,
  backdropBlur = 0,
  customContent,
  className = "",
  children,
}) {
  const [visible, setVisible] = useState(loading);
  const [progress, setProgress] = useState(loading ? 0 : 100);
  const callbacks = useRef({ onComplete, onLoadingStart, onLoadingComplete });
  const hasStarted = useRef(false);

  useEffect(() => {
    callbacks.current = { onComplete, onLoadingStart, onLoadingComplete };
  }, [onComplete, onLoadingComplete, onLoadingStart]);

  useEffect(() => {
    let animationFrame;
    let exitTimer;

    if (!loading) {
      if (!hasStarted.current) return undefined;

      const reduced =
        respectReducedMotion &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const exitDuration =
        reduced && reducedMotionFallback === "none" ? 0 : EXIT_DURATION;

      exitTimer = window.setTimeout(() => {
        setVisible(false);
        hasStarted.current = false;
        callbacks.current.onLoadingComplete?.();
      }, exitDuration);

      return () => window.clearTimeout(exitTimer);
    }

    hasStarted.current = true;
    callbacks.current.onLoadingStart?.();

    const reduced =
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveDuration = reduced ? 1 : Math.max(1, duration);
    const startedAt = performance.now();

    const update = (now) => {
      const nextProgress = Math.min(
        100,
        ((now - startedAt) / effectiveDuration) * 100,
      );
      setVisible(true);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        callbacks.current.onComplete?.();
        return;
      }

      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
    };
  }, [duration, loading, reducedMotionFallback, respectReducedMotion]);

  return (
    <>
      {children}
      {visible && (
        <div
          className={`rb-pro-preloader rb-pro-preloader--${variant} rb-pro-preloader--${loading ? "loading" : "exiting"} ${className}`.trim()}
          data-position={percentagePosition}
          data-progress-bar={progressBarPosition}
          role="status"
          aria-label={ariaLabel}
          aria-live={ariaLive}
          aria-busy={loading}
          style={{
            "--rb-preloader-position": position,
            "--rb-preloader-z": zIndex,
            "--rb-preloader-bg": bgColor,
            "--rb-preloader-blur": `${backdropBlur}px`,
            "--rb-preloader-exit-duration": `${EXIT_DURATION}ms`,
          }}
        >
          <div className="rb-pro-preloader__content">
            {customContent ? (
              customContent(progress)
            ) : (
              <>
                <p className="rb-pro-preloader__loading-text">{loadingText}</p>
                <p className="rb-pro-preloader__percentage">
                  {Math.round(progress)}
                  {showPercentageSign && <span>%</span>}
                </p>
              </>
            )}
          </div>

          {showProgressBar && (
            <div className="rb-pro-preloader__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          )}

          <span
            className="rb-pro-preloader__sr-progress"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
          >
            {Math.round(progress)}% loaded
          </span>

          <span
            className="rb-pro-preloader__fade-trigger"
            data-faded={progress >= textFadeThreshold ? "true" : "false"}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
