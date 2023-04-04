import React from 'react';

import PlanGenerationForm from './components/PlanGenerationForm/Presentational';

const PlanGeneration: React.FC = () => {
  return (
    <div id="generate" className="py-16 w-full">
      <PlanGenerationForm />
    </div>
  );
};

export default PlanGeneration;
