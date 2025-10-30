import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaEnvelope, FaTelegramPlane } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import BuyModal from "../../components/buyModal/BuyModal";


// === 12 Real-Looking University Testimonials ===
const testimonials = [
  {
    name: "Priya Sharma",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    uni: "IIT Delhi",
    from: "C+",
    to: "A+",
    time: "18 hrs",
    text: "From failing Algorithms to Dean’s List. My parents cried.",
  },
  {
    name: "Ahmed Al-Mansour",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    uni: "KAUST",
    from: "D",
    to: "A",
    time: "12 hrs",
    text: "Master’s admission secured. Scholarship unlocked.",
  },
  {
    name: "Sofia Rodriguez",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    uni: "Universidad de Buenos Aires",
    from: "F",
    to: "A-",
    time: "24 hrs",
    text: "Graduated on time. No more probation.",
  },
  {
    name: "Liam Chen",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    uni: "Tsinghua University",
    from: "B-",
    to: "A+",
    time: "20 hrs",
    text: "PhD funding approved. Lab access granted.",
  },
  {
    name: "Aisha Khan",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    uni: "University of Cape Town",
    from: "F",
    to: "A",
    time: "16 hrs",
    text: "Medical school interview passed. Future secured.",
  },
  {
    name: "Mateo Silva",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
    uni: "UNAM Mexico",
    from: "D+",
    to: "A",
    time: "22 hrs",
    text: "Engineering internship at NASA. Dream come true.",
  },
  {
    name: "Elena Petrova",
    img: "https://randomuser.me/api/portraits/women/27.jpg",
    uni: "Lomonosov Moscow State",
    from: "C",
    to: "A+",
    time: "14 hrs",
    text: "Visa renewed. Family proud.",
  },
  {
    name: "Raj Patel",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
    uni: "University of Toronto",
    from: "B",
    to: "A+",
    time: "19 hrs",
    text: "Google offer letter received. $180k starting.",
  },
  {
    name: "Fatima Zahra",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    uni: "American University of Beirut",
    from: "F",
    to: "A",
    time: "15 hrs",
    text: "Graduated with honors. Parents flew in.",
  },
  {
    name: "Diego Morales",
    img: "https://randomuser.me/api/portraits/men/58.jpg",
    uni: "USP Brazil",
    from: "D",
    to: "A+",
    time: "21 hrs",
    text: "Published in Nature. Career launched.",
  },
  {
    name: "Mei Ling",
    img: "https://randomuser.me/api/portraits/women/79.jpg",
    uni: "National University of Singapore",
    from: "C+",
    to: "A+",
    time: "17 hrs",
    text: "Full scholarship renewed. No more debt.",
  },
  {
    name: "Omar Hassan",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    uni: "Cairo University",
    from: "F",
    to: "A",
    time: "23 hrs",
    text: "Military exemption approved. Future safe.",
  },
];

const ImproveGradePage = () => {
  const [grade, setGrade] = useState("C");
  const [targetGrade] = useState("A+");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const gradeSequence = ["C", "C+", "B-", "B", "B+", "A-", "A", "A+"];

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
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timer);
    } else if (grade === targetGrade) {
      setIsUpgrading(false);
    }
  }, [grade, isUpgrading, targetGrade]);

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
  const { ref: globeRef, inView: globeInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <>
      {/* HERO — ACADEMIC TRANSCRIPT + 3D GLOBE */}
      <section className="relative !pt-32 !pb-5 lg:!pt-48 overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033]">
        {/* Animated Academic Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              style={{ top: `${10 + i * 12}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-lime-500/20 rounded-full blur-3xl opacity-60"
            animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-500/30 to-teal-500/20 rounded-full blur-3xl opacity-50"
            animate={{ x: [0, -140, 0], y: [0, 80, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
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
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Upgrade Your Grades
            </motion.h1>
            <motion.p
              className="text-sm sm:text-2xl text-emerald-200/80 leading-relaxed font-light !max-w-3xl !mx-auto lg:!mb-16 !mb-30"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Watch your transcript{" "}
              <span className="text-emerald-300 font-bold">transform live</span>{" "}
              — from failing to <strong className="text-lime-300">A+</strong> in
              any university, worldwide. <strong>100% undetectable</strong>.
            </motion.p>
          </motion.div>

          {/* Floating Transcript + Globe */}
          <div className="relative !max-w-5xl !mx-auto !h-96">
            {/* Left: Live Transcript Card */}
            <motion.div
              className="absolute top-0 left-30 lg:left-10 w-80 h-96 bg-gradient-to-br from-emerald-600/80 to-lime-600/80 backdrop-blur-xl rounded-2xl border border-emerald-400/60 shadow-2xl overflow-hidden"
              initial={{ x: -350, y: 80, rotate: -25 }}
              animate={heroInView ? { x: -100, y: -20, rotate: -12 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.6,
              }}
              whileHover={{ rotate: -8, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="relative !p-6 text-white h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">LIVE TRANSCRIPT</p>
                    <p className="text-2xl font-bold">Harvard University</p>
                  </div>
                  <FiAward className="w-10 h-10 text-yellow-400 drop-shadow-glow" />
                </div>
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CS50</span>
                    <motion.span
                      key={grade}
                      className="text-xl font-bold text-lime-300"
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {grade}
                    </motion.span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Physics 101</span>
                    <span className="text-xl font-bold text-lime-300">A+</span>
                  </div>
                </div>
                <div className="mt-auto bg-emerald-600/30 backdrop-blur-sm rounded-xl !p-3">
                  <p className="text-xs font-bold text-emerald-300">GPA: 4.0</p>
                </div>
              </div>
            </motion.div>

            {/* Right: 3D Globe */}
            <motion.div
              className="absolute top-10 right-10 w-72 h-72"
              initial={{ x: 350, y: -80, rotate: 25 }}
              animate={heroInView ? { x: 80, y: -40, rotate: 12 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.8,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 bg-emerald-400/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
                <motion.div
                  className="absolute inset-8 bg-white/10 backdrop-blur-2xl rounded-full border border-emerald-400/60 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FiGlobe className="w-32 h-32 text-emerald-300 drop-shadow-glow" />
                </motion.div>
                {/* University Markers */}
                {[
                  { top: "30%", left: "40%" },
                  { top: "45%", left: "60%" },
                  { top: "25%", left: "70%" },
                  { top: "50%", left: "30%" },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-lime-400 rounded-full"
                    style={{ top: pos.top, left: pos.left }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Central Grade Orb */}
            <motion.div
              className="absolute top-130 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72"
              initial={{ scale: 0, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-4 bg-lime-400/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>

                <motion.div
                  className="absolute inset-8 bg-white/10 backdrop-blur-2xl rounded-full border border-emerald-400/60 shadow-2xl flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="text-center"
                    animate={{ scale: isUpgrading ? [1, 1.15, 1] : 1 }}
                    transition={{
                      repeat: isUpgrading ? Infinity : 0,
                      duration: 0.6,
                    }}
                  >
                    <motion.p
                      className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent"
                      key={grade}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {grade}
                    </motion.p>
                    <p className="text-emerald-300/80 text-lg font-medium !mt-2">
                      Live Grade
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center lg:!mt-10 !mt-80"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={startUpgrade}
              disabled={isUpgrading || grade === targetGrade}
              className="relative inline-flex items-center !gap-4 bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-400 hover:to-lime-500 text-white lg:!px-12 lg:!py-6 !py-4 !px-8 rounded-full font-bold lg:text-2xl shadow-2xl hover:shadow-emerald-500/80 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-emerald-400/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10">
                {isUpgrading
                  ? "Upgrading..."
                  : grade === targetGrade
                  ? "A+ Achieved!"
                  : "Start Upgrade"}
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

          {/* JOIN COMMUNITY */}
          <section className="relative !pb-2 lg:!pb-24 !pt-10 overflow-hidden">
            <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
              <motion.div
                className="flex flex-col items-center justify-center text-center"
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
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-lime-400 to-green-400 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl backdrop-blur-sm !ml-[-18px]">
                        <img
                          src={src}
                          alt={`Student ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.h3
                  className="text-xl sm:text-xl lg:text-xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Join <span className="text-emerald-200">38,492+</span>{" "}
                  students who’ve upgraded worldwide.
                </motion.h3>

                <motion.p
                  className="mt-3 text-sm sm:text-base text-emerald-300/80 font-light max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Real students. Real universities. Real futures.
                </motion.p>
              </motion.div>
            </div>
          </section>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative !py-15 lg:!py-20" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Global Grade System
            </motion.h2>
            <motion.p
              className="text-sm sm:text-lg lg:text-xl text-emerald-200/80 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We connect directly to <strong>any university portal</strong> —
              Blackboard, Canvas, Moodle, SAP — and update your grades in real
              time.{" "}
              <span className="inline-block px-3 py-1 mx-1 bg-white/5 shadow-lg">
                <span className="bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent font-semibold">
                  No logs. No alerts.
                </span>
              </span>
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 !gap-10">
            {[
              {
                icon: FiGlobe,
                title: "190+ Countries",
                desc: "Any university. Any system.",
              },
              {
                icon: FiLock,
                title: "100% Undetectable",
                desc: "No audit trail. Ever.",
              },
              {
                icon: FiZap,
                title: "24-Hour Update",
                desc: "Reflected in portal & transcript.",
              },
              {
                icon: FiShield,
                title: "Encrypted Access",
                desc: "Your data never stored.",
              },
              {
                icon: FiCheckCircle,
                title: "Guaranteed A/A+",
                desc: "Or full refund.",
              },
              {
                icon: FiClock,
                title: "24/7 Support",
                desc: "Live agents in 12 languages.",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl !p-8 shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-9 h-9 text-emerald-300 drop-shadow-glow" />
                </div>
                <h3 className="lg:text-2xl text-xl font-bold text-emerald-100 !mb-3">
                  {feat.title}
                </h3>
                <p className="text-emerald-300/80 text-base leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative !py-10 lg:!py-25" ref={testimonialsRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              From Failing to First-Class
            </motion.h2>
            <motion.p
              className="text-sm sm:text-lg lg:text-xl text-emerald-200/80 leading-relaxed font-light !max-w-4xl !mx-auto !mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Students from <strong>190+ countries</strong> have upgraded to
              A/A+ — unlocking scholarships, jobs, visas, and dreams.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl !p-6 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-center !gap-4 !mb-5">
                  <motion.div className="relative" whileHover={{ scale: 1.1 }}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/40 via-lime-500/30 to-green-500/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={t.img}
                      alt={t.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-emerald-400/60"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-emerald-100">{t.name}</h3>
                    <p className="text-xs text-emerald-300">{t.uni}</p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-emerald-400 !mb-3">
                  <span>
                    {t.from} → {t.to}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {t.time}
                  </span>
                </div>

                <p className="text-sm text-emerald-200/90 italic leading-relaxed">
                  “{t.text}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative !py-15 lg:!py-25 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-300 via-lime-300 to-green-300 bg-clip-text text-transparent !mb-6">
              Your Degree. Your Future. Now.
            </h2>
            <p className="lg:text-xl text-emerald-200/80 !mb-10">
              Join <strong>38,492+</strong> students who’ve secured their
              future.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-400 hover:to-lime-500 text-white !px-6 lg:!px-8 !py-4 rounded-full font-bold lg:text-xl shadow-lg hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-emerald-400/50"
            >
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

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

export default ImproveGradePage;
