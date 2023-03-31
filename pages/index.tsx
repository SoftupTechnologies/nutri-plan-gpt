import React from 'react';

import HeroSection from '@/components/home/HeroSection/Presentational';
import PlanGeneration from '@/components/home/PlanGeneration/Presentational';
import Testimonials from '@/components/home/Testimonials/Presentational';
import Layout from '@/components/layout';
import MenuSection from '@/components/home/MenuSection/Presentational';


const Home: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <PlanGeneration />
      <Testimonials />
      <MenuSection />
    </Layout>
  );
};

export default Home;
