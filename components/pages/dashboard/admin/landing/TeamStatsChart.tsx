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
} from "recharts"

const data = [
    {
        team: "Bronze",
        calls: 420,
        csat: 4.1,
        aht: 210, // seconds
    },
    {
        team: "Silver",
        calls: 615,
        csat: 4.4,
        aht: 192,
    },
    {
        team: "Gold",
        calls: 790,
        csat: 4.6,
        aht: 185,
    },
    {
        team: "Platinum",
        calls: 310,
        csat: 4.7,
        aht: 225,
    },
]

const TeamStatsChart = () => {
    return (
        <div className="lg:max-w-[50%] p-6 bg-white shadow border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Team Statistics</h2>
            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <XAxis dataKey="team" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#3b82f6" name="Total Calls" />
                    <Bar dataKey="csat" fill="#10b981" name="CSAT Score" />
                    <Bar dataKey="aht" fill="#f59e0b" name="Avg. Handling Time (sec)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TeamStatsChart