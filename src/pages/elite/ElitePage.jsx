import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const ElitePage = () => {
  return (
    <div className="min-h-screen ">
      <div className="!pt-4 !px-4 md:!px-8 lg:!px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ElitePage;
