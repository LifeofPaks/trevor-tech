import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
    { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰" },
    { code: "id", name: "Bahasa", flag: "🇮🇩" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
    { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
    { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setOpen(false);
  };

  return (
    <div
      className="!fixed lg:!top-10 !top-20 !right-5 !z-[1000]"
      style={{
        direction:
          i18n.language === "ar" || i18n.language === "ur" ? "rtl" : "ltr",
      }}
    >
      <div className="!relative">
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="!flex !items-center !justify-between !gap-2 !px-3 !py-2 !text-cyan-300 !text-[0.8rem] !font-medium w-[140px]
                     !rounded-xl !border !border-cyan-400/40 
                     !bg-gradient-to-r !from-[#0a0a1f]/80 !to-[#1a0033]/80 
                     !backdrop-blur-md !shadow-lg 
                     hover:!border-cyan-300/70 
                     !transition-all !duration-300"
        >
          <span className="!flex !items-center !gap-2">{currentLang.flag}</span>

          <span className="text-[10px]">
            {" "}
            {currentLang.name.length > 10
              ? currentLang.name.slice(0, 10) + "..."
              : currentLang.name}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <FiChevronDown className="!text-cyan-300" />
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
              className="!absolute !mt-2 !w-60 !right-0 !rounded-2xl 
                         !overflow-hidden !border !border-cyan-400/40 
                         !bg-gradient-to-b !from-[#0f0f2a]/95 !to-[#2a0055]/95 
                         !backdrop-blur-xl !shadow-xl "
            >
              {/* Header with close button */}
              <div className="!flex !items-center !justify-between !px-4 !py-3 !border-b !border-cyan-500/30">
                <span className="!text-cyan-200 !text-[12px] !font-semibold">
                  Select Language
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="!text-cyan-300 hover:!text-cyan-100 !transition-all"
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
                        ? "!bg-cyan-600/40 !text-cyan-50"
                        : "!text-cyan-200 hover:!bg-cyan-500/30 hover:!text-cyan-50"
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
