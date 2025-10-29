import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaBitcoin,
} from "react-icons/fa";
import Logo from "../logo/Logo";
import BuyModal from "../buyModal/BuyModal";
import Image1 from "../../assets/visa.svg";
import Image2 from "../../assets/mastercard.svg";
import Image3 from "../../assets/paypal.svg";
import Image4 from "../../assets/discover.svg";
import Image5 from "../../assets/direct.svg";
import Image7 from "../../assets/giro.svg";
import DemoLogo from "../logo/DemoLogo";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const resources = ["How It Works", "Success Stories"];

  const support = ["Contact Us", "Support Center", "FAQs"];

  return (
    <>
      <footer className="relative bg-gradient-to-t from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-teal-900/20 pointer-events-none"></div>

        <div className="max-w-7xl !mx-auto !px-6 !py-16 lg:!py-20 relative z-10">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 !gap-12 lg:!gap-16">
            {/* Brand & CTA */}
            <motion.div
              className="!space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <DemoLogo />
              <p className="text-sm text-cyan-300/80 leading-relaxed !mt-6">
                Your trusted partner in digital recovery, surveillance, and
                privacy protection.
              </p>
              <button
                onClick={handleOpen}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold !px-6 !py-3 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-500/30"
              >
                Get Started
              </button>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-cyan-100 !mb-5 text-lg">
                Our Services
              </h4>
              <ul className="!space-y-3">
                {services.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#services"
                      className="text-sm text-cyan-300 hover:text-cyan-100 transition-colors duration-200 flex items-center group"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-cyan-100 !mb-5 text-lg">
                Resources
              </h4>
              <ul className="!space-y-3">
                {resources.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#about"
                      className="text-sm text-cyan-300 hover:text-cyan-100 transition-colors duration-200 flex items-center group"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-cyan-100 !mb-5 text-lg">Support</h4>
              <ul className="!space-y-3 !mb-8">
                {support.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#about"
                      className="text-sm text-cyan-300 hover:text-cyan-100 transition-colors duration-200 flex items-center group"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Social Icons */}
              <div>
                <p className="text-sm font-bold text-cyan-100 !mb-4">
                  Follow Us
                </p>
                <div className="flex !space-x-4">
                  {[
                    { Icon: FaFacebookF, color: "hover:bg-cyan-500" },
                    { Icon: FaTwitter, color: "hover:bg-blue-500" },
                    { Icon: FaYoutube, color: "hover:bg-red-600" },
                    {
                      Icon: FaInstagram,
                      color:
                        "hover:bg-gradient-to-r from-purple-500 to-pink-500",
                    },
                  ].map(({ Icon, color }, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-300 hover:text-white transition-all duration-300 group ${color}`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      // transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <Icon size={16} className="drop-shadow-glow" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.hr
            className="!my-12 border-cyan-500/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center !gap-6 text-xs text-cyan-300/70">
            {/* Payment Icons */}
            <motion.div
              className="flex items-center !space-x-4 order-2 lg:order-1 flex-wrap justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[Image1, Image2, Image3, Image4, Image5, Image7].map(
                (img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt="payment"
                    className="w-14 h-auto opacity-70 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.7, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    viewport={{ once: true }}
                  />
                )
              )}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-yellow-400"
              >
                <FaBitcoin size={28} className="drop-shadow-glow" />
              </motion.div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex flex-wrap justify-center !gap-3 order-1 lg:order-2 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {["Privacy Policy", "Cookie Policy", "Terms & Conditions"].map(
                (text, i) => (
                  <React.Fragment key={text}>
                    {i > 0 && <span className="text-cyan-500">•</span>}
                    <a
                      href="#"
                      className="hover:text-cyan-100 transition-colors"
                    >
                      {text}
                    </a>
                  </React.Fragment>
                )
              )}
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            className="!mt-10 text-xs text-cyan-300/60 text-center max-w-5xl !mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-bold text-cyan-200 !mb-1">LEGAL DISCLAIMER</p>
            <p>
              All services are intended for{" "}
              <strong>ethical and legal use only</strong>. Installing monitoring
              software on a device you do not own or have proper authorization
              to monitor may violate local, state, or federal laws. You take
              full responsibility for determining that you have the right to
              monitor the device. We shall not be responsible for any misuse.
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="!mt-8 text-center text-xs text-cyan-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-cyan-300">TrevorTech</span>. All
            rights reserved.
          </motion.div>
        </div>
      </footer>

      <BuyModal handleClose={handleClose} open={open} />

      {/* Glow Filter */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
      `}</style>
    </>
  );
};

export default Footer;
