import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqs = [
  {
    question: "fq.faq_1_question",
    answer: "fq.faq_1_answer",
  },
  {
    question: "fq.faq_2_question",
    answer: "fq.faq_2_answer",
  },
  {
    question: "fq.faq_3_question",
    answer: "fq.faq_3_answer",
  },
  {
    question: "fq.faq_4_question",
    answer: "fq.faq_4_answer",
  },
];

const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative !pt-10 overflow-hidden" id="faq">
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
            {t("fq.header_title")}
          </h2>
          <p className="max-w-3xl !mx-auto text-[14px] sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            {t("fq.header_description")}
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
                <span className="text-[14px] sm:text-lg pr-4">
                  {t(faq.question)}
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
                        {t(faq.answer)}
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
