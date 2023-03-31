import React from "react";
import TestimonialCard from "./components/TestimonialCard/Presentational";
import testimonialsList from "../../../data/Testimonials/TestimonialsList"

const Testimonials = () => {
  return (
    <section id="testimonials" className="px-5 xl:px-0">
      <div className="mx-auto md:text-center">
        <h1 className="text-center mx-auto max-w-4xl font-display text-2xl md:text-4xl font-bold tracking-normal text-section-title sm:text-6xl">
          What do our users say about us?
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm md:text-lg  leading-5 md:leading-7 text-section-subtitle">
          Many are now enjoying their experience with using the app and living an healthier life.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto grid max-w-4xl grid-cols-1 justify-center gap6 sm:grid-cols-2 sm:gap-8 md:mx-2 md:mt-16 lg:mt-16 lg:max-w-none lg:grid-cols-3 "
      >
        {testimonialsList.map((testimonial) => {
          return <TestimonialCard key={testimonial.name} {...testimonial}/>
        })}
      </ul>
    </section>
  );
};

export default Testimonials;
