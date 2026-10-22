import { site, instagram } from "../../data/index.js";
import copy from "../../data/home.json";
import Arrow from "../ui/Arrow.jsx";
import { useRef } from "react";
import useScrollScene from "../../hooks/useScrollScene.js";

export default function Footer({ isHome = false }) {
  const scene = useRef(null);
  useScrollScene(scene);
  return (
    <footer id="contact" className={`footer${isHome ? " footer-story" : ""}`} ref={scene}>
      <div className="footer-top" data-reveal>
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
        <a className="button button-gold" href="/contact/">
          {copy.footer.buttonLabel}
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom" data-reveal>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          {/* <a href="/studio/">The studio</a> */}
          {/* <a href="/experiences/">Design experiences</a> */}
          {/* <a href="/sketchbook/">Sketchbook</a> */}
          {/* <a href="/notes/">Design notes</a> */}
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
