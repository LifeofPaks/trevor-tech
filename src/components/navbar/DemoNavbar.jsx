import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { to: "/demo/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/demo/profile", label: "Profile", icon: <FiUser /> },
    { to: "/demo/settings", label: "Settings", icon: <FiSettings /> },
    { to: "/demo/help", label: "Help", icon: <FiHelpCircle /> },
  ];

  return (
    <>
      {/* Sidebar (Desktop + Collapsible) */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between !px-4 !py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Logo />
         
          </div>
     
        </div>

        {/* Navigation Links */}
        <nav className="!mt-6 flex flex-col gap-2 !px-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 !px-3 !py-2 rounded-lg transition-colors
              ${
                location.pathname === link.to
                  ? "bg-[#0695c8] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {isOpen && (
                <span className="text-sm font-medium">{link.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

   
    </>
  );
};

export default DemoSidebar;
