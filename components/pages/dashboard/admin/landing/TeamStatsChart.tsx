'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const data = [
    {
        team: 'Bronze',
        calls: 1420,
        csat: 774.1,
        aht: 230, // seconds
    },
    {
        team: 'Silver',
        calls: 1815,
        csat: 544.4,
        aht: 210,
    },
    {
        team: 'Gold',
        calls: 2190,
        csat: 674.6,
        aht: 195,
    },
    {
        team: 'Platinum',
        calls: 1350,
        csat: 465.7,
        aht: 240,
    },
]

const TeamStatsChart = () => {
    return (
        <div className="w-full bg-white p-6 shadow border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Team Statistics Overview</h2>

            {/* Scroll if needed on smaller screens */}
            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="team" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="calls" fill="#3b82f6" name="Total Calls" />
                        <Bar dataKey="csat" fill="#10b981" name="CSAT Score" />
                        <Bar
                            dataKey="aht"
                            fill="#f59e0b"
                            name="Avg. Handling Time (sec)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TeamStatsChart