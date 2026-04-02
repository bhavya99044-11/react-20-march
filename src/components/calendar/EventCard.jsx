export default function EventCard({ event }) {
  return (
    <div className="flex gap-3 pt-6 pb-[23px] px-6">
      <div className="h-9.5 w-9.5 rounded-full bg-[#D8D8D8] dark:bg-slate-700"></div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[14px] leading-[26px] text-[#202224]/90 dark:text-slate-100">
          {event.title}
        </p>
        <p className="text-sm font-semibold text-[#202224]/60 leading-6.5 dark:text-slate-400">
          {event.time}
        </p>
        <p className="text-sm font-semibold text-[#202224]/60 leading-6.5 dark:text-slate-400">
          {event.address}
        </p>
        <p className="text-sm font-semibold text-[#202224]/60 leading-6.5 dark:text-slate-400">
          {event.city}
        </p>
        <div className="flex items-center mt-1 gap-2">
          {event.attendees.map((src, i) => (
            <div key={`${event.id}-attendee-${i}`} className="h-6 w-6 rounded-full bg-[#D8D8D8] dark:bg-slate-700"></div>
            // <img
            //   key={src}
            //   src={src}
            //   alt=""
            //   className="w-6 h-6 rounded-full border-2 border-white object-cover"
            // />
          ))}
          <span className="w-6 h-6  rounded-full bg-[#DFE9FF5E]/36 flex items-center justify-center text-[9px] font-bold text-[#4880FF] border-1 border-[#4880FF] dark:bg-[#1d4ed8]/20 dark:text-blue-300 dark:border-blue-400">
            <span className="">{event.extraCount}</span>{" "}
            <span className="-mt-[1px]">+</span>
          </span>
        </div>
      </div>
    </div>
  );
}
