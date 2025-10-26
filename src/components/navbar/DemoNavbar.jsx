import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiGlobe,
  FiVideo,
  FiPhone,
  FiMic,
  FiMessageSquare,
  FiInstagram,
  FiCamera,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiSmartphone,
  FiLogOut,
  FiPlus,
  FiChevronRight,
  FiChevronDown,
  FiHeadphones,
  FiMapPin,
  FiMoreHorizontal,
  FiMonitor,
  FiCalendar,
  FiMail,
  FiImage,
  FiLock,
  FiWifi,
  FiShoppingCart,
  FiDownload,
  FiCheckSquare,
  FiTruck,
  FiCompass,
  FiZap,
  FiTool,
  FiMessageCircle,
  FiClock,
  FiEye,
  FiSend,
  FiMap,
  FiShield,
  FiActivity,
} from "react-icons/fi";

import { FaYoutube, FaTiktok } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import Logo from "../logo/Logo";
import DemoLogo from "../logo/DemoLogo";

const DemoSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("Zion's Galaxy S24");
  const [openSubmenus, setOpenSubmenus] = useState([
    "Social Networks",
    "Video Apps",
    "Location Tracking",
    "Phone Data",
    "Remote Control",
    "More Features",
  ]);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path) => location.pathname === path;

  const devices = [
    {
      name: "Zion's Galaxy S24",
      status: "In Use",
      color: "bg-green-500",
      battery: "20%",
    },
    {
      name: "Zion's iPhone 16",
      status: "Offline",
      color: "bg-gray-500",
      battery: null,
    },
    {
      name: "Zion's iPhone 14",
      status: "Offline",
      color: "bg-gray-500",
      battery: null,
    },
    {
      name: "Zion's iCloud",
      status: "Available",
      color: "bg-blue-500",
      battery: null,
    },
  ];

const menuItems = [
  {
    label: "Logs",
    icon: <FiMonitor />,
    badge: "HOT",
    subItems: [
      {
        to: "/demo/logs/screen-time",
        label: "Screen Time",
        icon: <FiMonitor />,
      },
      { to: "/demo/logs/keylogs", label: "Keylogs", icon: <FiMessageSquare /> },
    ],
  },
  {
    label: "Social Networks",
    icon: <FiGlobe />,
    badge: "HOT",
    subItems: [
      {
        to: "/demo/social/whatsapp",
        label: "WhatsApp",
        icon: <FiMessageSquare />,
      },
      {
        to: "/demo/social/messenger",
        label: "Messenger",
        icon: <FiMessageSquare />,
      },
      {
        to: "/demo/social/instagram",
        label: "Instagram",
        icon: <FiInstagram />,
      },
      { to: "/demo/social/facebook", label: "Facebook", icon: <FiGlobe /> },
      { to: "/demo/social/snapchat", label: "Snapchat", icon: <FiCamera /> },
      { to: "/demo/social/line", label: "LINE", icon: <FiMessageSquare /> },
      { to: "/demo/social/telegram", label: "Telegram", icon: <FiSend /> },
    ],
  },
  {
    label: "Social Apps",
    icon: <FiHeadphones />,
    badge: "HOT",
    subItems: [
      {
        to: "/demo/social/record-audio",
        label: "Record Surround",
        icon: <FiMic />,
      },
      {
        to: "/demo/social/take-photos",
        label: "Take Photos",
        icon: <FiCamera />,
      },
      {
        to: "/demo/social/record-screen",
        label: "Record Screen",
        icon: <FiMonitor />,
      },
      { to: "/demo/social/logs", label: "Logs", icon: <FiMonitor /> },
      { to: "/demo/social/photos", label: "Photos", icon: <FiImage /> },
      {
        to: "/demo/social/video-preview",
        label: "Video Preview",
        icon: <FiVideo />,
      },
      {
        to: "/demo/social/keylogger",
        label: "Keylogger",
        icon: <FiMessageSquare />,
      },
    ],
  },
  { label: "App Calls", icon: <FiPhone />, badge: "HOT", subItems: [] },
  { label: "App Audio", icon: <FiHeadphones />, subItems: [] },
  {
    label: "Video Apps",
    icon: <FiVideo />,
    subItems: [
      { to: "/demo/video/youtube", label: "YouTube", icon: <FaYoutube /> },
      { to: "/demo/video/tiktok", label: "TikTok", icon: <FaTiktok /> },
      {
        to: "/demo/video/reelshort",
        label: "ReelShort",
        icon: <RiMovie2Line />,
      },
      { to: "/demo/video/onlyfans", label: "OnlyFans", icon: <FiLock /> },
    ],
  },
  {
    label: "Phone Data",
    icon: <FiSmartphone />,
    subItems: [
      { to: "/demo/data/calls", label: "Calls", icon: <FiPhone /> },
      {
        to: "/demo/data/call-recording",
        label: "Calls Recording",
        icon: <FiMic />,
      },
      {
        to: "/demo/data/messages",
        label: "Messages",
        icon: <FiMessageCircle />,
      },
      { to: "/demo/data/photos", label: "Photos", icon: <FiImage /> },
      { to: "/demo/data/browser", label: "Browser History", icon: <FiGlobe /> },
      {
        to: "/demo/data/keylogger",
        label: "Keylogger",
        icon: <FiMessageSquare />,
      },
      {
        to: "/demo/data/track-keywords",
        label: "Track Keywords",
        icon: <FiGlobe />,
      }, // replaced FiSearch
      { to: "/demo/data/wifi-logger", label: "Wi-Fi Logger", icon: <FiWifi /> },
      {
        to: "/demo/data/app-management",
        label: "App Management",
        icon: <FiSettings />,
      },
      {
        to: "/demo/data/video-preview",
        label: "Video Preview",
        icon: <FiVideo />,
      },
      { to: "/demo/data/contacts", label: "Contacts", icon: <FiUser /> },
      { to: "/demo/data/calendar", label: "Calendar", icon: <FiCalendar /> },
    ],
  },
  {
    label: "Remote Control",
    icon: <FiMonitor />,
    subItems: [
      {
        to: "/demo/remote/record-surround",
        label: "Record Surround",
        icon: <FiMic />,
      },
      {
        to: "/demo/remote/capture-screenshots",
        label: "Capture Screenshots",
        icon: <FiCamera />,
      },
      {
        to: "/demo/remote/record-screen",
        label: "Record Screen",
        icon: <FiMonitor />,
      },
      { to: "/demo/remote/live-screen", label: "Live Screen", icon: <FiEye /> },
      {
        to: "/demo/remote/take-photos",
        label: "Take Photos",
        icon: <FiCamera />,
      },
      {
        to: "/demo/remote/record-video",
        label: "Record Video",
        icon: <RiMovie2Line />,
      }, // replaced FiFilm
    ],
  },
  {
    label: "Location Tracking",
    icon: <FiMapPin />,
    subItems: [
      { to: "/demo/location/current", label: "Locations", icon: <FiMap /> },
      {
        to: "/demo/location/driving",
        label: "Driving Tracking",
        icon: <FiTruck />,
      },
      { to: "/demo/location/geofence", label: "Geofence", icon: <FiShield /> },
      { to: "/demo/location/dash-cams", label: "Dash Cams", icon: <FiTruck /> },
    ],
  },
  {
    label: "More Features",
    icon: <FiMoreHorizontal />,
    subItems: [
      { to: "/demo/more/gmail", label: "Gmail", icon: <FiMail /> },
      { to: "/demo/more/outlook", label: "Outlook", icon: <FiMail /> },
      { to: "/demo/more/all-photos", label: "All Photos", icon: <FiImage /> },
      { to: "/demo/more/ai-tools", label: "AI Tools", icon: <FiZap /> },
      {
        to: "/demo/more/in-app-purchase",
        label: "In-App Purchase",
        icon: <FiShoppingCart />,
      },
      {
        to: "/demo/more/export-data",
        label: "Export Data",
        icon: <FiDownload />,
      },
      {
        to: "/demo/more/permissions-check",
        label: "Permissions Check",
        icon: <FiCheckSquare />,
      },
    ],
  },
];
  return (
    <>
      {/* Mobile Topbar */}
      {isMobile && !isOpen && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between !px-4 !py-3 bg-[#0a0f2c] text-white shadow-lg z-50">
          <DemoLogo />
          <button onClick={toggleSidebar} className="text-2xl">
            <FiMenu />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0a0f2c] text-gray-300 flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          w-72 shadow-2xl border-r border-gray-800`}
      >
        {/* Header */}
        <div className="flex items-center justify-between !px-5 !py-4 border-b border-gray-800">
          <DemoLogo />
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-400 text-xl hover:text-white"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Device Selector - Click to Open Popup */}
        <div className="!px-4 !mt-4 relative">
          <button
            onClick={() => setShowDeviceModal(true)}
            className="w-full flex items-center justify-between bg-[#1b254b] hover:bg-[#253065] !px-4 !py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-700"
          >
            <span className="flex items-center gap-3">
              <FiSmartphone className="text-[#00d4ff]" />
              <span className="text-white">{selectedDevice}</span>
            </span>
            <FiChevronDown className="text-gray-400" />
          </button>

          {/* Device Popup Modal */}
          {showDeviceModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center !p-4"
              onClick={() => setShowDeviceModal(false)}
            >
              <div
                className="bg-[#0a0f2c] rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between !p-5 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-white">
                    Select Device
                  </h3>
                  <button
                    onClick={() => setShowDeviceModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="!p-4 space-y-2 max-h-96 overflow-y-auto">
                  {devices.map((device) => (
                    <div
                      key={device.name}
                      onClick={() => {
                        setSelectedDevice(device.name);
                        setShowDeviceModal(false);
                      }}
                      className="flex items-center justify-between !p-2 rounded-lg hover:bg-[#1b254b] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${device.color}`}
                        />
                        <div>
                          <p className="text-white font-medium text-[13px]">
                            {device.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {device.status}
                          </p>
                        </div>
                      </div>
                      {device.battery && (
                        <span className="text-xs text-gray-400">
                          {device.battery}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 p-4">
                  <button className="w-full flex items-center justify-center gap-2 !py-3 text-[#00d4ff] hover:text-white font-medium transition text-[12px]">
                    <FiPlus /> Add a New Device
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto !mt-6 !px-3 !pb-10 scrollbar-hide">
          <div className="!space-y-1">
            {menuItems.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isOpen = openSubmenus.includes(item.label);

              return (
                <div key={item.label}>
                  {/* Main Menu Item */}
                  <div
                    className={`group relative ${
                      hasSubItems ? "cursor-pointer" : ""
                    }`}
                    onClick={() => hasSubItems && toggleSubmenu(item.label)}
                  >
                    <div
                      className={`flex items-center justify-between !px-4 !py-3 rounded-xl transition-all duration-200
                        ${
                          isOpen
                            ? "bg-gradient-to-r from-[#00d4ff]/20 to-transparent text-white border-l-4 border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20"
                            : "text-gray-400 hover:bg-[#1b254b] hover:text-white"
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[14px]">{item.icon}</span>
                        <span className="font-medium text-[14px]">
                          {item.label}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[8px] !px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                        {hasSubItems && (
                          <FiChevronRight
                            className={`transition-transform ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Submenu */}
                  {hasSubItems && isOpen && (
                    <div className="!ml-8 !mt-3 !space-y-1 border-l-1 border-gray-800 !pl-4">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => isMobile && setIsOpen(false)}
                          className={`flex items-center gap-3 !px-3 !py-2 rounded-lg text-sm transition-all
                            ${
                              isActive(sub.to)
                                ? "bg-[#1b254b] text-[#00d4ff] font-medium"
                                : "text-gray-500 hover:text-white hover:bg-[#1b254b]/50"
                            }`}
                        >
                          {sub.icon || <div className="w-4 h-4" />}
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 !p-4 !mt-auto">
          <div className="text-center text-xs text-gray-500 !space-y-1">
            <p className="font-medium text-gray-400">
              Easier Monitoring with{" "}
              <span className="text-[#00d4ff] font-semibold">
                TrevorTech App
              </span>
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <FiSmartphone className="text-[#00d4ff]" />
              <FiMonitor className="text-[#00d4ff]" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        />
      )}

      {/* Desktop Content Push */}
      {!isMobile && <div className="w-72" />}
    </>
  );
};

export default DemoSidebar;
