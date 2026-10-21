import { useState } from "react";
import { site } from "../../data/index.js";
import NavigationOverlay from "./NavigationOverlay.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header-wrap">
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
            Menu{" "}
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
