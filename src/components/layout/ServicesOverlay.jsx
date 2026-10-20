import { useEffect, useRef } from "react";
import ServiceLinks from "../ui/ServiceLinks.jsx";
import copy from "../../data/home.json";

export default function ServicesOverlay({ onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const focus = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      if (focus?.isConnected) focus.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="services-dialog"
      aria-labelledby="services-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="services-dialog-content">
        <header>
          <h2 id="services-dialog-title">{copy.services.dialogTitle}</h2>
          <button type="button" onClick={onClose} aria-label="Close services">
            ×
          </button>
        </header>
        <p>{copy.services.dialogDescription}</p>
        <div className="services-dialog-menu">
          <ServiceLinks onSelect={onClose} />
        </div>
      </div>
    </dialog>
  );
}
