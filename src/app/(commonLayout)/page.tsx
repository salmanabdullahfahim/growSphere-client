import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import { HeroVideoDialogDemo } from "@/components/Hero/HeroVideo";
import HomePost from "@/components/Home/HomePost";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Review from "@/components/Review/Review";

import React from "react";

const HomePage = async () => {
  return (
    <div>
      <Hero />
      <HeroVideoDialogDemo />
      <ImageGallery />
      <HomePost />
      <Features />
      <Review />
    </div>
  );
};

export default HomePage;
