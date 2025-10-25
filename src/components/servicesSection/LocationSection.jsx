import React, { useState } from "react";
import { FaLocationDot, FaClock, FaWifi, FaGear } from "react-icons/fa6";
import LocationImage from "../../assets/location-image.png";
import { Link } from "react-router-dom";
import BuyModal from "../buyModal/BuyModal";

const features = [
  {
    icon: <FaLocationDot className="text-sky-500" size={22} />,
    title: "Track GPS Location",
  },
  {
    icon: <FaClock className="text-amber-600" size={22} />,
    title: "View Location History",
  },
  {
    icon: <FaWifi className="text-teal-600" size={22} />,
    title: "Wi-Fi Location Tracking",
  },
  {
    icon: <FaGear className="text-rose-600" size={22} />,
    title: "Set Up Geofence Alerts",
  },
];

const LocationSection = () => {
     const [open, setOpen] = useState(false);
    
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    return (
      <>
        <section className="!pt-20 !pb-10 ">
          <div className="!max-w-7xl !mx-auto !px-6">
            {/* Title */}
            <div className="text-center !max-w-3xl !mx-auto">
              <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900">
                Live GPS Tracking
              </h2>
              <p className="m!t-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                Track real-time location of any device with street-level
                accuracy using GPS, Wi-Fi, and cell towers. View live movement
                on a map, get geofence alerts, and export complete route history
                with timestamps and speed data.
              </p>
            </div>

            {/* Content */}
            <div className="!mt-10 flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Left side - icons list */}
              <div className="flex-1 w-full">
                <ul className="!space-y-6">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                        {f.icon}
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {f.title}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 !mt-8 justify-center lg:justify-start ">
                  <Link to="/demo" className="cursor-pointer">
                    <button className="w-[150px] border border-gray-800 text-gray-800 !px-6 !py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                      View Demo
                    </button>
                  </Link>

                  <button
                    onClick={handleOpen}
                    className="w-[150px] bg-[#0BA6DF] hover:!bg-[#0695c8] text-white !px-6 !py-3 rounded-lg font-medium transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Right side - image */}
              <div className="flex-1 w-full">
                <img
                  src={LocationImage}
                  alt="GPS tracking dashboard illustration"
                  className="w-full max-w-lg mx-auto rounded-xl shadow-lg object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <BuyModal handleClose={handleClose} open={open} />
      </>
    );
};

export default LocationSection;
