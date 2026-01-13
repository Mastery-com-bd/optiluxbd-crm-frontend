"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";

const performanceData = [
  { month: "Jan", conversionRate: 50, calls: 70 },
  { month: "Feb", conversionRate: 85, calls: 45 },
  { month: "Mar", conversionRate: 95, calls: 80 },
  { month: "Apr", conversionRate: 180, calls: 120 },
  { month: "May", conversionRate: 270, calls: 200 },
  { month: "Jun", conversionRate: 150, calls: 170 },
];

export function PerformanceChart() {
  const [year, setYear] = useState("2025");

  return (
    <div
      className="rounded-4xl p-6 effect"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance</h3>
        <div className="flex items-center gap-6">
          {/* Year Dropdown */}
          <button className="flex items-center gap-1 text-emerald-400">
            <span>{year}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-gray-400 text-sm">Conversion Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-gray-400 text-sm">Call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              ticks={[100, 200, 300]}
              domain={[0, 300]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 20, 50, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="conversionRate"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConversion)"
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="#facc15"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCalls)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
