import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Review from "@/components/Review/Review";

import React from "react";

const HomePage = async () => {
  return (
    <div>
      <Hero />
      <ImageGallery />
      <Features />
      <Review />
    </div>
  );
};

export default HomePage;
