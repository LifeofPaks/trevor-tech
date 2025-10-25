import React, { useState } from "react";
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
    <div className="max-w-3xl !mx-auto !mt-20 !pb-20 !px-3" id="faq">
      <div className="text-center !mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-700 !mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Got questions? We’ve got answers.
          <span className="hidden sm:inline">
            {" "}
            Here’s everything you need to know about our discreet, powerful, and
            100% effective services.
          </span>
        </p>
      </div>
      <div className="!space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md border border-amber-100 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left !px-5 !py-4 font-semibold text-gray-800 hover:text-amber-800"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-amber-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "max-h-40 opacity-100 !px-5 !pb-4"
                  : "max-h-0 opacity-0 !px-5 !pb-0"
              } overflow-hidden`}
            >
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
