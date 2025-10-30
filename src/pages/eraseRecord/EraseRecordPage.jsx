"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  FiAlertTriangle,
  FiFileText,
  FiServer,
  FiDatabase,
  FiCpu,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { create } from "zustand";
import BuyModal from "../../components/buyModal/BuyModal";

// === Particle System for Dynamic Background ===
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
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
        ctx.fillStyle = `rgba(220, 38, 38, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 * (1 - dist / 120)})`;
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
      window.removeEventEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

// === 3D Globe with Real-Time Erased Nodes ===
const DynamicGlobe = ({ erasedCount }) => {
  const globeRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = globeRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={globeRef}
      className="relative w-80 h-80 cursor-grab active:cursor-grabbing"
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-900 via-black to-red-900 opacity-50 blur-3xl" />
      <div className="absolute inset-4 rounded-full bg-gradient-to-t from-black/90 via-red-950 to-black/80 backdrop-blur-2xl border border-red-700/50 shadow-2xl">
        <FiGlobe className="w-full h-full text-red-500 opacity-20" />
      </div>

      {/* Erased Nodes */}
      {Array.from({ length: Math.min(erasedCount / 100, 40) }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 120 + Math.random() * 40;
        const x = 160 + Math.cos(angle) * radius;
        const y = 160 + Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
            style={{
              left: x,
              top: y,
              boxShadow: "0 0 20px rgba(250, 204, 21, 0.8)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        );
      })}
    </motion.div>
  );
};

// === Live Database Terminal ===
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
      ];

      intervalRef.current = setInterval(() => {
        const db = databases[Math.floor(Math.random() * databases.length)];
        const action = Math.random() > 0.5 ? "DELETING" : "PURGING";
        const fileId = Math.random().toString(36).substr(2, 9).toUpperCase();

        setLogs((prev) => {
          const newLogs = [
            ...prev,
            {
              id: Date.now(),
              db,
              action,
              fileId,
              time: new Date().toLocaleTimeString(),
            },
          ];
          return newLogs.slice(-8);
        });
      }, 800);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <motion.div
      className="bg-black/80 backdrop-blur-xl border border-red-800/50 rounded-xl !p-4 font-mono text-xs h-64 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-red-400">secure_erase_terminal@darknet</span>
      </div>
      <div className="text-green-400 space-y-1">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-red-400">[ERASE]</span>
            <span className="text-cyan-400">{log.db}</span>
            <span>{log.action}</span>
            <span className="text-yellow-400">FILE_{log.fileId}</span>
            <span className="text-gray-500">[{log.time}]</span>
          </motion.div>
        ))}
        {isActive && <span className="animate-pulse">█</span>}
      </div>
    </motion.div>
  );
};

// === Zustand Store for Global State ===
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
  const [activeTab, setActiveTab] = useState("fbi");
  const [modalOpen, setModalOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Live Erasure Simulation
  useEffect(() => {
    if (isErasing && erasedFiles < totalTarget) {
      const timer = setTimeout(() => {
        const burst = Math.floor(Math.random() * 60) + 30;
        incrementErased(burst);
      }, 100);
      return () => clearTimeout(timer);
    } else if (erasedFiles >= totalTarget) {
      setErasing(false);
    }
  }, [erasedFiles, isErasing, totalTarget, incrementErased, setErasing]);

  // Mouse Trail Effect
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

      {/* Mouse Trail */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
        animate={{ scale: isErasing ? 1.5 : 1 }}
      />

      {/* HERO - INTERACTIVE 3D GLOBE + TERMINAL */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]" />

        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              YOUR RECORD
              <br />
              <span className="text-yellow-400">VANISHES NOW</span>
            </motion.h1>

            <motion.p
              className="text-lg text-red-300 !mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Real-time deletion from{" "}
              <strong className="text-yellow-400">
                FBI, Interpol, and 200+ databases
              </strong>
              . Watch it disappear. Forever.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={startErasure}
                disabled={isErasing}
                className="group relative !px-8 !py-4 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full font-bold text-white overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isErasing ? (
                    <>
                      ERASING LIVE <FiZap className="animate-pulse" />
                    </>
                  ) : (
                    <>
                      START ERASURE <FiZap />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  animate={isErasing ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="!px-8 !py-4 border-2 border-red-500 text-red-400 rounded-full font-bold hover:bg-red-500/10 transition-all"
              >
                CONTACT AGENT
              </button>
            </motion.div>

            {/* Live Counter */}
            <motion.div
              className="!mt-10 flex items-center gap-6 text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div>
                <p className="text-5xl font-black text-yellow-400">
                  <CountUp end={erasedFiles} duration={0.5} separator="," />
                </p>
                <p className="text-red-300">FILES ERASED</p>
              </div>
              <div className="h-16 w-px bg-red-500/50" />
              <div>
                <p className="text-5xl font-black text-green-400">100%</p>
                <p className="text-red-300">SUCCESS RATE</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Globe + Terminal */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <DynamicGlobe erasedCount={erasedFiles} />
            <DatabaseTerminal isActive={isErasing} />
          </motion.div>
        </div>
      </section>

      {/* LIVE STATS MARQUEE */}
      <section
        className="bg-black/50 backdrop-blur-xl border-y border-red-800/50 !py-4 overflow-hidden"
        ref={statsRef}
      >
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-16 whitespace-nowrap">
              <span className="text-yellow-400 font-bold">
                8,921 RECORDS ERASED
              </span>
              <span className="text-red-400">•</span>
              <span className="text-green-400 font-bold">48HR GUARANTEE</span>
              <span className="text-red-400">•</span>
              <span className="text-cyan-400 font-bold">
                FBI • INTERPOL • NCIC
              </span>
              <span className="text-red-400">•</span>
            </div>
          ))}
        </motion.div>
      </section>
      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}
