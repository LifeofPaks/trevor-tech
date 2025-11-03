import React from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBrowserSafari } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import PhoneSectionImage from "../../assets/phone-section-image.webp";
import { useTranslation } from "react-i18next";

const PhoneSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 1,
      Icon: IoChatbubbleEllipses,
      iconBg: "bg-green-900/30",
      iconColor: "text-green-400",
      glow: "shadow-green-500/50",
      title: t("phone_section.feature_messages_title"),
      desc: t("phone_section.feature_messages_desc"),
    },
    {
      id: 2,
      Icon: FaPhone,
      iconBg: "bg-orange-900/30",
      iconColor: "text-orange-400",
      glow: "shadow-orange-500/50",
      title: t("phone_section.feature_calls_title"),
      desc: t("phone_section.feature_calls_desc"),
    },
    {
      id: 3,
      Icon: BsBrowserSafari,
      iconBg: "bg-blue-900/30",
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/50",
      title: t("phone_section.feature_browser_title"),
      desc: t("phone_section.feature_browser_desc"),
    },
    {
      id: 4,
      Icon: MdEmail,
      iconBg: "bg-purple-900/30",
      iconColor: "text-purple-400",
      glow: "shadow-purple-500/50",
      title: t("phone_section.feature_accounts_title"),
      desc: t("phone_section.feature_accounts_desc"),
    },
  ];

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
          <h1 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-green-300 to-teal-300 bg-clip-text text-transparent !mb-4">
            {t("phone_section.header_title")}
          </h1>
          <p className="max-w-4xl !mx-auto text-[14px] sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            {t("phone_section.header_description")}
          </p>
        </motion.div>

        {/* Image + Features */}
        <motion.div
          className="flex flex-col lg:flex-row items-center !gap-12 !mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Phone Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-green-500/20 to-teal-500/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={PhoneSectionImage}
                alt={t("phone_section.image_alt")}
                className="relative w-full max-w-[500px] rounded-2xl object-cover shadow-2xl border border-cyan-500/30 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Features List */}
          <div className="flex-1 space-y-6">
            {features.map(
              ({ id, Icon, iconBg, iconColor, glow, title, desc }, index) => (
                <motion.div
                  key={id}
                  className="flex !gap-5 items-start group *:!mb-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Icon Container */}
                  <motion.div
                    className={`flex-shrink-0 w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon
                      className={`${iconColor} drop-shadow-glow`}
                      size={26}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="lg:text-xl font-bold text-cyan-100 group-hover:text-cyan-50 transition !mb-2">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom Glow */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
      `}</style>
    </section>
  );
};

export default PhoneSection;
