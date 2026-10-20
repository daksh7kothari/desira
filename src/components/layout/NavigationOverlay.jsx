import { useEffect, useRef } from "react";
import navigation from "../../data/navigation.json";
import FlowingMenu from "../reactbits/FlowingMenu.jsx";
import { experienceLinks, site, instagram } from "../../data/index.js";

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
            <img {...site.assets.navigationLogo} />
          </a>
          <span id="studio-menu-title">{navigation.title}</span>
          <button type="button" className="studio-menu-close" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
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
          <div>
            <p>Explore the details</p>
            <div className="studio-menu-services">
              {experienceLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={onClose}>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
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
