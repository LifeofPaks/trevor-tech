import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useTransform as transformScroll,
} from "framer-motion";
import {
  FiShield,
  FiZap,
  FiLock,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiEyeOff,
  FiTrendingUp,
  FiKey,
  FiCode,
  FiTerminal,
  FiBox,
  FiServer,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiGlobe,
  FiCreditCard,
  FiUserCheck,
  FiFileText,
  FiTruck,
} from "react-icons/fi";
import { FaIdCard, FaRegIdBadge, FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { create } from "zustand";
import BuyModal from "../../components/buyModal/BuyModal";

const IDOrbital = () => {
  const canvasRef = useRef(null);
  const [orbData, setOrbData] = useState([]);

  // Generate orbital data for floating icons
  useEffect(() => {
    const icons = [
      { Icon: FaIdCard, hue: 190 },
      { Icon: FiShield, hue: 120 },
      { Icon: FiUserCheck, hue: 80 },
      { Icon: FiFileText, hue: 220 },
      { Icon: FiAward, hue: 45 },
      { Icon: FiCreditCard, hue: 160 },
    ];

    const orbs = Array.from({ length: 4 }, (_, i) => ({
      radius: 160 + i * 100,
      speed: 0.001 + i * 0.0004,
      hue: 180 + i * 20,
      particles: Array.from({ length: 4 }, () => ({
        angle: Math.random() * Math.PI * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    }));

    setOrbData(orbs);
  }, []);

  // Enhanced particle field - smoother, more elegant
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 1.2,
      hue: 180 + Math.random() * 60, // Royal blue → emerald
      pulsePhase: Math.random() * Math.PI * 2,
      trail: [],
    }));

    const animate = () => {
      // Soft fade trail
      ctx.fillStyle = "rgba(5, 10, 30, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        // Update trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;

        // Bounce with damping
        if (p.x < 0 || p.x > canvas.width) p.vx *= -0.98;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -0.98;

        // Gentle pulse
        const pulse = 0.8 + 0.2 * Math.sin(time * 0.02 + p.pulsePhase);

        // Draw trail
        ctx.strokeStyle = `hsla(${p.hue}, 100%, 70%, 0.15)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        p.trail.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 82%, ${pulse})`;
        ctx.fill();

        // Glow
        ctx.shadowBlur = 22;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby
        particles.forEach((other) => {
          if (other === p) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${
              (p.hue + other.hue) / 2
            }, 100%, 72%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      time += 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Floating ID Icons */}
      {orbData.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {orbData.map((orb, orbIdx) =>
            orb.particles.map((p, idx) => {
              const Icon = p.icon.Icon;
              const angle = p.angle + performance.now() * 0.001 * orb.speed;
              const x =
                window.innerWidth / 2 + Math.cos(angle) * orb.radius - 20;
              const y =
                window.innerHeight / 2 + Math.sin(angle) * orb.radius - 20;

              return (
                <motion.div
                  key={`${orbIdx}-${idx}`}
                  className="absolute !w-10 !h-10"
                  style={{ left: x, top: y }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon
                    className="w-full h-full text-indigo-300 opacity-20 drop-shadow-glow"
                    style={{ filter: "drop-shadow(0 0 16px currentColor)" }}
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

// 3D Animated ID Card
const AnimatedIDCard = ({ verified }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [18, -18]), {
    stiffness: 120,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-18, 18]), {
    stiffness: 120,
    damping: 28,
  });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative lg:!w-96 lg:!h-60 w-80 h-52 cursor-grab active:cursor-grabbing !my-12 lg:!my-0"
      style={{ rotateX, rotateY, perspective: 1400 }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.06 }}
    >
      {/* Card Base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-pink-900/70 backdrop-blur-3xl rounded-3xl border border-indigo-400/50 shadow-2xl overflow-hidden"
        animate={{ rotateY: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Holographic Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 !w-32 !h-32 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 !w-40 !h-40 bg-gradient-to-tl from-purple-400 to-indigo-400 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Card Content */}
        <div className="relative !p-8 flex items-center justify-between h-full">
          <div>
            <div className="flex items-center gap-3 !mb-4">
              <FaIdCard className="text-cyan-300 !w-10 !h-10 drop-shadow-glow" />
              <span className="text-cyan-100 font-black text-2xl tracking-widest">
                GOV-ID
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-indigo-200 font-medium">JOHN A. DOE</p>
              <p className="text-cyan-300 text-sm">DOB: 03/15/1987</p>
              <p className="text-cyan-300 text-sm">ISS: 10/30/2025</p>
            </div>
          </div>

          <div className="text-right">
            <div className="relative !w-24 !h-24 mx-auto !mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl opacity-70" />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="ID Photo"
                className="relative !w-full !h-full rounded-full object-cover border-4 border-cyan-300/60 shadow-2xl"
              />
              {verified && (
                <motion.div
                  className="absolute -bottom-1 -right-1 !w-10 !h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiCheckCircle className="text-white !w-6 !h-6" />
                </motion.div>
              )}
            </div>
            <p className="text-cyan-200 font-bold text-lg">DL# A1234567</p>
          </div>
        </div>

        {/* Chip */}
        <div className="absolute bottom-6 left-8 !w-12 !h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-md shadow-lg flex items-center justify-center">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className=" !w-1 !h-1 bg-amber-600 rounded-sm" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Verification Rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-3xl border-2 border-cyan-400/40"
          style={{ transform: `rotateX(${i * 25}deg)` }}
          animate={{ rotateZ: 360 }}
          transition={{
            duration: 3 + i * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

// Live Verification Matrix
const VerificationMatrix = ({ isActive }) => {
  const [lines, setLines] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    if (isActive) {
      const states = ["CA", "TX", "NY", "FL", "IL", "PA", "OH", "GA"];
      const types = ["DL", "ID", "PASS", "REALID"];

      intervalRef.current = setInterval(() => {
        const state = states[Math.floor(Math.random() * states.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const id = Math.random().toString(36).substr(2, 8).toUpperCase();
        const status = Math.random() > 0.2 ? "VERIFIED" : "PROCESSING";

        setLines((prev) => {
          const newLine = { id: Date.now(), state, type, idNum: id, status };
          return [...prev, newLine].slice(-12);
        });
      }, 620);
    } else {
      clearInterval(intervalRef.current);
      setLines([]);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <motion.div
      className="bg-black/90 backdrop-blur-3xl border border-indigo-500/40 rounded-2xl !p-6 font-mono text-xs !h-80 overflow-hidden shadow-2xl min-w-[340px] !mb-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between !mb-5">
        <div className="flex items-center gap-3">
          <FiTerminal className="text-indigo-400 animate-pulse" />
          <span className="text-indigo-300 font-bold tracking-widest">
            ID_VERIFIER@v9
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
        </div>
      </div>

      <div className="space-y-2.5 text-indigo-200">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 font-mono"
          >
            <span
              className={
                line.status === "VERIFIED"
                  ? "text-green-400 animate-pulse"
                  : "text-yellow-400"
              }
            >
              [{line.status}]
            </span>
            <span className="text-indigo-300">
              {line.state}-{line.type}
            </span>
            <span className="text-purple-400">{line.idNum}</span>
            <span className="text-gray-500">→ DMV SECURE</span>
          </motion.div>
        ))}
        {isActive && (
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="text-indigo-400"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.14,
                }}
              >
                ▊
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Zustand Store
const useIDStore = create((set) => ({
  verified: 0,
  target: 98750,
  isVerifying: false,
  setVerifying: (v) => set({ isVerifying: v }),
  increment: (a) =>
    set((s) => ({ verified: Math.min(s.verified + a, s.target) })),
  reset: () => set({ verified: 0, isVerifying: false }),
}));

// MAIN PAGE
export default function IDServicesPage() {
  const { verified, target, isVerifying, setVerifying, increment, reset } =
    useIDStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = transformScroll(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Live Verification
  useEffect(() => {
    if (isVerifying && verified < target) {
      const timer = setTimeout(() => {
        const burst = Math.floor(Math.random() * 11000) + 5000;
        increment(burst);
      }, 140);
      return () => clearTimeout(timer);
    } else if (verified >= target) {
      setVerifying(false);
    }
  }, [verified, isVerifying, target, increment, setVerifying]);

  // Mouse Trail
  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const startVerification = () => {
    reset();
    setVerifying(true);
  };

  return (
    <>
      <IDOrbital />

      {/* GLOWING MOUSE TRAIL */}
      <motion.div
        className="fixed !w-[500px] !h-[500px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(100,100,255,0.35) 0%, transparent 68%)",
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
        animate={{ scale: isVerifying ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden lg:!pt-[5rem] !pt-[8rem]"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#050a1e] via-[#0a0f2f] to-[#1a0033] opacity-95" />

        {/* Parallax Orbs */}
        <motion.div
          className="absolute inset-0 opacity-35"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-28 left-28 !w-[700px] !h-[700px] bg-gradient-to-r from-indigo-600/25 to-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 !w-[650px] !h-[650px] bg-gradient-to-r from-pink-600/20 to-indigo-600/12 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: HERO TEXT */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -140 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1 }}
          >
            <motion.h1
              className="text-center lg:text-left text-5xl lg:text-8xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent !mb-8 leading-none tracking-tighter"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              GOV-ID
              <br />
              <span className="text-5xl lg:text-7xl text-indigo-200">
                VERIFIED
              </span>
            </motion.h1>

            <motion.p
              className="lg:text-2xl text-indigo-200 !mb-12 max-w-3xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Instant DMV-approved ID verification.{" "}
              <strong className="text-purple-300">REAL ID compliant</strong>.
              Same-day digital delivery. 100% secure, encrypted, and compliant.
            </motion.p>

            {/* Live Stats */}
            <motion.div
              className="flex items-center flex-col lg:flex-row justify-center lg:justify-between gap-12 w-full"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-indigo-300">
                  <CountUp end={verified} duration={0.6} separator="," />
                </p>
                <p className="text-indigo-200 !mt-2 text-lg">VERIFIED</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-purple-400">
                  <CountUp end={Math.floor(verified / 600)} duration={0.6} />K
                </p>
                <p className="text-indigo-200 !mt-2 text-lg">USERS</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-pink-400 flex items-center gap-3">
                  100% <FiCheckCircle />
                </p>
                <p className="text-indigo-200 !mt-2 text-lg">COMPLIANT</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap lg:gap-8 gap-4 !mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={startVerification}
                disabled={isVerifying}
                className="group relative !px-14 !py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full font-bold text-white overflow-hidden disabled:opacity-50 shadow-2xl lg:text-xl w-full lg:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {isVerifying ? (
                    <>
                      VERIFYING LIVE <FiCpu className="animate-spin" />
                    </>
                  ) : (
                    <>
                      START VERIFICATION <FiCpu />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  animate={isVerifying ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.3 }}
                />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="!px-14 !py-6 border-2 border-indigo-400 text-indigo-300 rounded-full font-bold hover:bg-indigo-500/10 transition-all backdrop-blur-sm lg:text-xl w-full lg:w-auto"
              >
                CONTACT US
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D CARD + MATRIX */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-12"
            initial={{ opacity: 0, x: 140 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1 }}
          >
            <AnimatedIDCard verified={verified > 50000} />
            <VerificationMatrix isActive={isVerifying} />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE – STATE LIST */}
      <section
        className="backdrop-blur-3xl lg:!py-8 !py-4 overflow-hidden"
        ref={statsRef}
      >
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, repeatIdx) => (
            <div
              key={repeatIdx}
              className="flex gap-16 items-center whitespace-nowrap"
            >
              {[
                { name: "CALIFORNIA", flag: "CA" },
                { name: "TEXAS", flag: "TX" },
                { name: "NEW YORK", flag: "NY" },
                { name: "FLORIDA", flag: "FL" },
                { name: "ILLINOIS", flag: "IL" },
                { name: "PENNSYLVANIA", flag: "PA" },
                { name: "OHIO", flag: "OH" },
                { name: "GEORGIA", flag: "GA" },
                { name: "MICHIGAN", flag: "MI" },
                { name: "NORTH CAROLINA", flag: "NC" },
              ].map((state, i) => (
                <div
                  key={`${repeatIdx}-${i}`}
                  className="flex items-center gap-3 !px-6 !py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-500/30 backdrop-blur-sm"
                >
                  <div className="lg:!w-7 lg:!h-7 !w-6 !h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-xs">
                    {state.flag}
                  </div>
                  <span className="text-indigo-200 font-bold lg:text-xl tracking-wider">
                    {state.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        className="!relative !py-20 lg:!py-48 bg-gradient-to-br from-[#050a1e] via-[#0a0f2f] to-[#1a0033] opacity-94"
        ref={featuresRef}
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center lg:!mb-28 !mb-12"
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent lg:!mb-8 !mb-4">
              VERIFICATION ENGINE
            </h2>
            <p className="lg:text-2xl text-indigo-200 max-w-5xl !mx-auto">
              DMV-integrated. REAL ID ready. Instant digital delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FiShield,
                title: "REAL ID Compliant",
                desc: "Meets all federal standards with encrypted biometric verification and secure chip integration.",
              },
              {
                icon: FiZap,
                title: "Same-Day Issue",
                desc: "Digital ID delivered in under 2 hours. Physical card shipped overnight via secure courier.",
              },
              {
                icon: FiLock,
                title: "Bank-Grade Security",
                desc: "End-to-end encryption, zero-knowledge proofs, and tamper-proof digital signatures.",
              },
              {
                icon: FiGlobe,
                title: "50 States",
                desc: "Full coverage across all U.S. states and territories with local DMV integration.",
              },
              {
                icon: FiTruck,
                title: "Express Delivery",
                desc: "Free overnight shipping with tracking. International options available.",
              },
              {
                icon: FiAward,
                title: "Lifetime Validity",
                desc: "One-time verification. Use forever across all platforms and institutions.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 70 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/5 !backdrop-blur-sm border border-indigo-500/30 rounded-2xl !p-8 shadow-2xl hover:shadow-indigo-500/50 transition-all group h-[320px]">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-2xl flex items-center justify-center !mb-3 group-hover:scale-110 transition-transform">
                    <f.icon className="!w-10 !h-10 text-indigo-300 drop-shadow-glow" />
                  </div>
                  <h3 className="lg:text-2xl text-xl font-bold text-indigo-100 !mb-2">
                    {f.title}
                  </h3>
                  <p className="text-indigo-200/80 text-lg leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="relative !py-16 lg:!py-48 bg-gradient-to-br from-[#050a1e] via-[#0a0f2f] to-[#1a0033] opacity-94"
        ref={testimonialsRef}
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center lg:!mb-28 !mb-14"
            initial={{ opacity: 0, y: 60 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent lg:!mb-8 !mb-3">
              VERIFIED USERS
            </h2>
            <p className="lg:text-2xl text-indigo-200 max-w-5xl !mx-auto">
              <strong>98,750+</strong> IDs issued. <strong>100%</strong>{" "}
              approval rate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah M.",
                state: "California",
                time: "1.5 hrs",
                avatar:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
                desc: "Got my REAL ID in under 2 hours! Digital version worked instantly at the airport.",
              },
              {
                name: "James T.",
                state: "Texas",
                time: "45 min",
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                desc: "Fastest service ever. Physical card arrived next morning. Highly recommend!",
              },
              {
                name: "Lisa K.",
                state: "New York",
                time: "2 hrs",
                avatar:
                  "https://images.unsplash.com/photo-1580489940920-b3694c5ea1f9?w=150&h=150&fit=crop&crop=face",
                desc: "Used it for banking and travel. Accepted everywhere. Amazing support team!",
              },
              {
                name: "Mike R.",
                state: "Florida",
                time: "1 hr",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                desc: "Renewed my DL seamlessly. No lines, no hassle. Digital ID is a game changer.",
              },
              {
                name: "Emma L.",
                state: "Illinois",
                time: "90 min",
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                desc: "Perfect for remote verification. Used it to open a brokerage account instantly.",
              },
              {
                name: "David P.",
                state: "Pennsylvania",
                time: "2.5 hrs",
                avatar:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                desc: "International shipping was fast and secure. Digital ID works globally!",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 60 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -12, scale: 1.04 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/5 backdrop-blur-7xl border border-indigo-500/30 rounded-2xl !p-8 shadow-2xl hover:shadow-indigo-500/50 transition-all group">
                  <div className="flex items-center gap-5 !mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-all"></div>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="relative !w-18 !h-18 rounded-full object-cover border-4 border-indigo-400/50 shadow-2xl group-hover:border-indigo-400/80 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 !w-8 !h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                        <span className="text-white text-xs font-bold">
                          {t.state.slice(0, 2)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-indigo-100 text-xl">
                        {t.name}
                      </h3>
                      <p className="text-indigo-300">{t.state}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-indigo-400 !mb-5 text-lg">
                    <span className="flex items-center gap-2">
                      <FiClock /> {t.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-400" /> Verified
                    </span>
                  </div>
                  <p className="text-indigo-200/90 italic leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-16 lg:!py-48 bg-gradient-to-br from-[#050a1e] via-[#0a0f2f] to-[#1a0033] opacity-94">
        <div className="max-w-5xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent lg:!mb-8 !mb-2">
              GET VERIFIED NOW
            </h2>
            <p className="lg:text-3xl text-indigo-200/80 !mb-14">
              Your official ID is ready in minutes.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white !px-8 !py-4 lg:!px-12 lg:!py-6 rounded-full font-bold lg:text-xl shadow-2xl hover:shadow-indigo-500/80 transition-all transform hover:scale-105 backdrop-blur-sm border border-indigo-400/50"
            >
              START VERIFICATION
            </button>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 18px currentColor)
            drop-shadow(0 0 36px currentColor);
        }
      `}</style>
      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}
