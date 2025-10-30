import React from "react";
import Navbarr from "../../components/navbar/Navbarr";
import Hero from "../../components/hero/Hero";
import Services from "../../components/servicesSection/Services";
import About from "../../components/about/About";
import FAQSection from "../../components/faq/FAQSection";
import Testimonial from "../../components/testimonial/Testimonial";
import Footer from "../../components/footer/Footer";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen !bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033] text-cyan-100 overflow-x-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.12) 0%, transparent 25%),
          radial-gradient(circle at 90% 80%, rgba(255, 0, 255, 0.12) 0%, transparent 25%)
        `,
      }}
    >
      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbarr />

        {/* Page Sections */}
        <main className="flex flex-col">
          <section id="hero">
            <Hero />
          </section>

          <section
            id="about"
          >
            <About />
          </section>

          <section
            id="services"
          >
            <Services />
          </section>

          <section
            id="testimonial"
          >
            <Testimonial />
          </section>

          <section
            id="faq"
          >
            <FAQSection />
          </section>
        </main>

        {/* Footer */}
        <footer className="!mt-32">
          <Footer />
        </footer>
      </div>

      {/* Custom Scrollbar & Glow */}
      <style jsx global>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(10, 10, 31, 0.9);
          border-radius: 6px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffff, #ff00ff);
          border-radius: 6px;
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.7);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00cccc, #cc00cc);
        }

        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Glow Hover Utility */
        .glow-hover:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
            0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1);
          transition: box-shadow 0.3s ease;
        }

        /* Section Fade-in on Scroll (Optional JS later) */
        section {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
