"use client"


import { LiquidGlass } from "@/components/glassEffect/liquid-glass"
import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"

const data = [
  { name: "Closing\nKings", value: 35 },
  { name: "Sales\nNinja", value: 48 },
  { name: "Closing\nKings", value: 86 },
  { name: "Deal\nDragons", value: 28 },
  { name: "Catalyst\nCrew", value: 30 },
]

export default function WeeklyAttendanceChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className="w-[40%]  effect rounded-4xl p-8 relative overflow-hidden"
      
    >
      {/* Header */}
      <h2 className="text-white text-2xl font-medium mb-8">Weekly Attendance</h2>

      {/* Chart */}
      <div className="h-[370px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 20, left: 0, bottom: 60 }}
            barCategoryGap="25%"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.1)" vertical={false} horizontal={true} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13 }}
              dy={10}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
              tickFormatter={(value) => value.replace("\n", " ")}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13 }}
              tickFormatter={(value) => (value === 0 ? "0" : `${value}%`)}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              dx={-10}
            />
            <Bar
              dataKey="value"
              radius={[20, 20, 20, 20]}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              /* label={({ x, y, width, value, index }) => {
                if (index !== hoveredIndex) return null
                return (
                  <text x={x + width / 2} y={y - 10} textAnchor="middle" fill="white" fontSize={14} fontWeight={500}>
                    {value}%
                  </text>
                )
              }} */

            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredIndex === index ? "#d4a855" : "#a8a3b3"}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
