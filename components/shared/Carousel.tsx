import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { CarouselImage } from "@/lib/types";
import cn from "classnames";

interface Props {
  images: CarouselImage[];
}
const Carousel: React.FC<Props> = ({ images }) => {
  const [imagesData, setImagesData] = useState(() =>
    images.map((image, index) => ({
      index,
      loaded: false,
      imageUrl: image.imageUrl,
    })),
  );

  return (
    <aside className="mx-auto w-[300px] md:w-[500px]">
      <Swiper
        slidesPerView={1}
        centeredSlides
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        rewind
        className="mx-auto"
      >
        {imagesData.map((imageData, index) => (
          <SwiperSlide key={imageData.index}>
            <Image
              width={600}
              height={600}
              alt="meal image"
              src={imageData.imageUrl}
              onLoadingComplete={() => setImagesData((currentImagesData) => {
                const newImagesData = [...currentImagesData];
                newImagesData[index] = {
                  ...currentImagesData[index],
                  loaded: true,
                };

                return newImagesData;
              })}
              className={cn(
                "object-cover duration-700 ease-in-out group-hover:opacity-75",
                !imageData.loaded
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0",
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  );
};

export default Carousel;
