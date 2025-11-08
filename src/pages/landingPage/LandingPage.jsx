import React, { useRef, useEffect } from "react";
import Navbarr from "../../components/navbar/Navbarr";
import Hero from "../../components/hero/Hero";
import Services from "../../components/servicesSection/Services";
import About from "../../components/about/About";
import FAQSection from "../../components/faq/FAQSection";
import Testimonial from "../../components/testimonial/Testimonial";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet-async";
import SEO from "../../components/SEO";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrame;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.2 + 1.2,
      opacity: Math.random() * 0.6 + 0.4,
      hue: Math.random() * 50 + 170, // Cyan → Teal
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        particles.forEach((other) => {
          if (p === other) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 65%, ${
              0.15 * (1 - dist / 150)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-10 lg:opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
const LandingPage = () => {
  return (
    <>
      <SEO
        title="Trevor Tech Solutions | Ultimate Digital Shield"
        description="Trevor Tech
Solutions Empowers you with cutting-edge tools to spy on social media, hack
devices, reclaim stolen crypto, track locations, and erase digital footprints –
all ethically and discreetly, with expert support for total peace of mind.."
        url="https://trevortechsolutions.com"
        image="/app-icon.png"
      />
      <div
        className="min-h-screen !bg-gradient-to-br from-[#0a0a1f] via-[#0f0f2a] to-[#1a0033] text-cyan-100 overflow-x-hidden"
        style={{
          backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 255, 255, 0.12) 0%, transparent 25%),
          radial-gradient(circle at 90% 80%, rgba(255, 0, 255, 0.12) 0%, transparent 25%)
        `,
        }}
      >
        <ParticleBackground />
        {/* Main Content Container */}
        <div className="relative z-10">
          {/* Navbar */}
          <Navbarr />

          {/* Page Sections */}
          <main className="flex flex-col">
            <section id="hero">
              <Hero />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="services">
              <Services />
            </section>

            <section id="testimonial">
              <Testimonial />
            </section>

            <section id="faq">
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
    </>
  );
};

export default LandingPage;
