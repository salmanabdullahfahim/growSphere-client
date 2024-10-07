import React from "react";
import { AnimatedBeamDemo } from "./AnimatedBeam";
import { Iphone15ProDemo } from "./PhoneDemo";

const Features = () => {
  return (
    <div className="mb-6 pt-9">
      <div>
        <h2 className="text-3xl md:text-[45px] text-gray-700 font-bold text-center mb-4">
          Features of GrowSphere
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-2 px-12 my-12 w-full ">
        <div className="w-full md:w-3/4 px-4">
          <h2 className="text-2xl font-semibold mb-4 mt-4">
            Seamless Sharing & Easy to use from any device{" "}
          </h2>
          <p className="mb-4">
            GrowSphere links with gardening tools, enabling easy access and
            sharing of data across devices, at home or in the garden.
          </p>
          <AnimatedBeamDemo />
        </div>
        <div className=" mt-16 bg-white rounded-xl shadow-xl w-full md:w-1/4 flex justify-center items-center">
          <Iphone15ProDemo />
        </div>
      </div>
    </div>
  );
};

export default Features;
