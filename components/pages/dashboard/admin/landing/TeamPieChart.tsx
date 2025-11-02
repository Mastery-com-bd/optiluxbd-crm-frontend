"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { name: "In Pipeline", value: 400 },
    { name: "Follow Up", value: 300 },
    { name: "Schedule Service", value: 100 },
    { name: "Conversation", value: 200 },
]

const COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"]

export default function TeamPieChart() {
    return (
        <div className="bg-white rounded-md shadow p-6 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Projects By Stage</h2>
                <button className="text-sm border rounded px-3 py-1 hover:bg-gray-50">
                    Last 30 Days ▼
                </button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip /> 
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}