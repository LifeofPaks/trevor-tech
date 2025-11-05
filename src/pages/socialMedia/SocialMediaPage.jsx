import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiLock,
  FiEyeOff,
  FiZap,
  FiCheckCircle,
  FiSmartphone,
} from "react-icons/fi";
import {
  BsWhatsapp,
  BsInstagram,
  BsSnapchat,
  BsMessenger,
} from "react-icons/bs";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import BuyModal from "../../components/buyModal/BuyModal";

// Testimonials data
const testimonials = [
  {
    name: "Emma T.",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
    textKey: "smedia.testimonial_1",
    typeKey: "smedia.testimonial_type_1",
    timeKey: "smedia.testimonial_time_1",
  },
  {
    name: "Liam S.",
    img: "https://randomuser.me/api/portraits/men/38.jpg",
    textKey: "smedia.testimonial_2",
    typeKey: "smedia.testimonial_type_2",
    timeKey: "smedia.testimonial_time_2",
  },
  {
    name: "Aisha M.",
    img: "https://randomuser.me/api/portraits/women/49.jpg",
    textKey: "smedia.testimonial_3",
    typeKey: "smedia.testimonial_type_3",
    timeKey: "smedia.testimonial_time_3",
  },
  {
    name: "Noah K.",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
    textKey: "smedia.testimonial_4",
    typeKey: "smedia.testimonial_type_4",
    timeKey: "smedia.testimonial_time_4",
  },
  {
    name: "Sophia L.",
    img: "https://randomuser.me/api/portraits/women/75.jpg",
    textKey: "smedia.testimonial_5",
    typeKey: "smedia.testimonial_type_5",
    timeKey: "smedia.testimonial_time_5",
  },
  {
    name: "Ethan R.",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
    textKey: "smedia.testimonial_6",
    typeKey: "smedia.testimonial_type_6",
    timeKey: "smedia.testimonial_time_6",
  },
];

// Animated background with digital waves and glowing icons
const CyberWaveBackground = () => {
  const icons = [
    { Icon: BsWhatsapp, left: "10%", top: "15%", color: "red-400" },
    { Icon: BsInstagram, left: "70%", top: "20%", color: "pink-300" },
    { Icon: BsSnapchat, left: "20%", top: "60%", color: "cyan-300" },
    { Icon: BsMessenger, left: "75%", top: "65%", color: "red-600" },
    { Icon: FaTelegramPlane, left: "25%", top: "30%", color: "pink-600" },
    { Icon: FaEnvelope, left: "65%", top: "10%", color: "cyan-400" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033] opacity-90">
      {/* Digital wave effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 50%, rgba(255, 0, 100, 0.1) 51%, rgba(0, 255, 255, 0.1) 52%, transparent 53%)
          `,
          backgroundSize: "200px 200px",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-20"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      {/* Glowing social media icons */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
        >
          <item.Icon
            className={`w-12 h-12 text-${item.color} drop-shadow-glow`}
            style={{ left: item.left, top: item.top }}
          />
        </motion.div>
      ))}
      {/* Subtle particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

// Hacking simulation card
const HackingSimulationCard = ({ inView }) => {
  const { t } = useTranslation("smedia");
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (inView && progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [inView, progress]);

  return (
    <motion.div
      className="bg-gradient-to-br from-red-600/80 to-pink-600/80 backdrop-blur-lg rounded-2xl border border-cyan-400/50 !p-8 w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center mb-4">
        <FiSmartphone className="w-10 h-10 text-cyan-300" />
        <FiZap className="w-8 h-8 text-pink-300 animate-pulse" />
      </div>
      <p className="text-lg font-bold text-white">
        {t("smedia.simulation_title")}
      </p>
      <p className="text-sm text-cyan-200/80 mt-2">
        {t("smedia.simulation_description")}
      </p>
      <div className="mt-4">
        <div className="w-full bg-black/50 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-cyan-300 mt-2">
          {progress}% {t("smedia.simulation_progress")}
        </p>
      </div>
    </motion.div>
  );
};

const SocialMediaPage = () => {
  const { t } = useTranslation("smedia");
  const [modalOpen, setModalOpen] = useState(false);
  const [particleBurst, setParticleBurst] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleCtaClick = () => {
    setModalOpen(true);
    setParticleBurst(true);
    setTimeout(() => setParticleBurst(false), 2000);
  };

  return (
    <>
      <CyberWaveBackground />

      {/* HERO SECTION */}
      <section
        className="relative !pt-32 !pb-24 lg:!pt-48 lg:!pb-32 overflow-hidden"
        ref={heroRef}
      >
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-12 relative z-10">
          <motion.div
            className="text-center !max-w-5xl !mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-8 leading-tight">
              {t("smedia.hero_title")}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-200/90 font-light !max-w-3xl !mx-auto !mb-12 leading-relaxed">
              {t("smedia.hero_description")}
            </p>
          </motion.div>

          {/* Hacking Simulation Card */}
          <HackingSimulationCard inView={heroInView} />

          {/* Social Media Platforms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 !gap-6 !mt-16">
            {[
              { Icon: BsSnapchat, name: "Snapchat", color: "cyan-300" },
              { Icon: BsInstagram, name: "Instagram", color: "pink-300" },
              { Icon: BsWhatsapp, name: "WhatsApp", color: "red-400" },
              { Icon: BsMessenger, name: "Facebook", color: "cyan-400" },
            ].map((platform, i) => (
              <motion.div
                key={i}
                className="bg-[#0a0a1f]/80 backdrop-blur-lg border border-cyan-400/30 rounded-xl !p-6 text-center hover:bg-[#0f0f2a]/80 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: `var(--${platform.color})`,
                }}
              >
                <platform.Icon
                  className={`w-12 h-12 text-${platform.color} mx-auto mb-4 drop-shadow-glow`}
                />
                <p className="text-xl font-bold text-cyan-200">
                  {platform.name}
                </p>
                <p className="text-sm text-cyan-200/70">
                  {t("smedia.platform_access")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center !mt-16"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={handleCtaClick}
              className="relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white !px-10 !py-5 rounded-full font-bold text-xl lg:text-2xl shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105"
            >
              {t("smedia.cta_start")}
              <motion.span
                className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative !py-20" ref={howItWorksRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-12">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.how_it_works_title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-8">
            {[
              {
                icon: FiZap,
                titleKey: "smedia.step_1_title",
                descKey: "smedia.step_1_description",
                color: "red-400",
              },
              {
                icon: FiSmartphone,
                titleKey: "smedia.step_2_title",
                descKey: "smedia.step_2_description",
                color: "pink-300",
              },
              {
                icon: FiLock,
                titleKey: "smedia.step_3_title",
                descKey: "smedia.step_3_description",
                color: "cyan-300",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative bg-[#0a0a1f]/80 backdrop-blur-lg border border-cyan-400/30 rounded-xl !p-8 text-center hover:bg-[#0f0f2a]/80 transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-400/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <step.icon
                  className={`w-14 h-14 text-${step.color} mx-auto mb-4 drop-shadow-glow`}
                />
                <h3 className="text-xl font-bold text-cyan-200">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-cyan-200/70">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative !py-20" ref={featuresRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-12">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.features_title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 !gap-8">
            {[
              {
                icon: FiEyeOff,
                titleKey: "smedia.feature_1_title",
                descKey: "smedia.feature_1_description",
                color: "cyan-400",
              },
              {
                icon: FiSmartphone,
                titleKey: "smedia.feature_2_title",
                descKey: "smedia.feature_2_description",
                color: "pink-600",
              },
              {
                icon: FiLock,
                titleKey: "smedia.feature_3_title",
                descKey: "smedia.feature_3_description",
                color: "red-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative bg-[#0a0a1f]/80 backdrop-blur-lg border border-cyan-400/30 rounded-xl !p-8 text-center hover:bg-[#0f0f2a]/80 transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: `var(--${feature.color})`,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-400/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <feature.icon
                  className={`w-14 h-14 text-${feature.color} mx-auto mb-4 drop-shadow-glow`}
                />
                <h3 className="text-xl font-bold text-cyan-200">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-cyan-200/70">{t(feature.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative !py-20" ref={testimonialsRef}>
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-12">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.testimonials_title")}
          </motion.h2>
          <motion.p
            className="text-center text-sm sm:text-base lg:text-lg text-cyan-200/80 font-light !mb-12 max-w-4xl !mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t("smedia.testimonials_description")}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
            {testimonials.map((tm, i) => (
              <motion.div
                key={i}
                className="relative bg-[#0a0a1f]/80 backdrop-blur-lg border border-cyan-400/30 rounded-xl !p-6 hover:bg-[#0f0f2a]/80 transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03, borderColor: "var(--cyan-400)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-400/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={tm.img}
                    alt={tm.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400"
                  />
                  <div>
                    <p className="font-bold text-cyan-200">{tm.name}</p>
                    <p className="text-xs text-cyan-200/70">{t(tm.typeKey)}</p>
                  </div>
                </div>
                <p className="text-sm text-cyan-200/90 italic !mt-3">
                  “{t(tm.textKey)}”
                </p>
                <p className="text-xs text-pink-300 mt-3 flex items-center gap-1">
                  <FiCheckCircle /> {t(tm.timeKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative !py-20">
        <div className="max-w-4xl !mx-auto !px-6 text-center">
          <motion.h2
            className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent !mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("smedia.final_cta_title")}
          </motion.h2>
          <motion.p
            className="text-base lg:text-lg text-cyan-200/80 !mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("smedia.final_cta_description")}
          </motion.p>
          <motion.button
            onClick={handleCtaClick}
            className="relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white !px-10 !py-5 rounded-full font-bold lg:text-2xl shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("smedia.final_cta_button")}
            <motion.span
              className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </div>
        {/* Particle Burst Effect */}
        <AnimatePresence>
          {particleBurst && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#ff0066" : "#00ffff",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -800 + Math.random() * 400],
                    x: [0, (Math.random() - 0.5) * 400],
                    opacity: [1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.5,
                    delay: Math.random() * 0.3,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <BuyModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <style jsx>{`
        :root {
          --red-400: #ff4d4d;
          --pink-300: #ff99cc;
          --cyan-300: #00f0ff;
          --red-600: #cc0000;
          --pink-600: #d4006b;
          --cyan-400: #00b7eb;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px currentColor)
            drop-shadow(0 0 24px currentColor);
        }
      `}</style>
    </>
  );
};

export default SocialMediaPage;
