import React from "react";
import {
  IoCheckmarkCircle,
  IoShieldCheckmark,
  IoLockClosed,
  IoHeadset,
} from "react-icons/io5";

const About = () => {
  const services = [
    {
      title: "Recover Stolen & Scammed Crypto",
      desc: "Recover lost Bitcoin, Ethereum, USDT, and more from fake platforms, phishing, or stolen wallets. Full blockchain tracing and scammer identification.",
    },
    {
      title: "Full Phone & Device Access",
      desc: "Remote spy/hack any Android, iPhone, tablet, or computer. View messages, calls, GPS, photos, apps, and keystrokes — no physical access needed.",
    },
    {
      title: "Real-Time Location Tracking",
      desc: "Track live GPS with street-level accuracy. Set geofence alerts and view full movement history with timestamps.",
    },
    {
      title: "Credit Score Boost & Card Loading",
      desc: "Instantly improve credit scores (Equifax, TransUnion, Experian). Load debit/prepaid cards and access full financial logs.",
    },
    {
      title: "Erase Records & Alter Grades",
      desc: "Permanently delete criminal records, change university grades, GPAs, and issue new driver licenses/ID cards in official systems.",
    },
    {
      title: "Stop Blackmail & Secure Privacy",
      desc: "Identify blackmailers, delete compromising material from devices/cloud, and block future threats — full digital protection.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <IoLockClosed size={20} />,
      text: "100% Discreet – No logs, no traces, no third-party access",
    },
    {
      icon: <IoShieldCheckmark size={20} />,
      text: "No Physical Access Needed – Remote setup & execution",
    },
    {
      icon: <IoCheckmarkCircle size={20} />,
      text: "Proven Results – Thousands of successful cases worldwide",
    },
    {
      icon: <IoHeadset size={20} />,
      text: "24/7 Support – Live chat, email, phone in multiple languages",
    },
    {
      icon: <IoCheckmarkCircle size={20} />,
      text: "Money-Back Guarantee – Pay only if we deliver",
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-amber-50 via-white to-gray-50 !py-20 lg:!py-28 relative overflow-hidden"
    >
      {/* Floating background accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
        {/* Header */}
        <div className="text-center !mb-20">
          <h1 className="text-2xl sm:text-3xl font-extrabold  text-gray-700">
            Your Trusted Digital Recovery & Surveillance Experts
          </h1>
          <p className="!mt-6 max-w-3xl !mx-auto text-base sm:text-lg text-gray-700 leading-relaxed">
            We are a{" "}
            <span className="font-semibold text-gray-900">
              professional, discreet team
            </span>{" "}
            specializing in ethical digital access, recovery, and protection
            services. With over a decade of experience in cybersecurity,
            blockchain forensics, and remote monitoring, we help you regain
            control — whether it's recovering stolen cryptocurrency, securing
            hacked accounts, or protecting loved ones.
          </p>
        </div>

        {/* What We Do */}
        <div className="!mb-18">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 !mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md !p-6 rounded-xl border border-amber-100 hover:border-amber-400 hover:shadow-amber-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl !mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 !mb-8">
            Why Choose Us?
          </h2>
          <ul className="!space-y-4 text-left sm:text-center">
            {whyChooseUs.map((item, index) => (
              <li
                key={index}
                className="flex sm:justify-center items-center gap-3 bg-white/60 backdrop-blur-md rounded-lg !px-4 !py-3 border border-gray-100 hover:bg-amber-50 transition-all"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-green-600">
                  {item.icon}
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Quote */}
          <div className="!mt-10 !p-6 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm border border-amber-200">
            <p className="text-lg font-semibold text-amber-800 italic text-center">
              “We don’t just recover data — we recover trust.”
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="!mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 !mb-3">
            Ready to Take Back Control?
          </h2>
          <p className="text-lg text-gray-600 !mb-8">
            Our experts are standing by 24/7 to help you recover and secure your
            digital world.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold !px-8 !py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Us Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
