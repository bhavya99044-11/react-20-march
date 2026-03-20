import { useEffect, useState } from "react";
import CalendarPanel from "../components/calendar/CalendarPanel";
import CalendarSidebar from "../components/calendar/CalendarSidebar";
import { api } from "../utils/api";
import { CALENDAR_EVENTS } from "../data/calendarEvents";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1));
  const [view, setView] = useState("Month");
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date(2026, 9, 1));

  useEffect(() => {
    let active = true;
    const loadEvents = async () => {
      setEventsLoading(true);
      try {
        const response = await api.get("/calendarEvents");
        if (active && Array.isArray(response.data)) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setEvents(CALENDAR_EVENTS);
        }
      } finally {
        if (active) {
          setEventsLoading(false);
        }
      }
    };
    loadEvents();
    return () => {
      active = false;
    };
  }, []);

  const handleCreateEvent = async (payload) => {
    try {
      const response = await api.post("/calendarEvents", payload);
      setEvents((prev) => [...prev, response.data]);
    } catch (error) {
      setEvents((prev) => [...prev, { id: Date.now(), ...payload }]);
    }
  };

  return (
    <div className="justify-center pt-[30px] pl-[30px] nunito-font bg-theme-white  dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <div className="">
        <h1 className="text-[32px] font-bold text-gray-800 mb-[15px] dark:text-slate-100">
          Calendar
        </h1>
  
        <div className="flex gap-5">
          <div className="">
            <CalendarSidebar
              events={events}
              onCreateEvent={handleCreateEvent}
              loading={eventsLoading}
            />
          </div>
            <CalendarPanel
              view={view}
              onViewChange={setView}
              year={year}
              month={month}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              onToday={goToday}
              events={events}
              loading={eventsLoading}
            />
        </div>
      </div>
    </div>
  );
}
