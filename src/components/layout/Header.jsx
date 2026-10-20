import { useEffect, useRef, useState } from "react";
import { experienceLinks, site } from "../../data/index.js";
import Arrow from "../ui/Arrow.jsx";
import NavigationOverlay from "./NavigationOverlay.jsx";
import ServicesOverlay from "./ServicesOverlay.jsx";

export default function Header({ onEnquire, isHome }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const dropdown = useRef(null);
  const dropdownButton = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key !== "Escape") return;
      if (
        dropdown.current?.contains(document.activeElement) &&
        dropdownButton.current?.getAttribute("aria-expanded") === "true"
      ) {
        setExperiencesOpen(false);
        dropdownButton.current.focus();
      } else {
        setOpen(false);
        setExperiencesOpen(false);
      }
    };
    const outside = (event) => {
      if (!dropdown.current?.contains(event.target)) setExperiencesOpen(false);
    };
    window.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <>
      <header className="header-wrap">
        <nav className="navigation" aria-label="Main navigation">
          <a href="/" className="brand" aria-label="Desira home">
            <img {...site.assets.navigationLogo} />
          </a>
          <div className="nav-descriptor">
            Graphic design.
            <br />
            With a little personality.
          </div>
          <div id="nav-links" className="nav-links">
            <a href="/work/">Work</a>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={servicesOpen}
              onClick={() => {
                setExperiencesOpen(false);
                setServicesOpen(true);
              }}
            >
              What we do
            </button>
            <a href="/studio/" onClick={() => setOpen(false)}>
              The studio
            </a>
          </div>
          <div
            className="experiences-nav"
            ref={dropdown}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setExperiencesOpen(false);
            }}
          >
            <button
              ref={dropdownButton}
              type="button"
              className="experiences-toggle"
              aria-expanded={experiencesOpen}
              aria-controls="experience-navigation"
              onClick={() => setExperiencesOpen(!experiencesOpen)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp")
                  return;
                event.preventDefault();
                setExperiencesOpen(true);
                const last = event.key === "ArrowUp";
                requestAnimationFrame(() => {
                  const links = dropdown.current?.querySelectorAll("a");
                  (last ? links?.[links.length - 1] : links?.[0])?.focus();
                });
              }}
            >
              Explore{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <div
              id="experience-navigation"
              className="experiences-dropdown"
              hidden={!experiencesOpen}
            >
              <a
                className="experiences-all"
                href="/experiences/"
                onClick={() => setExperiencesOpen(false)}
              >
                <span>
                  Step inside the design<span>Browse all experiences</span>
                </span>
                <Arrow diagonal />
              </a>
              <div className="experience-nav-grid">
                {experienceLinks.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setExperiencesOpen(false)}
                  >
                    <img
                      src={item.image}
                      alt=""
                      width="64"
                      height="72"
                      loading="lazy"
                    />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <span className="experience-nav-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <button
            className="button button-gold nav-cta"
            onClick={() => {
              setOpen(false);
              onEnquire();
            }}
          >
            Let’s talk <Arrow diagonal />
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="studio-navigation"
            aria-haspopup="dialog"
            onClick={() => {
              setExperiencesOpen(false);
              setOpen(true);
            }}
          >
            Menu{" "}
            <span className="hamburger-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </nav>
      </header>
      {open && (
        <NavigationOverlay onClose={() => setOpen(false)} isHome={isHome} />
      )}
      {servicesOpen && (
        <ServicesOverlay onClose={() => setServicesOpen(false)} />
      )}
    </>
  );
}
