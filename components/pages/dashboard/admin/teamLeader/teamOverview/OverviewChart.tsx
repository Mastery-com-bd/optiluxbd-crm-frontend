"use client";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/* ------------------ color logic ------------------ */
const getConversionColor = (rate: number) => {
  if (rate < 30) return "#F50F0F"; // Low
  if (rate <= 50) return "#FF7B0F"; // Medium
  return "#05BD3D"; // High
};

/* ------------------ data ------------------ */
const rawData = [
  { team: "Team Alpha", conversion: 72 },
  { team: "Team Beta", conversion: 28 },
  { team: "Team Gamma", conversion: 45 },
  { team: "Team Delta", conversion: 60 },
  { team: "Team Epsilon", conversion: 18 },
  { team: "Team Zeta", conversion: 52 },
  { team: "Team Eta", conversion: 33 },
  { team: "Team Theta", conversion: 80 },
  { team: "Team Iota", conversion: 26 },
  { team: "Team Kappa", conversion: 49 },
  { team: "Team Lambda", conversion: 68 },
  { team: "Team Mu", conversion: 41 },
  { team: "Team Nu", conversion: 22 },
  { team: "Team Xi", conversion: 55 },
  { team: "Team Omega", conversion: 90 },
];

const chartData = rawData.map((item) => ({
  ...item,
  fill: getConversionColor(item.conversion),
}));

/* ------------------ chart config ------------------ */
const chartConfig = {
  conversion: {
    label: "Conversion Rate (%)",
  },
} satisfies ChartConfig;

/* ------------------ component ------------------ */
const OverviewChart = () => {
  return (
    <div>
      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="w-full h-[55vh] bg-transparent shadow-none"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 28,
              bottom: 40,
            }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              stroke="#FFFFFF"
              strokeOpacity={0.1}
              strokeDasharray="6 6"
            />
            <XAxis
              dataKey="team"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              interval={0}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#888", strokeWidth: 1 }}
              tickMargin={10}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              fontSize={12}
              width={50}
              label={{
                value: "Conversion Rate (%)",
                angle: -90,
                position: "insideLeft",
                offset: -20,
                style: { textAnchor: "middle", fill: "#888", fontSize: 14 },
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="conversion" radius={6}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default OverviewChart;
