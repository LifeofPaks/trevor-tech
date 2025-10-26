import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiSettings,
  FiUser,
  FiHelpCircle,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../logo/Logo";

const DemoSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // sidebar hidden by default on mobile
  const location = useLocation();

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { to: "/demo/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/demo/profile", label: "Profile", icon: <FiUser /> },
    { to: "/demo/settings", label: "Settings", icon: <FiSettings /> },
    { to: "/demo/help", label: "Help", icon: <FiHelpCircle /> },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      {isMobile &&
        !isOpen && (
          <div className="fixed top-0 left-0 right-0 !flex !items-center !justify-between !px-4 !py-3 !bg-white !shadow-md !z-50">
            <Logo />
            <button
              onClick={toggleSidebar}
              className="text-gray-700 !text-2xl hover:!text-[#0695c8]"
            >
              <FiMenu />
            </button>
          </div>
        )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 !transition-transform !duration-300
        ${isMobile ? (isOpen ? "!translate-x-0" : "!-translate-x-full") : ""}
        !w-64 !pt-6`}
      >
        {/* Header inside sidebar */}
        <div className="flex items-center justify-between !px-4 !py-4 border-b border-gray-200">
          <Logo />
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-700 text-xl hover:!text-[#0695c8]"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="!mt-6 flex flex-col gap-2 !px-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setIsOpen(false)} // auto-close on mobile
              className={`flex items-center gap-3 !px-3 !py-2 rounded-lg !transition-colors
              ${
                location.pathname === link.to
                  ? "!bg-[#0695c8] !text-white"
                  : "!text-gray-700 hover:!bg-gray-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile */}
      {isMobile && isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 !bg-black/40 !backdrop-blur-sm !z-40"
        ></div>
      )}

      {/* Push main content on desktop */}
      {!isMobile && <div className="!ml-64" />}
    </>
  );
};

export default DemoSidebar;
