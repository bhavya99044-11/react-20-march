import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BarChartCard({ data, colors }) {
  return (
    <div className="w-full text-gray-500 dark:text-slate-400 [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb] [--tooltip-text:#111827] dark:[--tooltip-bg:#0f172a] dark:[--tooltip-border:#334155] dark:[--tooltip-text:#e2e8f0]">
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        strokeWidth={0}
        responsive
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "var(--tooltip-bg)",
            border: "1px solid var(--tooltip-border)",
            color: "var(--tooltip-text)",
            borderRadius: 8,
          }}
          labelStyle={{ color: "var(--tooltip-text)" }}
          itemStyle={{ color: "var(--tooltip-text)" }}
        />
        <Legend wrapperStyle={{ color: "var(--tooltip-text)" }} />
        <YAxis hide axisLine={false} reversed tick={false} />
        <XAxis hide tick={false} axisLine={false} />
        <Bar dataKey="pv" barSize={7.63} stackId="a" background radius={[0, 0, 10, 10]}>
          {data.map((_, j) => (
            <Cell key={j} fill={colors.first} />
          ))}
        </Bar>
        <Bar dataKey="uv" barSize={7.63} stackId="a" background>
          {data.map((_, j) => (
            <Cell key={j} fill={colors.second} />
          ))}
        </Bar>
        <Bar dataKey="cd" barSize={7.63} stackId="a" background>
          {data.map((_, j) => (
            <Cell key={j} fill={colors.third} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
