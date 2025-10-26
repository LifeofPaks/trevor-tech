import React from "react";
import { Outlet } from "react-router-dom";
import DemoNavbar from "../navbar/DemoNavbar";
import Header from "./Header";

const DemoPage = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <DemoNavbar />

      {/* Main content */}
      <main className="flex-1 !ml-0 md:ml-64 pt-4 px-4 md:px-8 lg:px-16">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
};

export default DemoPage;
