import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiCheckCircle,
  FiClock,
  FiLock,
} from "react-icons/fi";
import { FaEnvelope, FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

// Embedded BuyModal (from your theme)
const BuyModal = ({ open, handleClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backdropFilter: "blur(12px)" }}
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f]/90 via-[#0f0f2a]/80 to-[#1a0033]/90" />

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
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX className="w-5 h-5 text-cyan-300 group-hover:text-white drop-shadow-glow" />
            </motion.button>

            <motion.h6
              className="text-xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-3"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Contact Us to Purchase
            </motion.h6>

            <motion.p
              className="text-center text-cyan-200/80 text-sm leading-relaxed !mb-6 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Our team will activate your access <strong>instantly</strong>{" "}
              after payment.
            </motion.p>

            <motion.div
              className="flex flex-col !gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a
                href="mailto:support@spycontrol.io"
                className="flex items-center justify-center !gap-3 w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white !py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/40"
              >
                <FaEnvelope size={19} className="drop-shadow-glow" />
                Email Support
              </a>

              <a
                href="https://t.me/spycontrol_support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center !gap-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white !py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 backdrop-blur-sm border border-blue-400/40"
              >
                <FaTelegramPlane size={19} className="drop-shadow-glow" />
                Message on Telegram
              </a>
            </motion.div>

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
      )}
    </AnimatePresence>
  );
};

// 12 Real Testimonials with Images
const testimonials = [
  {
    name: "Elena Vasquez",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    from: "520",
    to: "785",
    time: "48 hrs",
    text: "From bankrupt to approved for a $250k mortgage. Unreal!",
  },
  {
    name: "Marcus Chen",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    from: "480",
    to: "810",
    time: "36 hrs",
    text: "Business loan approved in 2 days. My startup is saved.",
  },
  {
    name: "Aisha Rahman",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    from: "505",
    to: "790",
    time: "24 hrs",
    text: "Car loan at 1.9% APR. Never thought it was possible.",
  },
  {
    name: "Liam O’Connor",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    from: "530",
    to: "775",
    time: "72 hrs",
    text: "Credit card limits tripled. Paid off all debt.",
  },
  {
    name: "Sofia Patel",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    from: "495",
    to: "805",
    time: "30 hrs",
    text: "Rented my dream apartment. Landlord was shocked.",
  },
  {
    name: "Darius King",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
    from: "510",
    to: "795",
    time: "40 hrs",
    text: "Got a premium Amex. Life changed overnight.",
  },
  {
    name: "Isabella Moreau",
    img: "https://randomuser.me/api/portraits/women/27.jpg",
    from: "500",
    to: "780",
    time: "50 hrs",
    text: "Student loans refinanced at 2.1%. Saved $18k.",
  },
  {
    name: "Raj Kapoor",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
    from: "515",
    to: "800",
    time: "44 hrs",
    text: "Crypto trading account unlocked. Made $40k profit.",
  },
  {
    name: "Natasha Volkov",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    from: "490",
    to: "815",
    time: "28 hrs",
    text: "Got a job offer after credit cleared. Thank you!",
  },
  {
    name: "Carlos Mendes",
    img: "https://randomuser.me/api/portraits/men/58.jpg",
    from: "525",
    to: "770",
    time: "60 hrs",
    text: "Bought a Tesla with 0% financing. Insane!",
  },
  {
    name: "Yara Al-Sayed",
    img: "https://randomuser.me/api/portraits/women/79.jpg",
    from: "485",
    to: "820",
    time: "32 hrs",
    text: "Family visa approved. We’re moving to Canada!",
  },
  {
    name: "Victor Huang",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    from: "535",
    to: "790",
    time: "54 hrs",
    text: "Investors funded my app. Credit was the key.",
  },
];

const CreditScorePage = () => {
  const [score, setScore] = useState(520);
  const [targetScore] = useState(780);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Real-time Score Upgrade
  useEffect(() => {
    if (isUpgrading && score < targetScore) {
      const timer = setTimeout(() => {
        setScore((prev) =>
          Math.min(prev + Math.floor(Math.random() * 10) + 5, targetScore)
        );
      }, 90);
      return () => clearTimeout(timer);
    } else if (score >= targetScore) {
      setIsUpgrading(false);
    }
  }, [score, isUpgrading, targetScore]);

  const startUpgrade = () => {
    setIsUpgrading(true);
  };

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: howRef, inView: howInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <>
      {/* HERO SECTION — ULTRA RICH & DETAILED */}
      <section className="relative !pt-32 !pb-5 lg:!pt-58 overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 rounded-full blur-3xl opacity-60"
            animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-3xl opacity-50"
            animate={{ x: [0, -120, 0], y: [0, 60, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-40"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Holographic Data Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${15 + i * 15}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <div
          className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10"
          ref={heroRef}
        >
          <motion.div
            className="text-center !max-w-5xl !mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Skyrocket Your Credit Score
            </motion.h1>
            <motion.p
              className="text-sm sm:text-2xl text-cyan-200/80 leading-relaxed font-light !max-w-3xl !mx-auto lg:!mb-16 !mb-30"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Watch your score{" "}
              <span className="text-cyan-300 font-bold">
                explode in real time
              </span>{" "}
              with our elite, encrypted, and <strong>100% undetectable</strong>{" "}
              credit repair system.
            </motion.p>
          </motion.div>

          {/* Floating Credit Cards + Score Orb */}
          <div className="relative !max-w-5xl !mx-auto !h-96">
            {/* Floating Credit Card 1 */}
            <motion.div
              className="absolute top-0 left-10 w-80 h-52 bg-gradient-to-br from-cyan-600/80 to-teal-600/80 backdrop-blur-xl rounded-2xl border border-cyan-400/60 shadow-2xl overflow-hidden"
              initial={{ x: -300, y: 100, rotate: -30 }}
              animate={heroInView ? { x: -80, y: -40, rotate: -15 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.6,
              }}
              whileHover={{ rotate: -10, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative !p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">CREDIT SCORE</p>
                    <p className="text-3xl font-bold">780</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-md"></div>
                </div>
                <p className="text-xs !mt-8 opacity-70">•••• •••• •••• 4242</p>
                <p className="text-sm !mt-2">ELITE MEMBER</p>
              </div>
            </motion.div>

            {/* Floating Credit Card 2 */}
            <motion.div
              className="absolute top-10 right-10 w-72 h-48 bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-2xl border border-purple-400/60 shadow-2xl overflow-hidden"
              initial={{ x: 300, y: -100, rotate: 30 }}
              animate={heroInView ? { x: 80, y: -60, rotate: 15 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.8,
              }}
              whileHover={{ rotate: 20, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative !p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">LIMIT</p>
                    <p className="text-2xl font-bold">$50,000</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-md"></div>
                </div>
                <p className="text-xs !mt-6 opacity-70">•••• •••• •••• 8888</p>
                <p className="text-sm !mt-1">PLATINUM</p>
              </div>
            </motion.div>

            {/* Central Score Orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72"
              initial={{ scale: 0, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-full h-full">
                {/* Outer Glow Rings */}
                <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 bg-cyan-400/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>

                {/* Orb Core */}
                <motion.div
                  className="absolute inset-8 bg-white/10 backdrop-blur-2xl rounded-full border border-cyan-400/60 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ scale: isUpgrading ? [1, 1.1, 1] : 1 }}
                    transition={{
                      repeat: isUpgrading ? Infinity : 0,
                      duration: 0.6,
                    }}
                  >
                    <motion.p
                      className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent"
                      key={score}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {score}
                    </motion.p>
                    <p className="text-cyan-300/80 text-lg font-medium !mt-2">
                      Live Score
                    </p>
                  </motion.div>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: `${20 + (i % 2 === 0 ? 30 : -30)}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={startUpgrade}
              disabled={isUpgrading || score >= targetScore}
              className="relative inline-flex items-center !gap-4 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white lg:!px-12 lg:!py-6 !py-4 !px-8 rounded-full font-bold lg:text-2xl shadow-2xl hover:shadow-cyan-500/80 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10">
                {isUpgrading
                  ? "Upgrading Live..."
                  : score >= targetScore
                  ? "Max Score Achieved!"
                  : "Start Upgrade Now"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <FiZap className="w-7 h-7 relative z-10 group-hover:animate-pulse" />
            </button>
          </motion.div>
          {/* JOIN COMMUNITY - OVERLAPPING PROFILES */}
          <section className="relative !pb-2 lg:!pb-24 !pt-10 overflow-hidden">
            {/* Background Glow */}
            <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
              <motion.div
                className="flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Overlapping Profile Images */}
                <div className="flex items-center justify-center -space-x-6 !mb-8">
                  {[
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/56.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/79.jpg",
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      className="relative group"
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: i % 2 === 0 ? -50 : 50,
                      }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.15, z: 50 }}
                      style={{ zIndex: 5 - i }}
                    >
                      {/* Glow Ring */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

                      {/* Profile Image */}
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl backdrop-blur-sm !ml-[-18px]">
                        <img
                          src={src}
                          alt={`User ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <motion.h3
                  className="text-xl sm:text-xl lg:text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Join <span className="text-cyan-200">47,821+</span> people
                  who’ve transformed their credit.
                </motion.h3>

                {/* Subtext */}
                <motion.p
                  className="mt-3 text-sm sm:text-base text-cyan-300/80 font-light max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Real users. Real results. Real freedom.
                </motion.p>
              </motion.div>
            </div>
          </section>
        </div>
      </section>

      {/* Features */}
      <section className="relative !py-15 lg:!py-20" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Elite Credit Repair System
            </motion.h2>

            {/* Detailed Subtitle — Hero Style */}
            <motion.p
              className="text-sm sm:text-lg lg:text-xl text-cyan-200/80 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Watch your score{" "}
              <span className="font-bold">skyrocket in real time</span> with our{" "}
              <span className="inline-block px-3 py-1 mx-1 bg-white/5  shadow-lg">
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent font-semibold">
                  undetectable
                </span>
              </span>{" "}
              AI-powered system that connects directly to{" "}
              <strong>Equifax</strong>, <strong>TransUnion</strong>, and{" "}
              <strong>Experian</strong>, no logs, no traces, no risk.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-10">
            {[
              {
                icon: FiTrendingUp,
                title: "Real-Time Boost",
                desc: "Watch your score rise live — no delays, no waiting.",
              },
              {
                icon: FiLock,
                title: "100% Undetectable",
                desc: "No logs, no traces. Bureaus never know.",
              },
              {
                icon: FiZap,
                title: "Instant Activation",
                desc: "Access granted in under 60 seconds.",
              },
              {
                icon: FiShield,
                title: "Bank-Level Encryption",
                desc: "Your data is never stored or shared.",
              },
              {
                icon: FiCheckCircle,
                title: "Guaranteed Results",
                desc: "Or your money back. No questions.",
              },
              {
                icon: FiClock,
                title: "24/7 Support",
                desc: "Live agents in 5+ languages.",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl !p-8 shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-9 h-9 text-cyan-300 drop-shadow-glow" />
                </div>
                <h3 className="lg:text-2xl text-xl font-bold text-cyan-100 !mb-3">
                  {feat.title}
                </h3>
                <p className="text-cyan-300/80 text-base leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="relative !py-10 lg:!py-15 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"
        ref={howRef}
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              How It Works
            </motion.h2>

            {/* Detailed Subtitle — Unified Cyan-Teal Gradient */}
            <motion.p
              className="text-sm sm:text-lg lg:text-xl leading-relaxed font-light !max-w-4xl !mx-auto !mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-cyan-200/80">
                Secure payment triggers instant access to our{" "}
                <span className="inline-block px-3 py-1 mx-1 ">
                  <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent font-semibold">
                    encrypted
                  </span>
                </span>{" "}
                backend. We connect to all three major bureaus and{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent font-bold">
                  begin live optimization
                </span>
                , you watch your score rise in real time,{" "}
                <strong className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  no delays, no traces
                </strong>
                .
              </span>
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 !gap-12">
            {[
              {
                step: "01",
                title: "Secure Payment",
                desc: "Pay via BTC, USDT, or card. Instant activation.",
              },
              {
                step: "02",
                title: "System Access",
                desc: "We connect to Equifax, TransUnion, Experian.",
              },
              {
                step: "03",
                title: "Live Upgrade",
                desc: "Watch your score climb in real time.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <div className="text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent !mb-4">
                  {s.step}
                </div>
                <h3 className="lg:text-2xl text-xl font-bold text-cyan-100 !mb-3">
                  {s.title}
                </h3>
                <p className="text-cyan-300/80">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - 12 Rich Cards */}
      <section className="relative !py-10 lg:!py-25" ref={testimonialsRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Real People. Real Results.
            </motion.h2>

            {/* Detailed Subtitle — Unified Cyan-Teal Gradient */}
            <motion.p
              className="text-sm sm:text-lg lg:text-xl text-cyan-200/80 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              From <span className=" font-bold">520</span> to{" "}
              <span className="b font-bold">820+</span> in as little as{" "}
                <span className="font-semibold">24 hours, </span> thousands have unlocked loans, cards, homes, and freedom with our{" "}
              <strong className="">
                undetectable system
              </strong>
              .
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl !p-6 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-center !gap-4 !mb-5">
                  <motion.div className="relative" whileHover={{ scale: 1.1 }}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-green-500/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={t.img}
                      alt={t.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-cyan-400/60"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-cyan-100">{t.name}</h3>
                    <p className="text-xs text-cyan-300">
                      +{parseInt(t.to) - parseInt(t.from)} Boost
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-cyan-400 !mb-3">
                  <span>
                    {t.from} → {t.to}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {t.time}
                  </span>
                </div>

                <p className="text-sm text-cyan-200/90 italic leading-relaxed">
                  “{t.text}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative !py-24 lg:!py-32 ">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6">
              Your Financial Freedom Starts Now
            </h2>
            <p className="lg:text-xl text-cyan-200/80 !mb-10">
              Join <strong>47,821+</strong> people who’ve transformed their
              credit.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white !px-8 !py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
            >
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      {/* Glow Filter */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default CreditScorePage;
