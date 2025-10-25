import React, { useState } from "react";
import { GiImperialCrown } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../logo/Logo";

const DemoNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full lg:max-w-[1000px] !mx-auto bg-white/50 backdrop-blur-md shadow-lg lg:rounded-2xl !px-12 !py-4 lg:!mt-4">
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[14px] font-medium text-gray-800">
          <li>
            <a href="#" className="hover:text-[#0695c8] transition">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#0695c8] transition">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-[#0695c8] transition">
              Services
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
            <a href="/demo" className="hover:text-[#0695c8] transition">
              View Demo
            </a>
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

      {/* Mobile Side Menu (now slides in from the LEFT) */}
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
              href="#services"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              Services
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
            <a
              href="/demo"
              onClick={toggleMenu}
              className="hover:text-[#0695c8]"
            >
              View Demo
            </a>
          </li>
        </ul>
      </div>

      {/* Background Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default DemoNavbar;
