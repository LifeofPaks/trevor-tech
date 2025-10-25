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

const Hero = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="!mt-[10rem] !px-[5rem] max-w-[1400px] !mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-[2rem]">
        {/* Left section */}
        <div className="flex-1">
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
            <div className="flex items-center gap-3 !mt-2 text-gray-800 text-[24px]">
              <FaApple />
              <IoLogoAndroid />
              <FaWindows />
              <SiMacos className="text-[28px]" />
            </div>
          </div>

          <div className="flex items-center gap-4 !mt-6">
            <Link to="/demo" className="cursor-pointer">
              <button className="w-[150px] border border-gray-800 text-gray-800 !px-6 !py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                View Demo
              </button>
            </Link>

            <button
              onClick={handleOpen}
              className="w-[150px] bg-red-500 text-white !px-6 !py-3 rounded-lg font-medium hover:bg-red-600 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Right section (image) */}
        <motion.img
          src={HeroImage}
          alt="hero-image"
          className="w-[600px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute top-1/2 left-1/2 bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl !p-8 text-center border border-white/40"
          sx={{
            transform: "translate(-50%, -50%)",
            width: 350,
          }}
        >
          <Typography
            className="text-gray-800 !font-bold !mb-4 tracking-wide"
          >
            Contact Us to Purchase
          </Typography>

          <Typography className="text-gray-700 !mb-6 text-sm">
            Reach out via email or Telegram, our support team will assist you
            quickly.
          </Typography>

          <div className="flex flex-col gap-4 items-center">
            {/* Email */}
            <a
              href="mailto:support@yourdomain.com"
              className="flex items-center gap-3 w-full justify-center bg-amber-100 hover:bg-amber-200 text-gray-800 !py-3 rounded-lg font-medium transition duration-300"
            >
              <FaEnvelope className="text-[20px]" />
              Email Us
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/YourTelegramUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full justify-center bg-blue-500 hover:bg-blue-600 text-white !py-3 rounded-lg font-medium transition duration-300"
            >
              <FaTelegramPlane className="text-[20px]" />
              Message on Telegram
            </a>
          </div>

          <IconButton
            onClick={handleClose}
                      sx={{ position: "absolute", top: 10, right: 10 }}
                      className="w-[30px] h-[30px] bg-white/50 hover:bg-white/70 backdrop-blur-md"
          >
            <span className="text-[15px]">✕</span>
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
};

export default Hero;
