import React from "react";
import { motion } from "framer-motion";
import CryptoImage from "../../assets/crypto-image.png";
import { IoCheckmarkDone } from "react-icons/io5";

const features = [
  {
    id: 1,
    title: "Recover Stolen & Scammed Crypto",
    desc: "Recover lost, stolen, or scammed cryptocurrency from wallets (Bitcoin, Ethereum, USDT, etc.). Trace blockchain transactions and identify scammer wallets. Success rate tracking included.",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-900/30",
    glow: "shadow-cyan-500/50",
  },
  {
    id: 2,
    title: "Boost Credit & Load Cards",
    desc: "Boost credit scores (Equifax, TransUnion, Experian) by addressing negative items. Load debit/prepaid cards and access full credit reports and transaction histories.",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-900/30",
    glow: "shadow-teal-500/50",
  },
  {
    id: 3,
    title: "Hidden Chats & Private Data",
    desc: "Access hidden chats, deleted stories, direct messages, and private albums across major platforms — see conversation history and shared media.",
    iconColor: "text-green-400",
    iconBg: "bg-green-900/30",
    glow: "shadow-green-500/50",
  },
  {
    id: 4,
    title: "Stop Blackmail & Remove Compromising Material",
    desc: "Identify blackmailers, remove compromising material from devices/cloud, block future contact, and erase traces online for full protection and peace of mind.",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-900/30",
    glow: "shadow-purple-500/50",
  },
  {
    id: 5,
    title: "Driving Records & ID Services",
    desc: "Pull driving records and access registration details. (Note: follow local laws and use only legal services.)",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-900/30",
    glow: "shadow-blue-500/50",
  },
];

const GallerySection = () => {
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
          <h1 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4">
            Financial & Crypto Recovery Solutions
          </h1>
          <p className="max-w-4xl !mx-auto text-lg sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            Take back control of{" "}
            <span className="text-cyan-300 font-semibold">
              money, credit, and digital assets
            </span>
            . Recover scammed crypto, boost credit scores, load debit cards, and
            stop financial blackmail. Full transparency into bank logs,
            transactions, and hidden accounts.
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
                      <h3 className="text-xl font-bold text-cyan-100 group-hover:text-cyan-50 transition !mb-2">
                        {title}
                      </h3>
                      <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed">
                        {desc}
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
                  alt="Crypto recovery dashboard"
                  className="relative w-full h-[500px] rounded-2xl object-cover shadow-inner"
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
