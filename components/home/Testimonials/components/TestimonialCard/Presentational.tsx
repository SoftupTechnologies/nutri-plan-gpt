import Image, { StaticImageData } from "next/image";
import React from "react";

interface TestimonialCardProps {
  description:string;
  name:string;
  occupation:string;
  imageUrl:string |StaticImageData;
}

const TestimonialCard:React.FC<TestimonialCardProps> = (props) => {
  const {description,name,occupation,imageUrl}=props;
  
  return (
    <li className="flex flex-col gap-y-6 sm:gap-y-8 justify-between">
      <figure
        className="relative cursor-pointer rounded-2xl  p-6 transition duration-300 ease-in-out hover:scale-105 flex flex-col items-stretch justify-between min-h-full"
        style={{
          boxShadow:
            "rgba(33, 183, 138, 0.25)  0px 6px 12px -2px, rgb(33, 183, 138,0.3) 0px 3px 7px -3px",
        }}
      >
        <blockquote className="relative">
          <p className="flex-1 text-md md:text-lg tracking-tight text-section-title">
          {description}
          </p>
        </blockquote>
        <figcaption className="border-slate-100 relative mt-6 flex items-center justify-between border-t border-section-subtitle pt-6">
          <div>
            <div className="font-display text-base text-section-title">
             {name}
            </div>
            <div className="mt-1 text-sm text-section-subtitle">
           {occupation}
            </div>
          </div>
          <div className="bg-slate-50 overflow-hidden rounded-full">
            <Image
              alt={name}
              decoding="async"
              data-nimg={1}
              src={imageUrl}
              width={56}
              height={56}
              className="h-14 w-14 object-cover"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

export default TestimonialCard;
