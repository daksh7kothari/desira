import Hero from "../components/home/Hero.jsx";
import Portfolio from "../components/home/Portfolio.jsx";
import Services from "../components/home/Services.jsx";
import Studio from "../components/home/Studio.jsx";

export default function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <Portfolio featured />
      <Services />
      <Studio />
    </main>
  );
}
