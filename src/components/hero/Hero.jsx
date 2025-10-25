import React from "react";
import HeroImage from "../../assets/hero-image.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mt-[10rem]! px-[5rem]! max-w-[1400px] !mx-auto ">
      <div className="flex items-center justify-between gap-[1rem]">
        <div>
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-extrabold text-gray-800 leading-tight">
            Ultimate Digital Shield: Hack, Track, and Recover – Your Secret
            Weapon Against Betrayal and Loss
          </h1>
          <p className="!mt-4 text-gray-600 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem]">
            Empower yourself with cutting-edge tools to spy on social media,
            hack devices, reclaim stolen crypto, track locations, and erase
            digital footprints – all ethically and discreetly, with expert
            support for total peace of mind.
          </p>

          <div className="!mt-6">
            <p className="text-[12px] font-bold">Available on</p>
                      <div className="!mt-2">
                          <div></div>
            </div>
          </div>

          <div className="flex items-center gap-4 !mt-6">
            <Link to="/demo" className="cursor-pointer">
              <button className="w-[150px]  border border-gray-800 text-gray-800 !px-6 !py-3 rounded-lg font-medium  transition duration-300">
                View Demo
              </button>
            </Link>

            <button className=" w-[150px]  bg-red-500 text-white !px-6 !py-3 rounded-lg font-medium hover:bg-red-600 transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
        <img src={HeroImage} alt="hero-image" className="w-[600px]" />
      </div>
    </div>
  );
};

export default Hero;
