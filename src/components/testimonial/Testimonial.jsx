import React from "react";
import { Star } from "lucide-react";
import { div } from "framer-motion/client";

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Trevor Tech saved my business data after a critical system crash. Their professionalism and speed were unmatched!",
  },
  {
    name: "David Kim",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    review:
      "Exceptional service! The recovery process was transparent, and I got every single file back safely.",
  },
  {
    name: "Maria Lopez",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "I thought I had lost years of work, but Trevor Tech brought it all back. Highly recommend their team!",
  },
  {
    name: "James Carter",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "Fast, reliable, and friendly support. They kept me updated throughout the process and delivered perfectly.",
  },
  {
    name: "Olivia Brown",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    review:
      "I can’t thank Trevor Tech enough. My photos and documents were restored with amazing care and precision.",
  },
];

const Testimonial = () => {
    return (
      <div className="text-center bg-white !mt-20 !py-16 px-4" id="testimonial">
        <div className="max-w-6xl !mx-auto ">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 !mb-10">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((client, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md border border-amber-100 rounded-xl !p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-16 h-16 rounded-full mb-3 border-2 border-amber-200 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 !mb-1">
                    {client.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex justify-center !mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    “{client.review}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Testimonial;
