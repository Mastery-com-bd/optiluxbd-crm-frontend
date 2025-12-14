"use client"


import { LiquidGlass } from "@/components/glassEffect/liquid-glass"
import { useState } from "react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { date: "01 Aug", value: 58 },
  { date: "02 Aug", value: 73 },
  { date: "03 Aug", value: 58 },
  { date: "04 Aug", value: 75 },
  { date: "07 Aug", value: 91 },
  { date: "08 Aug", value: 55 },
  { date: "09 Aug", value: 73 },
  { date: "10 Aug", value: 40 },
  { date: "11 Aug", value: 62 },
  { date: "14 Aug", value: 73 },
  { date: "15 Aug", value: 60 },
  { date: "16 Aug", value: 42 },
]

type FilterType = "Daily" | "Weekly" | "Monthly"

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  coordinate?: { x: number; y: number }
}

const CustomTooltip = ({ active, payload, coordinate }: CustomTooltipProps) => {
  if (active && payload && payload.length && coordinate) {
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: coordinate.x,
          top: coordinate.y - 35,
          transform: "translateX(-50%)",
        }}
      >
        <span className="text-white text-sm font-medium">{payload[0].value}%</span>
      </div>
    )
  }
  return null
}

interface CustomDotProps {
  cx?: number
  cy?: number
  payload?: { value: number }
}

const CustomDot = ({ cx, cy }: CustomDotProps) => {
  if (cx === undefined || cy === undefined) return null
  return <circle cx={cx} cy={cy} r={5} fill="#2a2438" stroke="#d4a855" strokeWidth={2} />
}

const CustomActiveDot = ({ cx, cy, payload }: CustomDotProps) => {
  if (cx === undefined || cy === undefined) return null
  return (
    <g>
      {/* Vertical highlight bar */}
      <defs>
        <linearGradient id="verticalGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a855" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#d4a855" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={cx - 15} y={cy} width={30} height={300} fill="url(#verticalGradient)" rx={15} />
      {/* Active dot */}
      <circle cx={cx} cy={cy} r={7} fill="#d4a855" />
      <circle cx={cx} cy={cy} r={4} fill="#2a2438" />
      {/* Value label */}
      <text x={cx} y={cy - 20} textAnchor="middle" fill="white" fontSize={14} fontWeight={500}>
        {payload?.value}%
      </text>
    </g>
  )
}

export default function AttendanceChart() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Daily")

  const filters: FilterType[] = ["Daily", "Weekly", "Monthly"]

  return (
    <LiquidGlass
      className="w-[750px] p-8 relative overflow-hidden"
      
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-medium">Attendance Comparison Chart</h2>
        <div className="flex items-center gap-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <span
                className={`w-3 h-3 rounded-full border-2 ${
                  activeFilter === filter ? "bg-[#d4a855] border-[#d4a855]" : "bg-transparent border-gray-400"
                }`}
              />
              <span className={activeFilter === filter ? "text-[#d4a855]" : "text-gray-300"}>{filter}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%" >
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="areaGradient" className="overflow-hidden" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a855" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#d4a855" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.08)" vertical={true} horizontal={true} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 13 }} dy={15} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13 }}
              tickFormatter={(value) => (value === 0 ? "0" : `${value}%`)}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
            className="aaaaaaaaaaaaaaaaaaaaaaaa"
              type="monotone"
              dataKey="value"
              stroke="#d4a855"
              strokeWidth={3}
              fill="url(#areaGradient)"
              dot={<CustomDot />}
              activeDot={<CustomActiveDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </LiquidGlass>
  )
}
