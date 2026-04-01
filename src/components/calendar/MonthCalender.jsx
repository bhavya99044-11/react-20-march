import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { CalendarContext } from './CalendarContext'

export function MonthCalender({ events = [] }) {
  const {calendarData,setCalendarData} = useContext(CalendarContext);
  const calendarRef = useRef(null);

  const calendarEvents = useMemo(() => {
    const toYMD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const addOneDay = (ymd) => {
      const [year, month, day] = ymd.split('-').map(Number);
      return toYMD(new Date(year, month - 1, day + 1));
    };

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.date,
      end: addOneDay(event.endDate || event.date),
      allDay: true,
      display: 'block',
      backgroundColor: event.bgLight || '#EDE9FE',
      borderColor: event.color || '#A78BFA',
      textColor: event.color || '#A78BFA',
    }))
  }, [events])

  
  useEffect(() => {
    const api = calendarRef.current?.getApi?.();
    if (!api) return;
    setCalendarData((prev) => ({ ...prev, api }));
  }, [setCalendarData]);

  const handleDatesSet = (arg) => {
    const today = new Date();
    const current = arg.view.calendar.getDate();
    const isTodayMonth =
      current.getFullYear() === today.getFullYear() &&
      current.getMonth() === today.getMonth();

    setCalendarData((prev) => ({
      ...prev,
      month: arg.view.title,
      isToday: isTodayMonth,
    }));
  };

  return (
    <div className="flex-1 mt-[51px] w-full dark:text-slate-100">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='dayGridMonth'
        initialDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
        showNonCurrentDates={true}
        headerToolbar={false}
        weekends={false}
        events={calendarEvents}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default MonthCalender;
