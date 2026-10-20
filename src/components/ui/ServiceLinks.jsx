import FlowingMenu from "../reactbits/FlowingMenu.jsx";
import { services } from "../../data/index.js";

export default function ServiceLinks({ onSelect }) {
  return (
    <FlowingMenu
      className="service-flowing-menu"
      items={services.map((service) => ({
        text: service.title,
        marquee: service.short,
        link: `/services/${service.slug}/`,
        image: service.image,
      }))}
      onItemClick={onSelect}
      align="left"
      showArrow
      intro={false}
      textColor="#061c49"
      bgColor="#f8f6f0"
      marqueeBgColor="#ffbd3d"
      marqueeTextColor="#061c49"
      borderColor="rgba(6,28,73,.2)"
      imageShape="rounded"
      speed={35}
      followCursor={0.15}
      ariaLabel="Design services"
    />
  );
}
