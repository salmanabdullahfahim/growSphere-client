import React from "react";
import { AnimatedShinyTextDemo } from "./AnimatedText";
import GradualSpacing from "../ui/gradual-spacing";

const Hero = () => {
  return (
    <div className="my-6 h-screen">
      <AnimatedShinyTextDemo />
      <div className="font-display text-center text-4xl font-bold -tracking-widest md:text-7xl md:leading-[5rem]">
        <GradualSpacing
          className="text-black"
          text="Grow Your Garden, Grow Your Life"
        />
      </div>
    </div>
  );
};

export default Hero;
