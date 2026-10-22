import { useEffect, useRef, useState } from "react";
import "./ExpandableImage.css";

function ImageLightbox({ alt, onClose, src }) {
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
      className="image-lightbox"
      aria-label={`Expanded image: ${alt}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <button
        type="button"
        className="image-lightbox-close"
        onClick={onClose}
      >
        Close
      </button>
      <img src={src} alt={alt} />
    </dialog>
  );
}

export default function ExpandableImage({ alt, src, ...imageProps }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="expandable-image"
        aria-label={`Enlarge image: ${alt}`}
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} {...imageProps} />
      </button>
      {open && <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
