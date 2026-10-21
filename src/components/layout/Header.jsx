import { useState } from "react";
import NavigationOverlay from "./NavigationOverlay.jsx";

export default function Header({ isHome = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`header-wrap${isHome ? " home-header" : ""}`}>
        <nav className="navigation" aria-label="Site menu">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open site menu"
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
