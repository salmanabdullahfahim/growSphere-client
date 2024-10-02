import React from "react";
import { MarqueeDemo } from "./MarqueCard";

const Review = () => {
  return (
    <div className="">
      <h2 className="text-3xl md:text-[45px] text-gray-700  font-bold mb-4 text-center mt-12 md:mt-40">
        Reviews from our users
      </h2>
      <MarqueeDemo />
    </div>
  );
};

export default Review;
