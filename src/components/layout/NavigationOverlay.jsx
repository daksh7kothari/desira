import { useEffect, useRef } from "react";
import navigation from "../../data/navigation.json";
import FlowingMenu from "../reactbits/FlowingMenu.jsx";
import { site, instagram } from "../../data/index.js";

export default function NavigationOverlay({ onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);
  const items = navigation.items;
  return (
    <dialog
      ref={dialog}
      id="studio-navigation"
      className="studio-menu-dialog"
      aria-labelledby="studio-menu-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="studio-menu-shell">
        <div className="studio-menu-top">
          <a href="/" onClick={onClose} aria-label="Desira home">
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
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="studio-menu-body">
          <FlowingMenu
            items={items}
            onItemClick={onClose}
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
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
