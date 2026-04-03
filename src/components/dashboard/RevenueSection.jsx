import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Skeleton from "react-loading-skeleton";
import { Select } from "@/components/common";
import { revenueData } from "./dashboardData";
import RevenueSkeleton from "./RevenueSkeleton";

const RevenueSection = ({ loading, monthOptions, month, onChange, data = revenueData }) => {
  const chartData = Array.isArray(data) ? data : [];
  const hasData = chartData.length > 0;
  return (
    <div className="mt-[26px] bg-white rounded-2xl shadow-sm pt-[37px] pl-[32px] pb-[32px] pr-[32px] dark:bg-slate-900 dark:border dark:border-slate-800 [--chart-grid:#f0f0f0] [--chart-tick:#9ca3af] [--chart-tooltip-bg:#ffffff] [--chart-tooltip-border:#e5e7eb] [--chart-tooltip-text:#111827] [--chart-legend-text:#6b7280] dark:[--chart-grid:#1f2937] dark:[--chart-tick:#94a3b8] dark:[--chart-tooltip-bg:#0f172a] dark:[--chart-tooltip-border:#334155] dark:[--chart-tooltip-text:#e2e8f0] dark:[--chart-legend-text:#cbd5e1]">
      <div className="flex justify-between items-center">
          <span className="font-bold text-[20px] text-gray-800 dark:text-slate-100">Revenue</span>
        {loading ? (
          <Skeleton width={100} height={28} />
        ) : (
          <Select
            className="text-sm border  pr-[13px] pl-[8px] flex items-center max-h-[28px] border-[var(--orderlist-border-color)] rounded-[4px] bg-[#FCFDFD] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            options={monthOptions}
            value={month}
            onChange={onChange}
          />
        )}
      </div>
      <div className="mt-[51px] h-[328px]">
        {loading ? (
          <RevenueSkeleton />
        ) : hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8F6DCC"  />
                  <stop offset="95%" stopColor="#FF8F6DCC" />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DBA5FF" stopOpacity={0.78} />
                  <stop offset="95%" stopColor="#DBA5FF" stopOpacity={0.78} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 61 }}
              />
              <YAxis
                domain={[20, 100]}
                ticks={[20, 40, 60, 80, 100]}
                tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 0, bottom: 28.1 }}
              />
              <Tooltip
                formatter={(v, n) => [`${v}`, n === "sales" ? "Sales" : "Profit"]}
                contentStyle={{
                  backgroundColor: "var(--chart-tooltip-bg)",
                  border: "1px solid var(--chart-tooltip-border)",
                  color: "var(--chart-tooltip-text)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "var(--chart-tooltip-text)" }}
                itemStyle={{ color: "var(--chart-tooltip-text)" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "var(--chart-legend-text)", fontSize: 13 }}>
                    {value === "sales" ? "Sales" : "Profit"}
                  </span>
                )}
              />
              <Area type="monotone" dataKey="profit" stroke="#c084fc" strokeWidth={2} fill="url(#profitGrad)" dot={false} />
              <Area type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} fill="url(#salesGrad)" dot={false} />
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

export default RevenueSection;

