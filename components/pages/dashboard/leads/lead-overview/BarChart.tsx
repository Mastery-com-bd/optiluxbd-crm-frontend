"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with an active bar";

const rawData = [
  { category: "New Leads", number: 1548 },
  { category: "Connected", number: 1625 },
  { category: "Qualified", number: 1154 },
  { category: "Proposal Send", number: 1506 },
  { category: "Converted", number: 1500 },
];

const CATEGORY_COLORS: Record<string, string> = {
  "New Leads": "#F5E0C2",
  Connected: "#CA8E35",
  Qualified: "#E5B061",
  "Proposal Send": "#FF7B0F",
  Converted: "#05BD3D",
};

const chartData = rawData.map((item) => ({
  ...item,
  fill: CATEGORY_COLORS[item.category],
}));

const chartConfig = {
  number: {
    label: "Number",
  },
} satisfies ChartConfig;

const LeadOvreviewBarChart = () => {
  return (
    <div>
      <ChartContainer config={chartConfig} className="shadow-none ">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            stroke="#FFFFFF"
            strokeDasharray="6 6"
          />

          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={true}
            tickMargin={0}
            height={15}
            textAnchor="middle"
            interval={0}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[0, 2000]}
            fontSize={12}
            width={40}
            ticks={[0, 500, 1000, 1500, 2000]}
            tickFormatter={(value) =>
              value >= 1000
                ? value % 1000 === 0
                  ? `${value / 1000}k`
                  : `${(value / 1000).toFixed(1)}k`
                : value
            }
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="number" strokeWidth={2} radius={0} barSize={50} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default LeadOvreviewBarChart;
