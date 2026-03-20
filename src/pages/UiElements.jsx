import { useEffect, useState } from "react";
import {
  BarChartCard,
  ChartSkeleton,
  CircleSkeleton,
  DonutChartCard,
  PageHeader,
  PieChartCard,
  Section,
  SingleBarChartCard,
} from "../components/uiElements";
import {
  barColors1,
  barData1,
  barData2,
  barColors2,
  barData3,
  barColors3,
  barData4,
  barColors4,
  donut1,
  donut2,
  donut3,
  donut4,
  donutColors1,
  donutColors2,
  donutColors3,
  donutColors4,
  pieColors1,
  pieColors2,
  pieColors3,
  pieColors4,
  pieData1,
  pieData2,
  pieData3,
  pieData4,
} from "@/utils/constants.js";

export default function UIElements() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6 font-sans dark:bg-slate-950">
      <PageHeader />

      <div className="flex flex-col gap-4">
        <Section title="Bar Chart" gridCols="grid-cols-4">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton height={130} />
              <ChartSkeleton height={130} />
              <ChartSkeleton height={130} />
            </>
          ) : (
            <>
              <BarChartCard data={barData1} colors={barColors1} />
              <SingleBarChartCard data={barData2} colors ={barColors2}/>
              <SingleBarChartCard data={barData3} colors ={barColors3}/>
              <SingleBarChartCard data={barData4} colors ={barColors4}/>

            </>
            
          )}
        </Section>

        <Section title="Pie Chart" gridCols="grid-cols-4">
          {loading ? (
            <>
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
            </>
          ) : (
            [
              { data: pieData1, colors: pieColors1 },
              { data: pieData2, colors: pieColors2 },
              { data: pieData3, colors: pieColors3 },
              { data: pieData4, colors: pieColors4 },
            ].map((p, i) => (
              <PieChartCard key={i} data={p.data} colors={p.colors} />
            ))
          )}
        </Section>

        <Section title="Donut Chart" gridCols="grid-cols-4">
          {loading ? (
            <>
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
              <CircleSkeleton size={140} />
            </>
          ) : (
            [
              { data: donut1, colors: donutColors1 },
              { data: donut2, colors: donutColors2 },
              { data: donut3, colors: donutColors3 },
              { data: donut4, colors: donutColors4 },
            ].map((d, i) => (
              <DonutChartCard key={i} data={d.data} colors={d.colors} />
            ))
          )}
        </Section>
      </div>
    </div>
  );
}
