
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useTransform as transformScroll } from 'framer-motion';
import { 
  FiShield, FiZap, FiLock, FiRefreshCw, 
  FiCheckCircle, FiClock, FiCpu, FiEyeOff,
  FiTrendingUp, FiKey, FiCode, FiTerminal, FiBox, FiServer
} from "react-icons/fi";
import { FaDollarSign, FaEthereum, FaTelegramPlane } from "react-icons/fa";
import { SiSolana, SiCardano, SiBinance, SiDogecoin, SiChainlink, SiPolygon, SiPolkadot, SiStellar, SiHedera, SiLitecoin, SiBitcoincash } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';
import { create } from 'zustand';
import BuyModal from "../../components/buyModal/BuyModal";
import { RiBtcFill, RiXrpFill } from 'react-icons/ri';

const CryptoOrbital = () => {
  const canvasRef = useRef(null);
  const [orbData, setOrbData] = useState([]);

  // === Generate orbital data for floating icons ===
  useEffect(() => {
    const coins = [
      { Icon: RiBtcFill, hue: 25 },
      { Icon: FaEthereum, hue: 200 },
      { Icon: SiSolana, hue: 140 },
      { Icon: SiCardano, hue: 170 },
      { Icon: SiBinance, hue: 50 },
      { Icon: SiDogecoin, hue: 60 },
    ];

    const orbs = Array.from({ length: 3 }, (_, i) => ({
      radius: 180 + i * 120,
      speed: 0.0012 + i * 0.0003,
      hue: 160 + i * 15,
      particles: Array.from({ length: 3 }, () => ({
        angle: Math.random() * Math.PI * 2,
        coin: coins[Math.floor(Math.random() * coins.length)],
      })),
    }));

    setOrbData(orbs);
  }, []);

  // === LIGHTWEIGHT + DENSE PARTICLE FIELD ===
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

    // 100 particles → dense but fast
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 2.2 + 1.8,
      hue: 160 + Math.random() * 45, // Cyan → Teal → Green
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      // Stronger trail
      ctx.fillStyle = "rgba(10, 10, 31, 0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Strong pulse
        const pulse = 0.75 + 0.25 * Math.sin(time * 0.025 + p.pulsePhase);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 78%, ${pulse * 0.9})`;
        ctx.fill();

        // Strong glow
        ctx.shadowBlur = 28;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect to nearby
        particles.forEach((other) => {
          if (other === p) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const opacity = (1 - dist / 180) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${
              (p.hue + other.hue) / 2
            }, 100%, 68%, ${opacity})`;
            ctx.lineWidth = 1.2;
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
        className="fixed inset-0 pointer-events-none z-0 opacity-75"
      />

      {/* Floating Crypto Icons (9 total) */}
      {orbData.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {orbData.map((orb, orbIdx) =>
            orb.particles.map((p, idx) => {
              const Icon = p.coin.Icon;
              const angle = p.angle + performance.now() * 0.001 * orb.speed;
              const x =
                window.innerWidth / 2 + Math.cos(angle) * orb.radius - 16;
              const y =
                window.innerHeight / 2 + Math.sin(angle) * orb.radius - 16;

              return (
                <motion.div
                  key={`${orbIdx}-${idx}`}
                  className="absolute !w-8 !h-8"
                  style={{ left: x, top: y }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon
                    className="w-full h-full text-cyan-300 opacity-80 drop-shadow-glow"
                    style={{ filter: "drop-shadow(0 0 14px currentColor)" }}
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
// === 3D NEURAL CRYPTO SCANNER (ROTATING CUBE) ===
const NeuralCryptoScanner = ({ recovered }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative lg:!w-96 lg:!h-96 w-76 h-76 cursor-grab active:cursor-grabbing lg:my-0 !my-10"
      style={{ rotateX, rotateY, perspective: 1600 }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.08 }}
    >
      {/* Core Cube */}
      <motion.div
        className="absolute inset-12 bg-gradient-to-br from-cyan-900/70 via-teal-900/60 to-green-900/50 backdrop-blur-3xl rounded-3xl border border-cyan-400/40 shadow-2xl"
        animate={{ rotateY: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />
        <FiBox className="!w-full !h-full text-cyan-300 opacity-20 p-8" />
      </motion.div>

      {/* Scanning Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-3xl border-2 border-cyan-400/50"
          style={{ transform: `rotateX(${i * 30}deg)` }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 2.8 + i * 0.5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Floating Crypto Nodes */}
      {Array.from({ length: Math.min(recovered / 7000, 40) }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 170 + (i % 4) * 25;
        const x = 192 + Math.cos(angle) * radius;
        const y = 192 + Math.sin(angle) * radius;

        const coinIcons = [
          RiBtcFill,
          FaEthereum,
          SiSolana,
          SiCardano,
          SiBinance,
          SiDogecoin,
        ];
        const Icon = coinIcons[i % coinIcons.length];

        return (
          <motion.div
            key={i}
            className="absolute !w-6 !h-6"
            style={{ left: x, top: y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.06 }}
          >
            <Icon className="w-full h-full text-cyan-300 drop-shadow-glow" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// === LIVE RECOVERY MATRIX (TERMINAL) ===
const RecoveryMatrix = ({ isActive }) => {
  const [lines, setLines] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    if (isActive) {
      const wallets = ["0x4aF...9e2", "bc1qm...x7p", "G7kL...m3n", "So9...abc", "rXy...k1z"];
      const coins = ["BTC", "ETH", "USDT", "SOL", "ADA", "DOGE"];

      intervalRef.current = setInterval(() => {
        const wallet = wallets[Math.floor(Math.random() * wallets.length)];
        const coin = coins[Math.floor(Math.random() * coins.length)];
        const amount = (Math.random() * 32 + 1.5).toFixed(4);
        const status = Math.random() > 0.25 ? "UNLOCKED" : "SCANNING";

        setLines(prev => {
          const newLine = { id: Date.now(), wallet, coin, amount, status };
          return [...prev, newLine].slice(-14);
        });
      }, 480);
    } else {
      clearInterval(intervalRef.current);
      setLines([]);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <motion.div
      className="bg-black/85 backdrop-blur-3xl border border-cyan-500/40 rounded-2xl !p-6 font-mono text-xs !h-86 overflow-hidden shadow-2xl min-w-[300px] !mb-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between !mb-5">
        <div className="flex items-center gap-3">
          <FiTerminal className="text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold tracking-widest">NEURAL_VAULT@v2</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="space-y-2.5 text-cyan-200">
        {lines.map(line => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 font-mono"
          >
            <span className={line.status === "UNLOCKED" ? "text-green-400 animate-pulse" : "text-yellow-400"}>
              [{line.status}]
            </span>
            <span className="text-cyan-300">{line.wallet}</span>
            <span className="text-teal-400">{line.amount} {line.coin}</span>
            <span className="text-gray-500">→ SECURE WALLET</span>
          </motion.div>
        ))}
        {isActive && (
          <div className="flex gap-1.5">
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="text-cyan-400"
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
              >
                █
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// === Zustand Store ===
const useRecoveryStore = create(set => ({
  recovered: 0,
  target: 124750,
  isRecovering: false,
  setRecovering: v => set({ isRecovering: v }),
  increment: a => set(s => ({ recovered: Math.min(s.recovered + a, s.target) })),
  reset: () => set({ recovered: 0, isRecovering: false })
}));

// === MAIN PAGE ===
export default function CryptoRecoveryPage() {
  const { recovered, target, isRecovering, setRecovering, increment, reset } = useRecoveryStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.2, triggerOnce: true });

  const { scrollYProgress } = useScroll();
  const backgroundY = transformScroll(scrollYProgress, [0, 1], ['0%', '120%']);

  // Live Recovery (only updates counter)
  useEffect(() => {
    if (isRecovering && recovered < target) {
      const timer = setTimeout(() => {
        const burst = Math.floor(Math.random() * 14000) + 7000;
        increment(burst);
      }, 110);
      return () => clearTimeout(timer);
    } else if (recovered >= target) {
      setRecovering(false);
    }
  }, [recovered, isRecovering, target, increment, setRecovering]);

  // Mouse Trail (same as previous: 600px glow)
  useEffect(() => {
    const handleMouse = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const startRecovery = () => {
    reset();
    setRecovering(true);
  };

  return (
    <>
      <CryptoOrbital />

      {/* GLOWING MOUSE TRAIL (600px) */}
      <motion.div
        className="fixed !w-[600px] !h-[600px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
        animate={{ scale: isRecovering ? 1.7 : 1 }}
        transition={{ type: "spring", stiffness: 320 }}
      />

      {/* HERO - ASYMMETRIC LAYOUT */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden lg:!pt-[6rem] !pt-[10rem]"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033] opacity-90" />

        {/* Parallax Orbs */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-32 left-32 !w-[650px] !h-[650px] bg-gradient-to-r from-cyan-600/30 to-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-48 right-48 !w-[600px] !h-[600px] bg-gradient-to-r from-green-600/25 to-cyan-600/15 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: HERO TEXT (COL 7) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -160 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              className="text-center lg:text-left text-5xl lg:text-8xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-8 leading-none tracking-tighter"
              initial={{ opacity: 0, y: 60 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              CRYPTO
              <br />
              <span className="text-5xl lg:text-7xl text-cyan-200">
                UNLOCKED
              </span>
            </motion.h1>

            <motion.p
              className=" lg:text-2xl text-cyan-200/90 !mb-12 max-w-3xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Neural AI scans{" "}
              <strong className="text-teal-300">15 million wallets/sec</strong>.
              Recovers{" "}
              <span className="text-green-300 font-bold">any coin</span> from
              any source, no seed, no trace, no limits.
            </motion.p>

            {/* Live Stats */}
            <motion.div
              className="flex items-center flex-col lg:flex-row justify-center lg:justify-between gap-12 w-full"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-cyan-300">
                  $<CountUp end={recovered} duration={0.6} separator="," />
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">RECOVERED</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-teal-400">
                  <CountUp end={Math.floor(recovered / 800)} duration={0.6} />K
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">WALLETS</p>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-6xl font-black text-green-400 flex items-center gap-3">
                  100% <FiCheckCircle />
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">SUCCESS</p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-wrap lg:gap-8 gap-4 !mt-16 "
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={startRecovery}
                disabled={isRecovering}
                className="group relative !px-14 !py-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 rounded-full font-bold text-white overflow-hidden disabled:opacity-50 shadow-2xl lg:text-xl w-full lg:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {isRecovering ? (
                    <>
                      SCANNING LIVE <FiCpu className="animate-spin" />
                    </>
                  ) : (
                    <>
                      START NEURAL SCAN <FiCpu />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  animate={isRecovering ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="!px-14 !py-6 border-2 border-cyan-400 text-cyan-300 rounded-full font-bold hover:bg-cyan-500/10 transition-all backdrop-blur-sm lg:text-xl w-full lg:w-auto"
              >
                CONTACT OPS
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D SCANNER + MATRIX (COL 5) */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-12"
            initial={{ opacity: 0, x: 160 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2 }}
          >
            <NeuralCryptoScanner recovered={recovered} />
            <RecoveryMatrix isActive={isRecovering} />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE – SCROLLING COIN LIST */}
      <section
        className="bg-black/70 backdrop-blur-3xl border-y border-cyan-500/30 !py-7 overflow-hidden"
        ref={statsRef}
      >
        <motion.div
          className="flex gap-12"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {/* Duplicate the list a few times so the marquee never has a gap */}
          {[...Array(3)].map((_, repeatIdx) => (
            <div
              key={repeatIdx}
              className="flex gap-12 items-center whitespace-nowrap"
            >
              {[
                { Icon: RiBtcFill, name: "BTC" },
                { Icon: FaEthereum, name: "ETH" },
                { Icon: SiSolana, name: "SOL" },
                { Icon: SiCardano, name: "ADA" },
                { Icon: SiBinance, name: "BNB" },
                { Icon: SiDogecoin, name: "DOGE" },
                { Icon: RiXrpFill, name: "XRP" },
                { Icon: FaDollarSign, name: "USDT" },
                { Icon: SiPolygon, name: "MATIC" },
                { Icon: SiChainlink, name: "LINK" },
                { Icon: SiPolkadot, name: "DOT" },
                { Icon: SiLitecoin, name: "LTC" },
                { Icon: SiBitcoincash, name: "BCH" },
                { Icon: SiStellar, name: "XLM" },
                { Icon: SiHedera, name: "HBAR" },
              ].map((coin, i) => (
                <div
                  key={`${repeatIdx}-${i}`}
                  className="flex items-center gap-3 !px-6 !py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full border border-cyan-500/30 backdrop-blur-sm"
                >
                  {coin.Icon ? (
                    <coin.Icon className="w-6 h-6 text-cyan-300 drop-shadow-glow" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400" />
                  )}
                  <span className="text-cyan-200 font-bold text-xl tracking-wider">
                    {coin.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative !py-28 lg:!py-44" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center !mb-24"
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-8">
              NEURAL ENGINE
            </h2>
            <p className="text-2xl text-cyan-200/80 max-w-5xl !mx-auto">
              Cracks any wallet. Bypasses any lock. Recovers any coin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FiKey,
                title: "Seedless",
                desc: "Rebuild from zero data.",
              },
              { icon: FiCode, title: "Neural Force", desc: "15M+ keys/sec." },
              { icon: FiEyeOff, title: "Ghost Mode", desc: "Zero trace." },
              { icon: RiBtcFill, title: "All Chains", desc: "200+ supported." },
              { icon: FiZap, title: "Instant", desc: "Funds in seconds." },
              { icon: FiShield, title: "Quantum Safe", desc: "Future-proof." },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 70 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.16 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/80 backdrop-blur-3xl border border-cyan-500/40 rounded-3xl !p-12 shadow-2xl group-hover:shadow-cyan-500/60 transition-all">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/25 to-teal-500/25 rounded-2xl flex items-center justify-center !mb-8 group-hover:scale-110 transition-transform">
                    <f.icon className="!w-14 !h-14 text-cyan-300 drop-shadow-glow" />
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-100 !mb-5">
                    {f.title}
                  </h3>
                  <p className="text-cyan-200/80 text-lg leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative !py-28 lg:!py-44" ref={testimonialsRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center !mb-24"
            initial={{ opacity: 0, y: 60 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-8">
              SUCCESS LOG
            </h2>
            <p className="text-2xl text-cyan-200/80 max-w-5xl !mx-auto">
              <strong>1,247+</strong> wallets. <strong>$124M+</strong>{" "}
              recovered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Alex R.",
                chain: "Bitcoin",
                amount: "$71,200",
                time: "16 hrs",
              },
              {
                name: "Maya L.",
                chain: "Ethereum",
                amount: "$45,600",
                time: "9 hrs",
              },
              {
                name: "Kai P.",
                chain: "Solana",
                amount: "$33,100",
                time: "20 hrs",
              },
              {
                name: "Nia S.",
                chain: "Cardano",
                amount: "$19,800",
                time: "12 hrs",
              },
              {
                name: "Leo T.",
                chain: "Polygon",
                amount: "$14,300",
                time: "7 hrs",
              },
              {
                name: "Zoe A.",
                chain: "Binance",
                amount: "$23,700",
                time: "18 hrs",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 60 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.13 }}
                whileHover={{ y: -14, scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/80 backdrop-blur-3xl border border-cyan-500/40 rounded-3xl !p-10 shadow-2xl">
                  <div className="flex items-center gap-5 !mb-6">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/50 to-teal-500/40 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative !w-18 !h-18 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-white text-2xl">
                        {t.chain === "Bitcoin" ? <RiBtcFill /> : <FaEthereum />}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-cyan-100 text-xl">
                        {t.name}
                      </h3>
                      <p className="text-cyan-300">{t.chain}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-cyan-400 !mb-5 text-lg">
                    <span>{t.amount}</span>
                    <span className="flex items-center gap-2">
                      <FiClock /> {t.time}
                    </span>
                  </div>
                  <p className="text-cyan-200/90 italic text-lg leading-relaxed">
                    "Fully recovered. No seed."
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-28 lg:!py-44 bg-gradient-to-b from-transparent via-[#0f0f2a]/50 to-transparent">
        <div className="max-w-5xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-8">
              UNLOCK NOW
            </h2>
            <p className="text-3xl text-cyan-200/80 !mb-14">
              Your funds are waiting.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 hover:from-cyan-400 hover:via-teal-400 hover:to-green-400 text-white !px-20 !py-7 rounded-full font-bold text-3xl shadow-2xl hover:shadow-cyan-500/80 transition-all transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
            >
              CONTACT TEAM
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 16px currentColor)
            drop-shadow(0 0 32px currentColor);
        }
      `}</style>
    </>
  );
}