import { useEffect, useRef } from "react";
import copy from "../../data/contact.json";
import ProjectBriefForm from "./ProjectBriefForm.jsx";

export default function EnquiryDialog({ service, onClose }) {
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
      className="enquiry-dialog"
      aria-labelledby="enquiry-title"
      aria-describedby="enquiry-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close project enquiry"
        >
          ×
        </button>
        <h2 id="enquiry-title" className="preserve-lines">
          {copy.dialogTitle}
        </h2>
        <p id="enquiry-description">{copy.dialogDescription}</p>
        <ProjectBriefForm initialService={service} />
      </div>
    </dialog>
  );
}
