import React from "react";
import HeroSection from "../../components/userComponent/homeComponent/HeroSection";
import MainSection from "../../components/userComponent/homeComponent/MainSection";
import TextAndSlider from "../../components/userComponent/homeComponent/TextAndSlider";
import ForthSection from "../../components/userComponent/homeComponent/ForthSection";
import ImageSection from "../../components/userComponent/homeComponent/ImageSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MainSection />
      <TextAndSlider />
      <ForthSection />
      <ImageSection />
    </>
  );
}
