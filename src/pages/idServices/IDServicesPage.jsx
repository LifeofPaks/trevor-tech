import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiGlobe,
  FiTruck,
  FiAward,
  FiUserCheck,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { FaIdCard } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { create } from "zustand";
import BuyModal from "../../components/buyModal/BuyModal";

/* ------------------------------------------------------------------ */
/* -------------------------- NEBULA PARTICLES ----------------------- */
/* ------------------------------------------------------------------ */
const NebulaBackground = () => {
  const canvasRef = useRef(null);
  const [orbs, setOrbs] = useState([]);

  // floating icons (orbits)
  useEffect(() => {
    const icons = [
      { Icon: FaIdCard, hue: 210 },
      { Icon: FiShield, hue: 170 },
      { Icon: FiUserCheck, hue: 130 },
      { Icon: FiFileText, hue: 250 },
      { Icon: FiAward, hue: 60 },
      { Icon: FiGlobe, hue: 190 },
    ];
    const data = Array.from({ length: 5 }, (_, i) => ({
      radius: 140 + i * 90,
      speed: 0.0008 + i * 0.0003,
      particles: Array.from({ length: 5 }, () => ({
        angle: Math.random() * Math.PI * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    }));
    setOrbs(data);
  }, []);

  // particle field
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

    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.6 + 1,
      hue: 200 + Math.random() * 60,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(6, 8, 28, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const pulse = 0.7 + 0.3 * Math.sin(t * 0.018 + p.pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,80%,${pulse})`;
        ctx.fill();

        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${p.hue},100%,75%,0.7)`;
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
        className="fixed inset-0 pointer-events-none z-0 opacity-65"
      />
      {/* orbiting icons */}
      {orbs.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {orbs.map((orb, oi) =>
            orb.particles.map((p, pi) => {
              const Icon = p.icon.Icon;
              const angle = p.angle + performance.now() * 0.001 * orb.speed;
              const x =
                window.innerWidth / 2 + Math.cos(angle) * orb.radius - 22;
              const y =
                window.innerHeight / 2 + Math.sin(angle) * orb.radius - 22;

              return (
                <motion.div
                  key={`${oi}-${pi}`}
                  className="absolute !w-11 !h-11"
                  style={{ left: x, top: y }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon className="w-full h-full text-cyan-300 opacity-7 drop-shadow-glow" />
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
/* --------------------------- 3D ID CARD ---------------------------- */
/* ------------------------------------------------------------------ */
const HoloIDCard = ({ verified }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-300, 300], [22, -22]), {
    stiffness: 110,
    damping: 30,
  });
  const ry = useSpring(useTransform(mx, [-300, 300], [-22, 22]), {
    stiffness: 110,
    damping: 30,
  });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="relative lg:!w-96 lg:!h-60 w-80 h-52 cursor-grab active:cursor-grabbing !my-12 lg:!my-0"
      style={{ rotateX: rx, rotateY: ry, perspective: 1500 }}
      onMouseMove={onMove}
      whileHover={{ scale: 1.07 }}
    >
      {/* Glass base */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-violet-900/70 to-magenta-900/60 backdrop-blur-3xl rounded-3xl border border-cyan-400/40 shadow-2xl overflow-hidden"
        animate={{ rotateY: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {/* Holo strip */}
        <motion.div
          className="absolute inset-x-0 top-0 h-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
        />
        {/* Content */}
        <div className="relative !p-8 flex items-center justify-between h-full">
          <div>
            <div className="flex items-center gap-3 !mb-4">
              <FaIdCard className="text-cyan-300 !w-11 !h-11 drop-shadow-glow" />
              <span className="text-cyan-100 font-black text-2xl tracking-widest">
                ID-HOLO
              </span>
            </div>
            <p className="text-cyan-200 font-medium">JANE A. SMITH</p>
            <p className="text-cyan-300 text-sm">DOB: 07/22/1992</p>
            <p className="text-cyan-300 text-sm">ISS: 10/30/2025</p>
          </div>

          <div className="text-right">
            <div className="relative !w-24 !h-24 mx-auto !mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-400 rounded-full blur-xl opacity-70" />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                alt="photo"
                className="relative !w-full !h-full rounded-full object-cover border-4 border-cyan-300/60 shadow-2xl"
              />
              {verified && (
                <motion.div
                  className="absolute -bottom-1 -right-1 !w-10 !h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <FiCheckCircle className="text-white !w-6 !h-6" />
                </motion.div>
              )}
            </div>
            <p className="text-cyan-200 font-bold text-lg">DL# B9876543</p>
          </div>
        </div>

        {/* Chip */}
        <div className="absolute bottom-6 left-8 !w-12 !h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-md shadow-lg flex items-center justify-center">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="!w-1 !h-1 bg-amber-600 rounded-sm" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scanning rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30"
          style={{ transform: `rotateX(${i * 30}deg)` }}
          animate={{ rotateZ: 360 }}
          transition={{
            duration: 2.8 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* -------------------------- VERIFICATION MATRIX -------------------- */
/* ------------------------------------------------------------------ */
const VerificationMatrix = ({ active, t }) => {
  const [rows, setRows] = useState([]);
  const iv = useRef();

  useEffect(() => {
    if (active) {
      const states = ["CA", "TX", "NY", "FL", "IL", "PA", "OH", "GA"];
      const types = ["DL", "ID", "PASS", "REALID"];
      iv.current = setInterval(() => {
        const state = states[Math.floor(Math.random() * states.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const num = Math.random().toString(36).substr(2, 7).toUpperCase();
        const status = Math.random() > 0.22 ? "VERIFIED" : "SCANNING";

        setRows((prev) => {
          const n = { id: Date.now(), state, type, num, status };
          return [...prev, n].slice(-13);
        });
      }, 580);
    } else {
      clearInterval(iv.current);
      setRows([]);
    }
    return () => clearInterval(iv.current);
  }, [active]);

  return (
    <motion.div
      className="bg-black/85 backdrop-blur-3xl border border-cyan-500/35 rounded-2xl !p-6 font-mono text-xs !h-80 overflow-hidden shadow-2xl w-[350px] !mb-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between !mb-5">
        <div className="flex items-center gap बैंक-3">
          <FiCpu className="text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold tracking-widest">
            {t("id.terminal_prompt")}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-magenta-400" />
        </div>
      </div>

      <div className="space-y-2.5 text-cyan-200">
        {rows.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 font-mono"
          >
            <span
              className={
                r.status === "VERIFIED"
                  ? "text-green-400 animate-pulse"
                  : "text-yellow-400"
              }
            >
              [{r.status}]
            </span>
            <span className="text-cyan-300">
              {r.state}-{r.type}
            </span>
            <span className="text-violet-400">{r.num}</span>
            <span className="text-gray-500">DMV</span>
          </motion.div>
        ))}
        {active && (
          <div className="flex gap-1.5">
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="text-cyan-400"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                block
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* ------------------------------- STORE ----------------------------- */
/* ------------------------------------------------------------------ */
const useIDStore = create((set) => ({
  verified: 0,
  target: 98750,
  running: false,
  setRunning: (v) => set({ running: v }),
  inc: (a) => set((s) => ({ verified: Math.min(s.verified + a, s.target) })),
  reset: () => set({ verified: 0, running: false }),
}));

/* ------------------------------------------------------------------ */
/* ------------------------------ MAIN PAGE -------------------------- */
/* ------------------------------------------------------------------ */
export default function IDServicesPage() {
  const { t } = useTranslation();
  const { verified, target, running, setRunning, inc, reset } = useIDStore();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [modal, setModal] = useState(false);

  const { ref: heroR, inView: heroV } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: statsR, inView: statsV } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: featR, inView: featV } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: testR, inView: testV } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const bgY = transformScroll(scrollYProgress, [0, 1], ["0%", "90%"]);

  // live counter
  useEffect(() => {
    if (running && verified < target) {
      const id = setTimeout(
        () => inc(Math.floor(Math.random() * 12000) + 4800),
        150
      );
      return () => clearTimeout(id);
    } else if (verified >= target) setRunning(false);
  }, [verified, running, target, inc, setRunning]);

  // mouse trail
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const start = () => {
    reset();
    setRunning(true);
  };

  return (
    <>
      <NebulaBackground />

      {/* GLOW TRAIL */}
      <motion.div
        className="fixed !w-[520px] !h-[520px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.33) 0%, transparent 70%)",
          left: mouse.x - 260,
          top: mouse.y - 260,
        }}
        animate={{ scale: running ? 1.55 : 1 }}
        transition={{ type: "spring", stiffness: 280 }}
      />

      {/* HERO – SPLIT SCREEN */}
      <section
        ref={heroR}
        className="relative min-h-screen flex items-center justify-center overflow-hidden lg:!pt-20 !pt-45"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#1a0033] opacity-94" />

        <motion.div className="absolute inset-0 opacity-30" style={{ y: bgY }}>
          <div className="absolute top-20 left-20 !w-[720px] !h-[720px] bg-gradient-to-r from-cyan-600/20 to-violet-600/12 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-32 !w-[680px] !h-[680px] bg-gradient-to-r from-magenta-600/18 to-cyan-600/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT – TEXT + STATS */}
          <motion.div
            initial={{ opacity: 0, x: -180 }}
            animate={heroV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1 }}
          >
            <motion.h1
              className="text-center lg:text-left text-5xl lg:text-8xl font-black bg-gradient-to-r from-cyan-300 via-violet-300 to-magenta-300 bg-clip-text text-transparent !mb-8 leading-none tracking-tighter"
              initial={{ opacity: 0, y: 60 }}
              animate={heroV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {t("id.hero_title")}
            </motion.h1>

            <motion.p
              className="lg:text-2xl text-cyan-200 !mb-12 max-w-3xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={heroV ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {t("id.hero_description")}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-col lg:flex-row justify-center lg:justify-start gap-12 !mb-12"
              initial={{ opacity: 0 }}
              animate={heroV ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <div className="text-center">
                <p className="text-6xl font-black text-cyan-300">
                  <CountUp end={verified} duration={0.6} separator="," />
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">
                  {t("id.stats_verified")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-black text-violet-400">
                  <CountUp end={Math.floor(verified / 620)} duration={0.6} />K
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">
                  {t("id.stats_users")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-black text-magenta-400 flex items-center justify-center gap-3">
                  100% <FiCheckCircle />
                </p>
                <p className="text-cyan-200 !mt-2 text-lg">
                  {t("id.stats_compliant")}
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 !mt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={heroV ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={start}
                disabled={running}
                className="group relative !px-10 !py-5 bg-gradient-to-r from-cyan-500 via-violet-500 to-magenta-500 rounded-full font-bold text-white overflow-hidden disabled:opacity-50 shadow-2xl text-[16px] w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {running ? (
                    <>
                      {t("id.cta_verifying")} <FiCpu className="animate-spin" />
                    </>
                  ) : (
                    <>
                      {t("id.cta_start_scan")} <FiCpu />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/35"
                  animate={running ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
              </button>

              <button
                onClick={() => setModal(true)}
                className="!px-10 !py-5 border-1 border-cyan-400 text-cyan-300 rounded-full font-bold hover:bg-cyan-500/10 transition-all backdrop-blur-sm text-[16px] w-full sm:w-auto"
              >
                {t("id.cta_contact_us")}
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT – CARD + MATRIX */}
          <motion.div
            className="flex flex-col items-center gap-12"
            initial={{ opacity: 0, x: 180 }}
            animate={heroV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1 }}
          >
            <HoloIDCard verified={verified > 50000} />
            <VerificationMatrix active={running} t={t} />
          </motion.div>
        </div>
      </section>

      {/* FEATURES – ORB STYLE */}
      <section
        ref={featR}
        className="!relative !py-20 lg:!py-48 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#1a0033] opacity-94"
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center lg:!mb-32 !mb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={featV ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-violet-300 to-magenta-300 bg-clip-text text-transparent lg:!mb-8 !mb-4">
              {t("id.features_title")}
            </h2>
            <p className="lg:text-2xl text-cyan-200 max-w-5xl !mx-auto">
              {t("id.features_description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FiShield,
                title: t("id.feature_1_title"),
                desc: t("id.feature_1_description"),
              },
              {
                icon: FiZap,
                title: t("id.feature_2_title"),
                desc: t("id.feature_2_description"),
              },
              {
                icon: FiLock,
                title: t("id.feature_3_title"),
                desc: t("id.feature_3_description"),
              },
              {
                icon: FiGlobe,
                title: t("id.feature_4_title"),
                desc: t("id.feature_4_description"),
              },
              {
                icon: FiTruck,
                title: t("id.feature_5_title"),
                desc: t("id.feature_5_description"),
              },
              {
                icon: FiAward,
                title: t("id.feature_6_title"),
                desc: t("id.feature_6_description"),
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 70 }}
                animate={featV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/6 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl !p-8 shadow-2xl hover:shadow-cyan-500/60 transition-all h-[300px] flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-full flex items-center justify-center !mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="!w-12 !h-12 text-cyan-300 drop-shadow-glow" />
                  </div>
                  <h3 className="lg:text-2xl text-xl font-bold text-cyan-100 !mb-2">
                    {f.title}
                  </h3>
                  <p className="text-cyan-200/80 text-lg leading-relaxed flex-1">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS – CIRCULAR AVATARS */}
      <section
        ref={testR}
        className="relative !py-16 lg:!py-48 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#1a0033] opacity-94"
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center lg:!mb-32 !mb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={testV ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-violet-300 to-magenta-300 bg-clip-text text-transparent lg:!mb-8 !mb-3">
              {t("id.testimonials_title")}
            </h2>
            <p className="lg:text-2xl text-cyan-200 max-w-5xl !mx-auto">
              {t("id.testimonials_description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: t("id.testimonial_1_name"),
                state: t("id.testimonnal_1_state"),
                time: t("id.testimonial_1_time"),
                avatar:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
                desc: t("id.testimonial_1_description"),
              },
              {
                name: t("id.testimonial_2_name"),
                state: t("id.testimonial_2_state"),
                time: t("id.testimonial_2_time"),
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                desc: t("id.testimonial_2_description"),
              },
              {
                name: t("id.testimonial_3_name"),
                state: t("id.testimonial_3_state"),
                time: t("id.testimonial_3_time"),
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                desc: t("id.testimonial_3_description"),
              },
              {
                name: t("id.testimonial_4_name"),
                state: t("id.testimonial_4_state"),
                time: t("id.testimonial_4_time"),
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                desc: t("id.testimonial_4_description"),
              },
              {
                name: t("id.testimonial_5_name"),
                state: t("id.testimonial_5_state"),
                time: t("id.testimonial_5_time"),
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                desc: t("id.testimonial_5_description"),
              },
              {
                name: t("id.testimonial_6_name"),
                state: t("id.testimonial_6_state"),
                time: t("id.testimonial_6_time"),
                avatar:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                desc: t("id.testimonial_6_description"),
              },
            ].map((tm, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 60 }}
                animate={testV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.11 }}
                whileHover={{ y: -14, scale: 1.04 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-violet-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/6 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl !p-8 shadow-2xl hover:shadow-cyan-500/60 transition-all flex flex-col items-center text-center h-[310px]">
                  <div className="relative !w-24 !h-24 !mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-400 rounded-full blur-xl opacity-70" />
                    <img
                      src={tm.avatar}
                      alt={tm.name}
                      className="relative !w-full !h-full rounded-full object-cover border-4 border-cyan-300/60 shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 !w-9 !h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                      <span className="text-white text-xs font-bold">
                        {tm.state.slice(0, 2)}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-cyan-100 text-xl !mb-1">
                    {tm.name}
                  </h3>
                  <p className="text-cyan-300 !mb-2">{tm.state}</p>

                  <div className="flex justify-between w-full text-cyan-400 !mb-2 text-sm">
                    <span className="flex items-center gap-2">
                      <FiClock /> {tm.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-400" />{" "}
                      {t("id.stats_verified")}
                    </span>
                  </div>

                  <p className="text-cyan-200/90 italic leading-relaxed">
                    {tm.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-16 lg:!py-48 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#1a0033] opacity-94">
        <div className="max-w-5xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-violet-300 to-magenta-300 bg-clip-text text-transparent lg:!mb-8 !mb-2">
              {t("id.final_cta_title")}
            </h2>
            <p className="lg:text-3xl text-cyan-200/80 !mb-14">
              {t("id.final_cta_description")}
            </p>
            <button
              onClick={() => setModal(true)}
              className="bg-gradient-to-r from-cyan-500 via-violet-500 to-magenta-500 hover:from-cyan-400 hover:via-violet-400 hover:to-magenta-400 text-white !px-8 !py-4 lg:!px-12 lg:!py-6 rounded-full font-bold lg:text-xl shadow-2xl hover:shadow-cyan-500/80 transition-all transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
            >
              {t("id.final_cta_button")}
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modal} handleClose={() => setModal(false)} />

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px currentColor)
            drop-shadow(0 0 40px currentColor);
        }
      `}</style>
    </>
  );
}
