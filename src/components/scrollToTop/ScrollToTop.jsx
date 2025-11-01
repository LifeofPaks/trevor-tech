import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-30 right-8 bg-gradient-to-r from-cyan-500 to-teal-600 backdrop-blur-sm border border-cyan-500/40 !p-4 rounded-full shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300 z-50 group"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{
              scale: 1.2,
              boxShadow:
                "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon with Glow */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="w-6 h-6 text-white drop-shadow-glow" />
            </motion.div>

            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-70"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Glow Filter */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
