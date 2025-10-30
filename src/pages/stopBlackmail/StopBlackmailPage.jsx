import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FiX,
  FiShield,
  FiZap,
  FiLock,
  FiEyeOff,
  FiGlobe,
  FiAlertTriangle,
  FiCheckCircle,
  FiSmartphone,
  FiTrash2,
} from "react-icons/fi";
import { FaEnvelope, FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useMouse } from "react-use";
import BuyModal from "../../components/buyModal/BuyModal";
import { BsGlobeAsiaAustralia } from "react-icons/bs";



// === 12 Ultra-Real Testimonials ===
const testimonials = [
  {
    name: "Sarah M.",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    type: "Sextortion",
    time: "2 hrs",
    text: "They had my nudes. Gone in 90 minutes. I cried with relief.",
  },
  {
    name: "James K.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    type: "Financial Threat",
    time: "4 hrs",
    text: "Threatened to leak my bank details. All traces erased. Safe now.",
  },
  {
    name: "Aisha R.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    type: "Ex Revenge",
    time: "1 hr",
    text: "Ex posted private videos. Deleted from 7 sites in under an hour.",
  },
  {
    name: "Liam P.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    type: "Work Blackmail",
    time: "3 hrs",
    text: "Boss threatened to fire me over old photos. All gone. Job saved.",
  },
  {
    name: "Sofia L.",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    type: "Doxxing",
    time: "2.5 hrs",
    text: "Full doxxing on forums. Wiped clean. No more harassment.",
  },
  {
    name: "Marcus T.",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
    type: "Crypto Scam",
    time: "5 hrs",
    text: "Scammer had my wallet keys. All links severed. Funds safe.",
  },
  {
    name: "Isabella G.",
    img: "https://randomuser.me/api/portraits/women/27.jpg",
    type: "Stalker",
    time: "1.5 hrs",
    text: "Stalker posted my address. Removed from 12 sites. I can sleep again.",
  },
  {
    name: "Raj S.",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
    type: "Cheating Scandal",
    time: "3 hrs",
    text: "Affair exposed. All chats, photos, posts — deleted. Marriage saved.",
  },
  {
    name: "Natasha V.",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    type: "Deepfake",
    time: "6 hrs",
    text: "AI deepfake video of me. Erased from 3 platforms. Nightmare over.",
  },
  {
    name: "Carlos M.",
    img: "https://randomuser.me/api/portraits/men/58.jpg",
    type: "Hacker",
    time: "2 hrs",
    text: "Hacker had my cloud. All backups wiped. No more threats.",
  },
  {
    name: "Yara A.",
    img: "https://randomuser.me/api/portraits/women/79.jpg",
    type: "Family Threat",
    time: "1 hr",
    text: "Threatened to send photos to my parents. All gone. Thank you.",
  },
  {
    name: "Victor H.",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    type: "Business Rival",
    time: "4 hrs",
    text: "Rival leaked internal docs. All copies destroyed. Deal closed.",
  },
];
const StopBlackmailPage = () => {
  const [erased, setErased] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const targetErased = 12847;
  const mouse = useMouse();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const globeX = useTransform(mouseX, (v) => v / 30);
  const globeY = useTransform(mouseY, (v) => v / 30);

  // Live Counter + Progress
  useEffect(() => {
    if (isRemoving && erased < targetErased) {
      const timer = setTimeout(() => {
        const inc = Math.floor(Math.random() * 18) + 12;
        const newErased = Math.min(erased + inc, targetErased);
        setErased(newErased);
        setProgress(Math.round((newErased / targetErased) * 100));
      }, 70);
      return () => clearTimeout(timer);
    } else if (erased >= targetErased && !confetti) {
      setIsRemoving(false);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  }, [erased, isRemoving, targetErased, confetti]);

  const startRemoval = () => setIsRemoving(true);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: globeRef, inView: globeInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Mouse Glow Effect
  useEffect(() => {
    mouseX.set(mouse.elX);
    mouseY.set(mouse.elY);
  }, [mouse.elX, mouse.elY, mouseX, mouseY]);

  return (
    <>
      {/* GLOWING CURSOR */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `radial-gradient(600px at ${mouse.elX}px ${mouse.elY}px, rgba(255, 0, 100, 0.15), transparent 80%)`,
        }}
      />

      {/* HERO — DYNAMIC 3D THREAT + SHIELD */}
      <section className="relative !pt-32 !pb-16 lg:!pt-44 lg:!pb-24 overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]">
        {/* Dynamic Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-red-600/150 to-pink-600/30 rounded-full blur-3xl"
            animate={{ x: [-100, 100, -100], y: [-80, 80, -80] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-gradient-to-r from-cyan-500/40 to-teal-500/30 rounded-full blur-3xl"
            animate={{ x: [80, -120, 80], y: [60, -100, 60] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div
          className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10"
          ref={heroRef}
        >
          <motion.div
            className="text-center !max-w-5xl !mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              BLACKMAIL <span className="text-cyan-300">ERASED</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-2xl text-cyan-200/90 font-light !max-w-3xl !mx-auto !mb-12"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              We <strong>permanently delete</strong> your private data from{" "}
              <strong>every server, cloud, and dark web archive</strong>,{" "}
              <em>no recovery possible</em>.
            </motion.p>
          </motion.div>

          {/* 3D THREAT CARD + SHIELD CARD */}
          <div className="relative !h-96 lg:!h-[500px] !mt-16">
            {/* Threat Card (3D Tilt) */}
            <motion.div
              className="absolute top-0 left-0 lg:left-10 w-72 lg:w-96 h-96 lg:h-[480px] bg-gradient-to-br from-red-700/90 to-pink-700/90 backdrop-blur-2xl rounded-3xl border border-red-400/70 shadow-2xl overflow-hidden"
              style={{
                rotateX: useTransform(
                  mouseY,
                  [0, window.innerHeight],
                  [15, -15]
                ),
                rotateY: useTransform(
                  mouseX,
                  [0, window.innerWidth],
                  [-15, 15]
                ),
                transformPerspective: 1000,
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ x: -400, rotateY: -45 }}
              animate={heroInView ? { x: 0, rotateY: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative !p-8 h-full flex flex-col justify-between text-white">
                <div className="flex justify-between">
                  <FiSmartphone className="w-12 h-12 text-red-300" />
                  <FiAlertTriangle className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm opacity-80">THREAT ORIGIN</p>
                  <p className="text-2xl font-bold">Telegram Sextortion</p>
                  <p className="text-xs !mt-2 opacity-70">
                    7 files • 3 platforms
                  </p>
                </div>
                <div className="bg-red-600/30 backdrop-blur-sm rounded-xl !p-4">
                  <p className="text-sm font-bold text-red-300">EXPOSED</p>
                </div>
              </div>
            </motion.div>

            {/* Shield Card */}
            <motion.div
              className="absolute top-0 right-0 lg:right-10 w-72 lg:w-96 h-96 lg:h-[480px] bg-gradient-to-br from-cyan-700/90 to-teal-700/90 backdrop-blur-2xl rounded-3xl border border-cyan-400/70 shadow-2xl overflow-hidden"
              style={{
                rotateX: useTransform(
                  mouseY,
                  [0, window.innerHeight],
                  [-10, 10]
                ),
                rotateY: useTransform(
                  mouseX,
                  [0, window.innerWidth],
                  [10, -10]
                ),
                transformPerspective: 1000,
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ x: 400, rotateY: 45 }}
              animate={heroInView ? { x: 0, rotateY: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="relative !p-8 h-full flex flex-col justify-between text-white">
                <FiShield className="w-14 h-14 text-cyan-300 drop-shadow-glow" />
                <div>
                  <p className="text-sm opacity-80">REMOVAL STATUS</p>
                  <p className="text-2xl font-bold">ACTIVE</p>
                  <p className="text-xs !mt-2 opacity-70">
                    Scanning 47+ platforms...
                  </p>
                </div>
                <div className="bg-cyan-600/30 backdrop-blur-sm rounded-xl !p-4">
                  <p className="text-sm font-bold text-cyan-300">SECURE</p>
                </div>
              </div>
            </motion.div>

            {/* Central Progress Ring */}
            <motion.div
              className="absolute lg:top-1/2 top-150 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80"
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  stroke="rgba(255,0,100,0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="140"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={880}
                  strokeDashoffset={880 - (880 * progress) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 880 }}
                  animate={{ strokeDashoffset: 880 - (880 * progress) / 100 }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff0066" />
                    <stop offset="100%" stopColor="#00ffff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-red-400 to-cyan-300 bg-clip-text text-transparent"
                  key={progress}
                >
                  {progress}%
                </motion.p>
                <p className="text-cyan-300/80 text-lg">Complete</p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center lg:!mt-32 !mt-100"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={startRemoval}
              disabled={isRemoving || progress >= 100}
              className="relative inline-flex items-center !gap-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white !px-12 !py-6 rounded-full font-bold text-2xl shadow-2xl hover:shadow-red-500/80 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-red-400/60 disabled:opacity-50 overflow-hidden group"
            >
              <span className="relative z-10">
                {isRemoving
                  ? "Erasing..."
                  : progress >= 100
                  ? "All Gone!"
                  : "Start Removal"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <FiZap className="w-8 h-8 relative z-10 group-hover:animate-pulse" />
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
                  Join <span className="text-cyan-200">12,847+</span> people
                  people who’ve erased their past.
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

      {/* LIVE GLOBE SECTION */}
      <section className="relative !py-24" ref={globeRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 text-center">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={globeInView ? { opacity: 1, all: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {erased.toLocaleString()}+ Threats Erased Worldwide
          </motion.h2>
          <motion.p
            className="text-center text-sm sm:text-base lg:text-lg text-cyan-200/90 font-light !mb-12 !pt-8 max-w-4xl !mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={globeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <strong className="text-cyan-100">All</strong> private files,
            videos, messages, and doxxing records permanently deleted from{" "}
            <strong className="text-cyan-100">47+ platforms</strong>, including
            Telegram, Mega, Google Drive, iCloud, and dark web archives.
            <em className="block mt-2">
              Real-time tracking. Global reach. Zero recovery.
            </em>
          </motion.p>

          <motion.div
            className="relative !h-80 sm:!h-96 w-full flex items-center justify-center"
            style={{
              x: globeX,
              y: globeY,
              perspective: 1000,
            }}
          >
            {/* 3D Globe Container */}
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80"
              style={{
                transformStyle: "preserve-3d",
                rotateX: useTransform(
                  mouseY,
                  [0, window.innerHeight],
                  [-10, 10]
                ),
                rotateY: useTransform(
                  mouseX,
                  [0, window.innerWidth],
                  [-15, 15]
                ),
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-pink-400/30 blur-xl animate-pulse"></div>

              {/* Globe Surface */}
              <div className="absolute inset-0 rounded-full  flex items-center justify-center overflow-hidden">
                {/* Realistic Globe Icon (Centered + Scaled) */}
                <BsGlobeAsiaAustralia
                  className="w-48 h-48 sm:w-60 sm:h-60 text-cyan-300 drop-shadow-2xl"
                  style={{
                    filter:
                      "drop-shadow(0 0 20px rgba(0, 255, 255, 0.2)) drop-shadow(0 0 20px rgba(255, 0, 100, 0.2))",
                  }}
                />
              </div>

              {/* Threat Nodes — Pulsing Red Dots on Globe */}
              {[
                { top: "28%", left: "32%", delay: 0 }, // Australia
                { top: "35%", left: "48%", delay: 0.3 }, // China
                { top: "38%", left: "22%", delay: 0.6 }, // India
                { top: "30%", left: "65%", delay: 0.9 }, // Japan
                { top: "45%", left: "40%", delay: 1.2 }, // Indonesia
                { top: "25%", left: "55%", delay: 1.5 }, // Korea
                { top: "40%", left: "30%", delay: 1.8 }, // SE Asia
                { top: "32%", left: "42%", delay: 2.1 }, // Philippines
              ].map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg"
                  style={{
                    top: node.top,
                    left: node.left,
                    boxShadow: "0 0 12px #ff0066, 0 0 20px #ff0066",
                  }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: node.delay,
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-red-400 blur-md animate-ping"></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES — 3D FLIP CARDS */}
      <section className="relative !pb-15" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-8">
            {[
              {
                icon: FiEyeOff,
                title: "Zero Trace",
                desc: "No logs. No metadata. No recovery.",
              },
              {
                icon: FiGlobe,
                title: "47+ Platforms",
                desc: "Telegram, Mega, Dark Web, Cloud.",
              },
              {
                icon: FiZap,
                title: "60-Second Start",
                desc: "Payment → Removal begins instantly.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative h-64 preserve-3d group"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              >
                <div className="absolute inset-0 backface-hidden bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-3xl !p-8 flex flex-col items-center justify-center text-center">
                  <f.icon className="w-16 h-16 text-red-300 mb-4 drop-shadow-glow" />
                  <h3 className="text-2xl font-bold text-cyan-100">
                    {f.title}
                  </h3>
                  <p className="text-cyan-300/80 mt-2">{f.desc}</p>
                </div>
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-gradient-to-br from-red-600/80 to-pink-600/80 rounded-3xl !p-8 flex items-center justify-center text-white font-bold text-xl">
                  REMOVED
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="relative !py-24 overflow-hidden">
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            They Regained Control
          </motion.h2>

          <motion.p
            className="text-center text-sm sm:text-base lg:text-lg text-cyan-200/85 font-light !mb-12 max-w-4xl !mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <strong className="text-cyan-100">12,847+</strong> victims of{" "}
            <span>sextortion</span>, <span> revenge porn</span>,{" "}
            <span>deepfakes</span>, <span>doxxing</span>, and{" "}
            <span>financial blackmail</span>, now live{" "}
            <strong>100% free</strong> from digital threats.
            <em className="block mt-2 text-cyan-300/90">
              Every trace erased. Every platform wiped. Every future protected.
            </em>
          </motion.p>

          {/* ==== INFINITE CAROUSEL WITH FADE EDGES ==== */}
          <div className="relative overflow-hidden">
            {/* Fade masks – left & right */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0e0e2b] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0e0e2b] to-transparent z-10" />

            {/* Sliding container */}
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -100 * testimonials.length + 100] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Duplicate the array twice for a seamless loop */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="min-w-[320px] h-[200px] bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl !p-6 hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-cyan-400"
                    />
                    <div>
                      <p className="font-bold text-cyan-100">{t.name}</p>
                      <p className="text-xs text-cyan-300/70">{t.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-cyan-200/90 italic !mt-3">
                    “{t.text}”
                  </p>
                  <p className="text-xs text-green-400 mt-3 flex items-center gap-1">
                    <FiCheckCircle /> Removed in {t.time}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-24 bg-gradient-to-t from-[#0a0a1f] to-[#1a0033]">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-400 to-cyan-300 bg-clip-text text-transparent !mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Your Turn to Be Free
          </motion.h2>
          <motion.p className="text-base lg:text-lg text-cyan-200/80 !mb-8">
            Join <strong>12,847+</strong> people who’ve erased their past.
          </motion.p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white !px-6 !py-4 lg:!px-12 lg:!py-6 rounded-full font-bold lg:text-2xl shadow-2xl hover:shadow-red-500/80 transition-all duration-300 transform hover:scale-110"
          >
            Contact Us Now
          </button>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      {/* CONFETTI */}
      <AnimatePresence>
        {confetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#ff0066" : "#00ffff",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -1000],
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default StopBlackmailPage;
