import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "./dashboardData";

const SalesAnalyticsCard = ({ data = analyticsData }) => {
  const chartData = Array.isArray(data) ? data : [];
  const hasData = chartData.length > 0;
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col dark:bg-slate-900 dark:border dark:border-slate-800 [--chart-grid:#f0f0f0] [--chart-tick:#9ca3af] [--chart-tooltip-bg:#ffffff] [--chart-tooltip-border:#e5e7eb] [--chart-tooltip-text:#111827] dark:[--chart-grid:#1f2937] dark:[--chart-tick:#94a3b8] dark:[--chart-tooltip-bg:#0f172a] dark:[--chart-tooltip-border:#334155] dark:[--chart-tooltip-text:#e2e8f0]">
      <span className="font-bold text-[18px] text-gray-800 mb-4 dark:text-slate-100">
        Sales Analytics
      </span>
      <div className="flex-1 h-[180px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{ fontSize: 10, fill: "var(--chart-tick)" }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 8, bottom: 8 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--chart-tooltip-bg)",
                  border: "1px solid var(--chart-tooltip-border)",
                  color: "var(--chart-tooltip-text)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "var(--chart-tooltip-text)" }}
                itemStyle={{ color: "var(--chart-tooltip-text)" }}
              />
              <Line type="monotone" dataKey="a" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
              <Line type="monotone" dataKey="b" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} strokeDasharray="4 2" />
            </LineChart>
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

export default SalesAnalyticsCard;
