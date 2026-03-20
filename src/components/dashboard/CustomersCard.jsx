import React from "react";

const CustomersDonut = () => {
  const cx = 74;
  const cy = 74;
  const r = 54;
  const stroke = 16;
  const dots = [
    { angle: -90 }, // top
    { angle: 0 }, // right
    { angle: 90 }, // bottom
    { angle: 180 }, // left
  ];
  const toXY = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  return (
    <svg width={148} height={148}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--customers-ring)"
        strokeWidth={stroke}
      />
      {dots.map((d, i) => {
        const { x, y } = toXY(d.angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={5}
            fill="var(--customers-dot)"
          />
        );
      })}
    </svg>
  );
};

const CustomersCard = ({ data }) => {
  const fallbackData = { newCustomers: 34249, repeated: 1420 };
  const resolvedData = data ?? fallbackData;
  const hasData =
    resolvedData &&
    Number.isFinite(resolvedData.newCustomers) &&
    Number.isFinite(resolvedData.repeated);

  if (!hasData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm pt-6 px-6 pb-8 flex flex-col dark:bg-slate-900 dark:border dark:border-slate-800 [--customers-ring:#e0eaff] [--customers-dot:#4880FF] [--customers-dot-muted:#bfdbfe] dark:[--customers-ring:#1e293b] dark:[--customers-dot:#60a5fa] dark:[--customers-dot-muted:#1d4ed8]">
        <span className="font-bold text-[22px] text-gray-800 mb-[34px] dark:text-slate-100">Customers</span>
        <div className="flex h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm pt-6 px-6 pb-8 flex flex-col dark:bg-slate-900 dark:border dark:border-slate-800 [--customers-ring:#e0eaff] [--customers-dot:#4880FF] [--customers-dot-muted:#bfdbfe] dark:[--customers-ring:#1e293b] dark:[--customers-dot:#60a5fa] dark:[--customers-dot-muted:#1d4ed8]">
      <span className="font-bold text-[22px] text-gray-800 mb-[34px] dark:text-slate-100">Customers</span>
      <div className="flex justify-center">
        <CustomersDonut />
      </div>
      <div className="flex justify-center gap-8 mt-[28px]">
        <div>
          <p className="font-bold text-[28px] tracking-[1px] leading-[1.65] text-[color:var(--orderlist-text-color)]">
            {resolvedData.newCustomers.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--customers-dot)] inline-block" />
            <span className="text-xs text-[color:var(--color-text-neutral)]">New Customers</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-[22px] text-[28px] leading-[1.65] tracking-[1px] text-[color:var(--orderlist-text-color)]">
            {resolvedData.repeated.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--customers-dot-muted)] inline-block" />
            <span className="text-xs text-[color:var(--color-text-neutral)]">Repeated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersCard;


