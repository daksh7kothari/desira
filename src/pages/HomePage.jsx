import Hero from "../components/home/Hero.jsx";
import PosterCarousel from "../components/home/PosterCarousel.jsx";
import Portfolio from "../components/home/Portfolio.jsx";
import Services from "../components/home/Services.jsx";
import Studio from "../components/home/Studio.jsx";
import ProcessStory from "../components/home/ProcessStory.jsx";
import InstagramFeed from "../components/home/InstagramFeed.jsx";
import Questions from "../components/home/Questions.jsx";
import "../styles/home-refresh.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <PosterCarousel />
      <Portfolio featured />
      <Services />
      <ProcessStory />
      <InstagramFeed />
      <Studio />
      <Questions />
    </main>
  );
}
