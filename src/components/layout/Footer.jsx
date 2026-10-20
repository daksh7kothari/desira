import { site, instagram } from "../../data/index.js";
import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";
import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";

export default function Footer({ onEnquire, isHome = false }) {
  const scene = useRef(null);
  useScrollScene(scene);
  return (
    <footer id="contact" className={`footer${isHome ? " footer-story" : ""}`} ref={scene}>
      <div className="footer-top">
        {isHome && (
          <div className="footer-story-paper" aria-hidden="true">
            <img src="/favicon.svg" alt="" width="42" height="42" />
            <span>Your story<br />starts here.</span>
            <span className="footer-story-rule" />
          </div>
        )}
        <div>
          <h2>{copy.footer.title}</h2>
          <p>{copy.footer.description}</p>
        </div>
        <button className="button button-gold" onClick={() => onEnquire()}>
          {copy.footer.buttonLabel}
          <Arrow diagonal />
        </button>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          {copy.footer.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={instagram} target="_blank" rel="noreferrer">
            Instagram
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </footer>
  );
}
