import React from 'react';

import HeroSection from '@/components/home/HeroSection/Presentational';
import PlanGeneration from '@/components/home/PlanGeneration/Presentational';
import Layout from '@/components/layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <PlanGeneration />
    </Layout>
  );
};

export default Home;
