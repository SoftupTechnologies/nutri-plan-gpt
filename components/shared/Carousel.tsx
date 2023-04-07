import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";
import { CarouselImage } from "@/lib/types";


interface Props {
  images:CarouselImage[]
}
const Carousel:React.FC<Props> = ({images}) => {
  

  return (
    <aside className="w-[300px] md:w-[400px] mx-auto">
      <Swiper

        slidesPerView={1}
        centeredSlides
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[ Autoplay]}
        rewind
        className=" mx-auto"
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image.imageUrl}>
              <Image
                className="h-[300px] object-cover"
                src={image.imageUrl}
                width={300}
                height={300}
                alt="meal image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </aside>
  );
};

export default Carousel;