import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

export default function SingleBarChartCard({ data, colors }) {
  return (
    <div className="w-full text-gray-500 dark:text-slate-400 [--tooltip-bg:#ffffff] [--tooltip-border:#e5e7eb] [--tooltip-text:#111827] dark:[--tooltip-bg:#0f172a] dark:[--tooltip-border:#334155] dark:[--tooltip-text:#e2e8f0]">
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data} barSize={9} margin={{ top: 8, right: 2, left: 2, bottom: 0 }}>
          <Bar dataKey="v" radius={[3, 3, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
