import React from "react";
import {
  FiPhone,
  FiMessageSquare,
  FiGlobe,
  FiCamera,
  FiMonitor,
  FiMapPin,
  FiMic,
  FiImage,
  FiVideo,
  FiLock,
  FiBattery,
  FiWifi,
  FiClock,
  FiTrendingUp,
  FiSmartphone,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTelegramPlane,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { SiMessenger, SiLine } from "react-icons/si";

const Dashboard = () => {
  return (
    <div className="min-h-screen !p-2">
      {/* Header */}
      <header className="!mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
          
            <h1 className="text-lg md:text-xl font-bold text-slate-800">
              Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs sm:text-sm text-orange-600 bg-orange-100 !px-4 !py-2 rounded-full font-medium text-center">
              You are now viewing demo data. To start collecting actual data,
              please bind your own device.
            </span>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white !px-5 !py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
              Bind My Device
            </button>
          </div>
        </div>
      </header>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 !mb-8">
        {[
          {
            icon: <FiPhone />,
            label: "Calls",
            count: 3,
            color: "from-teal-400 to-cyan-500",
          },
          {
            icon: <FiMessageSquare />,
            label: "Messages",
            count: 15,
            color: "from-indigo-400 to-blue-500",
          },
          {
            icon: <FaWhatsapp />,
            label: "WhatsApp",
            count: 7,
            color: "from-green-400 to-emerald-500",
          },
          {
            icon: <SiMessenger />,
            label: "Messenger",
            count: 4,
            color: "from-blue-500 to-indigo-600",
          },
          {
            icon: <FaInstagram />,
            label: "Instagram",
            count: 12,
            color: "from-pink-400 to-rose-500",
          },
          {
            icon: <FaFacebookF />,
            label: "Facebook",
            count: 8,
            color: "from-blue-600 to-blue-800",
          },
          {
            icon: <FaSnapchatGhost />,
            label: "Snapchat",
            count: 5,
            color: "from-yellow-400 to-amber-500",
          },
          {
            icon: <SiLine />,
            label: "LINE",
            count: 2,
            color: "from-green-500 to-lime-600",
          },
          {
            icon: <FaTelegramPlane />,
            label: "Telegram",
            count: 6,
            color: "from-sky-400 to-cyan-600",
          },
          {
            icon: <FiBattery />,
            label: "Battery",
            count: 20,
            color: "from-red-400 to-rose-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl !p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-white/50 cursor-pointer"
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto !mb-2 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-md group-hover:scale-110 transition-transform`}
            >
              {item.icon}
            </div>
            {item.count > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                {item.count}
              </span>
            )}
            <p className="text-center text-[10px] sm:text-xs font-medium text-slate-700 !mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Map + Keylogs */}
        <div className="!space-y-6">
          {/* Live Map */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50 overflow-hidden">
            <div className="flex items-center justify-between !mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                <FiMapPin className="text-teal-600" />
                Live Location
              </h3>
              <span className="text-xs text-green-600 bg-green-100 !px-3 !py-1 rounded-full font-medium">
                Online
              </span>
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner">
              <iframe
                title="Live Map - Newark, NJ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.197!2d-74.1723667!3d40.735657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2535260d8232b%3A0x6b8e3a3f3f3f3f3f!2sNewark%2C%20NJ!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
              ></iframe>
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm !px-3 !py-2 rounded-xl shadow-lg">
                <p className="text-sm font-semibold text-slate-800">
                  Newark, NJ
                </p>
                <p className="text-xs text-slate-600">
                  Last updated: 2 min ago
                </p>
              </div>
            </div>
          </div>

          {/* Latest Keylogs */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 !mb-4 flex items-center gap-2">
              <FiClock className="text-indigo-600" />
              Latest Keylogs
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto !pr-1">
              {[
                {
                  app: "YouTube",
                  text: "cat videos",
                  time: "2024-05-06 00:07:59",
                  color: "bg-red-500",
                },
                {
                  app: "Chrome",
                  text: "should i apologize after cheating?",
                  time: "2024-05-06 21:42:23",
                  color: "bg-orange-500",
                },
                {
                  app: "Cocktail bar",
                  text: "",
                  time: "2024-05-06 21:42:25",
                  color: "bg-amber-500",
                },
                {
                  app: "Memo",
                  text: "Gia’s club, white tight skirt",
                  time: "2024-05-06 20:29:38",
                  color: "bg-green-500",
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 !p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${log.color}`}
                  >
                    {log.app[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-800">
                      {log.app}
                    </p>
                    {log.text && (
                      <p className="text-xs text-slate-600 !mt-1">{log.text}</p>
                    )}
                    <p className="text-xs text-slate-500 !mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Stats */}
        <div className="!space-y-6">
          {/* Screen Time */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-6 border border-white/50">
            <div className="flex items-center justify-between !mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Total Screen Time
              </h3>
              <FiTrendingUp className="text-green-600" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 !mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white !p-4 rounded-2xl text-center">
                <p className="text-xl sm:text-2xl font-bold">13h 43m 0s</p>
                <p className="text-xs opacity-90">Screen Time Today</p>
              </div>
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white !p-4 rounded-2xl text-center">
                <p className="text-xl sm:text-2xl font-bold">17:25:04</p>
                <p className="text-xs opacity-90">Last Used Today</p>
              </div>
            </div>
            <div className="h-40 sm:h-48 bg-gradient-to-b from-slate-50 to-white rounded-xl !p-3 flex items-end justify-between">
              {["00:00", "06:00", "12:00", "18:00"].map((time, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 sm:w-8 bg-gradient-to-t from-teal-600 via-cyan-500 to-indigo-600 rounded-t-full"
                    style={{ height: `${Math.random() * 80 + 40}px` }}
                  ></div>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    {time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Most Contacts & Calls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
              <h4 className="text-sm font-bold text-slate-700 !mb-3">
                Most Contacts (7 days)
              </h4>
              {["Barbara", "Elle", "John", "Thomas"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 !mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {name[0]}
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 h-full rounded-full"
                      style={{ width: `${100 - i * 15}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {100 - i * 15} times
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
              <h4 className="text-sm font-bold text-slate-700 !mb-3">
                Most Calls (7 days)
              </h4>
              {["Zoe", "Noah", "Camila", "William"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 !mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {name[0]}
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full rounded-full"
                      style={{ width: `${90 - i * 20}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {(2.5 - i * 0.5).toFixed(1)}h {i * 0.5 * 60}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: App Usage + Screenshots */}
        <div className="!space-y-6">
          {/* Most Used Apps */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-6 border border-white/50">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 !mb-4">
              Most Used Apps Today
            </h3>
            <div className="!space-y-4">
              {[
                {
                  app: "TikTok",
                  time: "5h 52m 0s",
                  color: "from-pink-500 to-rose-600",
                },
                {
                  app: "WhatsApp",
                  time: "2h 51m 0s",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  app: "Monopoly Go!",
                  time: "2h 23m 0s",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  app: "AnyConnect",
                  time: "1h 12m 11s",
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  app: "Forest",
                  time: "1h 01m 25s",
                  color: "from-teal-500 to-cyan-600",
                },
              ].map((app, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm`}
                  >
                    {app.app[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-800">
                      {app.app}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${app.color}`}
                          style={{ width: `${100 - i * 15}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{app.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Screenshots */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 !mb-4">
              Capture Screenshots
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="relative group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow">
                    <img
                      src={`https://source.unsplash.com/random/300x300?screen,${i}`}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {i === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <FiCamera className="text-white text-xl sm:text-2xl" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
