import React from 'react'
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

const BuyModal = ({ handleClose, open }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl !p-8 text-center border border-white/40"
        sx={{
          transform: "translate(-50%, -50%)",
          width: 380,
        }}
      >
        <Typography className="text-gray-800 !font-bold !mb-4 tracking-wide">
          Contact Us to Purchase
        </Typography>

        <Typography className="text-gray-700 !mb-6 text-[13px]">
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
            className="flex items-center gap-3 w-full justify-center !bg-[#0BA6DF] hover:!bg-[#0695c8] text-white !py-3 rounded-lg font-medium transition duration-300"
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
  );
};

export default BuyModal