import classNames from "classnames";
import { CalendarContext } from "./CalendarContext";
import { useContext } from "react";

export default function CalendarToolbar({
  view,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onToday,
}) {

  const {calendarData} = useContext(CalendarContext);
  const calendarApi = calendarData?.api;

  const handleToday = () => {
    if (calendarApi) {
      calendarApi.today();
      return;
    }
    onToday?.();
  };

  const handlePrev = () => {
    if (calendarApi) {
      calendarApi.prev();
      return;
    }
    onPrevMonth?.();
  };

  const handleNext = () => {
    if (calendarApi) {
      calendarApi.next();
      return;
    }
    onNextMonth?.();
  };

  const handleViewChange = (label) => {
    onViewChange?.(label);
    if (!calendarApi) return;
    if (label === "Day") calendarApi.changeView("timeGridDay");
    if (label === "Week") calendarApi.changeView("timeGridWeek");
    if (label === "Month") calendarApi.changeView("dayGridMonth");
  };
  
  return (
    <div className="sticky top-0 z-20  flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={handleToday}
        className="text-sm text-[#202224]/60 font-semibold dark:text-slate-400"
      >
        Today
      </button>

      <div className="flex items-center gap-[14px]">
        <button
          onClick={handlePrev}
          className="cursor-pointer hover:text-gray-700 transition-colors p-1 dark:hover:text-slate-200"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path
              d="M6 1L1 6L6 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-[24px] font-bold leading-[1.4] min-w-[160px] text-center">
            {calendarData?.month}
        </span>
        <button
          onClick={handleNext}
          className="cursor-pointer hover:text-gray-700 transition-colors p-1 dark:hover:text-slate-200"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path
              d="M1 1L6 6L1 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex border divide-x-[0.4px] divide-[#979797]/70 border-[0.6px] border-[#D5D5D5] rounded-lg dark:border-slate-700 dark:divide-slate-700">
        {[{ label: "Day" }, { label: "Week" }, { label: "Month" }].map(
          (option) => (
            <button
              key={option.label}
              onClick={() => handleViewChange(option.label)}
              className={
                classNames("pl-4 py-3 cursor-pointer pr-3 font-semibold text-xs transition-colors",
                view === option.label && "bg-blue-500 text-white",
                view !== option.label && "dark:text-slate-200",
                option.label == "Day" && "rounded-l-lg",
                option.label == "Month" && "rounded-r-lg")
              }
            >
              {option.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
