import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import {
  FiLock,
  FiEyeOff,
  FiZap,
  FiCheckCircle,
  FiSmartphone,
  FiCpu,
} from "react-icons/fi";
import {
  BsWhatsapp,
  BsInstagram,
  BsSnapchat,
  BsMessenger,
  BsTelegram,
} from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import BuyModal from "../../components/buyModal/BuyModal";

// Testimonials Data
const testimonials = [
  { name: "Emma T.", img: "https://randomuser.me/api/portraits/women/22.jpg", textKey: "smedia.testimonial_1", typeKey: "smedia.testimonial_type_1", timeKey: "smedia.testimonial_time_1" }, // Snapchat
  { name: "Liam S.", img: "https://randomuser.me/api/portraits/men/38.jpg", textKey: "smedia.testimonial_2", typeKey: "smedia.testimonial_type_2", timeKey: "smedia.testimonial_time_2" }, // Instagram
  { name: "Aisha M.", img: "https://randomuser.me/api/portraits/women/49.jpg", textKey: "smedia.testimonial_3", typeKey: "smedia.testimonial_type_3", timeKey: "smedia.testimonial_time_3" }, // WhatsApp
  { name: "Noah K.", img: "https://randomuser.me/api/portraits/men/64.jpg", textKey: "smedia.testimonial_4", typeKey: "smedia.testimonial_type_4", timeKey: "smedia.testimonial_time_4" }, // Facebook
  { name: "Sophia L.", img: "https://randomuser.me/api/portraits/women/75.jpg", textKey: "smedia.testimonial_5", typeKey: "smedia.testimonial_type_5", timeKey: "smedia.testimonial_time_5" }, // Telegram
  { name: "Ethan R.", img: "https://randomuser.me/api/portraits/men/19.jpg", textKey: "smedia.testimonial_6", typeKey: "smedia.testimonial_type_6", timeKey: "smedia.testimonial_time_6" }, // Instagram
  { name: "Olivia P.", img: "https://randomuser.me/api/portraits/women/33.jpg", textKey: "smedia.testimonial_7", typeKey: "smedia.testimonial_type_7", timeKey: "smedia.testimonial_time_7" }, // Snapchat
  { name: "James W.", img: "https://randomuser.me/api/portraits/men/45.jpg", textKey: "smedia.testimonial_8", typeKey: "smedia.testimonial_type_8", timeKey: "smedia.testimonial_time_8" }, // Snapchat
  { name: "Mia C.", img: "https://randomuser.me/api/portraits/women/61.jpg", textKey: "smedia.testimonial_9", typeKey: "smedia.testimonial_type_9", timeKey: "smedia.testimonial_time_9" }, // Snapchat
  { name: "Lucas B.", img: "https://randomuser.me/api/portraits/men/27.jpg", textKey: "smedia.testimonial_10", typeKey: "smedia.testimonial_type_10", timeKey: "smedia.testimonial_time_10" }, // Snapchat
  { name: "Ava D.", img: "https://randomuser.me/api/portraits/women/82.jpg", textKey: "smedia.testimonial_11", typeKey: "smedia.testimonial_type_11", timeKey: "smedia.testimonial_time_11" }, // Snapchat
  { name: "Henry J.", img: "https://randomuser.me/api/portraits/men/53.jpg", textKey: "smedia.testimonial_12", typeKey: "smedia.testimonial_type_12", timeKey: "smedia.testimonial_time_12" }, // Snapchat
];

// HoloGrid Background
const HoloGridBackground = () => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodesData = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 2,
      hue: 180 + Math.random() * 20, // Cyan to teal
      pulse: Math.random() * Math.PI * 2,
    }));

    setNodes(nodesData);

    const draw = () => {
      ctx.fillStyle = "rgba(6, 8, 28, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodesData.forEach((n1, i) => {
        const pulse = 0.7 + 0.3 * Math.sin(performance.now() * 0.002 + n1.pulse);
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n1.hue},100%,80%,${pulse})`;
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${n1.hue},100%,75%,0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        nodesData.forEach((n2, j) => {
          if (i < j && Math.hypot(n1.x - n2.x, n1.y - n2.y) < 100) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `hsla(${n1.hue},80%,70%,0.2)`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const icons = [
    { Icon: BsSnapchat, left: "15%", top: "20%", hue: 180 },
    { Icon: BsSnapchat, left: "65%", top: "25%", hue: 182 },
    { Icon: BsSnapchat, left: "30%", top: "70%", hue: 184 },
    { Icon: BsInstagram, left: "80%", top: "15%", hue: 190 },
    { Icon: BsWhatsapp, left: "20%", top: "50%", hue: 195 },
    { Icon: BsTelegram, left: "70%", top: "60%", hue: 200 },
  ];

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent opacity-25"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
        >
          <item.Icon className="w-10 h-10 text-teal-400 drop-shadow-glow" />
        </motion.div>
      ))}
    </>
  );
};

// HoloAccess Terminal
const HoloAccessTerminal = ({ inView }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-300, 300], [-10, 10]), { stiffness: 100, damping: 20 });
  const ty = useSpring(useTransform(my, [-300, 300], [-10, 10]), { stiffness: 100, damping: 20 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView && progress < 100) {
      const timer = setInterval(() => setProgress((prev) => Math.min(prev + 1.5, 100)), 80);
      return () => clearInterval(timer);
    }
  }, [inView, progress]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="relative lg:!w-[450px] lg:!h-[300px] !w-[360px] !h-[240px] !my-12 lg:!my-0"
      style={{ x: tx, y: ty, perspective: 1000 }}
      onMouseMove={onMove}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/70 via-violet-900/60 to-teal-900/50 backdrop-blur-3xl rounded-2xl border border-teal-400/50 shadow-2xl overflow-hidden"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative !p-6 h-full flex flex-col">
          <div className="flex items-center !gap-3 !mb-4">
            <FiCpu className="text-teal-400 !w-10 !h-10 drop-shadow-glow" />
            <span className="text-cyan-100 font-black text-xl tracking-widest">{t("smedia.simulation_title")}</span>
          </div>
          <div className="flex-1 font-mono text-sm text-cyan-200/80 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                &gt; {`Breach attempt ${Math.random().toString(36).substr(2, 5).toUpperCase()}... ${progress > 80 ? "SUCCESS" : "RUNNING"}`}
              </motion.div>
            ))}
          </div>
          <div className="relative !w-24 !h-24 !mx-auto">
            <svg className="w-full h-full">
              <circle cx="50%" cy="50%" r="40%" fill="none" stroke="url(#progressGradient)" strokeWidth="4" strokeDasharray={`${progress * 2.51} 251`} />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#22d3ee" }} />
                  <stop offset="100%" style={{ stopColor: "#2dd4bf" }} />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-cyan-100 font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Quantum Matrix
const QuantumMatrix = ({ active, t }) => {
  const [cells, setCells] = useState([]);
  const iv = useRef();

  useEffect(() => {
    if (active) {
      const platforms = ["Snapchat", "Snapchat", "Snapchat", "Instagram", "WhatsApp", "Telegram"];
      iv.current = setInterval(() => {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const num = Math.random().toString(36).substr(2, 7).toUpperCase();
        const status = Math.random() > 0.3 ? "BYPASSED" : "SCANNING";

        setCells((prev) => {
          const n = { id: Date.now(), platform, num, status };
          return [...prev, n].slice(-10);
        });
      }, 600);
    } else {
      clearInterval(iv.current);
      setCells([]);
    }
    return () => clearInterval(iv.current);
  }, [active]);

  return (
    <motion.div
      className="bg-black/85 backdrop-blur-3xl border border-teal-400/40 rounded-2xl !p-6 !h-72 overflow-hidden shadow-2xl !w-[360px] !mb-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center justify-between !mb-4">
        <div className="flex items-center !gap-3">
          <FiCpu className="text-teal-400 animate-pulse" />
          <span className="text-cyan-300 font-bold tracking-widest">{t("smedia.matrix_title")}</span>
        </div>
        <div className="flex !gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-violet-400" />
          <div className="w-2 h-2 rounded-full bg-teal-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 !gap-2 text-xs text-cyan-200 font-mono">
        {cells.map((c) => (
          <motion.div
            key={c.id}
            className="hexagon bg-gradient-to-br from-cyan-900/50 to-teal-900/50 !p-2 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className={c.status === "BYPASSED" ? "text-green-400 animate-pulse" : "text-yellow-400"}>[{c.status}]</span>
            <span className="text-cyan-300"> {c.platform}</span>
            <span className="text-violet-400"> {c.num}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Access Orb
const AccessOrb = ({ inView }) => {
  const { t } = useTranslation("smedia");
  return (
    <motion.div
      className="fixed bottom-10 right-10 !w-40 !h-40 bg-gradient-to-br from-cyan-900/70 to-teal-900/70 backdrop-blur-3xl rounded-full border border-teal-400/50 shadow-2xl flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="text-center text-cyan-200">
        <p className="text-sm"><span className="text-teal-400">{t("smedia.matrix_accounts")}</span>: 12,847</p>
        <p className="text-sm"><span className="text-teal-400">{t("smedia.matrix_platforms")}</span>: 20+</p>
      </div>
    </motion.div>
  );
};

const SocialMediaPage = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [particleBurst, setParticleBurst] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [running, setRunning] = useState(false);
  const { scrollYProgress } = useScroll();

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleCtaClick = () => {
    setModalOpen(true);
    setParticleBurst(true);
    setTimeout(() => setParticleBurst(false), 2000);
    setRunning(true);
  };

  return (
    <>
      <HoloGridBackground />
      <motion.div
        className="fixed !w-96 !h-96 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.4) 0%, transparent 70%)",
          left: mouse.x - 192,
          top: mouse.y - 192,
        }}
        animate={{ scale: running ? 1.3 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center !pt-32 lg:!pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#0a2e33] opacity-95" />
        <div className="relative z-10 max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 !gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-center lg:text-left text-5xl lg:text-7xl font-black bg-gradient-to-r from-cyan-300  bg-clip-text text-transparent !mb-8 leading-tight "
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {t("smedia.hero_title")}
            </motion.h1>
            <motion.p
              className="lg:text-xl text-cyan-200 !mb-10 max-w-2xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {t("smedia.hero_description")}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row !gap-4 !mt-8" initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
              <button
                onClick={() => setModalOpen(true)}
                className="!px-8 !py-4 border border-teal-600 text-teal-600 rounded-full font-bold hover:bg-teal-500/20 transition-all"
              >
                {t("smedia.cta_contact_us")}
              </button>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 100 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <HoloAccessTerminal inView={heroInView} />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section ref={howItWorksRef} className="relative !py-20 lg:!py-32 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#0a2e33] opacity-95">
        <div className="max-w-7xl !mx-auto !px-6">
          <motion.h2
            className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300  bg-clip-text text-transparent !mb-12 text-center "
            initial={{ opacity: 0, y: 30 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.how_it_works_title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-8">
            {[
              { icon: FiZap, titleKey: "smedia.step_1_title", descKey: "smedia.step_1_description", color: "cyan-300" },
              { icon: FiSmartphone, titleKey: "smedia.step_2_title", descKey: "smedia.step_2_description", color: "violet-300" },
              { icon: FiLock, titleKey: "smedia.step_3_title", descKey: "smedia.step_3_description", color: "teal-300" },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative group bg-gradient-to-br from-cyan-900/70 to-teal-900/70 backdrop-blur-2xl border border-teal-400/50 rounded-xl !p-6 text-center shadow-xl hover:shadow-teal-500/60"
                initial={{ opacity: 0, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                whileHover={{ rotateY: 180 }}
              >
                <motion.div className="absolute inset-0 backface-hidden">
                  <step.icon className={`w-12 h-12 text-${step.color} !mx-auto !mb-4 drop-shadow-glow`} />
                  <h3 className="text-lg font-bold text-cyan-100 !mb-2">{t(step.titleKey)}</h3>
                  <p className="text-sm text-cyan-200/80">{t(step.descKey)}</p>
                </motion.div>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-cyan-900/70 backdrop-blur-2xl rounded-xl !p-6 text-center backface-hidden" style={{ rotateY: 180 }}>
                  <p className="text-sm text-cyan-200/80">Advanced {t(step.titleKey)} technology ensures rapid, secure access.</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section ref={featuresRef} className="relative !py-20 lg:!py-32 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#0a2e33] opacity-95">
        <div className="max-w-7xl !mx-auto !px-6">
          <motion.h2
            className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300  bg-clip-text text-transparent !mb-12 text-center "
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.features_title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-8">
            {[
              { icon: FiEyeOff, titleKey: "smedia.feature_1_title", descKey: "smedia.feature_1_description", color: "cyan-300" },
              { icon: FiSmartphone, titleKey: "smedia.feature_2_title", descKey: "smedia.feature_2_description", color: "violet-300" },
              { icon: FiLock, titleKey: "smedia.feature_3_title", descKey: "smedia.feature_3_description", color: "teal-300" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative group bg-gradient-to-br from-cyan-900/70 to-teal-900/70 backdrop-blur-2xl border border-teal-400/50 rounded-xl !p-6 text-center shadow-xl hover:shadow-teal-500/60"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                whileHover={{ rotateY: 180 }}
              >
                <motion.div className="absolute inset-0 backface-hidden">
                  <feature.icon className={`w-12 h-12 text-${feature.color} !mx-auto !mb-4 drop-shadow-glow`} />
                  <h3 className="text-lg font-bold text-cyan-100 !mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-cyan-200/80">{t(feature.descKey)}</p>
                </motion.div>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-cyan-900/70 backdrop-blur-2xl rounded-xl !p-6 text-center backface-hidden" style={{ rotateY: 180 }}>
                  <p className="text-sm text-cyan-200/80">Cutting-edge {t(feature.titleKey)} for unmatched performance.</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section ref={testimonialsRef} className="relative !py-20 lg:!py-32 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#0a2e33] opacity-95">
        <div className="max-w-7xl !mx-auto !px-6">
          <h2
            className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300  bg-clip-text text-transparent !mb-12 text-center "
          >
            {t("smedia.testimonials_title")}
          </h2>
          <p
            className="text-center lg:text-xl text-cyan-200 !mb-12 max-w-4xl !mx-auto"
          >
            {t("smedia.testimonials_description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((tm, i) => (
              <div
                key={i}
                className="!w-80 !mx-auto bg-gradient-to-br from-cyan-900/30 to-teal-900/30 backdrop-blur-2xl border border-teal-400/30 rounded-xl !p-6 shadow-xl hover:shadow-teal-500/60"
              >
                <div className="relative !w-20 !h-20 !mb-4 !mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-lg opacity-70" />
                  <img src={tm.img} alt={tm.name} className="relative !w-full !h-full rounded-full object-cover border-2 border-teal-400/60" />
                  <div className="absolute -bottom-1 -right-1 !w-8 !h-8 rounded-full bg-teal-500 flex items-center justify-center border border-white/20">
                    <span className="text-white text-xs font-bold">{t(tm.typeKey).slice(0, 2)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-cyan-100 text-center !mb-2">{tm.name}</h3>
                <p className="text-sm text-cyan-300 text-center !mb-2">{t(tm.typeKey)}</p>
                <p className="text-sm text-cyan-200/80 italic text-center">{`"${t(tm.textKey)}"`}</p>
                <p className="text-xs text-teal-400 text-center !mt-2 flex items-center justify-center !gap-1">
                  <FiCheckCircle className="text-green-400" /> {t(tm.timeKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative !py-20 lg:!py-32 bg-gradient-to-br from-[#060820] via-[#0b0d38] to-[#0a2e33] opacity-95">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.h2
            className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300  bg-clip-text text-transparent !mb-8 "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.final_cta_title")}
          </motion.h2>
          <motion.p
            className="lg:text-xl text-cyan-200/80 !mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("smedia.final_cta_description")}
          </motion.p>
          <motion.button
            onClick={handleCtaClick}
            className="relative !px-10 !py-5 bg-gradient-to-r from-cyan-500 via-violet-500 to-teal-500 rounded-full font-bold text-white shadow-2xl hover:shadow-teal-500/80 transition-all hover:scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="relative z-10">{t("smedia.final_cta_button")}</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-teal-400/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </div>
        <AnimatePresence>
          {particleBurst && (
            <motion.div className="fixed inset-0 pointer-events-none z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: i % 2 === 0 ? "#22d3ee" : "#2dd4bf", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  animate={{ y: [0, -1000 + Math.random() * 500], x: [0, (Math.random() - 0.5) * 500], opacity: [1, 0], rotate: [0, 720] }}
                  transition={{ duration: 1.8 + Math.random() * 0.5, delay: Math.random() * 0.4 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AccessOrb inView={testimonialsInView} />
      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <style jsx>{`
        . {
          position: relative;
          text-shadow: 2px 2px 0 #22d3ee, -2px -2px 0 #a78bfa;
          animation:  1.5s linear infinite;
        }
        @keyframes  {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(2px, -2px); }
          20%, 40%, 60%, 80% { transform: translate(-2px, 2px); }
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 40px currentColor);
        }
        .hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
};

export default SocialMediaPage;