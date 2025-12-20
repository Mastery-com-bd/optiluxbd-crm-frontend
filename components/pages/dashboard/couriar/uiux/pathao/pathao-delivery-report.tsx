"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Clock, Package, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { day: "Mon", value: 130, trend: 130 },
  { day: "Tue", value: 195, trend: 190 },
  { day: "Wed", value: 260, trend: 255 },
  { day: "Thu", value: 290, trend: 280 },
  { day: "Fri", value: 330, trend: 320 },
  { day: "Sat", value: 370, trend: 365 },
  { day: "Sun", value: 340, trend: 330 },
];

export function DeliveryAnalytics() {
  const [period, setPeriod] = useState<"7 Days" | "30 Days">("7 Days");

  return (
    <div className="w-full ">
      {/* Header */}

      {/* Title and Period Toggle */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Delivery Analytics
          </h2>
          <p className="text-gray-400">
            Key performance indicators and delivery trends.
          </p>
        </div>
        <div className="flex items-center rounded-full p-1">
          {period !== "7 Days" ? (
            <button
              onClick={() => setPeriod("7 Days")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors
               text-gray-400 hover:text-white
              `}
            >
              7 Days
            </button>
          ) : (
            <LiquidGlass borderRadius="30px">
              <button
                onClick={() => setPeriod("7 Days")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors text-white`}
              >
                7 Days
              </button>
            </LiquidGlass>
          )}
          {period !== "30 Days" ? (
            <button
              onClick={() => setPeriod("30 Days")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors
               text-gray-400 hover:text-white
              `}
            >
              30 Days
            </button>
          ) : (
            <LiquidGlass borderRadius="30px">
              <button
                onClick={() => setPeriod("30 Days")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors text-white`}
              >
                30 Days
              </button>
            </LiquidGlass>
          )}

         
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Chart Section */}
        <LiquidGlass borderRadius="30px" className="flex-1 rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Delivery Performance
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} barCategoryGap="20%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#3d3650"
                  vertical={true}
                  horizontal={true}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  ticks={[0, 65, 130, 195, 260]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2a2438",
                    border: "1px solid #3d3650",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e89830", fontWeight: 600 }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ fill: "rgba(232,152,48,0.15)" }}
                />
                <Bar
                  dataKey="value"
                  fill="#4a4458"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="#e89830"
                  strokeWidth={3}
                  dot={{ fill: "#e89830", strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </LiquidGlass>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-[380px]">
          {/* Total Delivered */}
          <LiquidGlass className="rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#3d3650]/50 flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-green-500 text-sm font-medium">+12%</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">1,284</p>
            <p className="text-gray-400 text-sm">Total Delivered</p>
          </LiquidGlass>

          {/* On-Time Delivery */}
          <LiquidGlass className="rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1e3a5f]/50 flex items-center justify-center border-2 border-blue-500/30">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-blue-400 text-sm font-medium">+2.1%</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">94.2%</p>
            <p className="text-gray-400 text-sm">On-Time Delivery</p>
          </LiquidGlass>

          {/* Delayed Orders */}
          <LiquidGlass className="rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#4a3f2a]/50 flex items-center justify-center border-2 border-yellow-500/30">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-yellow-500 text-sm font-medium">-5%</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">43</p>
            <p className="text-gray-400 text-sm">Delayed Orders</p>
          </LiquidGlass>

          {/* Failed Attempts */}
          <LiquidGlass className="rounded-2xl p-5 ">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#4a2a2a]/50 flex items-center justify-center border-2 border-red-500/30">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">+1.5%</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">12</p>
            <p className="text-gray-400 text-sm">Failed Attempts</p>
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}
