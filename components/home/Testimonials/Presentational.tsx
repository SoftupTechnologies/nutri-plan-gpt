import React from 'react';

import testimonialsList from '../../../data/Testimonials/TestimonialsList';
import TestimonialCard from './components/TestimonialCard/Presentational';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section min-h-full py-16 max-w-xxl px-5 xl:px-0">
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
        className="cards-list grid max-w-4xl grid-cols-1 justify-center gap6 sm:grid-cols-2 sm:gap-8 py-4 md:px-3 md:mt-16 lg:mt-16 lg:max-w-none lg:grid-cols-3 "
      >
        {testimonialsList.map((testimonial) => {
          return <TestimonialCard key={testimonial.name} {...testimonial} />
        })}
      </ul>
    </section>
  );
};

export default Testimonials;
