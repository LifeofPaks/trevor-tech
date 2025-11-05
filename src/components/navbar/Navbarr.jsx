import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiZap,
  FiFileText,
  FiKey,
} from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import { MdFolderDelete, MdOutlineAppsOutage } from "react-icons/md";
import { RiBtcFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DemoLogo from "../logo/DemoLogo";
import { useTranslation } from "react-i18next";

const Navbarr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eliteOpen, setEliteOpen] = useState(false);
  const [mobileEliteOpen, setMobileEliteOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleElite = () => setEliteOpen(!eliteOpen);
  const toggleMobileElite = () => setMobileEliteOpen(!mobileEliteOpen);

  // 👇 Detect current language
  const isEnglish = i18n.language === "en";
  const fontClass = isEnglish ? "text-[14px]" : "text-[12px]";

  const eliteLinks = [
    {
      to: "/elite/crypto-recovery",
      label: t("crypto_recovery"),
      icon: <RiBtcFill />,
    },
    {
      to: "/elite/social-media",
      label: t("social_media"),
      icon: <MdOutlineAppsOutage />,
    },
    {
      to: "/elite/credit-boost",
      label: t("credit_score_upgrade"),
      icon: <FiZap />,
    },
    {
      to: "/elite/stop-harassment",
      label: t("stop_blackmail"),
      icon: <IoMdAlert />,
    },
    {
      to: "/elite/grade-enhancement",
      label: t("improve_academic_grade"),
      icon: <FiFileText />,
    },
    {
      to: "/elite/clear-record",
      label: t("erase_criminal_record"),
      icon: <MdFolderDelete />,
    },

    { to: "/elite/dmv-id", label: t("dmv_&_id_services"), icon: <FiKey /> },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {/* Navbar Container */}
      <div className="flex items-center justify-between w-full lg:max-w-[1100px] !mx-auto bg-gradient-to-r from-[#0a0a1f]/80 to-[#1a0033]/80 backdrop-blur-xl lg:border border-cyan-500/30 shadow-2xl lg:rounded-full !px-8 !py-4 lg:!mt-4">
        <DemoLogo />

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center !gap-8 font-medium relative transition-all duration-300 ${fontClass}`}
        >
          <li>
            <a
              href="#"
              className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:glow"
            >
              {t("home")}
            </a>
          </li>

          {/* Elite Services Dropdown */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setEliteOpen(true)}
            onMouseLeave={() => setEliteOpen(false)}
          >
            <div className="flex items-center !gap-1 text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:glow">
              <span>{t("elite_services")}</span>
              <FiChevronDown
                className={`text-sm transition-transform duration-300 ${
                  eliteOpen ? "rotate-180 text-cyan-100" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {eliteOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`absolute top-full left-0 !mt-3 w-64 bg-gradient-to-br from-[#0f0f2a]/95 to-[#2a0055]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden z-50 ${fontClass}`}
                >
                  {eliteLinks.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        className="flex items-center !gap-3 !px-5 !py-4 text-cyan-200 hover:bg-cyan-900/30 hover:text-cyan-100 transition-all duration-300 border-b border-cyan-800/30 last:border-b-0"
                      >
                        <span className="text-cyan-400">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li>
            <a
              href="#about"
              className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:glow"
            >
              {t("about")}
            </a>
          </li>
          <li>
            <a
              href="#testimonial"
              className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:glow"
            >
              {t("testimonial")}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:glow"
            >
              {t("faq")}
            </a>
          </li>
          <li>
            <Link
              to="/demo"
              className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-semibold !px-6 !py-3 rounded-xl shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
            >
              {t("view_demo")}
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-cyan-300 text-2xl focus:outline-none hover:text-cyan-100 transition"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 left-0 h-full w-80 max-w-[90%] bg-gradient-to-br from-[#0a0a1f]/98 to-[#1a0033]/98 backdrop-blur-2xl border-r border-cyan-500/40 shadow-2xl z-50 md:hidden ${fontClass}`}
            >
              <div className="flex justify-between items-center !p-6 border-b border-cyan-800/50">
                <DemoLogo />
                <button
                  onClick={toggleMenu}
                  className="text-cyan-300 hover:text-cyan-100 transition"
                >
                  <FiX size={24} />
                </button>
              </div>

              <ul className="flex flex-col !gap-4 !p-6 text-cyan-200">
                <li>
                  <a
                    href="#"
                    onClick={toggleMenu}
                    className="block !py-2 hover:text-cyan-100 transition hover:glow"
                  >
                    {t("home")}
                  </a>
                </li>

                {/* Mobile Elite Dropdown */}
                <li>
                  <button
                    onClick={toggleMobileElite}
                    className="w-full flex items-center justify-between !py-2 text-cyan-300 hover:text-cyan-100 transition"
                  >
                    <span>{t("elite_services")}</span>
                    <FiChevronDown
                      className={`transition-transform duration-300 ${
                        mobileEliteOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileEliteOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden !pl-4 !mt-2 space-y-2"
                      >
                        {eliteLinks.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              to={item.to}
                              onClick={() => {
                                toggleMenu();
                                setMobileEliteOpen(false);
                              }}
                              className="flex items-center !gap-3 !py-2 text-cyan-400 hover:text-cyan-100 transition"
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                {[t("about"), t("testimonial"), t("faq")].map((text, i) => (
                  <li key={i}>
                    <a
                      href={`#${text.toLowerCase()}`}
                      onClick={toggleMenu}
                      className="block !py-2 hover:text-cyan-100 transition hover:glow"
                    >
                      {text}
                    </a>
                  </li>
                ))}

                <li className="!mt-6">
                  <Link
                    to="/demo"
                    onClick={toggleMenu}
                    className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-semibold !px-6 !py-3 rounded-xl shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
                  >
                    {t("view_demo")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Glow Hover Style */}
      <style jsx>{`
        .hover\\:glow:hover {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6),
            0 0 20px rgba(0, 255, 255, 0.4);
        }
      `}</style>
    </nav>
  );
};

export default Navbarr;
