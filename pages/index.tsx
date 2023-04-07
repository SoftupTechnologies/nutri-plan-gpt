import React, { useContext } from 'react';

import { HomeContext } from '@/components/home/Context/HomeContext';
import HeroSection from '@/components/home/HeroSection/Presentational';
import PlanGeneration from '@/components/home/PlanGeneration/Presentational';
import Testimonials from '@/components/home/Testimonials/Presentational';
import Layout from '@/components/layout';

const Home: React.FC = () => {
  const { modalIsOpen, isContentGenerated } = useContext(HomeContext);
  return (
    <Layout>
      <HeroSection />
      <PlanGeneration />
      {(!modalIsOpen && !isContentGenerated) && <Testimonials />}
    </Layout>
  );
};

export default Home;
