import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_SECTIONS } from "@/utils/constants";
import classNames from "classnames";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item.key);
    if (item.path) {
      navigate(item.path[0]);
    }
  };

  return (
    <div
      className={classNames(
        "sticky top-0 -pr-1 h-screen shrink-0 no-scrollbar overflow-y-auto bg-white flex flex-col font-semibold nunito-font transition-[width] duration-300 ease-in-out dark:bg-slate-950 dark:text-slate-100",
        isCollapsed ? "w-[96px]" : "w-[270px]",
      )}
    >
      <div
        className={classNames(
          "sticky top-0 z-40 flex items-center bg-white shadow-md dark:border-b dark:border-gray-800 dark:bg-slate-950",
          isCollapsed
            ? "justify-center px-3 py-[17px]"
            : "justify-between gap-3 pl-8 pr-5 pt-[18px] pb-4",
        )}
      >
        {!isCollapsed ? (
          <div className="flex min-w-0 items-center transition-all duration-150 justify-start">
            <img
              src="/images/dashtack.png"
              className="cursor-pointer"
              alt="Dashtack"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={classNames(
            "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E0E0E0] bg-white text-[#202224]  hover:bg-[#4880FF] hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-[#4880FF]",
            isCollapsed ? "mx-auto shadow-sm" : "mr-1",
          )}
        >
          {isCollapsed ? (
            <MdChevronRight size={20} />
          ) : (
            <MdChevronLeft size={20} />
          )}
        </button>
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
          <div
            className={classNames(
              sectionIndex === 0 ? "mt-[30px]" : "",
              "flex gap-1 w-full flex-col",
              isCollapsed && sectionIndex === 0 && "mt-10",
            )}
          >
            {section.heading ? (
              <div
                className={classNames(
                  "font-bold text-black/60 text-xs uppercase mt-4 mb-4 dark:text-slate-400",
                  isCollapsed ? "text-center tracking-[0.3em]" : "ml-10",
                )}
              >
                {isCollapsed ? section.heading.charAt(0) : section.heading}
              </div>
            ) : isCollapsed && sectionIndex > 0 ? (
              <div className="mx-auto my-3 h-[1px] w-8 bg-[#E0E0E0] dark:bg-slate-800"></div>
            ) : null}

            {section.items.map((item) => {
              const isActive = item.path.includes(pathname)
                ? pathname === item.path[0] || pathname === item.path[1]
                : null;
              return (
                <div
                  key={item.key}
                  className={`relative dashboard w-full ${isActive ? "active" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    title={isCollapsed ? item.label : undefined}
                    className={classNames(
                      "text-sm sidemenu rounded-[10px] text-[color:var(--orderlist-text-color)] cursor-pointer flex items-center overflow-hidden transition-transform dark:text-slate-200",
                      isCollapsed
                        ? "h-[52px] w-[60px] justify-center py-3 mx-auto"
                        : "pt-4 pb-[14px] pl-[54px] ml-[20px] mr-6 w-[calc(100%-48px)] text-left gap-3",
                    )}
                  >
                    {item.icon ? (
                      <item.icon
                        size={18}
                        className="shrink-0 cursor-pointer transition-transform duration-300"
                      />
                    ) : null}
                    <span
                      className={classNames(
                        "whitespace-nowrap ",
                        isCollapsed
                          ? "w-0 translate-x-2 opacity-0"
                          : "w-auto translate-x-0 opacity-100",
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                  <div
                    className={classNames(
                      "rounded-[4px] leftbar top-0 absolute rounded-[6px] ",
                      isCollapsed
                        ? "h-[52px] left-[8px] w-[4px]"
                        : "h-[50px] left-[-5px] w-[9px]",
                    )}
                  ></div>
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
