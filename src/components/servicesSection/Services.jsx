import React from "react";
import PhoneSection from "./PhoneSection";
import GallerySection from "./GallerySection";

const Services = () => {
  return (
    <div className="bg-white">
      <div className="!p-[5rem] max-w-[1400px] !mx-auto">
              <PhoneSection />
              <GallerySection/>
      </div>
    </div>
  );
};

export default Services;
