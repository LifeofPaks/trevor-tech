import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi'

const CaptureScreenshot = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl !p-4 sm:!p-5 border border-white/50">
      <div className="flex items-center justify-between !mb-3 sm:!mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          Capture Screenshots
        </h3>
        <span className="textmds text-gray-500">
          <FaAngleRight />
        </span>
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
  );
}

export default CaptureScreenshot