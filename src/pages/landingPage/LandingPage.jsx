import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Navbarr from '../../components/navbar/Navbarr'
import Hero from '../../components/hero/Hero'
import Services from '../../components/servicesSection/Services'
import About from '../../components/about/About'
import FAQSection from '../../components/faq/FAQSection'
import Testimonial from "../../components/testimonial/Testimonial";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-amber-50 relative overflow-x-hidden">
      <Navbarr />
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <FAQSection />
    </div>
  );
}

export default LandingPage