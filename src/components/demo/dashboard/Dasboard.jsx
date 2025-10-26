import {
  FiPhone,
  FiMessageSquare,
  FiCamera,
  FiMonitor,
  FiMapPin,
  FiClock,
  FiTrendingUp,
  FiSmartphone,
  FiVideo,
  FiImage,
  FiMic,
  FiChrome,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTelegramPlane,
  FaYoutube,
  FaTiktok,
  FaInstagramSquare,
  FaFacebook,
  FaSnapchat,
  FaSpotify,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaRedditAlien,
  FaTelegram,
  FaVideo,
} from "react-icons/fa";
import { SiMessenger, SiLine, SiYelp, SiNetflix } from "react-icons/si";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-teal-50 !p-2">
      {/* Header */}
      <header className="!mb-4 sm:!mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-3 sm:!gap-4">
          <div className="flex items-center !gap-2 sm:!gap-3">
            <h1 className="text-lg sm:text-lg md:text-xl font-bold text-slate-800">
              Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center !gap-2 sm:!gap-3">
            <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-100 !px-3 sm:!px-4 !py-1.5 sm:!py-2 rounded-full font-medium">
              Demo data. Bind your device to collect actual data.
            </span>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[13px] !px-4 sm:!px-5 !py-1.5 sm:!py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
              Bind My Device
            </button>
          </div>
        </div>
      </header>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 !gap-2 sm:!gap-3 !mb-6 sm:!mb-8">
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
            icon: <FiSmartphone />,
            label: "Screenshots",
            count: 0,
            color: "from-purple-400 to-violet-500",
          },
          {
            icon: <FiMonitor />,
            label: "Live Screen",
            count: 0,
            color: "from-red-400 to-rose-500",
          },
          {
            icon: <FiMic />,
            label: "Record",
            count: 0,
            color: "from-orange-400 to-red-500",
          },
          {
            icon: <FiCamera />,
            label: "Photos",
            count: 0,
            color: "from-teal-400 to-cyan-500",
          },
          {
            icon: <FiVideo />,
            label: "Videos",
            count: 0,
            color: "from-indigo-400 to-blue-500",
          },
          {
            icon: <FiImage />,
            label: "Gallery",
            count: 19,
            color: "from-amber-400 to-orange-500",
          },
          {
            icon: <FiClock />,
            label: "Keylogger",
            count: 4,
            color: "from-purple-400 to-violet-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group sm:rounded-2xl !p-2 sm:!p-3 transition-all duration-300 cursor-pointer flex flex-col items-center hover:scale-105"
          >
            {/* Icon Container */}
            <div className="relative bg-white/90 backdrop-blur-md rounded-full p-1 sm:!p-2 shadow-md flex items-center justify-center">
              <div
                className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white text-base sm:text-lg md:text-xl shadow-md group-hover:scale-110 transition-transform`}
              >
                {item.icon}

                {/* Notification Badge — now on top of the icon */}
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 text-white text-[8px] sm:text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {item.count}
                  </span>
                )}
              </div>
            </div>

            {/* Label */}
            <p className="text-center text-[9px] sm:text-[10px] md:text-xs font-medium text-slate-700 !mt-0.5 sm:!mt-1 line-clamp-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Scrollable Content */}
      <div className="space-y-6 sm:space-y-8">
        {/* Live Map */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50 overflow-hidden">
          <div className="flex items-center justify-between !mb-3 sm:!mb-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 flex items-center !gap-2">
              <FiMapPin className="text-primary" />
              Live Location
            </h3>
            <span className="text-[10px] sm:text-xs text-green-600 bg-green-100 !px-2 sm:!px-3 !py-1 rounded-full font-medium">
              Online
            </span>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
            <iframe
              title="Live Map - Newark, NJ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.197!2d-74.1723667!3d40.735657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2535260d8232b%3A0x6b8e3a3f3f3f3f3f!2sNewark%2C%20NJ!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-xl"
            ></iframe>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm !px-3 sm:!px-4 !py-2 sm:!py-3 rounded-lg sm:rounded-xl shadow-lg">
              <p className="text-sm sm:text-base font-bold text-slate-800">
                Newark, NJ
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                Last updated: 2 min ago
              </p>
            </div>
          </div>
        </div>

        {/* Total Screen Time - Enhanced Graph */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-6 border border-white/50">
          <div className="flex items-center justify-between !mb-3 sm:!mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Total Screen Time
            </h3>
            <FiTrendingUp className="text-green-600 text-lg sm:text-xl" />
          </div>
          <div className="grid grid-cols-2 !gap-3 sm:!gap-4 !mb-4 sm:!mb-6">
            <div className="bg-gradient-to-r from-[#0695c8] to-accent  text-gray-700 !p-4 sm:!p-5 rounded-xl sm:rounded-2xl text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                13h 43m
              </p>
              <p className="text-xs sm:text-sm opacity-90 !mt-1">
                Screen Time Today
              </p>
            </div>
            <div className="bg-gradient-to-r from-accent to-orange-500 text-gray-700 !p-4 sm:!p-5 rounded-xl sm:rounded-2xl text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">17:25</p>
              <p className="text-xs sm:text-sm opacity-90 !mt-1">Last Active</p>
            </div>
          </div>

          {/* Enhanced Bar Chart */}
          <div className="h-64 sm:h-72 md:h-80 rounded-xl !p-3 sm:!p-4 flex flex-col">
            <div className="flex-1 flex items-end justify-center flex-wrap gap-2 sm:gap-3">
              {[
                {
                  label: "TikTok",
                  color: "from-pink-500 to-rose-600",
                  icon: <FaTiktok className="text-white" />,
                },
                {
                  label: "WhatsApp",
                  color: "from-green-500 to-emerald-600",
                  icon: <FaWhatsapp className="text-white" />,
                },
                {
                  label: "YouTube",
                  color: "from-red-500 to-red-600",
                  icon: <FaYoutube className="text-white" />,
                },
                {
                  label: "Chrome",
                  color: "from-blue-500 to-indigo-600",
                  icon: <FiChrome className="text-white" />,
                },
                {
                  label: "Messenger",
                  color: "from-indigo-500 to-blue-600",
                  icon: <SiMessenger className="text-white" />,
                },
                {
                  label: "Instagram",
                  color: "from-pink-400 to-purple-600",
                  icon: <FaInstagramSquare className="text-white" />,
                },
                {
                  label: "Facebook",
                  color: "from-blue-500 to-blue-700",
                  icon: <FaFacebook className="text-white" />,
                },
                {
                  label: "Snapchat",
                  color: "from-yellow-400 to-orange-400",
                  icon: <FaSnapchat className="text-white" />,
                },
                {
                  label: "Spotify",
                  color: "from-green-400 to-green-600",
                  icon: <FaSpotify className="text-white" />,
                },
                {
                  label: "Twitter / X",
                  color: "from-sky-400 to-sky-600",
                  icon: <FaTwitter className="text-white" />,
                },
                {
                  label: "Netflix",
                  color: "from-red-500 to-gray-800",
                  icon: <SiNetflix className="text-white" />,
                },

                {
                  label: "Pinterest",
                  color: "from-rose-400 to-rose-600",
                  icon: <FaPinterest className="text-white" />,
                },
                {
                  label: "Reddit",
                  color: "from-orange-400 to-red-500",
                  icon: <FaRedditAlien className="text-white" />,
                },
                {
                  label: "Telegram",
                  color: "from-sky-400 to-blue-600",
                  icon: <FaTelegram className="text-white" />,
                },
              ].map((app, i) => {
                const randomHeight =
                  Math.floor(Math.random() * (200 - 50 + 1)) + 50;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer group"
                    style={{ width: "30px" }}
                  >
                    <div
                      className={`w-full bg-gradient-to-t ${app.color} rounded-t-lg transition-all duration-500 hover:opacity-90 relative flex items-center justify-center`}
                      style={{ height: `${randomHeight}px` }}
                    >
                      <div className="absolute top-2 group-hover:opacity-100 transition-opacity text-xs sm:text-sm">
                        {app.icon}
                      </div>
                    </div>

                    {/* Rotated Label */}
                    <div className="!mt-2 sm:mt-3 flex flex-col items-center justify-center">
                      <p className="!ml-14 text-[9px] sm:text-[10px] md:text-xs text-slate-600 origin-top-left rotate-45 whitespace-nowrap">
                        {app.label}
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-slate-500 !mt-12">
                        {(randomHeight / 20).toFixed(1)}h
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Most Used Apps Today */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-6 border border-white/50">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 !mb-4 sm:!mb-5">
            Most Used Apps Today
          </h3>
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {[
              {
                app: "TikTok",
                time: "3h 52m 0s",
                icon: <FaTiktok className="text-pink-600 text-lg sm:text-xl" />,
                color: "from-pink-500 to-rose-600",
              },
              {
                app: "WhatsApp",
                time: "2h 51m 0s",
                icon: (
                  <FaWhatsapp className="text-green-600 text-lg sm:text-xl" />
                ),
                color: "from-green-500 to-emerald-600",
              },
              {
                app: "YouTube",
                time: "2h 23m 0s",
                icon: <FaYoutube className="text-red-600 text-lg sm:text-xl" />,
                color: "from-red-500 to-red-600",
              },
              {
                app: "Chrome",
                time: "1h 21m 11s",
                icon: <FiChrome className="text-blue-600 text-lg sm:text-xl" />,
                color: "from-blue-500 to-indigo-600",
              },
              {
                app: "Messenger",
                time: "1h 01m 25s",
                icon: (
                  <SiMessenger className="text-indigo-600 text-lg sm:text-xl" />
                ),
                color: "from-indigo-500 to-blue-600",
              },
              {
                app: "Instagram",
                time: "58m 34s",
                icon: (
                  <FaInstagramSquare className="text-pink-500 text-lg sm:text-xl" />
                ),
                color: "from-pink-400 to-purple-600",
              },
              {
                app: "Facebook",
                time: "50m 42s",
                icon: (
                  <FaFacebook className="text-blue-600 text-lg sm:text-xl" />
                ),
                color: "from-blue-500 to-blue-700",
              },
              {
                app: "Snapchat",
                time: "43m 18s",
                icon: (
                  <FaSnapchat className="text-yellow-500 text-lg sm:text-xl" />
                ),
                color: "from-yellow-400 to-orange-400",
              },
              {
                app: "Spotify",
                time: "39m 27s",
                icon: (
                  <FaSpotify className="text-green-500 text-lg sm:text-xl" />
                ),
                color: "from-green-400 to-green-600",
              },
              {
                app: "Twitter / X",
                time: "32m 11s",
                icon: (
                  <FaTwitter className="text-blue-400 text-lg sm:text-xl" />
                ),
                color: "from-sky-400 to-sky-600",
              },
              {
                app: "Netflix",
                time: "28m 04s",
                icon: <SiNetflix className="text-red-600 text-lg sm:text-xl" />,
                color: "from-red-500 to-gray-800",
              },
              {
                app: "Telegram",
                time: "24m 36s",
                icon: (
                  <FaTelegram className="text-sky-500 text-lg sm:text-xl" />
                ),
                color: "from-sky-400 to-blue-600",
              },
              {
                app: "LinkedIn",
                time: "21m 12s",
                icon: (
                  <FaLinkedin className="text-blue-700 text-lg sm:text-xl" />
                ),
                color: "from-blue-600 to-indigo-700",
              },
              {
                app: "Pinterest",
                time: "18m 54s",
                icon: (
                  <FaPinterest className="text-red-500 text-lg sm:text-xl" />
                ),
                color: "from-rose-400 to-rose-600",
              },
              {
                app: "Reddit",
                time: "14m 09s",
                icon: (
                  <FaRedditAlien className="text-orange-500 text-lg sm:text-xl" />
                ),
                color: "from-orange-400 to-red-500",
              },
            ].map((app, i) => (
              <div key={i} className="flex items-center !gap-3 sm:!gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-slate-800 truncate">
                    {app.app}
                  </p>
                  <div className="flex items-center !gap-2 !mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${app.color} transition-all duration-500`}
                        style={{ width: `${100 - i * 5}%` }}
                      ></div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap">
                      {app.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Contacts & Calls */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-4 sm:!gap-6">
          {/* Most Contacts */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
            <div className="flex items-center justify-between !mb-3 sm:!mb-4">
              <h4 className="text-sm sm:text-base font-bold text-slate-700 flex items-center !gap-2">
                Most Contacts (7 days)
              </h4>
              <span className="text-xs text-gray-500">&gt;</span>
            </div>
            {[
              {
                name: "Barbara",
                times: 100,
                img: "https://i.pravatar.cc/150?img=1",
              },
              {
                name: "Elle",
                times: 90,
                img: "https://i.pravatar.cc/150?img=2",
              },
              {
                name: "John",
                times: 80,
                img: "https://i.pravatar.cc/150?img=3",
              },
              {
                name: "Thomas",
                times: 70,
                img: "https://i.pravatar.cc/150?img=4",
              },
            ].map((contact, i) => (
              <div
                key={i}
                className="flex items-center !gap-2 sm:!gap-3 !mb-3 sm:!mb-4 last:!mb-0"
              >
                <img
                  src={contact.img}
                  alt={contact.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-slate-800 truncate">
                    {contact.name}
                  </p>
                  <div className="flex items-center !gap-2 !mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                        style={{ width: `${contact.times}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-600 whitespace-nowrap">
                      {contact.times}×
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Most Calls */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
            <div className="flex items-center justify-between !mb-3 sm:!mb-4">
              <h4 className="text-sm sm:text-base font-bold text-slate-700 flex items-center !gap-2">
                Most Calls (7 days)
              </h4>
              <span className="text-xs text-gray-500">&gt;</span>
            </div>
            {[
              {
                name: "Zoe",
                time: "02h 00m",
                img: "https://i.pravatar.cc/150?img=5",
              },
              {
                name: "Noah",
                time: "01h 30m",
                img: "https://i.pravatar.cc/150?img=6",
              },
              {
                name: "Camila",
                time: "01h 00m",
                img: "https://i.pravatar.cc/150?img=7",
              },
              {
                name: "William",
                time: "30m",
                img: "https://i.pravatar.cc/150?img=8",
              },
            ].map((call, i) => (
              <div
                key={i}
                className="flex items-center !gap-2 sm:!gap-3 !mb-3 sm:!mb-4 last:!mb-0"
              >
                <img
                  src={call.img}
                  alt={call.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-slate-800 truncate">
                    {call.name}
                  </p>
                  <div className="flex items-center !gap-2 !mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${100 - i * 25}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-600 whitespace-nowrap">
                      {call.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Keylogs */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
          <div className="flex items-center justify-between !mb-3 sm:!mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center !gap-2">
              <FiClock className="text-secondary" />
              Latest Keylogs
            </h3>
            <span className="text-xs text-gray-500">&gt;</span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {[
              {
                app: "YouTube",
                text: "sexy",
                time: "2024-05-06 00:07:59",
                icon: (
                  <FaYoutube className="text-red-600 text-base sm:text-xl" />
                ),
              },
              {
                app: "Yelp",
                text: "cocktail bar",
                time: "2024-05-03 21:43:23",
                icon: (
                  <SiYelp className="text-orange-600 text-base sm:text-xl" />
                ),
              },
              {
                app: "Chrome",
                text: "Should I apologize...",
                time: "2024-05-02 08:43:25",
                icon: (
                  <FiChrome className="text-blue-600 text-base sm:text-xl" />
                ),
              },
              {
                app: "Memo",
                text: "Gigi's club, white tig...",
                time: "2024-05-01 20:29:38",
                icon: (
                  <FiFileText className="text-green-600 text-base sm:text-xl" />
                ),
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex items-start !gap-2 sm:!gap-3 !p-2 sm:!p-3 bg-slate-50/50 rounded-lg sm:rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                  {log.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-slate-800">
                    {log.app}
                  </p>
                  {log.text && (
                    <p className="text-[10px] sm:text-xs text-slate-600 !mt-0.5 sm:!mt-1 truncate">
                      {log.text}
                    </p>
                  )}
                  <p className="text-[9px] sm:text-xs text-slate-500 !mt-0.5 sm:!mt-1">
                    {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capture Screenshots */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
          <div className="flex items-center justify-between !mb-3 sm:!mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Capture Screenshots
            </h3>
            <span className="text-xs text-gray-500">&gt;</span>
          </div>
          <div className="grid grid-cols-3 !gap-2 sm:!gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="relative group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow">
                  <img
                    src={`https://source.unsplash.com/random/300x300?screenshot,mobile,${i}`}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {i === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg sm:rounded-xl">
                    <FiCamera className="text-white text-xl sm:text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center !py-6 sm:!py-8 text-[10px] sm:text-xs text-slate-500">
          Copyright © 2025 ClevGuard.org. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
