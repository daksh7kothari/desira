import Portfolio from "../components/home/Portfolio.jsx";
import FeaturedStory from "../components/home/FeaturedStory.jsx";
import copy from "../data/home.json";

export default function WorkPage() {
  return (
    <main className="work-page">
      <header className="detail-page collection-heading">
        <a className="back-link" href="/">
          ← Back to Desira
        </a>
        <h1>{copy.portfolio.fullTitle}</h1>
        <p>{copy.portfolio.fullDescription}</p>
      </header>
      <Portfolio />
      <FeaturedStory />
    </main>
  );
}
