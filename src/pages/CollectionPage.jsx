import Sketchbook from "../components/home/Sketchbook.jsx";
import DesignNotes from "../components/home/DesignNotes.jsx";
import copy from "../data/home-additions.json";

export default function CollectionPage({ kind }) {
  const notes = kind === "notes";
  const content = notes ? copy.designNotes : copy.sketchbook;
  return (
    <main className="collection-page">
      <header className="detail-page collection-heading">
        <a className="back-link" href="/">
          ← Back to Desira
        </a>
        <h1>{notes ? "Design notes." : "The sketchbook."}</h1>
        <p>{content.description}</p>
      </header>
      {notes ? <DesignNotes /> : <Sketchbook />}
    </main>
  );
}
