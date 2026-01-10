"use client"

import { ChartConfig } from "@/components/ui/chart";
import ReusablePieChart from "@/components/ui/ReusablePieChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";

const chartData = [
    { name: "Processing", value: 25, fill: "#1EAAE7" },
    { name: "Returned", value: 30, fill: "#6418C3" },
    { name: "Delivered", value: 20, fill: "#2BC155" },
    { name: "Cancelled", value: 15, fill: "#FF7A30" },
    { name: "Pending", value: 10, fill: "#DE9C3A" },
];
const chartConfig = {
    Processing: { label: "Processing", color: "#1EAAE7" },
    Returned: { label: "Returned", color: "#6418C3" },
    Delivered: { label: "Delivered", color: "#2BC155" },
    Cancelled: { label: "Cancelled", color: "#FF7A30" },
    Pending: { label: "Pending", color: "#DE9C3A" },
} satisfies ChartConfig;
export function OrderStatusRatio() {
    const [activeCategory, setActiveCategory] = useState(chartData[0].name);
    const categories = useMemo(() => chartData.map((item) => item.name), []);

    return (
        <div className="space-y-4 effectBlack rounded-[12px] h-full p-4">
            {/* header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Order Status Ratio</h1>
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
}