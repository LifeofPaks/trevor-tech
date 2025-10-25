import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcDiscover,
  FaCcAmex,
  FaBitcoin,
} from "react-icons/fa";
import Logo from "../logo/Logo";

const Footer = () => {
  const services = [
    "Crypto Recovery",
    "Phone Spy & Monitoring",
    "GPS Location Tracking",
    "Credit Score Boost",
    "Grade & Record Alteration",
    "Blackmail Removal",
    "Email & Account Recovery",
    "Device Cloning",
  ];

  const resources = [
    "How It Works",
    "Success Stories",
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
    "EULA",
  ];

  const support = [
    "Contact Us",
    "Live Chat",
    "Support Center",
    "My Account",
    "FAQs",
  ];

  return (
    <footer className="bg-gray-50 ">
      <div className="max-w-7xl !mx-auto !px-6 !py-12 lg:!py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & CTA */}
          <div className="!space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 !mt-6">
              Your trusted partner in digital recovery, surveillance, and
              privacy protection.
            </p>
            <button className="bg-[#0BA6DF] hover:!bg-[#0695c8] text-white font-medium !px-5 !py-2 rounded-full text-sm transition-colors">
              Get Started
            </button>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 !mb-4">Our Services</h4>
            <ul className="!space-y-2">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-[#0695c8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 !mb-4">Resources</h4>
            <ul className="!space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-[#0695c8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h4 className="font-semibold text-gray-900 !mb-4">Support</h4>
            <ul className="!space-y-2 !mb-6">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-[#0695c8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-sm font-medium text-gray-900 !mb-3">
                Follow Us
              </p>
              <div className="flex !space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#0695c8] hover:text-white transition-all"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-all"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="!my-8 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          {/* Payment Icons */}
          <div className="flex items-center !space-x-3 order-2 lg:order-1">
            <FaCcPaypal className="text-xl text-blue-600" />
            <FaCcVisa className="text-xl" />
            <FaCcMastercard className="text-xl text-red-600" />
            <FaCcDiscover className="text-xl text-orange-600" />
            <FaCcAmex className="text-xl text-blue-800" />
            <FaBitcoin className="text-xl text-yellow-500" />
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-3 order-1 lg:order-2 text-center">
            <a href="#" className="hover:text-blue-600">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">
              Cookie Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">
              Terms & Conditions
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="!mt-8 text-xs text-gray-500 text-center max-w-5xl !mx-auto leading-relaxed">
          <p className="font-medium mb-1">LEGAL DISCLAIMER</p>
          <p>
            All services are intended for{" "}
            <strong>ethical and legal use only</strong>. Installing monitoring
            software on a device you do not own or have proper authorization to
            monitor may violate local, state, or federal laws. You take full
            responsibility for determining that you have the right to monitor
            the device. We shall not be responsible for any misuse.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} <span className="font-bold">TrevorTech</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
