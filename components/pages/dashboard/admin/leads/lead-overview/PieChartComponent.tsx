"use client";
import { type ChartConfig } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import ReusablePieChart from "@/components/ui/ReusablePieChart";

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
  const [activeCategory, setActiveCategory] = useState(chartData[0].name);
  const categories = useMemo(() => chartData.map((item) => item.name), []);

  return (
    <div className="space-y-4">
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
          <SelectContent
            align="end"
            className="rounded-xl bg-white/10 backdrop-blur-2xl"
          >
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

      <ReusablePieChart
        id="pie-interactive"
        chartData={chartData}
        valueKey="value"
        nameKey="name"
        activeCategoryKey="name"
        activeCategory={activeCategory}
      />
    </div>
  );
};

export default PieChartComponent;
