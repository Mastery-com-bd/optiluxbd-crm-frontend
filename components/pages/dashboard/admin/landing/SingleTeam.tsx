"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Dummy team data
const teamsData = [
    { teamName: "Bronze", agents: 10, callsToday: 320, avgTime: "3.6 min" },
    { teamName: "Silver", agents: 15, callsToday: 450, avgTime: "3.2 min" },
    { teamName: "Gold", agents: 20, callsToday: 600, avgTime: "3.0 min" },
    { teamName: "Platinum", agents: 8, callsToday: 280, avgTime: "3.8 min" },
]

const SingleTeam = () => {
    const handleClick = (teamName: string) => {
        alert(`Details for ${teamName} Team coming soon!`)
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Team Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamsData.map((team, index) => (
                    <Card key={index} className="hover:shadow-md transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{team.teamName} Team</CardTitle>
                        </CardHeader>

                        <CardContent className="text-sm text-gray-700 space-y-1">
                            <p>Total Agents: {team.agents}</p>
                            <p>Calls Today: {team.callsToday}</p>
                            <p>Avg Call Time: {team.avgTime}</p>

                            <Button
                                onClick={() => handleClick(team.teamName)}
                                className="mt-4 w-full"
                                variant="secondary"
                            >
                                View More Details →
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SingleTeam