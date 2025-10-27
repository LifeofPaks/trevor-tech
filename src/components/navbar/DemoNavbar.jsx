import React, { useState, useEffect, useContext } from "react";
import {
  FiMenu,
  FiX,
  FiGlobe,
  FiVideo,
  FiPhone,
  FiMic,
  FiMessageSquare,
  FiCamera,
  FiSmartphone,
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
  FiShield,
  FiMap,
  FiEye,
  FiSettings,
  FiUser,
  FiZap,
  FiMessageCircle,
  FiMap as FiLocation,
  FiKey,
  FiPhoneCall,
  FiUsers,
  FiCalendar as FiEvent,
  FiFileText,
  FiImage as FiPhoto,
  FiFilm,
  FiRadio,
  FiAlertCircle,
  FiPackage,
  FiBookmark,
  FiChrome,
  FiMail as FiEnvelope,
  FiCreditCard,
  FiShield as FiGeo,
  FiGlobe as FiWeb,
  FiSmartphone as FiApp,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaLinkedin,
  FaDiscord,
  FaSlack,
  FaReddit,
  FaTumblr,
  FaSkype,
} from "react-icons/fa";
import {
  SiMessenger,
  SiLine,
  SiZoom,
  SiKakaotalk,
  SiImessage,
  SiBadoo,
  SiTinder,
} from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import DemoLogo from "../logo/DemoLogo";
import HotImage from "../../assets/hot-badge.png";
import { IoLogoWechat } from "react-icons/io5";

export const LanguageContext = React.createContext();

const translations = {
  en: {
    Dashboard: "Dashboard",
    "General Features": "General Features",
    "Text Messages": "Text Messages",
    "GPS Locations": "GPS Locations",
    Keylogger: "Keylogger",
    Calls: "Calls",
    Contacts: "Contacts",
    Events: "Events",
    Notes: "Notes",
    Photos: "Photos",
    Videos: "Videos",
    "Wi-Fi Networks": "Wi-Fi Networks",
    "Keyword Alerts": "Keyword Alerts",
    "Installed Apps": "Installed Apps",
    Bookmarks: "Bookmarks",
    "Browser History": "Browser History",
    Email: "Email",
    "SIM Card": "SIM Card",

    "Social Networks": "Social Networks",
    WhatsApp: "WhatsApp",
    "WhatsApp Business": "WhatsApp Business",
    Facebook: "Facebook",
    "Facebook Messenger": "Facebook Messenger",
    Instagram: "Instagram",
    X: "X",
    TikTok: "TikTok",
    Snapchat: "Snapchat",
    LinkedIn: "LinkedIn",
    Zoom: "Zoom",
    Kik: "Kik",
    Viber: "Viber",
    Telegram: "Telegram",
    LINE: "LINE",
    Signal: "Signal",
    KakaoTalk: "KakaoTalk",
    Skype: "Skype",
    "Google Chat": "Google Chat",
    Reddit: "Reddit",
    Tumblr: "Tumblr",
    Trillian: "Trillian",
    IMO: "IMO",
    Slack: "Slack",
    Discord: "Discord",
    Tinder: "Tinder",
    Badoo: "Badoo",
    POF: "POF",
    WeChat: "WeChat",
    QQ: "QQ",

    "Screen Captures": "Screen Captures",
    Screenshots: "Screenshots",

    Controls: "Controls",
    "Geo-Fencing": "Geo-Fencing",
    "Website Block": "Website Block",
    "Wi-Fi Block": "Wi-Fi Block",
    "App Block": "App Block",

    "Select Device": "Select Device",
    "Add a New Device": "Add a New Device",
    "Easier Monitoring with": "Easier Monitoring with",
    "TrevorTech App": "TrevorTech App",
  },
  es: {
    Dashboard: "Panel Principal",
    "General Features": "Funciones Generales",
    "Text Messages": "Mensajes de Texto",
    "GPS Locations": "Ubicaciones GPS",
    Keylogger: "Keylogger",
    Calls: "Llamadas",
    Contacts: "Contactos",
    Events: "Eventos",
    Notes: "Notas",
    Photos: "Fotos",
    Videos: "Videos",
    "Wi-Fi Networks": "Redes Wi-Fi",
    "Keyword Alerts": "Alertas de Palabras Clave",
    "Installed Apps": "Aplicaciones Instaladas",
    Bookmarks: "Marcadores",
    "Browser History": "Historial del Navegador",
    Email: "Correo Electrónico",
    "SIM Card": "Tarjeta SIM",

    "Social Networks": "Redes Sociales",
    WhatsApp: "WhatsApp",
    "WhatsApp Business": "WhatsApp Business",
    Facebook: "Facebook",
    "Facebook Messenger": "Facebook Messenger",
    Instagram: "Instagram",
    X: "X",
    TikTok: "TikTok",
    Snapchat: "Snapchat",
    LinkedIn: "LinkedIn",
    Zoom: "Zoom",
    Kik: "Kik",
    Viber: "Viber",
    Telegram: "Telegram",
    LINE: "LINE",
    Signal: "Signal",
    KakaoTalk: "KakaoTalk",
    Skype: "Skype",
    "Google Chat": "Google Chat",
    Reddit: "Reddit",
    Tumblr: "Tumblr",
    Trillian: "Trillian",
    IMO: "IMO",
    Slack: "Slack",
    Discord: "Discord",
    Tinder: "Tinder",
    Badoo: "Badoo",
    POF: "POF",
    WeChat: "WeChat",
    QQ: "QQ",

    "Screen Captures": "Capturas de Pantalla",
    Screenshots: "Capturas",

    Controls: "Controles",
    "Geo-Fencing": "Geo-Cercas",
    "Website Block": "Bloqueo de Sitios Web",
    "Wi-Fi Block": "Bloqueo de Wi-Fi",
    "App Block": "Bloqueo de Apps",

    "Select Device": "Seleccionar Dispositivo",
    "Add a New Device": "Agregar Nuevo Dispositivo",
    "Easier Monitoring with": "Monitoreo más fácil con",
    "TrevorTech App": "App TrevorTech",
  },
};

const DemoSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("Zion's Galaxy S24");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "en";
  const t = translations[language] || translations.en;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleMenuClick = (label, hasSubItems) => {
    if (hasSubItems) {
      setOpenSubmenu((prev) => (prev === label ? null : label));
    } else {
      setOpenSubmenu(null);
    }
    if (isMobile && hasSubItems) {
      setIsOpen(true);
    } else if (isMobile) {
      setIsOpen(false);
    }
  };

  const isPathActive = (path) => location.pathname === path;

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
    { label: t["Dashboard"], icon: <MdDashboard />, to: "/demo/dashboard" },

    {
      label: t["General Features"],
      icon: <FiSmartphone />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/general/messages",
          label: t["Text Messages"],
          icon: <FiMessageCircle />,
        },
        {
          to: "/demo/general/gps",
          label: t["GPS Locations"],
          icon: <FiLocation />,
        },
        { to: "/demo/general/keylogger", label: t.Keylogger, icon: <FiKey /> },
        { to: "/demo/general/calls", label: t.Calls, icon: <FiPhoneCall /> },
        { to: "/demo/general/contacts", label: t.Contacts, icon: <FiUsers /> },
        { to: "/demo/general/events", label: t.Events, icon: <FiEvent /> },
        { to: "/demo/general/notes", label: t.Notes, icon: <FiFileText /> },
        { to: "/demo/general/photos", label: t.Photos, icon: <FiPhoto /> },
        { to: "/demo/general/videos", label: t.Videos, icon: <FiFilm /> },
        {
          to: "/demo/general/wifi",
          label: t["Wi-Fi Networks"],
          icon: <FiWifi />,
        },
        {
          to: "/demo/general/keywords",
          label: t["Keyword Alerts"],
          icon: <FiAlertCircle />,
        },
        {
          to: "/demo/general/apps",
          label: t["Installed Apps"],
          icon: <FiPackage />,
        },
        {
          to: "/demo/general/bookmarks",
          label: t.Bookmarks,
          icon: <FiBookmark />,
        },
        {
          to: "/demo/general/history",
          label: t["Browser History"],
          icon: <FiChrome />,
        },
        { to: "/demo/general/email", label: t.Email, icon: <FiEnvelope /> },
        {
          to: "/demo/general/sim",
          label: t["SIM Card"],
          icon: <FiCreditCard />,
        },
      ],
    },

    {
      label: t["Social Networks"],
      icon: <FiGlobe />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/social/whatsapp",
          label: t.WhatsApp,
          icon: <FaWhatsapp />,
        },
        {
          to: "/demo/social/whatsapp-business",
          label: t["WhatsApp Business"],
          icon: <FaWhatsapp />,
        },
        {
          to: "/demo/social/facebook",
          label: t.Facebook,
          icon: <FaFacebookF />,
        },
        {
          to: "/demo/social/messenger",
          label: t["Facebook Messenger"],
          icon: <SiMessenger />,
        },
        {
          to: "/demo/social/instagram",
          label: t.Instagram,
          icon: <FaInstagram />,
        },
        { to: "/demo/social/x", label: t.X, icon: <FiGlobe /> },
        { to: "/demo/social/tiktok", label: t.TikTok, icon: <FaTiktok /> },
        {
          to: "/demo/social/snapchat",
          label: t.Snapchat,
          icon: <FaSnapchat />,
        },
        {
          to: "/demo/social/linkedin",
          label: t.LinkedIn,
          icon: <FaLinkedin />,
        },
        { to: "/demo/social/zoom", label: t.Zoom, icon: <SiZoom /> },
        { to: "/demo/social/kik", label: t.Kik, icon: <FiMessageCircle /> },
        { to: "/demo/social/viber", label: t.Viber, icon: <FiPhone /> },
        {
          to: "/demo/social/telegram",
          label: t.Telegram,
          icon: <FaTelegramPlane />,
        },
        { to: "/demo/social/line", label: t.LINE, icon: <SiLine /> },
        { to: "/demo/social/signal", label: t.Signal, icon: <FiLock /> },
        {
          to: "/demo/social/kakaotalk",
          label: t.KakaoTalk,
          icon: <SiKakaotalk />,
        },
        { to: "/demo/social/skype", label: t.Skype, icon: <FaSkype /> },
        {
          to: "/demo/social/googlechat",
          label: t["Google Chat"],
          icon: <FiMessageCircle />,
        },
        { to: "/demo/social/reddit", label: t.Reddit, icon: <FaReddit /> },
        { to: "/demo/social/tumblr", label: t.Tumblr, icon: <FaTumblr /> },
        { to: "/demo/social/imo", label: t.IMO, icon: <FiMessageCircle /> },
        { to: "/demo/social/slack", label: t.Slack, icon: <FaSlack /> },
        { to: "/demo/social/discord", label: t.Discord, icon: <FaDiscord /> },
        { to: "/demo/social/tinder", label: t.Tinder, icon: <SiTinder /> },
        { to: "/demo/social/badoo", label: t.Badoo, icon: <SiBadoo /> },
        { to: "/demo/social/wechat", label: t.WeChat, icon: <IoLogoWechat /> },
        { to: "/demo/social/qq", label: t.QQ, icon: <FiMessageCircle /> },
      ],
    },

    {
      label: t["Screen Captures"],
      icon: <FiCamera />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/captures/screenshots",
          label: t.Screenshots,
          icon: <FiImage />,
        },
      ],
    },

    {
      label: t.Controls,
      icon: <FiSettings />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/controls/geofence",
          label: t["Geo-Fencing"],
          icon: <FiGeo />,
        },
        {
          to: "/demo/controls/website-block",
          label: t["Website Block"],
          icon: <FiWeb />,
        },
        {
          to: "/demo/controls/wifi-block",
          label: t["Wi-Fi Block"],
          icon: <FiWifi />,
        },
        {
          to: "/demo/controls/app-block",
          label: t["App Block"],
          icon: <FiApp />,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      {isMobile && !isOpen && (
        <div className="fixed !top-6 !right-6 !z-50">
          <button onClick={toggleSidebar} className="!text-2xl">
            <FiMenu className="text-gray-800" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed !top-0 !left-0 !h-full bg-[#0a0f2c] text-gray-300 flex flex-col !z-50 transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "!translate-x-0"
                : "!-translate-x-full"
              : "!translate-x-0"
          }
          !w-72 shadow-2xl !border-r !border-gray-800`}
      >
        {/* Header */}
        <div className="flex items-center justify-between !px-5 !py-4 !border-b !border-gray-800">
          <DemoLogo />
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-400 !text-xl hover:text-white"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Device Selector */}
        <div className="!px-4 !mt-4 relative">
          <button
            onClick={() => setShowDeviceModal(true)}
            className="w-full flex items-center justify-between bg-[#1b254b] hover:bg-[#253065] !px-4 !py-3 !rounded-xl !text-sm !font-medium transition-all duration-200 !border !border-gray-700"
          >
            <span className="flex items-center !gap-3">
              <FiSmartphone className="text-[#00d4ff]" />
              <span className="text-white">{selectedDevice}</span>
            </span>
            <FiChevronDown className="text-gray-400" />
          </button>

          {showDeviceModal && (
            <div
              className="fixed !inset-0 bg-black/60 backdrop-blur-sm !z-50 flex items-start justify-center !p-4"
              onClick={() => setShowDeviceModal(false)}
            >
              <div
                className="bg-[#0a0f2c] !rounded-2xl shadow-2xl w-full max-w-md !border !border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between !p-5 !border-b !border-gray-700">
                  <h3 className="!text-sm !font-semibold text-white">
                    {t["Select Device"]}
                  </h3>
                  <button
                    onClick={() => setShowDeviceModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="!p-4 !space-y-2 max-h-96 overflow-y-auto">
                  {devices.map((device) => (
                    <div
                      key={device.name}
                      onClick={() => {
                        setSelectedDevice(device.name);
                        setShowDeviceModal(false);
                      }}
                      className="flex items-center justify-between !p-2 !rounded-lg hover:bg-[#1b254b] cursor-pointer transition-all"
                    >
                      <div className="flex items-center !gap-3">
                        <div
                          className={`!w-3 !h-3 !rounded-full ${device.color}`}
                        />
                        <div>
                          <p className="text-white !font-medium !text-[13px]">
                            {device.name}
                          </p>
                          <p className="!text-xs text-gray-400">
                            {device.status}
                          </p>
                        </div>
                      </div>
                      {device.battery && (
                        <span className="!text-xs text-gray-400">
                          {device.battery}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="!border-t !border-gray-700 !p-4">
                  <button className="w-full flex items-center justify-center !gap-2 !py-3 text-[#00d4ff] hover:text-white !font-medium transition !text-[12px]">
                    <FiPlus /> {t["Add a New Device"]}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto !mt-6 !px-3 !pb-10 scrollbar-hide demo-sidebar-font">
          <div className="!space-y-1">
            {menuItems.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isSubmenuOpen = openSubmenu === item.label;

              return (
                <div key={item.label}>
                  <div
                    className={`group ${hasSubItems ? "cursor-pointer" : ""}`}
                    onClick={() => handleMenuClick(item.label, hasSubItems)}
                  >
                    <div
                      className={`flex items-center justify-between !px-4 !py-3 !rounded-xl transition-all duration-200 !mb-1
                        ${
                          hasSubItems
                            ? "text-gray-400 hover:bg-[#1b254b] hover:text-white"
                            : isPathActive(item.to)
                            ? "bg-gradient-to-r from-[#00d4ff]/20 to-transparent text-white !border-l-4 !border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20"
                            : "text-gray-400 hover:bg-[#1b254b] hover:text-white"
                        }`}
                    >
                      <Link
                        to={item.to || "#"}
                        onClick={(e) => {
                          if (hasSubItems) e.preventDefault();
                        }}
                        className="flex items-center !gap-3 w-full"
                      >
                        <span className="!text-[14px]">{item.icon}</span>
                        <span className="!font-medium !text-[14px] flex items-center !gap-2">
                          {item.label}
                          {item.badge && (
                            <img
                              src={HotImage}
                              alt="hot"
                              className="!w-[25px]"
                            />
                          )}
                        </span>
                      </Link>
                      {hasSubItems && (
                        <FiChevronRight
                          className={`!text-sm !transition-transform duration-300 ${
                            isSubmenuOpen ? "!rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Animated Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isSubmenuOpen ? "!max-h-[100vh]" : "!max-h-0"
                    }`}
                  >
                    <div className="!ml-8 !mt-3 !space-y-1 !border-l !border-gray-800 !pl-4">
                      {item.subItems?.map((sub) => {
                        const isActive = isPathActive(sub.to);
                        return (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => isMobile && setIsOpen(false)}
                            className={`flex items-center !gap-3 !px-3 !py-2 !rounded-lg !text-sm transition-all
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-[#00d4ff]/20 to-transparent text-white !border-l-4 !border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20 !font-medium"
                                  : "text-gray-500 hover:text-white hover:bg-[#1b254b]/50"
                              }`}
                          >
                            {sub.icon || <div className="!w-4 !h-4" />}
                            <span className="!text-[13px]">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="!border-t !border-gray-800 !p-4 !mt-auto">
          <div className="text-center !text-xs text-gray-500 !space-y-1">
            <p className="!font-medium text-gray-400">
              {t["Easier Monitoring with"]}{" "}
              <span className="text-[#00d4ff] !font-semibold">
                {t["TrevorTech App"]}
              </span>
            </p>
            <div className="flex items-center justify-center !gap-2 text-gray-600">
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
          className="fixed !inset-0 bg-black/70 backdrop-blur-sm !z-40"
        />
      )}

      {/* Desktop Push */}
      {!isMobile && <div className="!w-72" />}
    </>
  );
};

export default DemoSidebar;
