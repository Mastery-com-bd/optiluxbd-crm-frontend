"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const dailyPerformanceData = [
  { day: "Mon", call: 120, conversion: 50 },
  { day: "Tue", call: 100, conversion: 40 },
  { day: "Wed", call: 150, conversion: 70 },
  { day: "Thu", call: 130, conversion: 60 },
  { day: "Fri", call: 90, conversion: 30 },
  { day: "Sat", call: 80, conversion: 25 },
  { day: "Sun", call: 70, conversion: 20 },
];

const chartConfig = {
  call: {
    label: "Call",
  },
  conversion: {
    label: "Conversion",
  },
} satisfies ChartConfig;

const PerformanceChart = () => {
  return (
    <div className="rounded-3xl border border-[rgba(255,255,255,0.15)]  bg-[rgba(255,255,255,0.03)] p-5 overflow-hidden relative w-full">
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/30 rounded-br-3xl pointer-events-none" />

      {/* headers */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Daily Lead Track</h1>

        {/* indicator */}
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-3">
            <span className="bg-[#DE9C3A] h-3 w-3 rounded-full" />
            <span className="text-[#B4B4B8] text-sm">Calls</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="bg-[#00A656] h-3 w-3 rounded-full" />
            <span className="text-[#B4B4B8] text-sm">Convirtion</span>
          </p>
        </div>

        <ChartContainer
          config={chartConfig}
          className="w-full h-[250px] p-0 shadow-none "
        >
          <BarChart
            data={dailyPerformanceData}
            height={250}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              horizontal
              vertical
              stroke="#FFFFFF"
              strokeOpacity={0.1}
              strokeDasharray="6 6"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "#B1B1B1", strokeWidth: 2.5 }}
              tickMargin={2}
              height={18}
              padding={{ left: 0, right: 0 }}
            />

            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#B1B1B1", strokeWidth: 2.5 }}
              width={30}
              tickMargin={5}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar
              dataKey="call"
              fill="#DE9C3A"
              radius={[4, 4, 0, 0]}
              barSize={26}
            />
            <Bar
              dataKey="conversion"
              fill="#00A656"
              radius={[4, 4, 0, 0]}
              barSize={26}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
