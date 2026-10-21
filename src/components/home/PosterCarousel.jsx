import FlexCarousel from "../reactbits/FlexCarousel.jsx";
import "./PosterCarousel.css";

const posterItems = [
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.20.09.jpeg",
    alt: "Healthcare uniforms poster for the Chennai Apparel Association trade fair",
    title: "Uniform Garment Expo",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.20.30.jpeg",
    alt: "Uniform fair poster showing professionals in pilot, medical, military and police uniforms",
    title: "Uniform Garment Expo",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.21.17%20(1).jpeg",
    alt: "Crochetique brochure featuring yarn, crochet work and handmade products",
    title: "Crochetique",
    subtitle: "Brochure",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.21.17%20(2).jpeg",
    alt: "Crochetique newspaper advertisement for a handcrafted homeware sale",
    title: "Crochetique",
    subtitle: "Newspaper advertisement",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.21.17.jpeg",
    alt: "Crochetique campaign poster with a model wearing a knitted cardigan",
    title: "Crochetique",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.22.09.jpeg",
    alt: "Urbanity menswear poster featuring shirts, jeans and boots",
    title: "Urbanity",
    subtitle: "Fashion campaign",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.22.51.jpeg",
    alt: "Garment fair poster featuring a model and the words Exclusive Collection",
    title: "Garment Fair",
    subtitle: "Campaign poster",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.23.18.jpeg",
    alt: "Christmas jewellery poster with gold and diamond bangles arranged as a tree",
    title: "C. P. Kothari Jewellers",
    subtitle: "Holiday campaign",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.23.58.jpeg",
    alt: "Blue floral Griha Pravesh invitation",
    title: "Griha Pravesh",
    subtitle: "Invitation",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.24.09.jpeg",
    alt: "Floral house warming invitation with ceremonial illustrations",
    title: "House Warming",
    subtitle: "Invitation",
  },
  {
    src: "/wedding-invites/manisha-aashish-wedding-invite.jpg",
    alt: "Illustrated wedding invitation featuring a couple in navy formalwear",
    title: "Manisha & Aashish",
    subtitle: "Wedding invitation",
  },
  {
    src: "/posters/WhatsApp%20Image%202026-10-21%20at%2015.24.32.jpeg",
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
      aria-labelledby="poster-carousel-title"
    >
      <div className="poster-carousel-intro">
        <h2 id="poster-carousel-title">Posters in motion.</h2>
        <p>
          Campaigns, print pieces and invitations.
        </p>
      </div>
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
