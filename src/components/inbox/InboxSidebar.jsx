import React from "react";
import { Button, Checkbox } from "../common";
import {
  IoArchiveOutline,
  IoDocumentTextOutline,
  IoMailOutline,
  IoPaperPlaneOutline,
  IoSquareOutline,
  IoStarOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";

const InboxSidebar = ({
  folders = [],
  labels = [],
  activeFolder = "Inbox",
  onSelectFolder,
  selectedLabels = [],
  onToggleLabel,
}) => {
  const iconMap = {
    Inbox: IoMailOutline,
    Starred: IoStarOutline,
    Sent: IoPaperPlaneOutline,
    Draft: IoDocumentTextOutline,
    Spam: IoWarningOutline,
    Important: IoArchiveOutline,
    Bin: IoTrashOutline,
  };

  return (
    <div className="rounded-[14px] border-[var(--orderlist-border-color)] no-scrollbar overflow-y-auto max-h-[calc(100vh-20vh)] border-[0.3px] pb-[24px] bg-white w-[285px] shrink-0 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
      <div className="pt-[24px] pl-[25px] pr-[23px]">
        <Button
          text="+ Compose"
          className="bg-secondary/90 w-full text-white !font-bold text-sm flex items-center py-3 gap-2"
          type="button"
        />
        <div className="mt-6 flex flex-col">
          <h2 className="font-bold dark:text-slate-100">My Email</h2>
          <div className="mt-4 flex flex-col gap-1">
            {folders.map((folder) => (
              <div
                key={folder.label}
                className={`flex justify-between cursor-pointer inbox-sidemenu py-3 font-semibold text-[color:var(--orderlist-text-color)] transition-colors duration-200 ease-out ${
                  activeFolder === folder.label
                    ? "bg-[#F5F8FF] rounded-md dark:bg-slate-800"
                    : ""
                }`}
                onClick={() => onSelectFolder?.(folder.label)}
              >
                <div className="flex items-center pl-4 gap-3">
                  {React.createElement(iconMap[folder.label] || IoMailOutline, {
                    size: 16,
                  })}
                  <span className="mt-[1px] text-sm">{folder.label}</span>
                </div>
                <div className="font-semibold text-sm pr-[17px] numbers text-[color:var(--orderlist-text-color)]/60 dark:text-slate-400">
                  {folder.count}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="font-bold dark:text-slate-100">Label</h2>
            <div className="flex mt-4 flex-col">
              {labels.map((item) => (
                <div key={item.label} onClick={() => onToggleLabel?.(item.label)} className="flex cursor-pointer items-center ml-3 my-3">
                  <Checkbox
                    size={15}
                    color={item.color}
                    checked={selectedLabels.includes(item.label)}
                  />
                  <span className="font-semibold text-sm mt-[1px] text-[color:var(--orderlist-text-color)] ml-[13px] dark:text-slate-200">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Button
            text="<span className='ml-1 mr-2 text-[20px]'>+</span><span>Create New Label</span>"
            type="button"
            className="bg-white hover:bg-gray-100 font-semibold p-3 !text-[color:var(--orderlist-text-color)]/50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:!text-slate-400"
            useColorClasses={false}
          />
        </div>
      </div>
    </div>
  );
};

export default InboxSidebar;
