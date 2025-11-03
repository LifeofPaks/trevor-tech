import React from "react";
import { motion } from "framer-motion";
import CryptoImage from "../../assets/crypto-image.png";
import { IoCheckmarkDone } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const features = [
  {
    id: 1,
    title: "crypto.feature_crypto_recovery_title",
    desc: "crypto.feature_crypto_recovery_desc",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-900/30",
    glow: "shadow-cyan-500/50",
  },
  {
    id: 2,
    title: "crypto.feature_credit_boost_title",
    desc: "crypto.feature_credit_boost_desc",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-900/30",
    glow: "shadow-teal-500/50",
  },
  {
    id: 3,
    title: "crypto.feature_hidden_chats_title",
    desc: "crypto.feature_hidden_chats_desc",
    iconColor: "text-green-400",
    iconBg: "bg-green-900/30",
    glow: "shadow-green-500/50",
  },
  {
    id: 4,
    title: "crypto.feature_stop_blackmail_title",
    desc: "crypto.feature_stop_blackmail_desc",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-900/30",
    glow: "shadow-purple-500/50",
  },
  {
    id: 5,
    title: "crypto.feature_driving_records_title",
    desc: "crypto.feature_driving_records_desc",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-900/30",
    glow: "shadow-blue-500/50",
  },
];

const GallerySection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative !py-10 overflow-hidden">
      <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center !mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4">
            {t("crypto.header_title")}
          </h1>
          <p className="max-w-4xl !mx-auto text-[14px] sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            {t("crypto.header_description")}
          </p>
        </motion.div>

        {/* Image + Features */}
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-start !gap-12 !mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Left - Features List */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ul className="!space-y-6">
              {features.map(
                ({ id, title, desc, iconColor, iconBg, glow }, index) => (
                  <motion.li
                    key={id}
                    className="flex !gap-5 items-start group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {/* Checkmark Icon */}
                    <motion.div
                      className={`flex-shrink-0 w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IoCheckmarkDone
                        className={`${iconColor} drop-shadow-glow`}
                        size={26}
                      />
                    </motion.div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="lg:text-xl font-bold text-cyan-100 group-hover:text-cyan-50 transition !mb-2">
                        {t(title)}
                      </h3>
                      <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed">
                        {t(desc)}
                      </p>
                    </div>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            className="w-full lg:w-[500px] flex-shrink-0"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Glowing Cyan/Teal Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-green-500/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glass Image Container */}
              <div className="relative backdrop-blur-sm bg-white/5 border border-cyan-500/30 rounded-3xl p-2 shadow-2xl">
                <img
                  src={CryptoImage}
                  alt={t("crypto.image_alt")}
                  className="relative w-full lg:h-[500px] h-[400px] rounded-2xl object-cover shadow-inner"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-900/50 to-transparent opacity-40 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Glow Filter */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
