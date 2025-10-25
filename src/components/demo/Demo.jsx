import React from "react";
import { Outlet } from "react-router-dom";
import DemoNavbar from "../navbar/DemoNavbar";

const Demo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DemoNavbar />
      <main className="pt-20 px-4 md:px-8 lg:px-16">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Demo;
