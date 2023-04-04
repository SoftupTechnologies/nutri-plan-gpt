import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper";


interface Props {
  images:any[]
}
const Carousel:React.FC<Props> = ({images}) => {
  

  return (
    <aside className="w-[400px] mx-auto">
      <Swiper
        effect="cards"
        slidesPerView={1}
        centeredSlides
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        rewind
        className=" mx-auto"
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image}>
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
