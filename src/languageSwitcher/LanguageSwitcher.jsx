import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, styled } from "@mui/material";

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    padding: "8px 32px 8px 12px",
    color: "#CFF9FF", // cyan-300
    fontWeight: 500,
    fontSize: "0.675rem",
    display: "flex",
    alignItems: "center",
    background:
      "linear-gradient(90deg, rgba(10, 10, 31, 0.8) 0%, rgba(26, 0, 51, 0.8) 100%) !important",
    border: "1px solid rgba(34, 211, 238, 0.5)", // cyan-500/30
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(10, 10, 31, 0.9) 0%, rgba(26, 0, 51, 0.9) 100%) !important",
      borderColor: "rgba(34, 211, 238, 0.5)",
    },
  },
  "& .MuiSvgIcon-root": {
    // Dropdown arrow
    color: "#CFF9FF", // cyan-300
    right: 8,
    transition: "transform 0.3s ease", // Smooth rotation transition
    "&.MuiSelect-iconOpen": {
      transform: "rotate(180deg)", // Rotate arrow when open
    },
  },
  "& .MuiPaper-root": {
    // Dropdown menu
    background:
      "linear-gradient(180deg, rgba(15, 15, 42, 0.95) 0%, rgba(42, 0, 85, 0.95) 100%) !important",
    border: "1px solid rgba(34, 211, 238, 0.4)",
    borderRadius: "12px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 16px rgba(0, 255, 255, 0.3)",
    marginTop: "8px",
    maxHeight: "300px", // Limit dropdown height for scroll
    overflowY: "auto", // Enable scrolling
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for Chrome/Safari
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#CFF9FF", // cyan-300
  fontSize: "0.675rem", // Corrected from 0.6575rem to match select font size
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    background: "rgba(6, 182, 212, 0.3)", // cyan-600/30
    color: "#E0FFFF", // cyan-100
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
  },
  "&.Mui-selected": {
    background: "rgba(6, 182, 212, 0.4)", // cyan-600/40
    color: "#E0FFFF", // cyan-100
  },
}));

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文 (Mandarin Chinese)", flag: "🇨🇳" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
    { code: "fr", name: "Français (French)", flag: "🇫🇷" },
    { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
    { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
    { code: "pt", name: "Português (Portuguese)", flag: "🇵🇹" },
    { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰" },
    { code: "id", name: "Bahasa Indonesia (Indonesian)", flag: "🇮🇩" },
    { code: "de", name: "Deutsch (German)", flag: "🇩🇪" },
    { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
    { code: "sw", name: "Kiswahili (Swahili)", flag: "🇰🇪" },
    { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
    { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
    { code: "vi", name: "Tiếng Việt (Vietnamese)", flag: "🇻🇳" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 40,
        right: 20,
        zIndex: 1000,
        direction:
          i18n.language === "ar" || i18n.language === "ur" ? "rtl" : "ltr",
      }}
    >
      <StyledSelect
        value={i18n.language}
        onChange={changeLanguage}
        displayEmpty
        renderValue={(selected) => {
          const selectedLang = languages.find((lang) => lang.code === selected);
          return selectedLang ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {selectedLang.flag} {selectedLang.name}
            </span>
          ) : (
            "Select Language"
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300, // Ensure dropdown height is limited
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
              },
            },
          },
        }}
      >
        {languages.map((lang) => (
          <StyledMenuItem key={lang.code} value={lang.code}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {lang.flag} {lang.name}
            </span>
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </div>
  );
};

export default LanguageSwitcher;
