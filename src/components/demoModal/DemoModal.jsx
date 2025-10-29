import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Box, IconButton, Typography } from "@mui/material";

const DemoModal = ({
  openDemoModal,
  onCloseDemoModal,
  handleOpenDemoModal, // This will open Buy Modal
}) => {
  if (!openDemoModal) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backdropFilter: "blur(8px)",
      }}
      onClick={onCloseDemoModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #0a0a1f 0%, #1a0033 100%)",
          borderRadius: "1.5rem",
          padding: "2rem",
          maxWidth: "500px",
          width: "90%",
          position: "relative",
          border: "1px solid rgba(0, 186, 255, 0.3)",
          boxShadow: "0 0 60px rgba(0, 186, 255, 0.3)",
        }}
      >
        <IconButton
          onClick={onCloseDemoModal}
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              mb: 2,
            }}
          >
            Remote Spy & Control
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "center",
              mb: 3,
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            Remotely access{" "}
            <strong>any Android, iPhone, tablet, or computer</strong>. View{" "}
            <strong>messages, calls, GPS, photos, apps, and keystrokes</strong>{" "}
            —<strong>no physical access needed</strong>.
          </Typography>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 !mt-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/demo"
            className="w-full sm:w-auto"
            onClick={onCloseDemoModal}
          >
            <button className="w-full sm:w-auto min-w-[150px] border !border-gray-500 hover:bg-gray-100 text-gray-500 font-medium rounded-lg !px-6 !py-3 transition duration-300">
              View Demo
            </button>
          </Link>
          <button
            onClick={() => {
              handleOpenDemoModal(); // Opens Buy Modal
              onCloseDemoModal(); // Closes Demo Modal
            }}
            className="w-full sm:w-auto min-w-[150px] bg-[#0BA6DF] hover:bg-[#0695c8] text-white font-medium rounded-lg !px-6 !py-3 transition duration-300"
          >
            Try it Now
          </button>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default DemoModal;
