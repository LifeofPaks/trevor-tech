import React, { useState } from "react";
import { GiImperialCrown } from "react-icons/gi";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiZap,
  FiFileText,
  FiKey,
} from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import { MdFolderDelete } from "react-icons/md";
import { RiBtcFill } from "react-icons/ri";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";

const Navbarr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eliteOpen, setEliteOpen] = useState(false); // for desktop dropdown
  const [mobileEliteOpen, setMobileEliteOpen] = useState(false); // for mobile dropdown

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleElite = () => setEliteOpen(!eliteOpen);
  const toggleMobileElite = () => setMobileEliteOpen(!mobileEliteOpen);

  const eliteLinks = [
    { to: "/credit-boost", label: "Credit Score Upgrade", icon: <FiZap /> },
    { to: "/stop-harassment", label: "Stop Blackmail", icon: <IoMdAlert /> },
    { to: "/grade-enhancement", label: "Improve Academic Grade", icon: <FiFileText /> },
    {
      to: "/clear-record",
      label: "Erase Criminal Record",
      icon: <MdFolderDelete />,
    },
    { to: "/crypto-recovery", label: "Crypto Recovery", icon: <RiBtcFill /> },
    { to: "/dmv-id", label: "DMV & ID Services", icon: <FiKey /> },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full lg:max-w-[1000px] !mx-auto bg-white/50 backdrop-blur-md shadow-lg lg:rounded-2xl !px-12 !py-4 lg:!mt-4">
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[14px] font-medium text-gray-800 relative">
          <li>
            <a href="#" className="hover:text-[#0695c8] transition">
              Home
            </a>
          </li>

          {/* Elite Services Dropdown */}
          <li
            className="relative cursor-pointer flex items-center gap-1 hover:text-[#0695c8] transition"
            onMouseEnter={() => setEliteOpen(true)}
            onMouseLeave={() => setEliteOpen(false)}
          >
            <span>Elite Services</span>
            <FiChevronDown
              className={`text-sm transition-transform duration-300 ${
                eliteOpen ? "rotate-180 text-[#0695c8]" : ""
              }`}
            />

            {/* Dropdown Menu */}
            {eliteOpen && (
              <ul className="absolute top-full left-0 text-gray-800  bg-white/95 backdrop-blur-md shadow-lg rounded-xl min-w-[250px] !py-3 transition-all duration-300 ease-in-out">
                {eliteLinks.map((item, i) => (
                  <li key={i} className="!cursor-pointer">
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 !px-5 !py-2.5 hover:bg-[#0695c810] hover:text-[#0695c8] transition rounded-lg"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a href="#about" className="hover:text-[#0695c8] transition">
              About
            </a>
          </li>

          <li>
            <a href="#testimonial" className="hover:text-[#0695c8] transition">
              Testimonial
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-[#0695c8] transition">
              FAQ
            </a>
          </li>
          <li>
            <Link
              to="/demo"
              className="hover:bg-[#097fa9] bg-[#0695c8] transition text-white !px-4 !py-3.5 rounded-md border hover:text-white"
            >
              View Demo
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-40`}
      >
        <div className="flex justify-between items-center !p-5 border-b border-gray-200">
          <Logo />
          <button onClick={toggleMenu} className="text-2xl text-gray-800">
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col gap-6 !p-6 text-gray-800 text-[15px] font-medium">
          <li>
            <a href="#" onClick={toggleMenu} className="hover:text-[#0695c8]">
              Home
            </a>
          </li>

          {/* Mobile Elite Dropdown */}
          <li>
            <button
              onClick={toggleMobileElite}
              className="w-full flex items-center justify-between hover:text-[#0695c8] transition"
            >
              <span>Elite Services</span>
              <FiChevronDown
                className={`text-sm transition-transform duration-300 ${
                  mobileEliteOpen ? "rotate-180 text-[#0695c8]" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileEliteOpen ? "max-h-[500px] !mt-3" : "max-h-0"
              }`}
            >
              <ul className="flex flex-col gap-3 !pl-4">
                {eliteLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      onClick={() => {
                        toggleMenu();
                        setMobileEliteOpen(false);
                      }}
                      className="flex items-center gap-3 !py-1.5 hover:text-[#0695c8] transition"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <a
              href="#about"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#testimonial"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              Testimonial
            </a>
          </li>
          <li>
            <a
              href="#faq"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              FAQ
            </a>
          </li>
          <li>
            <Link
              to="/demo"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              View Demo
            </Link>
          </li>
        </ul>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbarr;
