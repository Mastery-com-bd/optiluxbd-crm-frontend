"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";

const chartData = [
  { time: "10 AM", admin: 40, agent: 25, pending: 15 },
  { time: "12 PM", admin: 60, agent: 40, pending: 20 },
  { time: "2 PM", admin: 55, agent: 35, pending: 18 },
  { time: "4 PM", admin: 70, agent: 50, pending: 22 },
  { time: "6 PM", admin: 65, agent: 45, pending: 30 },
  { time: "8 PM", admin: 50, agent: 30, pending: 25 },
];

const chartConfig = {
  admin: {
    label: "Received from Admin",
  },
  agent: {
    label: "Assigned To Agents",
  },
  pending: {
    label: "Pending Assignment",
  },
} satisfies ChartConfig;

const buttonName = ["Today", "This Week"];

const DailyChartSection = () => {
  const [isActive, setIsActive] = useState(buttonName[0]);

  return (
    <div className="rounded-3xl border border-[rgba(255,255,255,0.15)]  bg-[rgba(255,255,255,0.03)] p-5 overflow-hidden space-y-6">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Daily Lead Track</h1>
          <p className="text-[#B4B4B8]">
            Track new leads, contacted, and converted
          </p>
        </div>

        <div className="space-x-2">
          {buttonName.map((button, i) => {
            const active = button === isActive;
            return (
              <button
                key={i}
                onClick={() => setIsActive(button)}
                className={`px-3 py-2 text-sm font-medium rounded-2xl text-center cursor-pointer ${
                  active
                    ? "bg-[#DE9C3A] text-white "
                    : " bg-white/10 text-[#B4B4B8]"
                }`}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
      {/* indicator */}
      <div className="flex items-center gap-6">
        <p className="flex items-center gap-3">
          <span className="bg-[#2B7FFF] h-3 w-3 rounded-full" />
          <span className="text-[#B4B4B8] text-sm">Received from Admin</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="bg-success h-3 w-3 rounded-full" />
          <span className="text-[#B4B4B8] text-sm">Assigned To Agents</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="bg-[#FF6B00] h-3 w-3 rounded-full" />
          <span className="text-[#B4B4B8] text-sm">Pending Assignment</span>
        </p>
      </div>

      <div className="w-full h-[50vh]">
        {" "}
        {/* fixed height, full width */}
        <ChartContainer
          config={chartConfig}
          className="w-full h-full shadow-none p-0"
        >
          <BarChart
            data={chartData}
            accessibilityLayer
            height={200}
            width={600}
          >
            <CartesianGrid horizontal={false} vertical={false} />

            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="admin" fill="#2B7FFF" radius={4} barSize={50} />
            <Bar dataKey="agent" fill="#0CAF60" radius={4} barSize={50} />
            <Bar dataKey="pending" fill="#FF6B00" radius={4} barSize={50} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
export default DailyChartSection;
