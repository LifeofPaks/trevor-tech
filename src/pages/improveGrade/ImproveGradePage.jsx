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
  FiGlobe,
  FiLock,
  FiAward,
  FiClock,
} from "react-icons/fi";
import {
  FaBookReader,
  FaEnvelope,
  FaTelegramPlane,
  FaUserGraduate,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useMouse } from "react-use";
import BuyModal from "../../components/buyModal/BuyModal";
import { GiGraduateCap } from "react-icons/gi";
import { useTranslation } from "react-i18next";

// === 12 Real-Looking University Testimonials ===
const testimonials = [
  {
    name: "Priya Sharma",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    uniKey: "au.testimonial_1_uni",
    from: "C+",
    to: "A+",
    timeKey: "au.testimonial_1_time",
    textKey: "au.testimonial_1_text",
  },
  {
    name: "Ahmed Al-Mansour",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    uniKey: "au.testimonial_2_uni",
    from: "D",
    to: "A",
    timeKey: "au.testimonial_2_time",
    textKey: "au.testimonial_2_text",
  },
  {
    name: "Sofia Rodriguez",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    uniKey: "au.testimonial_3_uni",
    from: "F",
    to: "A-",
    timeKey: "au.testimonial_3_time",
    textKey: "au.testimonial_3_text",
  },
  {
    name: "Liam Chen",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    uniKey: "au.testimonial_4_uni",
    from: "B-",
    to: "A+",
    timeKey: "au.testimonial_4_time",
    textKey: "au.testimonial_4_text",
  },
  {
    name: "Aisha Khan",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    uniKey: "au.testimonial_5_uni",
    from: "F",
    to: "A",
    timeKey: "au.testimonial_5_time",
    textKey: "au.testimonial_5_text",
  },
  {
    name: "Mateo Silva",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
    uniKey: "au.testimonial_6_uni",
    from: "D+",
    to: "A",
    timeKey: "au.testimonial_6_time",
    textKey: "au.testimonial_6_text",
  },
  {
    name: "Elena Petrova",
    img: "https://randomuser.me/api/portraits/women/27.jpg",
    uniKey: "au.testimonial_7_uni",
    from: "C",
    to: "A+",
    timeKey: "au.testimonial_7_time",
    textKey: "au.testimonial_7_text",
  },
  {
    name: "Raj Patel",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
    uniKey: "au.testimonial_8_uni",
    from: "B",
    to: "A+",
    timeKey: "au.testimonial_8_time",
    textKey: "au.testimonial_8_text",
  },
  {
    name: "Fatima Zahra",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    uniKey: "au.testimonial_9_uni",
    from: "F",
    to: "A",
    timeKey: "au.testimonial_9_time",
    textKey: "au.testimonial_9_text",
  },
  {
    name: "Diego Morales",
    img: "https://randomuser.me/api/portraits/men/58.jpg",
    uniKey: "au.testimonial_10_uni",
    from: "D",
    to: "A+",
    timeKey: "au.testimonial_10_time",
    textKey: "au.testimonial_10_text",
  },
  {
    name: "Mei Ling",
    img: "https://randomuser.me/api/portraits/women/79.jpg",
    uniKey: "au.testimonial_11_uni",
    from: "C+",
    to: "A+",
    timeKey: "au.testimonial_11_time",
    textKey: "au.testimonial_11_text",
  },
  {
    name: "Omar Hassan",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    uniKey: "au.testimonial_12_uni",
    from: "F",
    to: "A",
    timeKey: "au.testimonial_12_time",
    textKey: "au.testimonial_12_text",
  },
];

/* ------------------------------------------------------------------ */
/* -------------------------- NEBULA PARTICLES ----------------------- */
/* ------------------------------------------------------------------ */
const NebulaParticles = () => {
  const canvasRef = useRef(null);
  const [uniOrbs, setUniOrbs] = useState([]);

  // Orbiting university icons
  useEffect(() => {
    const icons = [
      { Icon: FiGlobe, hue: 150 },
      { Icon: FiAward, hue: 160 },
      { Icon: FiTrendingUp, hue: 140 },
      { Icon: GiGraduateCap, hue: 170 },
      { Icon: FaUserGraduate, hue: 130 },
      { Icon: FaBookReader, hue: 155 },
    ];
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      radius: 220 + i * 90,
      speed: 0.0005 + i * 0.0002,
      particles: Array.from({ length: 3 }, () => ({
        angle: Math.random() * Math.PI * 2,
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    }));
    setUniOrbs(orbs);
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

    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 1,
      hue: 140 + Math.random() * 40,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 31, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const pulse = 0.7 + 0.3 * Math.sin(t * 0.02 + p.pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,75%,${pulse})`;
        ctx.fill();

        ctx.shadowBlur = 22;
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
        className="fixed inset-0 pointer-events-none z-0 lg:opacity-20 opacity-8"
      />

      {/* Orbiting university icons */}
      {uniOrbs.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {uniOrbs.map((orb, oi) =>
            orb.particles.map((p, pi) => {
              const Icon = p.icon.Icon;
              const angle = p.angle + performance.now() * 0.001 * orb.speed;
              const x =
                window.innerWidth / 2 + Math.cos(angle) * orb.radius - 30;
              const y =
                window.innerHeight / 2 + Math.sin(angle) * orb.radius - 30;

              return (
                <motion.div
                  key={`${oi}-${pi}`}
                  className="absolute !w-16 !h-16"
                  style={{ left: x, top: y }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Icon
                    className="w-10 h-10 text-emerald-400 lg:opacity-10 opacity-7 drop-shadow-glow"
                    style={{ filter: "drop-shadow(0 0 24px currentColor)" }}
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
const ImproveGradePage = () => {
  const { t } = useTranslation();
  const [grade, setGrade] = useState("C");
  const [targetGrade] = useState("A+");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const gradeSequence = ["C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
  const mouse = useMouse();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 30 });

  // Live Grade Upgrade
  useEffect(() => {
    if (
      isUpgrading &&
      gradeSequence.indexOf(grade) < gradeSequence.indexOf(targetGrade)
    ) {
      const timer = setTimeout(() => {
        const currentIdx = gradeSequence.indexOf(grade);
        const nextGrade =
          gradeSequence[Math.min(currentIdx + 1, gradeSequence.length - 1)];
        setGrade(nextGrade);
        if (nextGrade === targetGrade && !confetti) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3800);
        }
      }, 380 + Math.random() * 280);
      return () => clearTimeout(timer);
    } else if (grade === targetGrade) {
      setIsUpgrading(false);
    }
  }, [grade, isUpgrading, targetGrade, confetti]);

  const startUpgrade = () => setIsUpgrading(true);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: globeRef, inView: globeInView } = useInView({
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
        className="fixed !w-[750px] !h-[750px] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,150,0.32) 0%, transparent 70%)",
          left: smoothX - 375,
          top: smoothY - 375,
        }}
        animate={{ scale: isUpgrading ? 1.9 : 1 }}
        transition={{ type: "spring", stiffness: 320 }}
      />

      {/* HERO */}
      <section className="relative !pt-32 !pb-20 lg:!pt-44 lg:!pb-36 overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]">
        {/* Parallax Orbs */}
        <motion.div
          className="absolute inset-0 opacity-45"
          style={{
            y: useTransform(smoothY, [0, window.innerHeight], [-160, 160]),
          }}
        >
          <div className="absolute top-16 left-12 !w-[680px] !h-[680px] bg-gradient-to-r from-emerald-500/24 to-lime-500/16 rounded-full blur-3xl" />
          <div className="absolute bottom-28 right-16 !w-[620px] !h-[620px] bg-gradient-to-r from-green-500/22 to-teal-500/14 rounded-full blur-3xl" />
        </motion.div>

        {/* Holographic Grid Lines */}
        <div className="absolute inset-0 opacity-22 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              style={{ top: `${8 + i * 11}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 11 + i * 0.9,
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
            initial={{ opacity: 0, y: 80 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6 leading-tight"
              initial={{ opacity: 0, y: 45 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              {t("au.hero_title")}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-emerald-200/90 font-light !max-w-3xl !mx-auto !mb-16 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t("au.hero_description")}
            </motion.p>
          </motion.div>

          {/* Floating Transcript + Globe + Grade Orb */}
          <div className="relative !max-w-5xl !mx-auto !h-[520px] lg:!h-[620px] ">
            {/* Transcript Card */}
            <motion.div
              className="absolute top-0 left-25 lg:left-16 w-80 h-96 bg-gradient-to-br from-emerald-600/88 to-lime-600/88 backdrop-blur-2xl rounded-2xl border border-emerald-400/70 shadow-2xl overflow-hidden"
              style={{
                rotateX: useTransform(smoothY, [-300, 300], [22, -22]),
                rotateY: useTransform(smoothX, [-300, 300], [-22, 22]),
                transformPerspective: 1400,
              }}
              initial={{ x: -420, y: 100, rotate: -30 }}
              animate={heroInView ? { x: -110, y: -30, rotate: -12 } : {}}
              transition={{ type: "spring", stiffness: 90, delay: 0.6 }}
              whileHover={{ scale: 1.07 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"></div>
              <div className="relative !p-6 text-white h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">
                      {t("au.transcript_label")}
                    </p>
                    <p className="text-2xl font-bold">
                      {t("au.transcript_university")}
                    </p>
                  </div>
                  <FiAward className="w-11 h-11 text-yellow-400 drop-shadow-glow" />
                </div>
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">{t("au.course_1")}</span>
                    <motion.span
                      key={grade}
                      className="text-xl font-bold text-lime-300"
                      initial={{ scale: 1.35, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.32 }}
                    >
                      {grade}
                    </motion.span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">{t("au.course_2")}</span>
                    <span className="text-xl font-bold text-lime-300">A+</span>
                  </div>
                </div>
                <div className="mt-auto bg-emerald-600/35 backdrop-blur-sm rounded-xl !p-3">
                  <p className="text-xs font-bold text-emerald-300">
                    {t("au.gpa")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3D Globe */}
            <motion.div
              className="absolute top-8 right-8 lg:right-16 w-72 h-72"
              style={{
                rotateX: useTransform(smoothY, [-300, 300], [-18, 18]),
                rotateY: useTransform(smoothX, [-300, 300], [18, -18]),
                transformPerspective: 1400,
              }}
              initial={{ x: 420, y: -100, rotate: 30 }}
              animate={heroInView ? { x: 100, y: -50, rotate: 12 } : {}}
              transition={{ type: "spring", stiffness: 90, delay: 0.8 }}
              whileHover={{ scale: 1.12 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-emerald-500/35 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-6 bg-lime-400/25 rounded-full blur-2xl animate-pulse animation-delay-1300"></div>

                <motion.div
                  className="absolute inset-10 bg-white/12 backdrop-blur-2xl rounded-full border border-emerald-400/70 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FiGlobe className="w-36 h-36 text-emerald-300 drop-shadow-glow" />
                </motion.div>

                {/* University Markers */}
                {[
                  { top: "28%", left: "38%" },
                  { top: "44%", left: "62%" },
                  { top: "23%", left: "72%" },
                  { top: "52%", left: "28%" },
                  { top: "35%", left: "55%" },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute !w-3 !h-3 bg-lime-400 rounded-full"
                    style={{ top: pos.top, left: pos.left }}
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.35,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Central Grade Orb */}
            <motion.div
              className="absolute top-130 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-80 !h-80"
              initial={{ scale: 0.68, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.1, type: "spring" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-emerald-500/38 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-6 bg-lime-400/28 rounded-full blur-2xl animate-pulse animation-delay-1300"></div>

                <motion.div
                  className="absolute inset-10 bg-white/14 backdrop-blur-2xl rounded-full border border-emerald-400/75 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ scale: isUpgrading ? [1, 1.14, 1] : 1 }}
                    transition={{
                      repeat: isUpgrading ? Infinity : 0,
                      duration: 0.58,
                    }}
                  >
                    <motion.p
                      className="text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent"
                      key={grade}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.34 }}
                    >
                      {grade}
                    </motion.p>
                    <p className="text-emerald-300/88 text-lg font-medium !mt-2">
                      {t("au.grade_label")}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Orbiting Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute !w-2.5 !h-2.5 bg-lime-400 rounded-full"
                    style={{
                      top: `${16 + i * 7}%`,
                      left: `${i % 2 === 0 ? 12 : 68}%`,
                    }}
                    animate={{
                      y: [0, -38, 0],
                      opacity: [0.65, 1, 0.65],
                    }}
                    transition={{
                      duration: 2.4 + i * 0.28,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center lg:!mt-0 !mt-45"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            <button
              onClick={startUpgrade}
              disabled={isUpgrading || grade === targetGrade}
              className="group relative inline-flex items-center !gap-5 bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-400 hover:to-lime-500 text-white !px-16 !py-6 rounded-full font-bold text-xl lg:text-2xl shadow-2xl hover:shadow-emerald-500/80 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-emerald-400/60 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {isUpgrading
                  ? t("au.cta_upgrading")
                  : grade === targetGrade
                  ? t("au.cta_upgraded")
                  : t("au.cta_start")}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/28"
                animate={isUpgrading ? { x: ["-100%", "100%"] } : {}}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
              <FiZap className="w-8 h-8 relative z-10 group-hover:animate-pulse" />
            </button>
          </motion.div>

          {/* COMMUNITY OVERLAP */}
          <motion.div
            className="flex flex-col items-center justify-center text-center lg:!mt-15 !mt-10"
            initial={{ opacity: 0, y: 35 }}
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
                    scale: 0.78,
                    x: i % 2 === 0 ? -55 : 55,
                  }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{
                    delay: i * 0.11,
                    duration: 0.65,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.22, zIndex: 50 }}
                  style={{ zIndex: 5 - i }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-lime-400 to-green-400 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative !w-14 !h-14 sm:!w-16 sm:!h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl backdrop-blur-sm">
                    <img
                      src={src}
                      alt="student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.h3
              className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t("au.community_title")}
            </motion.h3>
            <motion.p
              className="mt-3 text-sm sm:text-base text-emerald-300/80 font-light max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {t("au.community_description")}
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
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              {t("au.features_title")}
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-emerald-200/88 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t("au.features_description")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 !gap-10">
            {[
              {
                icon: FiGlobe,
                title: t("au.feature_1_title"),
                desc: t("au.feature_1_description"),
              },
              {
                icon: FiLock,
                title: t("au.feature_2_title"),
                desc: t("au.feature_2_description"),
              },
              {
                icon: FiZap,
                title: t("au.feature_3_title"),
                desc: t("au.feature_3_description"),
              },
              {
                icon: FiShield,
                title: t("au.feature_4_title"),
                desc: t("au.feature_4_description"),
              },
              {
                icon: FiCheckCircle,
                title: t("au.feature_5_title"),
                desc: t("au.feature_5_description"),
              },
              {
                icon: FiClock,
                title: t("au.feature_6_title"),
                desc: t("au.feature_6_description"),
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-emerald-500/45 rounded-2xl !p-8 shadow-xl hover:shadow-emerald-500/55 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -12 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/28 to-lime-500/28 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-9 h-9 text-emerald-300 drop-shadow-glow" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-emerald-100 !mb-3">
                  {feat.title}
                </h3>
                <p className="text-emerald-300/88 text-base leading-relaxed">
                  {feat.desc}
                </p>
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
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              {t("au.testimonials_title")}
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-emerald-200/88 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t("au.testimonials_description")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((tm, i) => (
              <motion.div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-emerald-500/45 rounded-2xl !p-6 shadow-2xl hover:shadow-emerald-500/55 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="flex items-center !gap-4 !mb-5">
                  <motion.div className="relative" whileHover={{ scale: 1.12 }}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/48 via-lime-500/38 to-green-500/38 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={tm.img}
                      alt={tm.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-emerald-400/70"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-emerald-100">{tm.name}</h3>
                    <p className="text-xs text-emerald-300">{t(tm.uniKey)}</p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-emerald-400 !mb-3">
                  <span>
                    {tm.from} → {tm.to}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {t(tm.timeKey)}
                  </span>
                </div>

                <p className="text-sm text-emerald-200/92 italic leading-relaxed">
                  “{t(tm.textKey)}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-24 bg-gradient-to-b from-transparent via-emerald-900/12 to-transparent">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6">
              {t("au.final_cta_title")}
            </h2>
            <p className="text-lg lg:text-xl text-emerald-200/88 !mb-10">
              {t("au.final_cta_description")}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-400 hover:to-lime-500 text-white !px-8 lg:!px-12 !py-5 rounded-full font-bold text-xl lg:text-2xl shadow-lg hover:shadow-emerald-500/70 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-emerald-400/60"
            >
              {t("au.final_cta_button")}
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      {/* CONFETTI ON A+ */}
      <AnimatePresence>
        {confetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute !w-2.5 !h-2.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#10b981" : "#22c55e",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, -1400], opacity: [1, 0], rotate: [0, 720] }}
                transition={{
                  duration: 3.2 + Math.random() * 1.2,
                  delay: Math.random() * 0.8,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 24px currentColor)
            drop-shadow(0 0 48px currentColor);
        }
        .animation-delay-1300 {
          animation-delay: 1.3s;
        }
      `}</style>
    </>
  );
};

export default ImproveGradePage;
