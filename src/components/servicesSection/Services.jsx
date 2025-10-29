import React from "react";
import PhoneSection from "./PhoneSection";
import GallerySection from "./GallerySection";
import LocationSection from "./LocationSection";

const Services = () => {
  return (
    <div id="services">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-pink-900/10 pointer-events-none"></div>
      <div className="lg:!p-[5rem] !p-[2rem] max-w-[1400px] !mx-auto">
        <PhoneSection />
        <GallerySection />
        <LocationSection />
      </div>
    </div>
  );
};

export default Services;
