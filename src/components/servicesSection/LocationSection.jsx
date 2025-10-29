import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLocationDot, FaClock, FaWifi, FaGear } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import LocationImage from "../../assets/location-image.png";
import BuyModal from "../buyModal/BuyModal";

const features = [
  {
    icon: <FaLocationDot className="text-cyan-400" size={22} />,
    title: "Track GPS Location",
    iconBg: "bg-cyan-900/30",
    glow: "shadow-cyan-500/50",
  },
  {
    icon: <FaClock className="text-teal-400" size={22} />,
    title: "View Location History",
    iconBg: "bg-teal-900/30",
    glow: "shadow-teal-500/50",
  },
  {
    icon: <FaWifi className="text-green-400" size={22} />,
    title: "Wi-Fi Location Tracking",
    iconBg: "bg-green-900/30",
    glow: "shadow-green-500/50",
  },
  {
    icon: <FaGear className="text-purple-400" size={22} />,
    title: "Set Up Geofence Alerts",
    iconBg: "bg-purple-900/30",
    glow: "shadow-purple-500/50",
  },
];

const LocationSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className="relative !py-10  overflow-hidden">
        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center !max-w-4xl !mx-auto !mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4">
              Live GPS Tracking
            </h2>
            <p className="text-[14px] sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
              Track real-time location of any device with{" "}
              <span className="text-cyan-300 font-semibold">
                street-level accuracy
              </span>{" "}
              using GPS, Wi-Fi, and cell towers. View live movement on a map,
              get geofence alerts, and export complete route history with
              timestamps and speed data.
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex flex-col-reverse lg:flex-row items-center !gap-12 !mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Left - Features + CTA */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                {/* Glowing Cyan/Teal Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-green-500/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glass Image Container */}
                <div className="relative backdrop-blur-sm bg-white/5 border border-cyan-500/30 rounded-3xl !p-2 shadow-2xl">
                  <img
                    src={LocationImage}
                    alt="Live GPS tracking dashboard"
                    className="relative w-full max-w-lg !mx-auto rounded-2xl object-cover shadow-inner"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-900/50 to-transparent opacity-40 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Subheader */}
              <div className="text-center lg:text-left !mb-10">
                <h3 className="text-xl font-bold text-cyan-100 !mb-2">
                  Start Tracking Instantly
                </h3>
                <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed">
                  Experience how our GPS system keeps you connected to your
                  devices in real time. Click{" "}
                  <span className="font-semibold text-cyan-200">
                    “Try It Now”
                  </span>{" "}
                  to activate live tracking instantly or{" "}
                  <span className="font-semibold text-cyan-200">
                    “View Demo”
                  </span>{" "}
                  to explore how location updates and alerts appear within the
                  dashboard interface.
                </p>
              </div>

              {/* Features Grid */}
              <ul className="grid grid-cols-1 md:grid-cols-2 !gap-6">
                {features.map(({ icon, title, iconBg, glow }, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center !gap-4 group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`flex-shrink-0 w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="drop-shadow-glow">{icon}</div>
                    </motion.div>
                    <p className="text-base font-semibold text-cyan-100 group-hover:text-cyan-50 transition">
                      {title}
                    </p>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col lg:flex-row items-center !gap-4 !mt-10 justify-center lg:justify-start">
                <button
                  onClick={handleOpen}
                  className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-semibold !px-10 !py-4 rounded-xl shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-cyan-400/50"
                  whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try It Now
                </button>
                <Link to="/demo" className="w-full lg:w-auto">
                  <button className="flex items-center justify-center !gap-2 w-full lg:w-auto min-w-[160px] border !border-cyan-500/50 hover:bg-cyan-900/20 text-cyan-300 backdrop-blur-sm !px-8 !py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:text-cyan-100">
                    View Demo <HiArrowLongRight className="text-lg" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Buy Modal */}
        <BuyModal handleClose={handleClose} open={open} />

        {/* Glow Filter */}
        <style jsx>{`
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px currentColor)
              drop-shadow(0 0 16px currentColor);
          }
        `}</style>
      </section>
    </>
  );
};

export default LocationSection;
