import React, { useState } from "react";
import HeroImage from "../../assets/hero-image.png";
import { Link } from "react-router-dom";
import {
  FaApple,
  FaWindows,
  FaTelegramPlane,
  FaEnvelope,
} from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { SiMacos } from "react-icons/si";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import BuyModal from "../buyModal/BuyModal";

const Hero = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="!mt-[10rem] lg:!px-[5rem] !px-[2rem] max-w-[1400px] !mx-auto !pb-[3rem]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-[2rem]">
        {/* Left section */}
        <div className="flex-1">
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-extrabold text-gray-800 leading-tight text-center lg:text-left">
            Ultimate Digital Shield: Hack, Track, and Recover – Your Secret
            Weapon Against Betrayal and Loss
          </h1>

          <p className="!mt-4 text-gray-600 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] text-center lg:text-left">
            Empower yourself with cutting-edge tools to spy on social media,
            hack devices, reclaim stolen crypto, track locations, and erase
            digital footprints – all ethically and discreetly, with expert
            support for total peace of mind.
          </p>

          <div className="!mt-6 text-center lg:text-left">
            <p className="text-[12px] font-bold">Available on</p>
            <div className="flex items-center justify-center lg:justify-start gap-3 !mt-2 text-gray-800 text-[24px]">
              <FaApple />
              <IoLogoAndroid />
              <FaWindows />
              <SiMacos className="text-[28px]" />
            </div>
          </div>

          <div className="flex items-center gap-4 !mt-6 justify-center lg:justify-start">
            <Link to="/demo" className="cursor-pointer">
              <button className="w-[150px] border border-gray-800 text-gray-800 !px-6 !py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                View Demo
              </button>
            </Link>

            <button
              onClick={handleOpen}
              className="w-[150px] bg-[#0BA6DF] hover:!bg-[#0695c8] text-white !px-6 !py-3 rounded-lg font-medium transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Right section (image) */}
        <motion.img
          src={HeroImage}
          alt="hero-image"
          className="w-[600px]  rounded-xl object-cover shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <BuyModal handleClose={handleClose} open={open} />

    </div>
  );
};

export default Hero;
