import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_SECTIONS } from "@/utils/constants";
import classNames from "classnames";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item.key);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-[15.7299%] sticky top-0 -pr-1 h-screen no-scrollbar overflow-y-auto bg-white flex flex-col font-semibold nunito-font dark:bg-slate-950 dark:text-slate-100">
      <div className="pt-6 pb-[19px] pl-[66px] dark:border-b dark:border-gray-800  sticky top-0 z-40 shadow-md dark:bg-slate-950 bg-white">
        <img
          src="/images/dashtack.png"
          className="cursor-pointer dark:invert dark:brightness-95"
          alt="Dashtack"
        />
      </div>

      {SIDEBAR_SECTIONS.map((section, sectionIndex) => (
        <div
          key={section.key}
          className={classNames(
            section.key == "account"
              ? "sticky shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] bg-gray-50 dark:bg-slate-950 dark:border-t dark:border-gray-800 z-40 bottom-0"
              : null,
          )}
        >
          <div className={`${sectionIndex === 0 ? "mt-[30px] " : ""} flex gap-1 w-full flex-col`}>
            {section.heading ? (
              <div className="font-bold text-black/60 text-xs uppercase mt-4 ml-10 mb-4 dark:text-slate-400">
                {section.heading}
              </div>
            ) : null}

            {section.items.map((item) => {
              const isActive = item.path
                ? pathname === item.path
                : activeItem === item.key;

              return (
                <div
                  key={item.key}
                  className={`relative dashboard w-full ${isActive ? "active" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="text-sm pt-4 sidemenu pb-[14px] pl-[54px] ml-[24px] mr-6 rounded-[6px] text-[color:var(--orderlist-text-color)] w-[calc(100%-48px)] text-left cursor-pointer flex items-center gap-3 transition-colors duration-300 ease-in-out dark:text-slate-200"
                  >
                    {item.icon ? <item.icon size={18} className="" /> : null}
                    <span>{item.label}</span>
                  </button>
                  <div className="h-[50px] rounded-[4px] leftbar top-0 left-[-5px] w-[9px] absolute rounded-[6px] transition-colors duration-300 ease-in-out"></div>
                </div>
              );
            })}
          </div>

          {sectionIndex < SIDEBAR_SECTIONS.length - 1 ? (
            <div className="h-[1px] w-full my-4 bg-[#E0E0E0] dark:bg-slate-800"></div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
