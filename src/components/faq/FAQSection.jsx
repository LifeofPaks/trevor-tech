import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does data recovery take?",
      answer:
        "Data recovery typically takes between 24 to 72 hours, depending on the extent of damage and data volume.",
    },
    {
      question: "Is my data kept confidential?",
      answer:
        "Absolutely. We follow strict confidentiality policies and ensure your data is secure and private at all times.",
    },
    {
      question: "Do you offer emergency recovery services?",
      answer:
        "Yes, we provide emergency recovery services for critical data loss situations with same-day analysis.",
    },
    {
      question: "What types of devices do you recover data from?",
      answer:
        "We recover data from laptops, desktops, SSDs, HDDs, RAID systems, and mobile devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative !py-20 overflow-hidden" id="faq">
      {/* Background Glow Orb */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse"></div>

      <div className="max-w-4xl !mx-auto !px-6 lg:!px-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center !mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[1.6rem] md:text-4xl lg:text-[2.6rem] max-w-[700px] !mx-auto font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl !mx-auto text-lg sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            Got questions? We’ve got answers.{" "}
            <span className="hidden sm:inline">
              Here’s everything you need to know about our discreet, powerful,
              and 100% effective services.
            </span>
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="!space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left !px-6 !py-5 font-bold text-cyan-100 hover:text-cyan-50 transition-all duration-300 group"
              >
                <span className="text-base sm:text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown
                    className={`w-6 h-6 text-cyan-400 group-hover:text-cyan-300 drop-shadow-glow transition-colors`}
                  />
                </motion.div>
              </button>

              {/* Answer - Smooth Height Animation */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="!px-6 !pb-6 !pt-2">
                      <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
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

export default FAQSection;
