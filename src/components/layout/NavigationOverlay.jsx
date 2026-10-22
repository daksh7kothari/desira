import { useEffect, useRef, useState } from "react";
import navigation from "../../data/navigation.js";
import FlowingMenu from "../reactbits/FlowingMenu.jsx";
import { site, instagram } from "../../data/index.js";

export default function NavigationOverlay({ onClose }) {
  const dialog = useRef(null);
  const destination = useRef(null);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (!destination.current && previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  const finishClose = () => {
    const href = destination.current;
    onClose();
    if (href) {
      if (
        (href === "/" || href === "") &&
        (window.location.pathname === "/" || window.location.pathname === "")
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (
        (href.startsWith("/#") || href.startsWith("#")) &&
        (window.location.pathname === "/" || window.location.pathname === "")
      ) {
        const hash = href.startsWith("/#") ? href.slice(2) : href.slice(1);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 60);
          window.history.pushState(null, "", `/#${hash}`);
          return;
        }
      }
      window.location.assign(href);
    }
  };

  const requestClose = (event, href) => {
    if (href) event.preventDefault();
    if (closing) return;
    destination.current = href;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      finishClose();
    else setClosing(true);
  };

  const items = navigation.items;
  return (
    <dialog
      ref={dialog}
      id="studio-navigation"
      className={`studio-menu-dialog${closing ? " is-closing" : ""}`}
      inert={closing}
      aria-labelledby="studio-menu-title"
      onCancel={(event) => {
        event.preventDefault();
        requestClose(event);
      }}
    >
      <div
        className="studio-menu-shell"
        onAnimationEnd={(event) => {
          if (closing && event.target === event.currentTarget) finishClose();
        }}
      >
        <div className="studio-menu-top">
          <a
            href="/"
            onClick={(event) => requestClose(event, "/")}
            aria-label="Desira home"
          >
            <img
              src={site.assets.navigationLogo.src}
              alt={site.assets.navigationLogo.alt}
              width={site.assets.navigationLogo.width}
              height={site.assets.navigationLogo.height}
            />
          </a>
          <span id="studio-menu-title">{navigation.title}</span>
          <button
            type="button"
            className="studio-menu-close"
            aria-label="Close navigation"
            onClick={(event) => requestClose(event)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="studio-menu-body">
          <FlowingMenu
            items={items}
            onItemClick={(item, _index, event) =>
              requestClose(event, item.link)
            }
            textColor="#ffffff"
            bgColor="#061c49"
            marqueeBgColor="#ffbd3d"
            marqueeTextColor="#061c49"
            borderColor="rgba(255,255,255,.2)"
            align="left"
            showArrow
            imageShape="rounded"
            intro={false}
            speed={45}
            followCursor={0.3}
            ariaLabel="Expanded navigation"
          />
        </div>
        <div className="studio-menu-bottom">
          <p>{navigation.note}</p>
          <a
            className="studio-menu-social"
            href={instagram}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => requestClose(event)}
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
