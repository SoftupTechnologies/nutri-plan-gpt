import Image from "next/image";
import React from "react";
import { CarouselImage } from "@/lib/types";

import Slider from "react-slick";

interface Props {
  images:CarouselImage[]
}
const Carousel:React.FC<Props> = ({images}) => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode:true,
    autoplay:true,
    autoplaySpeed:1500,
    

  };
  return (
    <aside className="w-[700px] md:w-[400px] mx-auto">
    <Slider {...settings}>
        {images.map((image) => {
          return (
            <div  key={image.imageUrl} className="">
              <Image
                className="h-[300px] object-cover mx-auto"
                src={image.imageUrl}
                width={300}
                height={300}
                alt="meal image"
              />
             </div>
  
          );
        })}
</Slider>
    </aside>
  );
};

export default Carousel;
