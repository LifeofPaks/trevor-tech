// BuyModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { Box, IconButton, Typography } from "@mui/material";

const BuyModal = ({ open, handleClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
        backdropFilter: "blur(10px)",
      }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #0a0a1f 0%, #1a0033 100%)",
          borderRadius: "1.5rem",
          padding: "2rem",
          maxWidth: "420px",
          width: "90%",
          position: "relative",
          border: "1px solid rgba(0, 186, 255, 0.4)",
          boxShadow: "0 0 70px rgba(0, 186, 255, 0.35)",
          backdropFilter: "blur(12px)",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#00ffff",
            bgcolor: "rgba(0, 255, 255, 0.1)",
            "&:hover": { bgcolor: "rgba(0, 255, 255, 0.2)" },
          }}
        >
          <FiX size={20} />
        </IconButton>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              mb: 1.5,
            }}
          >
            Contact Us to Purchase
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              mb: 3,
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            Our team will activate your access instantly after payment.
          </Typography>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <a
            href="mailto:support@spycontrol.io"
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white !py-3 rounded-xl font-medium transition duration-300 shadow-md backdrop-blur-sm"
          >
            <FaEnvelope size={18} />
            Email Support
          </a>

          <a
            href="https://t.me/spycontrol_support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#0BA6DF] to-[#00d4ff] hover:from-[#0695c8] hover:to-[#00a8cc] text-white !py-3 rounded-xl font-medium transition duration-300 shadow-md backdrop-blur-sm"
          >
            <FaTelegramPlane size={18} />
            Message on Telegram
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Typography
            variant="caption"
            sx={{ color: "rgba(0, 255, 255, 0.6)", fontSize: "0.75rem" }}
          >
            Response within <strong>5 minutes</strong> • 24/7 Support
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default BuyModal;
