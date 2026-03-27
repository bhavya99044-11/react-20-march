import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SIDEBAR_COLLAPSED_KEY } from "@/utils/constants";

const index = () => {
  const { pathname } = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true",
  );

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="nunito-font flex h-screen overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <div className="layout-surface flex min-w-0 flex-1 flex-col bg-[#F5F6FA] h-screen overflow-hidden dark:bg-slate-950">
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
