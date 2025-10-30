import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
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
import { useMouse } from "react-use";
import BuyModal from "../../components/buyModal/BuyModal";



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


/* ------------------------------------------------------------------ */
/* -------------------------- NEBULA PARTICLES ----------------------- */
/* ------------------------------------------------------------------ */
const NebulaParticles = () => {
  const canvasRef = useRef(null);
  const [creditOrbs, setCreditOrbs] = useState([]);

  // Orbiting credit icons
  useEffect(() => {
    const icons = [
      { Icon: FiTrendingUp, hue: 180 },
      { Icon: FiShield, hue: 160 },
      { Icon: FiZap, hue: 200 },
      { Icon: FiLock, hue: 140 },
      { Icon: FiCheckCircle, hue: 120 },
      { Icon: FiClock, hue: 220 },
    ];
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      radius: 200 + i * 100,
      speed: 0.0006 + i * 0.00025,
      particles: Array.from({ length: 3 }, () => ({
        angle: Math.random() * Math.PI * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    }));
    setCreditOrbs(orbs);
  }, []);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf,
      t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.9,
      hue: 160 + Math.random() * 80,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 31, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const pulse = 0.7 + 0.3 * Math.sin(t * 0.018 + p.pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,75%,${pulse})`;
        ctx.fill();

        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${p.hue},100%,70%,0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      t += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 lg:opacity-35 opacity-10"
      />

      {/* Orbiting icons */}
      {creditOrbs.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {creditOrbs.map((orb, oi) =>
            orb.particles.map((p, pi) => {
              const Icon = p.icon.Icon;
              const angle = p.angle + performance.now() * 0.001 * orb.speed;
              const x =
                window.innerWidth / 2 + Math.cos(angle) * orb.radius - 28;
              const y =
                window.innerHeight / 2 + Math.sin(angle) * orb.radius - 28;

              return (
                <motion.div
                  key={`${oi}-${pi}`}
                  className="absolute !w-14 !h-14"
                  style={{ left: x, top: y }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon
                    className="w-full h-full text-cyan-400 lg:opacity-10 opacity-7 drop-shadow-glow"
                    style={{ filter: "drop-shadow(0 0 22px currentColor)" }}
                  />
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* ------------------------------ MAIN PAGE -------------------------- */
/* ------------------------------------------------------------------ */
const CreditScorePage = () => {
  const [score, setScore] = useState(520);
  const [targetScore] = useState(780);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const mouse = useMouse();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 130, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 130, damping: 30 });

  // Live Score Upgrade
  useEffect(() => {
    if (isUpgrading && score < targetScore) {
      const timer = setTimeout(() => {
        const inc = Math.floor(Math.random() * 12) + 6;
        const newScore = Math.min(score + inc, targetScore);
        setScore(newScore);
        if (newScore >= targetScore && !confetti) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3500);
        }
      }, 85);
      return () => clearTimeout(timer);
    } else if (score >= targetScore) {
      setIsUpgrading(false);
    }
  }, [score, isUpgrading, targetScore, confetti]);

  const startUpgrade = () => setIsUpgrading(true);

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

  useEffect(() => {
    mouseX.set(mouse.elX);
    mouseY.set(mouse.elY);
  }, [mouse.elX, mouse.elY, mouseX, mouseY]);

  return (
    <>
      <NebulaParticles />

      {/* GLOWING CURSOR TRAIL */}
      <motion.div
        className="fixed !w-[700px] !h-[700px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)",
          left: smoothX - 350,
          top: smoothY - 350,
        }}
        animate={{ scale: isUpgrading ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* HERO */}
      <section className="relative !pt-28 !pb-20 lg:!pt-40 lg:!pb-32 overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]">
        {/* Parallax Orbs */}
        <motion.div
          className="absolute inset-0 opacity-45"
          style={{
            y: useTransform(smoothY, [0, window.innerHeight], [-140, 140]),
          }}
        >
          <div className="absolute top-16 left-12 !w-[650px] !h-[650px] bg-gradient-to-r from-cyan-500/22 to-teal-500/14 rounded-full blur-3xl" />
          <div className="absolute bottom-28 right-16 !w-[600px] !h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/12 rounded-full blur-3xl" />
        </motion.div>

        {/* Holographic Data Lines */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${12 + i * 14}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 9 + i * 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div
          className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10"
          ref={heroRef}
        >
          <motion.div
            className="text-center !max-w-5xl !mx-auto"
            initial={{ opacity: 0, y: 70 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition="duration: 1"
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              Skyrocket Your Credit Score
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-cyan-200/90 font-light !max-w-3xl !mx-auto !mb-20 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Watch your score{" "}
              <strong className="text-cyan-300">explode in real time</strong>{" "}
              with our elite, encrypted, and <strong>100% undetectable</strong>{" "}
              credit repair system.
            </motion.p>
          </motion.div>

          {/* Floating Cards + Score Orb */}
          <div className="relative !max-w-5xl !mx-auto !h-[500px] lg:!h-[600px]">
            {/* Credit Card 1 */}
            <motion.div
              className="absolute top-0 left-8 lg:left-16 w-80 h-52 bg-gradient-to-br from-cyan-600/85 to-teal-600/85 backdrop-blur-2xl rounded-2xl border border-cyan-400/70 shadow-2xl overflow-hidden"
              style={{
                rotateX: useTransform(smoothY, [-300, 300], [20, -20]),
                rotateY: useTransform(smoothX, [-300, 300], [-20, 20]),
                transformPerspective: 1300,
              }}
              initial={{ x: -400, y: 120, rotate: -35 }}
              animate={heroInView ? { x: -100, y: -50, rotate: -15 } : {}}
              transition={{ type: "spring", stiffness: 90, delay: 0.6 }}
              whileHover={{ scale: 1.06 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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

            {/* Credit Card 2 */}
            <motion.div
              className="absolute top-8 right-8 lg:right-16 w-72 h-48 bg-gradient-to-br from-purple-600/85 to-pink-600/85 backdrop-blur-2xl rounded-2xl border border-purple-400/70 shadow-2xl overflow-hidden"
              style={{
                rotateX: useTransform(smoothY, [-300, 300], [-16, 16]),
                rotateY: useTransform(smoothX, [-300, 300], [16, -16]),
                transformPerspective: 1300,
              }}
              initial={{ x: 400, y: -120, rotate: 35 }}
              animate={heroInView ? { x: 100, y: -70, rotate: 15 } : {}}
              transition={{ type: "spring", stiffness: 90, delay: 0.8 }}
              whileHover={{ scale: 1.06 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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

            {/* Score Orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-80 !h-80 !mt-20 lg:!mt-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.1, type: "spring" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-cyan-500/35 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-6 bg-cyan-400/25 rounded-full blur-2xl animate-pulse animation-delay-1200"></div>

                <motion.div
                  className="absolute inset-10 bg-white/12 backdrop-blur-2xl rounded-full border border-cyan-400/70 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ scale: isUpgrading ? [1, 1.12, 1] : 1 }}
                    transition={{
                      repeat: isUpgrading ? Infinity : 0,
                      duration: 0.55,
                    }}
                  >
                    <motion.p
                      className="text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent"
                      key={score}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32 }}
                    >
                      {score}
                    </motion.p>
                    <p className="text-cyan-300/85 text-lg font-medium !mt-2">
                      Live Score
                    </p>
                  </motion.div>
                </motion.div>

                {/* Orbiting Particles */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute !w-2 !h-2 bg-cyan-400 rounded-full"
                    style={{
                      top: `${18 + i * 8}%`,
                      left: `${i % 2 === 0 ? 15 : 65}%`,
                    }}
                    animate={{
                      y: [0, -35, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2.2 + i * 0.25,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.18,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center lg:!mt-6 !mt-5"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            <button
              onClick={startUpgrade}
              disabled={isUpgrading || score >= targetScore}
              className="group relative inline-flex items-center justify-center !gap-5 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white lg:!px-16 lg:!py-6 !px-6 !py-4 rounded-full font-bold lg:text-2xl shadow-2xl hover:shadow-cyan-500/80 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-cyan-400/60 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {isUpgrading
                  ? "Upgrading Live..."
                  : score >= targetScore
                  ? "Max Score Achieved!"
                  : "Start Upgrade Now"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/25"
                animate={isUpgrading ? { x: ["-100%", "100%"] } : {}}
                transition={{ repeat: Infinity, duration: 1.3 }}
              />
              <FiZap className="w-8 h-8 relative z-10 group-hover:animate-pulse" />
            </button>
          </motion.div>

          {/* COMMUNITY OVERLAP */}
          <motion.div
            className="flex flex-col items-center justify-center text-center lg:!mt-20 !mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
                  transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.2, zIndex: 50 }}
                  style={{ zIndex: 5 - i }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative !w-14 !h-14 sm:!w-16 sm:!h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl backdrop-blur-sm">
                    <img
                      src={src}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.h3
              className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Join <span className="text-cyan-200">47,821+</span> who
              transformed their credit.
            </motion.h3>
            <motion.p
              className="mt-3 text-sm sm:text-base text-cyan-300/80 font-light max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Real users. Real results. Real freedom.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative !py-24" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Elite Credit Repair System
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-cyan-200/85 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Watch your score{" "}
              <strong className="font-bold">skyrocket in real time</strong> with
              our{" "}
              <span className="inline-block px-3 py-1 mx-1 ">
                <span className=" font-semibold">
                  undetectable
                </span>
              </span>{" "}
              AI-powered system that connects directly to{" "}
              <strong>Equifax</strong>, <strong>TransUnion</strong>, and{" "}
              <strong>Experian</strong>.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 !gap-10">
            {[
              {
                icon: FiTrendingUp,
                title: "Real-Time Boost",
                desc: "Watch your score rise live — no delays.",
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
                className="bg-white/6 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl !p-8 shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14, duration: 0.6 }}
                whileHover={{ y: -12 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/25 to-teal-500/25 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-9 h-9 text-cyan-300 drop-shadow-glow" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-cyan-100 !mb-3">
                  {feat.title}
                </h3>
                <p className="text-cyan-300/85 text-base leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative !py-20 bg-gradient-to-b from-transparent via-purple-900/12 to-transparent"
        ref={howRef}
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl leading-relaxed font-light !max-w-4xl !mx-auto !mb-12 text-cyan-200/85"
              initial={{ opacity: 0, y: 20 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Secure payment → instant access to our <strong>encrypted</strong>{" "}
              backend → <strong>live optimization</strong> across all three
              bureaus. <em>No delays, no traces.</em>
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
                <div className="text-7xl font-extrabold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent !mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-cyan-100 !mb-3">
                  {s.title}
                </h3>
                <p className="text-cyan-300/85">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative !py-24" ref={testimonialsRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Real People. Real Results.
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-cyan-200/85 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              From <strong>520</strong> to <strong>820+</strong> in as little as{" "}
              <strong>24 hours</strong>.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl !p-6 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.025 }}
              >
                <div className="flex items-center !gap-4 !mb-5">
                  <motion.div className="relative" whileHover={{ scale: 1.1 }}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/45 via-teal-500/35 to-green-500/35 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={t.img}
                      alt={t.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-cyan-400/70"
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

      {/* FINAL CTA */}
      <section className="relative !py-24 bg-gradient-to-b from-transparent via-purple-900/12 to-transparent">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6">
              Your Financial Freedom Starts Now
            </h2>
            <p className="text-lg lg:text-xl text-cyan-200/85 !mb-10">
              Join <strong>47,821+</strong> people who’ve transformed their
              credit.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white !px-8 lg:!px-12 !py-5 rounded-full font-bold text-xl lg:text-2xl shadow-lg hover:shadow-cyan-500/70 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-cyan-400/60"
            >
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      {/* CONFETTI ON MAX SCORE */}
      <AnimatePresence>
        {confetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(70)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute !w-2 !h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#00ffff" : "#00ff88",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, -1300], opacity: [1, 0], rotate: [0, 360] }}
                transition={{
                  duration: 2.8 + Math.random() * 1,
                  delay: Math.random() * 0.7,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 22px currentColor)
            drop-shadow(0 0 44px currentColor);
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </>
  );
};

export default CreditScorePage;
