import React, { useState } from "react";
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoHeadset,
  IoMap,
  IoCash,
  IoSchool,
  IoAlertCircle,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import BuyModal from "../buyModal/BuyModal";
import DemoModal from "../demoModal/DemoModal";
import { FaFileCircleXmark, FaSchoolLock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { FaBtc } from "react-icons/fa";
import { RiBtcFill } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";

const About = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openDemoModal, setOpenDemoModal] = useState(false);

  // Buy Modal Controls
  const handleOpenBuyModal = () => setOpenBuyModal(true);
  const handleCloseBuyModal = () => setOpenBuyModal(false);

  // Demo Modal Controls
  const handleOpenDemoModal = () => setOpenDemoModal(true);
  const handleCloseDemoModal = () => setOpenDemoModal(false);

  const services = [
    {
      title: "Spy or hack any device remotely",
      desc: "Remote spy/hack any Android, iPhone, tablet, or computer. View messages, calls, GPS, photos, apps, and keystrokes — no physical access needed.",
      icon: <IoLockClosed size={24} />,
      color: "text-green-600 bg-green-100",
      modal: true, // triggers Demo Modal
    },
    {
      title: "Recover Stolen & Scammed Crypto",
      desc: "Recover lost Bitcoin, Ethereum, USDT, and more from fake platforms, phishing, or stolen wallets. Full blockchain tracing and scammer identification.",
      icon: <RiBtcFill size={24} />,
      color: "text-amber-600 bg-amber-100",
      path: "/elite/crypto-recovery",
    },
    {
      title: "Academic Grade Enhancement",
      desc: "Instantly boost university grades, GPAs, and exam scores. Modify transcripts, alter test results, and access full academic records.",
      icon: <GiGraduateCap size={24} />,
      color: "text-blue-600 bg-blue-100",
      path: "/elite/grade-enhancement",
    },
    {
      title: "Credit Score Boost & Card Loading",
      desc: "Instantly improve credit scores (Equifax, TransUnion, Experian). Load debit/prepaid cards and access full financial logs.",
      icon: <MdAttachMoney size={24} />,
      color: "text-purple-600 bg-purple-100",
      path: "/elite/credit-boost",
    },
    {
      title: "Erase Records & Alter Grades",
      desc: "Permanently delete criminal records, change university grades, GPAs, and issue new driver licenses/ID cards in official systems.",
      icon: <FaFileCircleXmark size={24} />,
      color: "text-rose-600 bg-rose-100",
      path: "/elite/clear-record",
    },
    {
      title: "Stop Blackmail & Secure Privacy",
      desc: "Identify blackmailers, delete compromising material from devices/cloud, and block future threats — full digital protection.",
      icon: <IoAlertCircle size={24} />,
      color: "text-teal-600 bg-teal-100",
      path: "/elite/stop-harassment",
    },
  ];

  const whyChooseUs = [
    {
      icon: <IoLockClosed size={20} />,
      text: "100% Discreet – No logs, no traces, no third-party access",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <IoShieldCheckmark size={20} />,
      text: "No Physical Access Needed – Remote setup & execution",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <IoCheckmarkCircle size={20} />,
      text: "Proven Results – Thousands of successful cases worldwide",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <IoHeadset size={20} />,
      text: "24/7 Support – Live chat, email, phone in multiple languages",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <>
      <section
        id="about"
        className="bg-gradient-to-b from-amber-50 via-white to-gray-50 !py-20 lg:!py-28 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
          {/* Header */}
          <div className="text-center !mb-20">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-700">
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

          {/* Services */}
          <div className="!mb-18">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 !mb-12">
              What We Do
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const cardContent = (
                  <div className="h-[230px] bg-white/80 !p-6 rounded-2xl border border-amber-100 hover:border-amber-400 shadow-md hover:shadow-lg cursor-pointer transition-all">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${service.color}`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                );

                return (
                  <div key={index}>
                    {service.modal ? (
                      <div onClick={handleOpenDemoModal}>{cardContent}</div>
                    ) : service.path ? (
                      <Link to={service.path}>{cardContent}</Link>
                    ) : (
                      cardContent
                    )}
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
              {whyChooseUs.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 bg-white/80 rounded-xl border border-gray-100 hover:border-amber-200 shadow-sm hover:shadow-md !p-4 min-h-[80px]"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-snug">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div className="!mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100/80 to-amber-50/80 shadow-md border border-amber-200">
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
              Our experts are standing by 24/7 to help you recover and secure
              your digital world.
            </p>
            <button
              onClick={handleOpenBuyModal}
              className="inline-flex items-center gap-2 bg-[#0BA6DF] hover:!bg-[#0695c8] text-white !px-8 !py-3 rounded-full font-medium shadow-md hover:shadow-lg transition"
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
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <DemoModal
        openDemoModal={openDemoModal}
        onCloseDemoModal={handleCloseDemoModal}
        handleOpenDemoModal={handleOpenBuyModal} // "Try it Now" opens Buy Modal
      />

      <BuyModal open={openBuyModal} handleClose={handleCloseBuyModal} />
    </>
  );
};

export default About;
