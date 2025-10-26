import React, { useState, useEffect, useContext } from "react";
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
import {
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { SiMessenger, SiLine } from "react-icons/si"; 

import { FaYoutube, FaTiktok } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import Logo from "../logo/Logo";
import DemoLogo from "../logo/DemoLogo";
import HotImage from "../../assets/hot-badge.png";    

// Language Context from Header
export const LanguageContext = React.createContext();

const translations = {
  en: {
    Logs: "Logs",
    "Screen Time": "Screen Time",
    Keylogs: "Keylogs",
    "Social Networks": "Social Networks",
    WhatsApp: "WhatsApp",
    Messenger: "Messenger",
    Instagram: "Instagram",
    Facebook: "Facebook",
    Snapchat: "Snapchat",
    LINE: "LINE",
    Telegram: "Telegram",
    "Social Apps": "Social Apps",
    "Record Surround": "Record Surround",
    "Take Photos": "Take Photos",
    "Record Screen": "Record Screen",
    Photos: "Photos",
    "Video Preview": "Video Preview",
    Keylogger: "Keylogger",
    "App Calls": "App Calls",
    "App Audio": "App Audio",
    "Video Apps": "Video Apps",
    YouTube: "YouTube",
    TikTok: "TikTok",
    ReelShort: "ReelShort",
    OnlyFans: "OnlyFans",
    "Phone Data": "Phone Data",
    Calls: "Calls",
    "Calls Recording": "Calls Recording",
    Messages: "Messages",
    "Browser History": "Browser History",
    "Track Keywords": "Track Keywords",
    "Wi-Fi Logger": "Wi-Fi Logger",
    "App Management": "App Management",
    Contacts: "Contacts",
    Calendar: "Calendar",
    "Remote Control": "Remote Control",
    "Capture Screenshots": "Capture Screenshots",
    "Live Screen": "Live Screen",
    "Record Video": "Record Video",
    "Location Tracking": "Location Tracking",
    Locations: "Locations",
    "Driving Tracking": "Driving Tracking",
    Geofence: "Geofence",
    "Dash Cams": "Dash Cams",
    "More Features": "More Features",
    Gmail: "Gmail",
    Outlook: "Outlook",
    "All Photos": "All Photos",
    "AI Tools": "AI Tools",
    "In-App Purchase": "In-App Purchase",
    "Export Data": "Export Data",
    "Permissions Check": "Permissions Check",
    "Select Device": "Select Device",
    "Add a New Device": "Add a New Device",
    "Easier Monitoring with": "Easier Monitoring with",
    "TrevorTech App": "TrevorTech App",
  },
  es: {
    Logs: "Registros",
    "Screen Time": "Tiempo en Pantalla",
    Keylogs: "Registros de Teclas",
    "Social Networks": "Redes Sociales",
    WhatsApp: "WhatsApp",
    Messenger: "Messenger",
    Instagram: "Instagram",
    Facebook: "Facebook",
    Snapchat: "Snapchat",
    LINE: "LINE",
    Telegram: "Telegram",
    "Social Apps": "Apps Sociales",
    "Record Surround": "Grabar Alrededor",
    "Take Photos": "Tomar Fotos",
    "Record Screen": "Grabar Pantalla",
    Photos: "Fotos",
    "Video Preview": "Vista Previa de Video",
    Keylogger: "Keylogger",
    "App Calls": "Llamadas de Apps",
    "App Audio": "Audio de Apps",
    "Video Apps": "Apps de Video",
    YouTube: "YouTube",
    TikTok: "TikTok",
    ReelShort: "ReelShort",
    OnlyFans: "OnlyFans",
    "Phone Data": "Datos del Teléfono",
    Calls: "Llamadas",
    "Calls Recording": "Grabación de Llamadas",
    Messages: "Mensajes",
    "Browser History": "Historial del Navegador",
    "Track Keywords": "Seguimiento de Palabras",
    "Wi-Fi Logger": "Registro de Wi-Fi",
    "App Management": "Gestión de Apps",
    Contacts: "Contactos",
    Calendar: "Calendario",
    "Remote Control": "Control Remoto",
    "Capture Screenshots": "Capturar Pantalla",
    "Live Screen": "Pantalla en Vivo",
    "Record Video": "Grabar Video",
    "Location Tracking": "Seguimiento de Ubicación",
    Locations: "Ubicaciones",
    "Driving Tracking": "Seguimiento de Conducción",
    Geofence: "Geocerca",
    "Dash Cams": "Cámaras de Tablero",
    "More Features": "Más Funciones",
    Gmail: "Gmail",
    Outlook: "Outlook",
    "All Photos": "Todas las Fotos",
    "AI Tools": "Herramientas de IA",
    "In-App Purchase": "Compra en la App",
    "Export Data": "Exportar Datos",
    "Permissions Check": "Verificación de Permisos",
    "Select Device": "Seleccionar Dispositivo",
    "Add a New Device": "Agregar Nuevo Dispositivo",
    "Easier Monitoring with": "Monitoreo más fácil con",
    "TrevorTech App": "App TrevorTech",
  },
  // Add more languages as needed
};

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

  // Get language from context
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
      label: t.Logs,
      icon: <FiMonitor />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/logs/screen-time",
          label: t["Screen Time"],
          icon: <FiMonitor />,
        },
        {
          to: "/demo/logs/keylogs",
          label: t.Keylogs,
          icon: <FiMessageSquare />,
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
          to: "/demo/social/messenger",
          label: t.Messenger,
          icon: <SiMessenger />,
        },
        {
          to: "/demo/social/instagram",
          label: t.Instagram,
          icon: <FaInstagram />,
        },
        {
          to: "/demo/social/facebook",
          label: t.Facebook,
          icon: <FaFacebookF />,
        },
        {
          to: "/demo/social/snapchat",
          label: t.Snapchat,
          icon: <FaSnapchatGhost />, // no official icon in react-icons
        },
        {
          to: "/demo/social/line",
          label: t.LINE,
          icon: <SiLine />,
        },
        {
          to: "/demo/social/telegram",
          label: t.Telegram,
          icon: <FaTelegramPlane />,
        },
      ],
    },
    {
      label: t["Social Apps"],
      icon: <FiHeadphones />,
      badge: "HOT",
      subItems: [
        {
          to: "/demo/social/record-audio",
          label: t["Record Surround"],
          icon: <FiMic />,
        },
        {
          to: "/demo/social/take-photos",
          label: t["Take Photos"],
          icon: <FiCamera />,
        },
        {
          to: "/demo/social/record-screen",
          label: t["Record Screen"],
          icon: <FiMonitor />,
        },
        { to: "/demo/social/logs", label: t.Logs, icon: <FiMonitor /> },
        { to: "/demo/social/photos", label: t.Photos, icon: <FiImage /> },
        {
          to: "/demo/social/video-preview",
          label: t["Video Preview"],
          icon: <FiVideo />,
        },
        {
          to: "/demo/social/keylogger",
          label: t.Keylogger,
          icon: <FiMessageSquare />,
        },
      ],
    },
    { label: t["App Calls"], icon: <FiPhone />, badge: "HOT", subItems: [] },
    { label: t["App Audio"], icon: <FiHeadphones />, subItems: [] },
    {
      label: t["Video Apps"],
      icon: <FiVideo />,
      subItems: [
        { to: "/demo/video/youtube", label: t.YouTube, icon: <FaYoutube /> },
        { to: "/demo/video/tiktok", label: t.TikTok, icon: <FaTiktok /> },
        {
          to: "/demo/video/reelshort",
          label: t.ReelShort,
          icon: <RiMovie2Line />,
        },
        { to: "/demo/video/onlyfans", label: t.OnlyFans, icon: <FiLock /> },
      ],
    },
    {
      label: t["Phone Data"],
      icon: <FiSmartphone />,
      subItems: [
        { to: "/demo/data/calls", label: t.Calls, icon: <FiPhone /> },
        {
          to: "/demo/data/call-recording",
          label: t["Calls Recording"],
          icon: <FiMic />,
        },
        {
          to: "/demo/data/messages",
          label: t.Messages,
          icon: <FiMessageCircle />,
        },
        { to: "/demo/data/photos", label: t.Photos, icon: <FiImage /> },
        {
          to: "/demo/data/browser",
          label: t["Browser History"],
          icon: <FiGlobe />,
        },
        {
          to: "/demo/data/keylogger",
          label: t.Keylogger,
          icon: <FiMessageSquare />,
        },
        {
          to: "/demo/data/track-keywords",
          label: t["Track Keywords"],
          icon: <FiGlobe />,
        },
        {
          to: "/demo/data/wifi-logger",
          label: t["Wi-Fi Logger"],
          icon: <FiWifi />,
        },
        {
          to: "/demo/data/app-management",
          label: t["App Management"],
          icon: <FiSettings />,
        },
        {
          to: "/demo/data/video-preview",
          label: t["Video Preview"],
          icon: <FiVideo />,
        },
        { to: "/demo/data/contacts", label: t.Contacts, icon: <FiUser /> },
        { to: "/demo/data/calendar", label: t.Calendar, icon: <FiCalendar /> },
      ],
    },
    {
      label: t["Remote Control"],
      icon: <FiMonitor />,
      subItems: [
        {
          to: "/demo/remote/record-surround",
          label: t["Record Surround"],
          icon: <FiMic />,
        },
        {
          to: "/demo/remote/capture-screenshots",
          label: t["Capture Screenshots"],
          icon: <FiCamera />,
        },
        {
          to: "/demo/remote/record-screen",
          label: t["Record Screen"],
          icon: <FiMonitor />,
        },
        {
          to: "/demo/remote/live-screen",
          label: t["Live Screen"],
          icon: <FiEye />,
        },
        {
          to: "/demo/remote/take-photos",
          label: t["Take Photos"],
          icon: <FiCamera />,
        },
        {
          to: "/demo/remote/record-video",
          label: t["Record Video"],
          icon: <RiMovie2Line />,
        },
      ],
    },
    {
      label: t["Location Tracking"],
      icon: <FiMapPin />,
      subItems: [
        { to: "/demo/location/current", label: t.Locations, icon: <FiMap /> },
        {
          to: "/demo/location/driving",
          label: t["Driving Tracking"],
          icon: <FiTruck />,
        },
        {
          to: "/demo/location/geofence",
          label: t.Geofence,
          icon: <FiShield />,
        },
        {
          to: "/demo/location/dash-cams",
          label: t["Dash Cams"],
          icon: <FiTruck />,
        },
      ],
    },
    {
      label: t["More Features"],
      icon: <FiMoreHorizontal />,
      subItems: [
        { to: "/demo/more/gmail", label: t.Gmail, icon: <FiMail /> },
        { to: "/demo/more/outlook", label: t.Outlook, icon: <FiMail /> },
        {
          to: "/demo/more/all-photos",
          label: t["All Photos"],
          icon: <FiImage />,
        },
        { to: "/demo/more/ai-tools", label: t["AI Tools"], icon: <FiZap /> },
        {
          to: "/demo/more/in-app-purchase",
          label: t["In-App Purchase"],
          icon: <FiShoppingCart />,
        },
        {
          to: "/demo/more/export-data",
          label: t["Export Data"],
          icon: <FiDownload />,
        },
        {
          to: "/demo/more/permissions-check",
          label: t["Permissions Check"],
          icon: <FiCheckSquare />,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      {isMobile && !isOpen && (
        <div className="fixed top-6 right-2 right-6 flex items-center justify-between z-50">
          <button onClick={toggleSidebar} className="text-2xl ">
            <FiMenu className="text-gray-800" />
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

        {/* Device Selector */}
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

          {/* Device Modal */}
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
                    {t["Select Device"]}
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
                    <FiPlus /> {t["Add a New Device"]}
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
                        <span className="font-medium text-[12px] flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <img
                              src={HotImage}
                              alt="hot image"
                              className="w-[25px]"
                            />
                          )}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
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
                          <span className="text-[12px]">

                          {sub.label}
                          </span>
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
              {t["Easier Monitoring with"]}{" "}
              <span className="text-[#00d4ff] font-semibold">
                {t["TrevorTech App"]}
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

      {/* Desktop Push */}
      {!isMobile && <div className="w-72" />}
    </>
  );
};

export default DemoSidebar;
