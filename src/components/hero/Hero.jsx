import { useState } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaWindows } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { SiMacos } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Sparkle from "../decorative/Sparkle";
import Arrow from "../decorative/Arrow";
import UnderlineSVG from "../decorative/UnderlineSVG";
import BuyModal from "../buyModal/BuyModal";
import HeroImage from "../../assets/hero-image.png";

const Hero = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="lg:!pt-[15rem] !pt-[10rem] lg:!px-20 !px-8 max-w-[1400px] !mx-auto !pb-20 relative overflow-hidden">
      {/* Floating Sparkle - Animated & Glowing */}
      <motion.div
        className="absolute top-50 left-10 text-cyan-400/30 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkle className="w-8 h-8 drop-shadow-glow" />
      </motion.div>

      {/* Floating Arrow - Animated & Glowing */}
      <motion.div
        className="absolute top-32 right-10 text-pink-400/30 hidden lg:block"
        animate={{
          x: [0, 15, 0],
          rotate: [0, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Arrow className="w-8 h-8 drop-shadow-glow" />
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-between !gap-16">
        {/* Left Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <h1 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] font-extrabold lg:leading-[60px] leading-[40px] text-center lg:text-left">
              Ultimate Digital Shield: Hack, Track, and Recover – Your{" "}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
                >
                  Secret Weapon
                </span>
                <UnderlineSVG className="absolute -bottom-3 left-0 w-full text-cyan-400" />
              </span>{" "}
              Against Betrayal and Loss
            </h1>
          </div>

          <p className="!mt-8 text-cyan-100/80 text-[14px] md:text-lg lg:text-xl text-center lg:text-left leading-relaxed font-light">
            Empower yourself with cutting-edge tools to{" "}
            <strong>spy on social media</strong>, <strong>hack devices</strong>,
            reclaim <strong>stolen crypto</strong>, track locations, and erase
            digital footprints – all <strong>ethically and discreetly</strong>,
            with expert support for total peace of mind.
          </p>

          {/* Platform Icons */}
          <div className="!mt-10 text-center lg:text-left">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest !mb-2">
              Available on
            </p>
            <motion.div
              className="flex items-center justify-center lg:justify-start !gap-6 text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { Icon: FaApple, color: "text-gray-400", hover: "text-white" },
                {
                  Icon: IoLogoAndroid,
                  color: "text-gray-400",
                  hover: "text-white",
                },
                {
                  Icon: FaWindows,
                  color: "text-gray-400",
                  hover: "text-white",
                },
                { Icon: SiMacos, color: "text-gray-400", hover: "text-white" },
              ].map(({ Icon, color, hover }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`${color} hover:${hover} transition-all duration-300 cursor-pointer drop-shadow-glow`}
                >
                  <Icon className={i === 3 ? "text-4xl" : ""} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center !gap-5 !mt-12 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/demo" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto min-w-[160px] border !border-cyan-500/50 hover:bg-cyan-900/20 text-cyan-300 backdrop-blur-sm font-medium rounded-xl !px-8 !py-4 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105">
                View Demo
              </button>
            </Link>

            <button
              onClick={handleOpen}
              className="w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl !px-8 !py-4 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
            >
              Try it Now
            </button>
          </motion.div>
        </motion.div>

        {/* Right Section - Hero Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-[600px] group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Glowing Background Blur */}
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/30 via-purple-600/20 to-pink-500/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image Container */}
            <div className="relative backdrop-blur-sm bg-white/5 border border-cyan-500/30 rounded-3xl p-2 shadow-2xl">
              <img
                src={HeroImage}
                alt="Digital security and monitoring dashboard showcasing hack, track, and recovery tools"
                className="relative w-full rounded-2xl object-cover shadow-inner"
              />
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-900/50 to-transparent opacity-50" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Buy Modal */}
      <AnimatePresence>
        {open && <BuyModal handleClose={handleClose} open={open} />}
      </AnimatePresence>

      {/* Custom CSS for Glow */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))
            drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
        }
        .text-shadow-glow {
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.6),
            0 0 30px rgba(0, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Hero;
