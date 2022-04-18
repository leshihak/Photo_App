import { FC } from "react";
import { Carousel as CarouselComponent } from "react-responsive-carousel";

interface CarouselProps {
  items: { alt: string; url: string; id: string }[];
  oneItemInArray?: boolean;
}

const Carousel: FC<CarouselProps> = ({ items, oneItemInArray }) => (
  <CarouselComponent
    showArrows={oneItemInArray ? false : true}
    showThumbs={false}
    showStatus={false}
    showIndicators={oneItemInArray ? false : true}
    useKeyboardArrows
  >
    {items.map((item) => (
      <img
        key={item.id}
        src={item.url}
        alt={item.alt}
        style={{
          objectFit: "contain",
          borderRadius: "0 0 12px 12px",
          height: "650px",
          maxWidth: "650px",
        }}
      />
    ))}
  </CarouselComponent>
);

export default Carousel;
