import { useEffect, useState } from "react";
import { site } from "../../data/index.js";
import NavigationOverlay from "./NavigationOverlay.jsx";

export default function Header({ isHome = false }) {
  const [open, setOpen] = useState(false);
  const [homeNavVisible, setHomeNavVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return undefined;

    const updateVisibility = () => setHomeNavVisible(window.scrollY > 24);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isHome]);

  const visible = !isHome || homeNavVisible || open;

  return (
    <>
      <header
        className={`header-wrap${isHome ? " home-header" : ""}${visible ? " is-visible" : ""}`}
        aria-hidden={!visible}
        inert={!visible}
      >
        <nav className="navigation" aria-label="Main navigation">
          <a href="/" className="brand" aria-label="Desira home">
            <img
              src={site.assets.navigationLogo.src}
              alt={site.assets.navigationLogo.alt}
              width={site.assets.navigationLogo.width}
              height={site.assets.navigationLogo.height}
            />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="studio-navigation"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </nav>
      </header>
      {open && <NavigationOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
