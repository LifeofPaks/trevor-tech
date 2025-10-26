import React, { useState, useEffect, useRef } from "react";
import {
  FiHome,
  FiBell,
  FiMessageSquare,
  FiGlobe,
  FiX,
  FiSettings,
  FiMapPin,
  FiBattery,
  FiUser,
  FiCreditCard,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiChevronRight,
  FiLogOut,
  FiActivity,
  FiZap,
  FiCamera,
  FiMic,
} from "react-icons/fi";

// Language Context (to share with Sidebar)
export const LanguageContext = React.createContext();

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "United States" },
    { code: "es", label: "Español", flag: "Spain" },
    { code: "fr", label: "Français", flag: "France" },
    { code: "de", label: "Deutsch", flag: "Germany" },
    { code: "it", label: "Italiano", flag: "Italy" },
    { code: "pt", label: "Português", flag: "Portugal" },
    { code: "ru", label: "Русский", flag: "Russia" },
    { code: "zh", label: "中文", flag: "China" },
    { code: "ja", label: "日本語", flag: "Japan" },
    { code: "ko", label: "한국어", flag: "South Korea" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const Dropdown = ({ title, children }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(title)}
        className="!p-2 rounded-full hover:bg-gray-100 transition-all duration-200 relative"
      >
        {children.icon}
        {children.badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {children.badge}
          </span>
        )}
      </button>

      {openDropdown === title && (
        <div className="absolute right-0 !mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="!p-4 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{title}</p>
          </div>
          <div className="!p-2 max-h-96 overflow-y-auto">
            {children.items.map((item, i) => (
              <button
                key={i}
                className="w-full text-left !px-4 !py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3 text-sm text-gray-700"
              >
                {item.icon && <span className="text-[14px]">{item.icon}</span>}
                <div>
                  <p className="font-medium">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
          {children.footer && (
            <div className="!p-3 border-t border-gray-100 bg-gray-50">
              {children.footer}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between !px-4 !py-3 md:!px-6">
          {/* Left: Try Now Button */}
          <div className="flex-1 flex justify-center md:justify-start">
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold !px-6 !py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              Try Now
            </button>
          </div>

          {/* Right: Icons + Language */}
          <div className="flex items-center gap-2">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-1">
              <Dropdown title="Home">
                {{
                  icon: <FiHome className="text-xl text-gray-700" />,
                  items: [
                    { title: "Dashboard", icon: <FiHome /> },
                    { title: "Reports", icon: <FiGlobe /> },
                    { title: "Settings", icon: <FiSettings /> },
                  ],
                }}
              </Dropdown>

              <Dropdown title="Notifications">
                {{
                  icon: <FiBell className="text-xl text-gray-700" />,
                  badge: "8",
                  items: [
                    {
                      title: "New message from John",
                      subtitle: "2 min ago",
                      icon: <FiMessageSquare />,
                    },
                    {
                      title: "Location updated",
                      subtitle: "5 min ago",
                      icon: <FiMapPin />,
                    },
                    {
                      title: "Battery low",
                      subtitle: "10 min ago",
                      icon: <FiBattery />,
                    },
                  ],
                  footer: (
                    <button className="w-full text-center text-sm text-[#0695c8] font-medium">
                      View All
                    </button>
                  ),
                }}
              </Dropdown>

              <Dropdown title="Messages">
                {{
                  icon: <FiMessageSquare className="text-xl text-gray-700" />,
                  badge: "3",
                  items: [
                    {
                      title: "Sarah",
                      subtitle: "Hey, are you free?",
                      icon: (
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                      ),
                    },
                    {
                      title: "Team",
                      subtitle: "Meeting at 3 PM",
                      icon: (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full" />
                      ),
                    },
                  ],
                  footer: (
                    <button className="w-full text-center text-sm text-[#0695c8] font-medium">
                      See All Messages
                    </button>
                  ),
                }}
              </Dropdown>

              <Dropdown title="Profile">
                {{
                  icon: (
                    <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Z
                    </div>
                  ),
                  items: [
                    { title: "My Account", icon: <FiUser /> },
                    { title: "Billing", icon: <FiCreditCard /> },
                    { title: "Support", icon: <FiHelpCircle /> },
                  ],
                  footer: (
                    <button className="w-full text-center text-sm text-red-600 font-medium">
                      Logout
                    </button>
                  ),
                }}
              </Dropdown>

              {/* Language Selector */}
              <div className="relative !ml-2" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown("Language")}
                  className="flex items-center gap-1.5 !px-3 !py-2 rounded-full hover:bg-gray-100 transition-all text-sm font-medium text-gray-700"
                >
                  <FiGlobe className="text-lg" />
                  <span className="text-[13px]">{language}</span>
                  <FiChevronDown
                    className={`text-xs transition-transform ${
                      openDropdown === "Language" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "Language" && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="!p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-[12px]">
                        Select Language
                      </p>
                    </div>
                    <div className="max-h-64 overflow-y-auto !p-2 scrollbar-hide">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.label);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left !px-3 !py-2.5 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3 text-sm ${
                            language === lang.label
                              ? "bg-blue-50 text-[#0695c8] font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <span className="text-[12px]">{lang.flag}</span>
                          <span className="text-[10px]">{lang.label}</span>
                          {language === lang.label && (
                            <FiCheck className="ml-auto text-[#0695c8]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden !p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95  !mr-10"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                Z
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu – clean, white-bg ready */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center !pt-16 !px-4 overflow-y-auto bg-white">
            <div
              className="w-full max-w-md !space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl !p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Menu</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <FiX className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Dashboard */}
              <button className="group w-full">
                <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition">
                        <FiHome className="text-xl text-indigo-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Dashboard</p>
                        <p className="text-xs text-gray-500">View all stats</p>
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-400 group-hover:text-indigo-600 transition" />
                  </div>
                </div>
              </button>

              {/* Notifications – RED badge only */}
              <button className="group w-full">
                <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-red-100 group-hover:bg-red-200 transition">
                        <FiBell className="text-xl text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">
                          Notifications
                        </p>
                        <p className="text-xs text-gray-500">
                          8 pending alerts
                        </p>
                      </div>
                    </div>
                    <span className="bg-red-500 text-white text-xs !px-3 !py-1 rounded-full font-bold shadow-sm">
                      8
                    </span>
                  </div>
                </div>
              </button>

              {/* Messages – PURPLE badge only */}
              <button className="group w-full">
                <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition">
                        <FiMessageSquare className="text-xl text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Messages</p>
                        <p className="text-xs text-gray-500">3 unread</p>
                      </div>
                    </div>
                    <span className="bg-purple-500 text-white text-xs !px-3 !py-1 rounded-full font-bold shadow-sm">
                      3
                    </span>
                  </div>
                </div>
              </button>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm">
                <div className="flex items-center gap-2 !mb-3">
                  <FiActivity className="text-green-600" />
                  <p className="font-semibold text-gray-800">Recent Activity</p>
                </div>
                <div className="!space-y-2">
                  {[
                    {
                      icon: FiMapPin,
                      title: "Location Updated",
                      time: "2 min ago",
                      desc: "123 Main St",
                    },
                    {
                      icon: FiCamera,
                      title: "Screenshot Taken",
                      time: "5 min ago",
                      desc: "Selfie",
                    },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 !p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="p-2 rounded-lg bg-gray-100">
                        <a.icon className="text-lg text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {a.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {a.time} • {a.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: FiCamera, label: "Take Photo", color: "indigo" },
                  { icon: FiMic, label: "Record Audio", color: "purple" },
                ].map((a, i) => (
                  <button
                    key={i}
                    className={`flex flex-col items-center gap-2 !p-4 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    <a.icon className={`text-xl text-${a.color}-600`} />
                    <span className="text-xs font-medium text-gray-700">
                      {a.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Language Selector */}
              <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm">
                <div className="flex items-center gap-2 !mb-3">
                  <FiGlobe className="text-indigo-600" />
                  <p className="font-semibold text-gray-800">Language</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full !px-4 !py-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.label}>
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm !space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    Z
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Zion Ethan</p>
                    <p className="text-xs text-gray-500">zionethan@tech.com</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 !py-3 bg-gray-50 rounded-2xl text-gray-700 font-medium hover:bg-gray-100 transition">
                    <FiSettings className="text-gray-600" />
                    Settings
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 !py-3 bg-red-50 rounded-2xl text-red-600 font-medium hover:bg-red-100 transition">
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center !pt-4 text-xs text-gray-400">
                © 2025 TrevorTech • v2.4.1
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Push content down */}
      <div className="h-16 md:h-20" />
    </LanguageContext.Provider>
  );
};

export default Header;
