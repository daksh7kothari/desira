import Arrow from "../components/ui/Arrow.jsx";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>This page isn’t here.</h1>
      <a className="button button-navy" href="/">
        Back to Desira <Arrow />
      </a>
    </main>
  );
}
