import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutChartCard({ data, colors }) {
  return (
    <div className="flex justify-center text-gray-500 dark:text-slate-400">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={42}
            outerRadius={62}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, j) => (
              <Cell key={j} fill={colors[j % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
