import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
  {
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    review:
      "Their team went above and beyond to recover critical files. The process was smooth and stress-free.",
  },
  {
    name: "Aisha Bello",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    review:
      "Excellent experience! They communicated clearly, worked fast, and handled my data with great care.",
  },
  {
    name: "Robert Evans",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    review:
      "I was amazed by how fast they recovered everything. Totally worth it — real professionals!",
  },
  {
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    review:
      "I’ve recommended Trevor Tech to my colleagues. Their data recovery service is simply outstanding.",
  },
];

const Testimonial = () => {
  return (
    <section
      className="relative !py-20 lg:!py-28 overflow-hidden"
      id="testimonial"
    >
      {/* Background Gradient (Cyan/Teal) */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-teal-900/10 pointer-events-none"></div>

      <div className="max-w-7xl !mx-auto !px-6 lg:!px-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center !mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-teal-300 to-green-300 bg-clip-text text-transparent !mb-4">
            What Our Clients Say
          </h2>
          <p className="max-w-4xl !mx-auto text-lg sm:text-xl text-cyan-200/80 leading-relaxed font-light !mt-6">
            Hear from the people who’ve trusted{" "}
            <span className="text-cyan-300 font-semibold">Trevor Tech</span> to
            recover what matters most.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-8">
          {testimonials.map((client, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl !p-6 shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <motion.div
                  className="relative mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-green-500/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={client.image}
                    alt={client.name}
                    className="relative w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50 shadow-lg"
                  />
                </motion.div>

                {/* Name */}
                <h3 className="text-lg font-bold text-cyan-100 !mb-1 group-hover:text-cyan-50 transition">
                  {client.name}
                </h3>

                {/* Stars */}
                <div className="flex justify-center !mb-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Star
                        className="w-5 h-5 text-cyan-400 fill-cyan-400 drop-shadow-glow"
                        strokeWidth={2}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review */}
                <p className="text-sm sm:text-base text-cyan-300/80 leading-relaxed italic">
                  “{client.review}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glow Filter */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px currentColor)
            drop-shadow(0 0 16px currentColor);
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
