import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaEnvelope, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Modal } from "@mui/material";

const BuyModal = ({ open, handleClose }) => {
  return (
    <AnimatePresence>
      <Modal open={open} onClose={handleClose}>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backdropFilter: "blur(12px)" }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f]/90 via-[#0f0f2a]/80 to-[#1a0033]/90" />

          {/* Modal Card */}
          <motion.div
            className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/40 rounded-3xl !p-8 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 0 70px rgba(0, 255, 255, 0.35), 0 0 140px rgba(0, 255, 255, 0.2)",
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX className="w-5 h-5 text-cyan-300 group-hover:text-white drop-shadow-glow" />
            </motion.button>

            {/* Title */}
            <motion.h6
              className="text-xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-3"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Contact Us to Purchase
            </motion.h6>

            {/* Subtitle */}
            <motion.p
              className="text-center text-cyan-200/80 text-sm leading-relaxed !mb-6 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Our team will activate your access <strong>instantly</strong>{" "}
              after payment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col !gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {/* Email */}
              <a
                href="mailto:trevortechx@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center !gap-3 w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white !py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/40"
              >
                <FaEnvelope size={19} className="drop-shadow-glow" />
                Email Support
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/message/KWVL23R3QYRCO1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center !gap-3 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white !py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 backdrop-blur-sm border border-green-400/40"
              >
                <FaWhatsapp size={19} className="drop-shadow-glow" />
                Chat on WhatsApp
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/trevortechx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center !gap-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white !py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 backdrop-blur-sm border border-blue-400/40"
              >
                <FaTelegramPlane size={19} className="drop-shadow-glow" />
                Message on Telegram
              </a>
            </motion.div>

            {/* Support Info */}
            <motion.p
              className="!mt-5 text-center text-cyan-300/70 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Response within{" "}
              <strong className="text-cyan-200">5 minutes</strong> • 24/7
              Support
            </motion.p>
          </motion.div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
};

export default BuyModal;