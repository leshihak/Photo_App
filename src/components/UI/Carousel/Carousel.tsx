import { FileItem } from "models/post.model";
import { FC } from "react";
import { Carousel as CarouselComponent } from "react-responsive-carousel";
import { FileTypes } from "static/constants";

interface CarouselProps {
  items: FileItem[];
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
    {items.map((item) =>
      item.type === FileTypes.IMAGES ? (
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
      ) : (
        <video
          controls
          autoPlay
          src={item.url}
          style={{
            objectFit: "contain",
            borderRadius: "0 0 12px 12px",
            height: "705px",
            maxWidth: "100%",
          }}
        />
      )
    )}
  </CarouselComponent>
);

export default Carousel;
