import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoHeadset,
  IoMap,
  IoCash,
  IoSchool,
  IoAlertCircle,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import BuyModal from "../buyModal/BuyModal";
import DemoModal from "../demoModal/DemoModal";
import { FaFileCircleXmark, FaSchoolLock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { FaBtc } from "react-icons/fa";
import { RiBtcFill } from "react-icons/ri";
import { MdAttachMoney, MdOutlineAppsOutage } from "react-icons/md";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openDemoModal, setOpenDemoModal] = useState(false);

  // Modal Controls
  const handleOpenBuyModal = () => setOpenBuyModal(true);
  const handleCloseBuyModal = () => setOpenBuyModal(false);
  const handleOpenDemoModal = () => setOpenDemoModal(true);
  const handleCloseDemoModal = () => setOpenDemoModal(false);

  const services = [
    {
      title: t("about_page.service_spy_hack_title"),
      desc: t("about_page.service_spy_hack_desc"),
      icon: <IoLockClosed size={24} />,
      color: "text-green-400 bg-green-900/20",
      modal: true,
    },
    {
      title: t("about_page.service_crypto_recovery_title"),
      desc: t("about_page.service_crypto_recovery_desc"),
      icon: <RiBtcFill size={24} />,
      color: "text-amber-400 bg-amber-900/20",
      path: "/elite/crypto-recovery",
    },
    {
      title: t("about_page.service_grade_enhancement_title"),
      desc: t("about_page.service_grade_enhancement_desc"),
      icon: <MdOutlineAppsOutage size={24} />,
      color: "text-blue-400 bg-blue-900/20",
      path: "/elite/social-media",
    },
    // {
    //   title: t("about_page.service_hack_device_title"),
    //   desc: t("about_page.service_hack_device_desc"),
    //   icon: <GiGraduateCap size={24} />,
    //   color: "text-blue-400 bg-blue-900/20",
    //   path: "/elite/grade-enhancement",
    // },
    {
      title: t("about_page.service_credit_boost_title"),
      desc: t("about_page.service_credit_boost_desc"),
      icon: <MdAttachMoney size={24} />,
      color: "text-purple-400 bg-purple-900/20",
      path: "/elite/credit-boost",
    },
    {
      title: t("about_page.service_clear_record_title"),
      desc: t("about_page.service_clear_record_desc"),
      icon: <FaFileCircleXmark size={24} />,
      color: "text-rose-400 bg-rose-900/20",
      path: "/elite/clear-record",
    },
    {
      title: t("about_page.service_stop_blackmail_title"),
      desc: t("about_page.service_stop_blackmail_desc"),
      icon: <IoAlertCircle size={24} />,
      color: "text-teal-400 bg-teal-900/20",
      path: "/elite/stop-harassment",
    },
  ];

  const whyChooseUs = [
    {
      icon: <IoLockClosed size={20} />,
      text: t("about_page.why_choose_us_discreet"),
      color: "bg-green-900/20 text-green-400",
    },
    {
      icon: <IoShieldCheckmark size={20} />,
      text: t("about_page.why_choose_us_no_physical_access"),
      color: "bg-blue-900/20 text-blue-400",
    },
    {
      icon: <IoCheckmarkCircle size={20} />,
      text: t("about_page.why_choose_us_proven_results"),
      color: "bg-amber-900/20 text-amber-400",
    },
    {
      icon: <IoHeadset size={20} />,
      text: t("about_page.why_choose_us_support"),
      color: "bg-purple-900/20 text-purple-400",
    },
  ];

  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-b from-[#0a0a1f]/80 via-[#0f0f2a]/80 to-[#1a0033]/80 !py-24 lg:!py-32"
      >
        {/* Background Glow Orb */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center !mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent !mb-6">
              {t("about_page.header_title")}
            </h1>
            <p className="!mt-8 max-w-4xl !mx-auto text-[14px] sm:text-xl text-cyan-200/80 leading-relaxed font-light">
              {t("about_page.header_description")}
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            className="!mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-center bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent !mb-16">
              {t("about_page.services_title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
              {services.map((service, index) => {
                const cardContent = (
                  <motion.div
                    className="h-[275px] bg-white/5 backdrop-blur-xl !p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/60 shadow-2xl hover:shadow-cyan-500/20 cursor-pointer transition-all duration-300 group hover:bg-white/10"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-xl !mb-4 ${service.color} backdrop-blur-sm border border-white/20 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <div className="drop-shadow-glow">{service.icon}</div>
                    </div>
                    <h3 className="lg:text-xl font-semibold text-cyan-100 !mb-2 group-hover:text-cyan-50 transition">
                      {service.title}
                    </h3>
                    <p className="text-sm text-cyan-300/80 leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </motion.div>
                );

                return (
                  <div key={index}>
                    {service.modal ? (
                      <div onClick={handleOpenDemoModal}>{cardContent}</div>
                    ) : service.path ? (
                      <Link to={service.path}>{cardContent}</Link>
                    ) : (
                      cardContent
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="max-w-4xl !mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent !mb-12">
              {t("about_page.why_choose_us_title")}
            </h2>

            <ul className="grid sm:grid-cols-2 !gap-6 text-left">
              {whyChooseUs.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center !gap-4 bg-white/5 backdrop-blur-xl rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 shadow-sm hover:shadow-md !p-6 min-h-[90px] transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${item.color} border border-white/20 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <div className="drop-shadow-glow">{item.icon}</div>
                  </div>
                  <p className="lg:text-base text-cyan-200 font-medium leading-snug group-hover:text-cyan-100 transition">
                    {item.text}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* Quote */}
            <motion.div
              className="relative overflow-hidden shadow-2xl backdrop-blur-xl !mt-16"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="relative text-sm font-semibold text-cyan-100 italic text-center bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">
                {t("about_page.quote")}
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center !mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent !mb-4">
              {t("about_page.cta_title")}
            </h2>
            <p className="text-base text-cyan-300/80 !mb-8">
              {t("about_page.cta_description")}
            </p>
            <button
              onClick={handleOpenBuyModal}
              className="w-full flex items-center justify-center gap-2 sm:w-auto  bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-semibold !px-10 !py-4 rounded-full !mx-auto shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
              whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              {t("about_page.cta_button")}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <DemoModal
        openDemoModal={openDemoModal}
        onCloseDemoModal={handleCloseDemoModal}
        handleOpenDemoModal={handleOpenBuyModal}
      />
      <BuyModal open={openBuyModal} handleClose={handleCloseBuyModal} />

      {/* Custom Styles */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default About;
