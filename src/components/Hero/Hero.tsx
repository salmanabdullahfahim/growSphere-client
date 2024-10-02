import React from "react";
import { AnimatedShinyTextDemo } from "./AnimatedText";
import GradualSpacing from "../ui/gradual-spacing";

const Hero = () => {
  return (
    <div className="my-6 h-[70vh]">
      <AnimatedShinyTextDemo />
      <div className="font-display  text-center text-4xl font-bold -tracking-widest  md:text-7xl md:leading-[5rem]">
        <GradualSpacing className="text-black" text="Grow Your Garden," />
        <GradualSpacing className="text-green-600" text="Grow Your Life" />
      </div>
    </div>
  );
};

export default Hero;
