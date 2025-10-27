import React from "react";
import { Outlet } from "react-router-dom";
import DemoNavbar from "../navbar/DemoNavbar";
import Header, { LanguageContext } from "./Header";
import DemoFooter from "./DemoFooter";

const DemoPage = () => {
  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {} }}>
      <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-indigo-50 to-teal-50 ">
        {/* Sidebar */}
        <DemoNavbar />

        {/* Main content */}
        <main className="flex-1 !ml-0 md:ml-64 ">
          <Header />
          <div className="!pt-4 !px-4 md:!px-8 lg:!px-4">
            <Outlet />
          </div>
        <DemoFooter/>
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default DemoPage;
