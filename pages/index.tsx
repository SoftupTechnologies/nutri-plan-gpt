import React, { useContext } from "react";
import HeroSection from "@/components/home/HeroSection/Presentational";
import PlanGeneration from "@/components/home/PlanGeneration/Presentational";
import Testimonials from "@/components/home/Testimonials/Presentational";
import { GlobalContext } from "context/GlobalContext";

const Home: React.FC = () => {
  const { modalIsOpen, isContentGenerated } = useContext(GlobalContext);
  return (
    <>
      <HeroSection />
      <PlanGeneration />
      {!modalIsOpen && !isContentGenerated && <Testimonials />}
    </>
  );
};

export default Home;
