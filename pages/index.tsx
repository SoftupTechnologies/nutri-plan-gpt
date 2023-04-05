import React, { useContext } from 'react';

import HeroSection from '@/components/home/HeroSection/Presentational';
import MenuSection from '@/components/home/MenuSection/Presentational';
import PlanGeneration from '@/components/home/PlanGeneration/Presentational';
import Testimonials from '@/components/home/Testimonials/Presentational';
import Layout from '@/components/layout';
import { HomeContext } from '@/components/home/Context/HomeContext';

const Home: React.FC = () => {
  const {modalIsOpen}=useContext(HomeContext)
  return (
    <Layout>
      <HeroSection />
      <PlanGeneration />
      {!modalIsOpen && <Testimonials />}
    </Layout>
  );
};

export default Home;
