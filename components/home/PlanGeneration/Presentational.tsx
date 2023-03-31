import React from 'react';

import PlanGenerationForm from './components/PlanGenerationForm/Presentational';

const PlanGeneration: React.FC = () => {
  return (
    <div id="generate" className="min-h-full py-16 plan-generation-container container">
      <h1 className="text-center mx-auto mb-5 max-w-4xl font-display text-2xl font-bold tracking-normal sm:text-5xl text-section-title">
        Create your personalized meal plan
      </h1>
      <h2 className="text-center mx-auto mb-4 max-w-xl text-lg leading-7 text-section-subtitle text-section-subtitle">
        Enter your information and a list of ingredients to get started
      </h2>
      <PlanGenerationForm />
    </div>
  );
};

export default PlanGeneration;
