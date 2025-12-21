"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", calls: 0, conversionRate: 0 },
  { month: "February", calls: 50, conversionRate: 30 },
  { month: "March", calls: 100, conversionRate: 60 },
  { month: "April", calls: 150, conversionRate: 90 },
  { month: "May", calls: 90, conversionRate: 40 },
  { month: "June", calls: 115, conversionRate: 54 },
  { month: "July", calls: 80, conversionRate: 69 },
  { month: "August", calls: 210, conversionRate: 70 },
  { month: "September", calls: 150, conversionRate: 75 },
  { month: "October", calls: 170, conversionRate: 41 },
  { month: "November", calls: 145, conversionRate: 50 },
  { month: "December", calls: 178, conversionRate: 85 },
];

const chartConfig = {
  calls: {
    label: "Calls",
    color: "rgba(143,207,185,1)",
  },
  conversionRate: {
    label: "Conversion Rate",
    color: "rgba(239,211,108,1)",
  },
} satisfies ChartConfig;

const OverviewChart = () => {
  return (
    <div className="px-4 relative h-[35vh] w-full ">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
          className="h-full w-full"
        >
          <CartesianGrid
            vertical={true}
            horizontal={true}
            stroke="rgba(255,255,255,0.1)"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tick={{ fill: "#B1B1B1" }}
            tickLine={false}
            axisLine={false}
            width={15}
            ticks={[0, 100, 200, 300, 400, 500]}
            domain={[0, 500]}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            {/* Conversion Rate Gradient */}
            <linearGradient id="fillConversion" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(239,211,108,1)"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="rgba(239,211,108,1)"
                stopOpacity={0.1}
              />
            </linearGradient>

            {/* Calls Gradient */}
            <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(143,207,185,1)"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="rgba(143,207,185,1)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="conversionRate"
            type="natural"
            fill="url(#fillConversion)"
            fillOpacity={0.4}
            stroke="rgba(239,211,108,1)"
            stackId="a"
            strokeWidth={3}
          />
          <Area
            dataKey="calls"
            type="natural"
            fill="url(#fillCalls)"
            fillOpacity={0.4}
            stroke="rgba(143,207,185,1)"
            stackId="a"
            strokeWidth={3}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default OverviewChart;
