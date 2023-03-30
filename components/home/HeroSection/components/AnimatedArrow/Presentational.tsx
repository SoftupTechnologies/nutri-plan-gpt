import React from "react";
import { motion } from "framer-motion";

const AnimatedArrow: React.FC = () => {
  const transitionValues = {
    duration: 0.8,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeOut",
  };
  const iconStyle = {
    display: "block",
    width: "3rem",
    height: "3rem",
  };

  return (
    <motion.svg
      style={iconStyle}
      className="cursor-pointer fill-primary"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      transition={{
        y: transitionValues,
        width: transitionValues,
        height: transitionValues,
      }}
      animate={{
        y: ["0rem", "0.1rem"],
        width: ["3rem", "3.3rem", "3.4rem"],
        height: ["3rem", "3.5rem", "3.6rem"],
      }}
    >
      <path d="M512 785.066667a17.015467 17.015467 0 0 1-12.066133-5.000534l-256-256a17.0496 17.0496 0 1 1 24.132266-24.132266L512 743.867733l243.933867-243.933866a17.0496 17.0496 0 1 1 24.132266 24.132266l-256 256A17.015467 17.015467 0 0 1 512 785.066667z m0-256a17.015467 17.015467 0 0 1-12.066133-5.000534l-256-256a17.0496 17.0496 0 1 1 24.132266-24.132266L512 487.867733l243.933867-243.933866a17.0496 17.0496 0 1 1 24.132266 24.132266l-256 256A17.015467 17.015467 0 0 1 512 529.066667z" />
    </motion.svg>
  );
};

export default AnimatedArrow;
