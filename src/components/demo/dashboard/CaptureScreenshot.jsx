import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import Image1 from "../../../assets/dashboard/screenshots/i-1.png";
import Image2 from "../../../assets/dashboard/screenshots/i-2.png";
import Image3 from "../../../assets/dashboard/screenshots/i-3.png";
import Image4 from "../../../assets/dashboard/screenshots/i-4.webp";
import Image5 from "../../../assets/dashboard/screenshots/i-5.webp";
import Image6 from "../../../assets/dashboard/screenshots/i-6.webp";
import Image7 from "../../../assets/dashboard/screenshots/i-7.webp";
import Image8 from "../../../assets/dashboard/screenshots/i-8.webp";
import Image9 from "../../../assets/dashboard/screenshots/i-9.webp";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
];

const CaptureScreenshot = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Gallery Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
        <div className="flex items-center justify-between !mb-3 sm:!mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            {t("sc.title")}
          </h3>
          <span className="text-md text-gray-500">
            <FaAngleRight />
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
              onClick={() => openModal(i)}
            >
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all">
                <img
                  src={img}
                  alt={t("sc.image_alt", { index: i + 1 })}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg sm:rounded-xl">
                <FiCamera className="text-white text-xl sm:text-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed h-full inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-2 sm:px-6 transition-all duration-300">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 sm:top-5 sm:right-5 text-white text-3xl sm:text-4xl hover:text-gray-300 z-[60]"
            onClick={closeModal}
            aria-label={t("sc.close_button_aria")}
          >
            <IoClose />
          </button>

          {/* Prev Button */}
          <button
            className="absolute left-3 sm:left-5 text-white text-4xl sm:text-5xl !p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md transition-all z-[60] flex items-center justify-center"
            onClick={prevImage}
            aria-label={t("sc.prev_button_aria")}
          >
            <IoChevronBack />
          </button>

          {/* Image Container */}
          <div className="relative max-w-3xl !mx-4 w-full flex justify-center items-center z-[50]">
            <img
              src={images[currentIndex]}
              alt={t("sc.modal_image_alt")}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-lg transition-all duration-500"
            />
          </div>

          {/* Next Button */}
          <button
            className="absolute right-3 sm:right-5 text-white text-4xl sm:text-5xl !p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md transition-all z-[60] flex items-center justify-center"
            onClick={nextImage}
            aria-label={t("sc.next_button_aria")}
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </>
  );
};

export default CaptureScreenshot;
