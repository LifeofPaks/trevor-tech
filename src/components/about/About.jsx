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

        <div className="!mb-18">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 !mb-12">
            What We Do
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              // Assign a unique color theme per card
              const colorThemes = [
                {
                  bg: "bg-blue-100",
                  text: "text-blue-600",
                  hoverBg: "group-hover:bg-blue-600",
                  hoverText: "group-hover:text-white",
                },
                {
                  bg: "bg-green-100",
                  text: "text-green-600",
                  hoverBg: "group-hover:bg-green-600",
                  hoverText: "group-hover:text-white",
                },
                {
                  bg: "bg-amber-100",
                  text: "text-amber-600",
                  hoverBg: "group-hover:bg-amber-600",
                  hoverText: "group-hover:text-white",
                },
                {
                  bg: "bg-purple-100",
                  text: "text-purple-600",
                  hoverBg: "group-hover:bg-purple-600",
                  hoverText: "group-hover:text-white",
                },
                {
                  bg: "bg-rose-100",
                  text: "text-rose-600",
                  hoverBg: "group-hover:bg-rose-600",
                  hoverText: "group-hover:text-white",
                },
                {
                  bg: "bg-teal-100",
                  text: "text-teal-600",
                  hoverBg: "group-hover:bg-teal-600",
                  hoverText: "group-hover:text-white",
                },
              ];

              const theme = colorThemes[index % colorThemes.length];
              const icons = [
                <IoShieldCheckmark size={24} />,
                <IoLockClosed size={24} />,
                <IoCheckmarkCircle size={24} />,
                <IoHeadset size={24} />,
                <IoShieldCheckmark size={24} />,
                <IoCheckmarkCircle size={24} />,
              ];

              return (
                <div
                  key={index}
                  className="group bg-white/70 backdrop-blur-md !p-6 rounded-2xl border border-amber-100 hover:border-amber-400 hover:shadow-amber-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${theme.bg} ${theme.text} ${theme.hoverBg} ${theme.hoverText}`}
                  >
                    {icons[index]}
                  </div>

                  {/* Text content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Why Choose Us */}
        <div className="max-w-4xl !mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 !mb-10">
            Why Choose Us?
          </h2>

          <ul className="grid sm:grid-cols-2 gap-4 text-left">
            {whyChooseUs.map((item, index) => {
              // Different icon colors for better visual rhythm
              const colors = [
                "bg-green-100 text-green-600",
                "bg-blue-100 text-blue-600",
                "bg-amber-100 text-amber-600",
                "bg-purple-100 text-purple-600",
                "bg-rose-100 text-rose-600",
              ];
              const color = colors[index % colors.length];

              return (
                <li
                  key={index}
                  className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 !p-4 min-h-[80px]"
                >
                  {/* Icon Circle */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${color} transition-all duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-snug">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Quote */}
          <div className="!mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100/80 to-amber-50/80 shadow-md border border-amber-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,100,0.25),transparent_60%)]" />
            <p className="relative text-lg sm:text-xl font-semibold text-amber-800 italic text-center !py-6 !px-4">
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
            className="inline-flex items-center gap-2 bg-[#0BA6DF] hover:!bg-[#0695c8] text-white !px-8 !py-3 rounded-full  font-medium transition-all duration-300 shadow-md hover:shadow-lg"
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
