import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import CalendarToolbar from "./CalendarToolbar";
import MonthCalender from "./MonthCalender";
import { CalendarContext } from "./CalendarContext";

export default function CalendarPanel({
  view,
  onViewChange,
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
  events,
  loading = false,
}) {
  const [calendarData, setCalendarData] = useState({
    month: "",
    isToday: false,
    date: "",
  });

  return (
    <CalendarContext.Provider value={{ calendarData, setCalendarData }}>
      <div className="flex-1 mr-[30px] bg-white h-[calc(100vh-18vh)] no-scrollbar overflow-auto rounded-[14px] border-[0.3px] border-[#B9B9B9] flex flex-col dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
        {loading ? (
          <>
            <div className="flex items-center justify-between px-6 border-b border-gray-100 dark:border-slate-800">
              <Skeleton width={39} height={19} />
              <div className="flex items-center gap-2">
                <Skeleton width={14} height={16} />
                <Skeleton width={154} height={33} />
                <Skeleton width={14} height={16} />
              </div>
              <div className="px-6">
                <div className="flex border divide-x-[0.4px] divide-[#979797]/70 border-[0.6px] border-[#D5D5D5] rounded-lg dark:border-slate-700 dark:divide-slate-700">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <button
                      key={`calendar-toolbar-skeleton-${index}`}
                      className={
                        "pl-4 py-3 cursor-pointer pr-3 font-semibold text-xs transition-colors"
                      }
                    >
                      <Skeleton width={32} height={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6">
              <div className="bg-gray-100 px-25 flex items-center justify-between rounded-t-lg w-full h-[48px] dark:bg-slate-800">
                {Array.from({ length: 5 }).map((_, index) => {
                  return <Skeleton key={`calendar-day-skeleton-${index}`} width={34} height={19} />;
                })}
              </div>
              <div className="grid border-l-1 border-r-1 border-gray-300 border-b-1 rounded-b-lg grid-cols-5 divide-x-1 divide-y-1 divide-gray-100 dark:border-slate-700 dark:divide-slate-800">
                {Array.from({length:42}).map((_, index)=>{

                return (<div key={`calendar-cell-skeleton-${index}`} className="h-[139px] flex justify-end">
                  <div className="ml-auto pt-4 pr-4">
                    <Skeleton height={22} width={22} />
                  </div>
                </div>)
                })}
              </div>
            </div>
          </>
        ) : (
          <div>
            <CalendarToolbar
              view={view}
              onViewChange={onViewChange}
              year={year}
              month={month}
              onPrevMonth={onPrevMonth}
              onNextMonth={onNextMonth}
              onToday={onToday}
            />
            <MonthCalender events={events} />                        
          </div>
        )}
      </div>
    </CalendarContext.Provider>
  );
}
