import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isDemoPage = location.pathname.includes("/demo");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語 (Japn)", flag: "🇯🇵" },
    { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
    { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setOpen(false);
  };

  return (
    <div
      className={`!fixed ${
        isDemoPage ? "lg:!top-5" : "lg:!top-10"
      }  !top-22 !right-5 !z-[1000]`}
      style={{
        direction:
          i18n.language === "ar" || i18n.language === "ur" ? "rtl" : "ltr",
      }}
    >
      <div className="!relative">
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`!flex !items-center !justify-between !gap-2 !px-3 !py-2 !text-[0.8rem] !font-medium lg:w-[140px] 
            !rounded-xl !border !backdrop-blur-md 
            !transition-all !duration-300
            ${
              isDemoPage
                ? "!bg-white !border-gray-300 !text-[#1b254b]"
                : "!bg-gradient-to-r !from-[#0a0a1f]/90 !to-[#1b254b]/90 !border-[#2b3a75]/40 !text-[#d0d6f5] hover:!border-[#3d4ea5]/70"
            }`}
        >
          <div className="flex items-center gap-1">
            <span className="!flex !items-center !gap-2">
              {currentLang.flag}
            </span>

            <span className="!text-[12px] !truncate !max-w-[70px]">
              {currentLang.name.length > 15
                ? currentLang.name.slice(0, 15) + "..."
                : currentLang.name}
            </span>
          </div>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <FiChevronDown
              className={`!text-[${isDemoPage ? "#1b254b" : "#d0d6f5"}]`}
            />
          </motion.span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`!absolute !mt-2 !w-60 !right-0 !rounded-2xl 
                !overflow-hidden !border 
                ${
                  isDemoPage
                    ? "!bg-white !border-gray-100 !text-[#1b254b]"
                    : "!bg-gradient-to-b !from-[#0f0f2a]/95 !to-[#1b254b]/95 !border-[#2b3a75]/40 !text-[#d0d6f5]"
                } 
                !backdrop-blur-xl !shadow-xl`}
            >
              {/* Header with close button */}
              <div
                className={`!flex !items-center !justify-between !px-4 !py-3 !border-b 
                ${
                  isDemoPage ? "!border-[#1b254b]/20" : "!border-[#2b3a75]/40"
                }`}
              >
                <span
                  className={`!text-[11px] !font-semibold  flex items-center gap-1
                ${isDemoPage ? "text-gray-500" : "text-white"}`}
                >
                  <CiGlobe /> {t("select_language")}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className={`!transition-all ${
                    isDemoPage
                      ? "hover:!text-[#1b254b]/70"
                      : "hover:!text-[#aab3e5]"
                  }`}
                >
                  <FiX className="!w-4 !h-4" />
                </button>
              </div>

              {/* List */}
              <div className="!max-h-60 !overflow-y-auto scrollbar-hide">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`!w-full !text-left !px-4 !py-2 !text-[0.8rem] !flex !items-center !gap-2 
                      !transition-all !duration-200
                      ${
                        i18n.language === lang.code
                          ? isDemoPage
                            ? "!bg-[#1b254b]/10 !text-[#1b254b]"
                            : "!bg-[#2b3a75]/60 !text-white"
                          : isDemoPage
                          ? "hover:!bg-[#1b254b]/10 !text-[#1b254b]"
                          : "hover:!bg-[#2b3a75]/40 !text-[#d0d6f5]"
                      }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
