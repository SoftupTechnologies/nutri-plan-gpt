import Layout from "@/components/layout";
import HeroSection from "@/components/home/HeroSection/Presentational";
import React from "react";
import Testimonials from "@/components/home/Testimonials/Presentational";

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <Testimonials/>
    </Layout>
  );
};

export default Home;
