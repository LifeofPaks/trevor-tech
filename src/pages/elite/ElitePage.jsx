import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import EliteNavbar from "../../components/navbar/EliteNavbar";

const ElitePage = () => {
  return (
    <div className="min-h-screen ">
      <EliteNavbar />
      <div className="!pt-4 !px-4 md:!px-8 lg:!px-4 lg:!mt-[12rem] !mt-[8rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ElitePage;
