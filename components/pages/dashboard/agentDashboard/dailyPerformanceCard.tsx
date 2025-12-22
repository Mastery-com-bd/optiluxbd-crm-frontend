"use client"


import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const dailyPerformanceData = [
  { day: "Mon", calls: 32, conversions: 8 },
  { day: "Tue", calls: 28, conversions: 7 },
  { day: "Wed", calls: 35, conversions: 12 },
  { day: "Thu", calls: 30, conversions: 9 },
  { day: "Fri", calls: 38, conversions: 14 },
  { day: "Sat", calls: 25, conversions: 6 },
  { day: "Sun", calls: 20, conversions: 5 },
];

const DailyPerformanceCard = () => {
  return (
    <LiquidGlass className="w-full max-w[460px]">
      {/* Daily Performance Chart */}
      <Card className="rounded-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-normal text-white">
            Daily Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <ChartContainer
            config={{
              calls: { label: "Calls", color: "#f59e0b" },
              conversions: { label: "Conversions", color: "#22c55e" },
            }}
            className="h-58 w-full shadow-none p-0"
          >
            <BarChart
              data={dailyPerformanceData}
              barGap={8}
              margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
            >
                
              <CartesianGrid
                vertical={true}
                horizontal={true}
                stroke="rgba(255,255,255,0.01)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                ticks={[0, 10, 20, 30, 40]}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={
                  <ChartTooltipContent className="bg-[#1c1a26] border-white/10 text-white" />
                }
              />
              <Bar
                dataKey="calls"
                fill="#DE9C3A"
                radius={[4, 4, 4, 4]}
                barSize={20}
              />
              <Bar
                dataKey="conversions"
                fill="#00A656"
                radius={[4, 4, 4, 4]}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </LiquidGlass>
  );
};

export default DailyPerformanceCard;
