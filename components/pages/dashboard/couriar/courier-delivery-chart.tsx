"use client"

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

const deliveryData = [
  { month: "Jan", pathao: 450, streetfast: 650, redex: 420 },
  { month: "Feb", pathao: 800, streetfast: 720, redex: 480 },
  { month: "Mar", pathao: 580, streetfast: 600, redex: 450 },
  { month: "Apr", pathao: 620, streetfast: 480, redex: 380 },
  { month: "May", pathao: 780, streetfast: 720, redex: 520 },
  { month: "Jun", pathao: 720, streetfast: 820, redex: 620 },
  { month: "Jul", pathao: 920, streetfast: 750, redex: 580 },
  { month: "Aug", pathao: 650, streetfast: 780, redex: 620 },
  { month: "Sep", pathao: 720, streetfast: 580, redex: 380 },
  { month: "Oct", pathao: 820, streetfast: 920, redex: 680 },
  { month: "Nov", pathao: 1050, streetfast: 780, redex: 420 },
  { month: "Dec", pathao: 820, streetfast: 580, redex: 380 },
];

export function CourierDeliveryChart() {
  return (
    <LiquidGlass borderRadius="24px" className="rounded-3xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Courier Delivery
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#3b82f6]" />
              <span className="text-sm text-gray-300">Pathao</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
              <span className="text-sm text-gray-300">Streetfast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-gray-300">Redex</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white transition-colors hover:bg-white/10">
          <span className="font-medium">Yearly</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={deliveryData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke="#2a2a3e"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 200, 400, 600, 800, 1000, 1200]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="pathao"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="streetfast"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="redex"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </LiquidGlass>
  );
}
