import React from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBrowserSafari } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import PhoneSectionImage from "../../assets/phone-section-image.webp";

const PhoneSection = () => {
  const features = [
    {
      id: 1,
      Icon: IoChatbubbleEllipses,
      iconBg: "bg-green-900/30",
      iconColor: "text-green-400",
      glow: "shadow-green-500/50",
      title: "Read Messages & Social Chats",
      desc: `Hack/spy WhatsApp, Facebook, Instagram, Snapchat, Telegram, iMessage, and any messaging app — view full conversations, timestamps, contact names, media files, voice notes, and attachments. Export chat threads as PDF or screenshots.`,
    },
    {
      id: 2,
      Icon: FaPhone,
      iconBg: "bg-orange-900/30",
      iconColor: "text-orange-400",
      glow: "shadow-orange-500/50",
      title: "Check Call History",
      desc: `Monitor incoming, outgoing, and missed calls with details: numbers, contact names, exact dates/times, durations and call type (voice, video, VoIP). Get alerts for specific contacts.`,
    },
    {
      id: 3,
      Icon: BsBrowserSafari,
      iconBg: "bg-blue-900/30",
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/50",
      title: "Track Browser History",
      desc: `View every website visited on Chrome, Safari, Firefox, or any browser (full URL, title, visit time, duration, frequency). Capture incognito/private mode history and export searchable reports.`,
    },
    {
      id: 4,
      Icon: MdEmail,
      iconBg: "bg-purple-900/30",
      iconColor: "text-purple-400",
      glow: "shadow-purple-500/50",
      title: "Recover Hacked Email & Social Accounts",
      desc: `Regain control of compromised Gmail, Outlook, Yahoo, Instagram, Facebook, Twitter — change passwords, remove attackers, recover deleted emails/posts, and secure the account permanently.`,
    },
  ];

  return (
    <section className="relative !py-20 lg:!py-28 overflow-hidden">

      <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center !mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-green-300 to-teal-300 bg-clip-text text-transparent !mb-4">
            Phone & Social Media Surveillance
          </h1>
          <p className="max-w-4xl !mx-auto text-lg sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            Complete remote access to any device and private conversations. See
            every text, call, photo, video, deleted message, and app activity in
            real time — even if the user hides or erases it. Works on{" "}
            <span className="text-cyan-300 font-semibold">
              iPhone, Android, tablets, and computers
            </span>
            . No physical access needed after setup. Export full logs with
            timestamps, media, and metadata for proof.
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
                alt="Phone surveillance dashboard"
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
                  className="flex !gap-5 items-start group"
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
                    <h3 className="text-xl font-bold text-cyan-100 group-hover:text-cyan-50 transition !mb-2">
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
