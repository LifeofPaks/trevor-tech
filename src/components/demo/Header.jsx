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
import { useTranslation } from "react-i18next";
import useDropdownStore from "../../store/useDropdownStore";
import useMobileMenuStore from "../../store/useMobileMenuStore";

const Header = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenuStore();
  const { openDropdown, setOpenDropdown } = useDropdownStore();

  const dropdownRef = useRef(null);

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
  }, [setOpenDropdown]);

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
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between !px-4 !py-3 md:!px-6">
          {/* Left: Try Now Button */}
          <div className="flex-1 flex justify-center md:justify-start"></div>

          {/* Right: Icons + Language */}
          <div className="flex items-center gap-2">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-1">
              {/* Notifications Dropdown */}
              <Dropdown title={t("dmh.notifications.title")}>
                {{
                  icon: <FiBell className="text-xl text-gray-700" />,
                  badge: "8",
                  items: [
                    {
                      title: t("dmh.notifications.items.new_message"),
                      subtitle: t("dmh.notifications.items.time_2min"),
                      icon: (
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          J
                        </div>
                      ),
                      unread: true,
                    },
                    {
                      title: t("dmh.notifications.items.location_updated"),
                      subtitle: t("dmh.notifications.items.time_5min"),
                      icon: (
                        <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <FiMapPin className="text-white text-xs" />
                        </div>
                      ),
                    },
                    {
                      title: t("dmh.notifications.items.battery_low"),
                      subtitle: t("dmh.notifications.items.time_10min"),
                      icon: (
                        <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center">
                          <FiBattery className="text-white text-xs" />
                        </div>
                      ),
                    },
                  ],
                  footer: (
                    <button className="w-full text-center !py-2.5 text-sm font-semibold text-[#0695c8] hover:bg-blue-50 rounded-b-xl transition-all">
                      {t("dmh.notifications.footer")}
                    </button>
                  ),
                }}
              </Dropdown>

              {/* Messages Dropdown */}
              <Dropdown title={t("dmh.messages.title")}>
                {{
                  icon: <FiMessageSquare className="text-xl text-gray-700" />,
                  badge: "3",
                  items: [
                    {
                      title: t("dmh.messages.items.sarah"),
                      subtitle: t("dmh.messages.items.sarah_message"),
                      icon: (
                        <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          S
                        </div>
                      ),
                      time: t("dmh.messages.items.time_2m"),
                      unread: true,
                    },
                    {
                      title: t("dmh.messages.items.team"),
                      subtitle: t("dmh.messages.items.team_message"),
                      icon: (
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          T
                        </div>
                      ),
                      time: t("dmh.messages.items.time_1h"),
                    },
                  ],
                  footer: (
                    <button className="w-full text-center !py-2.5 text-sm font-semibold text-[#0695c8] hover:bg-blue-50 rounded-b-xl transition-all">
                      {t("dmh.messages.footer")}
                    </button>
                  ),
                }}
              </Dropdown>

              {/* Profile Dropdown */}
              <Dropdown title={t("dmh.profile.title")}>
                {{
                  icon: (
                    <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      Z
                    </div>
                  ),
                  items: [
                    {
                      title: t("dmh.profile.items.account"),
                      icon: <FiUser />,
                      desc: t("dmh.profile.items.account_desc"),
                    },
                    {
                      title: t("dmh.profile.items.billing"),
                      icon: <FiCreditCard />,
                      desc: t("dmh.profile.items.billing_desc"),
                    },
                    {
                      title: t("dmh.profile.items.support"),
                      icon: <FiHelpCircle />,
                      desc: t("dmh.profile.items.support_desc"),
                    },
                  ],
                  footer: (
                    <button className="w-full text-center !py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-b-xl transition-all flex items-center justify-center gap-2">
                      <FiLogOut className="text-sm" />
                      {t("dmh.profile.footer")}
                    </button>
                  ),
                }}
              </Dropdown>
              <div className="w-[140px]"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden !p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 !mr-10"
              aria-label={t("dmh.mobile_menu.toggle_button_aria")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                Z
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                      <h3 className="text-lg font-bold text-gray-800">
                        {t("dmh.mobile_menu.title")}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label={t("dmh.mobile_menu.close_button_aria")}
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
                        <p className="font-semibold text-gray-800">
                          {t("dmh.mobile_menu.dashboard.title")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t("dmh.mobile_menu.dashboard.subtitle")}
                        </p>
                      </div>
                    </div>
                    <FiChevronRight className="text-gray-400 group-hover:text-indigo-600 transition" />
                  </div>
                </div>
              </button>

              {/* Notifications */}
              <button className="group w-full">
                <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-red-100 group-hover:bg-red-200 transition">
                        <FiBell className="text-xl text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">
                          {t("dmh.mobile_menu.notifications.title")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t("dmh.mobile_menu.notifications.subtitle")}
                        </p>
                      </div>
                    </div>
                    <span className="bg-red-500 text-white text-xs !px-3 !py-1 rounded-full font-bold shadow-sm">
                      8
                    </span>
                  </div>
                </div>
              </button>

              {/* Messages */}
              <button className="group w-full">
                <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition">
                        <FiMessageSquare className="text-xl text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">
                          {t("dmh.mobile_menu.messages.title")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t("dmh.mobile_menu.messages.subtitle")}
                        </p>
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
                  <p className="font-semibold text-gray-800">
                    {t("dmh.mobile_menu.recent_activity.title")}
                  </p>
                </div>
                <div className="!space-y-2">
                  {[
                    {
                      icon: FiMapPin,
                      title: t(
                        "dmh.mobile_menu.recent_activity.items.location_updated"
                      ),
                      time: t(
                        "dmh.mobile_menu.recent_activity.items.time_2min"
                      ),
                      desc: "123 Main St",
                    },
                    {
                      icon: FiCamera,
                      title: t(
                        "dmh.mobile_menu.recent_activity.items.screenshot_taken"
                      ),
                      time: t(
                        "dmh.mobile_menu.recent_activity.items.time_5min"
                      ),
                      desc: t("dmh.mobile_menu.recent_activity.items.selfie"),
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
                  {
                    icon: FiCamera,
                    label: t("dmh.mobile_menu.quick_actions.take_photo"),
                    color: "indigo",
                  },
                  {
                    icon: FiMic,
                    label: t("dmh.mobile_menu.quick_actions.record_audio"),
                    color: "purple",
                  },
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
              <div className="bg-white border border-gray-200 rounded-3xl !p-5 shadow-sm !space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-[#0695c8] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    Z
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {t("dmh.mobile_menu.profile.name")}
                    </p>
                    <p className="text-xs text-gray-500">zionethan@tech.com</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 !py-3 bg-gray-50 rounded-2xl text-gray-700 font-medium hover:bg-gray-100 transition">
                    <FiSettings className="text-gray-600" />
                    {t("dmh.mobile_menu.profile.settings")}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 !py-3 bg-red-50 rounded-2xl text-red-600 font-medium hover:bg-red-100 transition">
                    <FiLogOut />
                    {t("dmh.mobile_menu.profile.logout")}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center !py-4 text-xs text-gray-400">
                {t("dmh.mobile_menu.footer", { year: 2025, version: "2.4.1" })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Push content down */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
