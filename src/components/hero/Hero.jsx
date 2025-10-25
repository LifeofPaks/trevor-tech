import { useState } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaWindows } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { SiMacos } from "react-icons/si";
import { motion } from "framer-motion";
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
    <div className="!mt-[15rem] lg:!px-20 !px-8 max-w-[1400px] mx-auto !pb-12 relative">
      {/* Floating Sparkle */}
      <motion.div
        className="absolute top-0 left-10 text-primary/20 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkle />
      </motion.div>

      {/* Floating Arrow */}
      <motion.div
        className="absolute top-32 right-10 text-primary/20 hidden lg:block"
        animate={{
          x: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Arrow />
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-[1.6] text-center lg:text-left">
              Ultimate Digital Shield: Hack, Track, and Recover – Your{" "}
              <span className="relative inline-block">
                Secret Weapon
                <UnderlineSVG className="absolute -bottom-2 left-0 w-full" />
              </span>{" "}
              Against Betrayal and Loss
            </h1>
          </div>

          <p className="!mt-6 text-muted-foreground text-base md:text-lg lg:text-xl text-center lg:text-left leading-relaxed">
            Empower yourself with cutting-edge tools to spy on social media,
            hack devices, reclaim stolen crypto, track locations, and erase
            digital footprints – all ethically and discreetly, with expert
            support for total peace of mind.
          </p>

          <div className="!mt-8 text-center lg:text-left">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Available on
            </p>
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-4 !mt-3 text-foreground/70 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, color: "hsl(var(--foreground))" }}
                transition={{ type: "spring" }}
              >
                <FaApple />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "hsl(var(--foreground))" }}
                transition={{ type: "spring" }}
              >
                <IoLogoAndroid />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "hsl(var(--foreground))" }}
                transition={{ type: "spring" }}
              >
                <FaWindows />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "hsl(var(--foreground))" }}
                transition={{ type: "spring" }}
              >
                <SiMacos className="text-3xl" />
              </motion.div>
            </motion.div>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 !mt-8 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/demo" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto min-w-[150px] border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-lg !px-6 !py-3 transition duration-300">
                View Demo
              </button>
            </Link>

            <button
              onClick={handleOpen}
              className="w-full sm:w-auto min-w-[150px] bg-[#0BA6DF] hover:bg-[#0695c8] text-white font-medium rounded-lg !px-6 !py-3 transition duration-300"
            >
              Try it Now
            </button>
          </motion.div>
        </motion.div>

        {/* Right section (image) */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative w-full max-w-[600px]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-cyan/20 to-primary/20 rounded-2xl blur-2xl" />
            <img
              src={HeroImage}
              alt="Digital security and monitoring dashboard showcasing hack, track, and recovery tools"
              className="relative w-full rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      <BuyModal handleClose={handleClose} open={open} />
    </div>
  );
};

export default Hero;
