
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  FiGlobe,
  FiShield,
  FiZap,
  FiLock,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiServer,
  FiDatabase,
  FiCpu,
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { create } from "zustand";
import BuyModal from "../../components/buyModal/BuyModal";

// === Particle Background (Cyan/Teal) ===
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.2,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() * 60 + 170, // Cyan to Teal
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
        ctx.fill();

        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 60%, ${
              0.12 * (1 - dist / 140)
            })`;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

// === 3D Interactive Globe (Cyan Glow) ===
const DynamicGlobe = ({ erasedCount }) => {
  const globeRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [20, -20]), {
    stiffness: 120,
    damping: 35,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-20, 20]), {
    stiffness: 120,
    damping: 35,
  });

  const handleMouseMove = (e) => {
    const rect = globeRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={globeRef}
      className="relative w-96 h-96 cursor-grab active:cursor-grabbing"
      style={{ rotateX, rotateY, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.06 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-600/40 via-teal-600/30 to-purple-600/20 blur-3xl opacity-70" />
      <div className="absolute inset-6 rounded-full bg-gradient-to-t from-[#0a0a1f]/90 via-[#0f0f2a]/80 to-[#1a0033]/70 backdrop-blur-3xl border border-cyan-500/50 shadow-2xl">
        <FiGlobe className="w-full h-full text-cyan-400 opacity-25" />
      </div>

      {/* Erased Nodes (Pulsing Cyan) */}
      {Array.from({ length: Math.min(erasedCount / 80, 45) }).map((_, i) => {
        const angle = (i / 45) * Math.PI * 2;
        const radius = 140 + Math.random() * 60;
        const x = 192 + Math.cos(angle) * radius;
        const y = 192 + Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400 rounded-full"
            style={{
              left: x,
              top: y,
              boxShadow:
                "0 0 24px rgba(0, 255, 255, 0.9), 0 0 48px rgba(0, 255, 255, 0.6)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.08 }}
          />
        );
      })}
    </motion.div>
  );
};

// === Live Terminal (Cyan/Teal Theme) ===
const DatabaseTerminal = ({ isActive }) => {
  const [logs, setLogs] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    if (isActive) {
      const databases = [
        "FBI NCIC",
        "INTERPOL RED",
        "STATE DMV",
        "LOCAL PRECINCT",
        "COURT RECORDS",
        "FEDERAL ARCHIVE",
        "CIA WATCHLIST",
        "NSA DATABASE",
        "EUROPOL",
        "RCMP CANADA",
        "AUSTRALIAN FEDERAL POLICE",
        "DUBAI POLICE",
      ];

      intervalRef.current = setInterval(() => {
        const db = databases[Math.floor(Math.random() * databases.length)];
        const action = Math.random() > 0.5 ? "EXPUNGING" : "DELETING";
        const fileId = Math.random().toString(36).substr(2, 10).toUpperCase();

        setLogs((prev) => {
          const newLogs = [
            ...prev,
            {
              id: Date.now(),
              db,
              action,
              fileId,
              time: new Date().toLocaleTimeString("en-US", { hour12: false }),
            },
          ];
          return newLogs.slice(-9);
        });
      }, 650);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <motion.div
      className="bg-[#0a0a1f]/80 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl !p-5 font-mono text-xs h-72 overflow-hidden shadow-2xl !mb-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg" />
          <div className="w-3 h-3 rounded-full bg-teal-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-cyan-300 font-semibold">
          dark_erase_terminal@vault
        </span>
        <FiCpu className="ml-auto text-cyan-400 animate-pulse" />
      </div>
      <div className="text-cyan-200 space-y-1.5 leading-tight">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-teal-400">[SECURE]</span>
            <span className="text-cyan-300">{log.db}</span>
            <span className="text-green-400">{log.action}</span>
            <span className="text-yellow-300">FILE_{log.fileId}</span>
            <span className="text-gray-400">[{log.time}]</span>
          </motion.div>
        ))}
        {isActive && (
          <motion.span
            className="inline-block animate-pulse"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            █
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

// === Zustand Store ===
const useEraseStore = create((set) => ({
  erasedFiles: 0,
  totalTarget: 8921,
  isErasing: false,
  setErasing: (val) => set({ isErasing: val }),
  incrementErased: (amount) =>
    set((state) => ({
      erasedFiles: Math.min(state.erasedFiles + amount, state.totalTarget),
    })),
  reset: () => set({ erasedFiles: 0, isErasing: false }),
}));

// === Main Component ===
export default function EraseRecordPage() {
  const {
    erasedFiles,
    totalTarget,
    isErasing,
    setErasing,
    incrementErased,
    reset,
  } = useEraseStore();
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

  // Live Erasure
  useEffect(() => {
    if (isErasing && erasedFiles < totalTarget) {
      const timer = setTimeout(() => {
        const burst = Math.floor(Math.random() * 70) + 35;
        incrementErased(burst);
      }, 90);
      return () => clearTimeout(timer);
    } else if (erasedFiles >= totalTarget) {
      setErasing(false);
    }
  }, [erasedFiles, isErasing, totalTarget, incrementErased, setErasing]);

  // Mouse Trail
  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const startErasure = () => {
    reset();
    setErasing(true);
  };

  return (
    <>
      <ParticleBackground />

      {/* Glowing Mouse Trail */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.35) 0%, transparent 65%)",
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
        animate={{ scale: isErasing ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden lg:!pt-[6rem] !pt-[10rem]"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]" />

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/30 to-teal-500/20 rounded-full blur-3xl opacity-60"
            animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-[450px] h-[450px] bg-gradient-to-r from-purple-500/25 to-pink-500/15 rounded-full blur-3xl opacity-50"
            animate={{ x: [0, -140, 0], y: [0, 80, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <motion.h1
              className="text-center lg:text-left text-4xl lg:text-[3rem] font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              CRIMINAL RECORD
              <br />
              <span className="text-cyan-200">PERMANENTLY ERASED</span>
            </motion.h1>

            <motion.p
              className=" lg:text-xl text-cyan-200/90 !mb-10 max-w-2xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <strong className="text-cyan-300">Live deletion</strong> from FBI,
              Interpol, NCIC, and 200+ global databases. Watch your past{" "}
              <span className="text-teal-300 font-bold">
                vanish in real time
              </span>
              . No logs. No recovery.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-8 text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div>
                <p className="lg:text-6xl text-5xl font-black text-cyan-300 ">
                  <CountUp end={erasedFiles} duration={0.6} separator="," />
                </p>
                <p className="text-cyan-200 mt-1">FILES DELETED</p>
              </div>
              <div>
                <p className="lg:text-6xl text-5xl font-black text-green-400 flex items-center gap-2">
                  100% <FiCheckCircle />
                </p>
                <p className="text-cyan-200 !mt-1">SUCCESS RATE</p>
              </div>
            </motion.div>
            <motion.div
              className="flex lg:flex-row flex-col gap-5 !mt-12 "
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={startErasure}
                disabled={isErasing}
                className="group relative !px-10 !py-5 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full font-bold text-white overflow-hidden disabled:opacity-50 shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  {isErasing ? (
                    <>
                      ERASING LIVE <FiZap className="animate-pulse" />
                    </>
                  ) : (
                    <>
                      BEGIN ERASURE <FiZap />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/25"
                  animate={isErasing ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="!px-10 !py-5 border-2 border-cyan-400 text-cyan-300 rounded-full font-bold hover:bg-cyan-500/10 transition-all backdrop-blur-sm"
              >
                CONTACT AGENT
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Globe + Terminal */}
          <motion.div
            className="flex flex-col items-center gap-10"
            initial={{ opacity: 0, x: 120 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <DynamicGlobe erasedCount={erasedFiles} />
            <DatabaseTerminal isActive={isErasing} />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section
        className=" !py-5 overflow-hidden"
        ref={statsRef}
      >
        <motion.div
          className="flex gap-20"
          animate={{ x: [0, -2200] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-20 whitespace-nowrap">
              <span className="text-cyan-300 font-bold lg:text-lg">
                8,921 RECORDS ERASED
              </span>
              <span className="text-teal-400">•</span>
              <span className="text-green-400 font-bold lg:text-lg">
                48HR GUARANTEE
              </span>
              <span className="text-teal-400">•</span>
              <span className="text-cyan-200 font-bold lg:text-lg">
                FBI • INTERPOL • NCIC • EUROPOL
              </span>
              <span className="text-teal-400">•</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative !py-20 lg:!py-32" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:px-10">
          <motion.div
            className="text-center !mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6">
              Elite Expungement Technology
            </h2>
            <p className="text-lg text-cyan-200/80 max-w-4xl !mx-auto">
              We penetrate{" "}
              <strong className="text-cyan-300">FBI, CIA, Interpol</strong> and
              local systems. Your record is{" "}
              <strong className="text-teal-300">permanently destroyed</strong>{" "}
              at the source.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiGlobe,
                title: "Global Reach",
                desc: "200+ databases. Every country. Every court.",
              },
              {
                icon: FiLock,
                title: "Zero Trace",
                desc: "No audit logs. No metadata. No recovery.",
              },
              {
                icon: FiZap,
                title: "48-Hour Wipe",
                desc: "Complete erasure in under 2 days.",
              },
              {
                icon: FiShield,
                title: "Military Encryption",
                desc: "AES-256 + quantum-resistant keys.",
              },
              {
                icon: FiCpu,
                title: "AI-Powered",
                desc: "Auto-detects and removes all linked files.",
              },
              {
                icon: FiEyeOff,
                title: "Undetectable",
                desc: "Bypasses all monitoring systems.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl !p-8 shadow-2xl hover:shadow-cyan-500/50 transition-all group"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl flex items-center justify-center !mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-10 h-10 text-cyan-300 drop-shadow-glow" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-100 !mb-3">
                  {f.title}
                </h3>
                <p className="text-cyan-200/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-20 lg:!py-32 bg-gradient-to-b from-transparent via-[#0f0f2a]/50 to-transparent">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-6">
              Your Past Ends Today
            </h2>
            <p className="text-xl text-cyan-200/80 !mb-10">
              Join <strong>8,921+</strong> people living record-free.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white !px-10 !py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-cyan-500/70 transition-all transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
            >
              CONTACT US NOW
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px currentColor)
            drop-shadow(0 0 20px currentColor);
        }
      `}</style>
    </>
  );
}
