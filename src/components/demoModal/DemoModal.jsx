import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

const DemoModal = ({
  openDemoModal,
  onCloseDemoModal,
  handleOpenDemoModal, // Opens Buy Modal
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <Modal open={openDemoModal} onClose={onCloseDemoModal}>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backdropFilter: "blur(12px)" }}
          onClick={onCloseDemoModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f]/90 via-[#0f0f2a]/80 to-[#1a0033]/90" />

          {/* Modal Card */}
          <motion.div
            className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/40 rounded-3xl !p-8 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 0 60px rgba(0, 255, 255, 0.3), 0 0 120px rgba(0, 255, 255, 0.15)",
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onCloseDemoModal}
              className="absolute top-4 right-4 w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX className="w-5 h-5 text-cyan-300 group-hover:text-white drop-shadow-glow" />
            </motion.button>

            {/* Title */}
            <motion.h5
              className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("dm.title")}
            </motion.h5>

            {/* Description */}
            <motion.p
              className="text-center text-cyan-200/85 text-sm sm:text-base leading-relaxed !mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t("dm.description")}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col items-center !gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/demo"
                className="w-full"
                onClick={onCloseDemoModal}
              >
                <motion.button
                  className="w-full  border !border-cyan-500/60 hover:bg-cyan-900/30 text-cyan-300 backdrop-blur-sm font-semibold !px-6 !py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:text-cyan-100"
                  whileHover={{ boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }}
                >
                  {t("dm.button_view_demo")}
                </motion.button>
              </Link>

              <motion.button
                onClick={() => {
                  handleOpenDemoModal();
                  onCloseDemoModal();
                }}
                className="w-full  bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-semibold !px-6 !py-3 rounded-xl shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
                whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)" }}
                whileTap={{ scale: 0.98 }}
              >
                {t("dm.button_try_now")}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
};

export default DemoModal;
