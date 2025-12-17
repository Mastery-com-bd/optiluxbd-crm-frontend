"use client";
import { Label, Pie, PieChart, Sector } from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";

const chartData = [
  { name: "Referral", value: 25, fill: "#1EAAE7" },
  { name: "Organic", value: 30, fill: "#FF7A30" },
  { name: "Facebook", value: 20, fill: "#6418C3" },
  { name: "Cold Call", value: 15, fill: "#DE9C3A" },
  { name: "LinkedIn", value: 10, fill: "#2BC155" },
];

const chartConfig = {
  Referral: { label: "Referral", color: "#1EAAE7" },
  Organic: { label: "Organic", color: "#FF7A30" },
  Facebook: { label: "Facebook", color: "#6418C3" },
  "Cold Call": { label: "Cold Call", color: "var(--success)" },
  LinkedIn: { label: "LinkedIn", color: "var(--brand)" },
} satisfies ChartConfig;

const PieChartComponent = () => {
  const id = "pie-interactive";

  // Use the first category as default
  const [activeCategory, setActiveCategory] = useState(chartData[0].name);

  // Index of active slice
  const activeIndex = useMemo(
    () => chartData.findIndex((item) => item.name === activeCategory),
    [activeCategory]
  );

  // All category names for dropdown
  const categories = useMemo(() => chartData.map((item) => item.name), []);
  return (
    <div className="space-y-4">
      <ChartStyle id={id} config={chartConfig} />

      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Lead Source</h1>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="h-7 w-[140px] rounded-lg pl-2.5"
            aria-label="Select Source"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              if (!config) return null;

              const color =
                chartData.find((d) => d.name === key)?.fill ?? "#000";

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Pie Chart */}
      <ChartContainer
        id={id}
        config={chartConfig}
        className=" aspect-square w-full p-0 shadow-none"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={90}
            activeIndex={activeIndex}
            activeShape={({
              outerRadius = 0,
              innerRadius = 0,
              ...props
            }: PieSectorDataItem) => {
              const innerExtra = 24;
              const outerExtra = 20;
              const strokeWidth = 8;

              return (
                <g>
                  <Sector
                    {...props}
                    innerRadius={innerRadius - innerExtra}
                    outerRadius={outerRadius + outerExtra + strokeWidth / 2}
                    stroke="#fff"
                    strokeWidth={strokeWidth}
                  />
                </g>
              );
            }}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox && "cy" in viewBox))
                  return null;

                const activeItem = chartData[activeIndex];

                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-3xl"
                  >
                    {activeItem.value.toFixed(0)}%
                  </text>
                );
              }}
            />
          </Pie>

          {/* ✅ Center overlay circle — drawn LAST */}
          <g>
            <circle
              cx="50%"
              cy="50%"
              r={60}
              className="fill-white/10 stroke-white/20"
              strokeWidth={1}
            />
          </g>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default PieChartComponent;
