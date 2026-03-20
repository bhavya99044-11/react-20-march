import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Skeleton from "react-loading-skeleton";
import { Select } from "@/components/common";
import SalesTooltip from "./SalesTooltip";
import SalesDetailsSkeleton from "./SalesDetailsSkeleton";


const SalesDetailsSection = ({ monthOptions, month, onChange, data = [], loading }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  return (
    <div className="mt-[26px] bg-white rounded-2xl dark:shadow-white transition-shadow duration-300 ease-in-out hover:shadow-sm pt-[28px] pl-[32px] pb-[36px] pr-[32px] dark:bg-slate-900 dark:border dark:border-slate-800 [--chart-grid:#f0f0f0] [--chart-tick:#9ca3af] dark:[--chart-grid:#1f2937] dark:[--chart-tick:#94a3b8]">
      <div className="flex justify-between items-center">
          <span className="font-bold text-[20px] text-gray-800 dark:text-slate-100">Sales Details</span>
        {loading ? (
          <Skeleton width={100} height={28} />
        ) : (
          <Select
            className="text-sm border pr-[13px] pl-2 flex items-center max-h-[28px] border-[var(--orderlist-border-color)] rounded-[4px] bg-[#FCFDFD] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            options={monthOptions}
            value={month}
            onChange={onChange}
          />
        )}
      </div>
      <div className="mt-6 h-65">
        {loading ? (
          <SalesDetailsSkeleton />
        ) : hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesDetailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                interval={2}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[20, 100]}
                ticks={[20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 8, bottom: 8 }}
              />
              <Tooltip content={<SalesTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#salesDetailGrad)"
                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDetailsSection;
