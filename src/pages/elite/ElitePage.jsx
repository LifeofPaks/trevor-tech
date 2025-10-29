import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import EliteNavbar from "../../components/navbar/EliteNavbar";

const ElitePage = () => {
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
      <EliteNavbar />
      <div className=" ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ElitePage;
