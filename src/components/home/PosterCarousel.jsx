import FlexCarousel from "../reactbits/FlexCarousel.jsx";
import "./PosterCarousel.css";

const posterItems = [
  {
    src: "/posters/poster-01.webp",
    alt: "Healthcare uniforms poster for the Chennai Apparel Association trade fair",
    title: "Uniform Garment Expo",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/poster-02.webp",
    alt: "Uniform fair poster showing professionals in pilot, medical, military and police uniforms",
    title: "Uniform Garment Expo",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/poster-03.webp",
    alt: "Crochetique brochure featuring yarn, crochet work and handmade products",
    title: "Crochetique",
    subtitle: "Brochure",
  },
  {
    src: "/posters/poster-04.webp",
    alt: "Crochetique newspaper advertisement for a handcrafted homeware sale",
    title: "Crochetique",
    subtitle: "Newspaper advertisement",
  },
  {
    src: "/posters/poster-05.webp",
    alt: "Crochetique campaign poster with a model wearing a knitted cardigan",
    title: "Crochetique",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/poster-06.webp",
    alt: "Urbanity menswear poster featuring shirts, jeans and boots",
    title: "Urbanity",
    subtitle: "Fashion campaign",
  },
  {
    src: "/posters/poster-07.webp",
    alt: "Garment fair poster featuring a model and the words Exclusive Collection",
    title: "Garment Fair",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/poster-08.webp",
    alt: "Christmas jewellery poster with gold and diamond bangles arranged as a tree",
    title: "C. P. Kothari Jewellers",
    subtitle: "Holiday campaign",
  },
  {
    src: "/posters/poster-09.webp",
    alt: "Blue floral Griha Pravesh invitation",
    title: "Griha Pravesh",
    subtitle: "Invitation",
  },
  {
    src: "/posters/poster-10.webp",
    alt: "Floral house warming invitation with ceremonial illustrations",
    title: "House Warming",
    subtitle: "Invitation",
  },
  {
    src: "/posters/poster-11.webp",
    alt: "Illustrated wedding invitation featuring a couple in navy formalwear",
    title: "Manisha & Aashish",
    subtitle: "Wedding invitation",
  },
  {
    src: "/posters/poster-12.webp",
    alt: "Theatre-inspired wardrobe planner poster for an iFLIX event",
    title: "iFLIX",
    subtitle: "Event poster",
  },
];

export default function PosterCarousel() {
  return (
    <section
      id="poster-carousel"
      className="poster-carousel-section"
      aria-label="Posters and campaign pieces"
    >
      <div className="poster-carousel-stage">
        <FlexCarousel
          items={posterItems}
          preset="liquid"
          intro="rise"
          fit="natural"
          cardHeight={0.61}
          gap={14}
          radius={4}
          squeeze={0.14}
          autoplay
          focusOnClick
          captions
          captureWheel={false}
        />
      </div>
    </section>
  );
}
