import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const index = () => {
  const { pathname } = useLocation();

  return (
    <div className="nunito-font flex h-screen overflow-hidden">
      <Sidebar />
      <div className="layout-surface flex w-[calc(100% - 15.7299%)] flex-1 flex-col bg-[#F5F6FA] h-screen overflow-hidden dark:bg-slate-950">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div key={pathname} className="page-transition">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
