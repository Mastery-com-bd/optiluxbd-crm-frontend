"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { CheckCircle, AlertCircle } from "lucide-react"

// Dummy Data
const teamData = [
    {
        teamName: "Bronze",
        totalAgents: 15,
        activeAgents: 12,
        callsToday: 420,
        avgCallTime: "3m 30s",
        resolutionRate: 78,
        csat: 4.1,
    },
    {
        teamName: "Silver",
        totalAgents: 20,
        activeAgents: 18,
        callsToday: 615,
        avgCallTime: "3m 12s",
        resolutionRate: 82,
        csat: 4.4,
    },
    {
        teamName: "Gold",
        totalAgents: 25,
        activeAgents: 23,
        callsToday: 790,
        avgCallTime: "3m 05s",
        resolutionRate: 85,
        csat: 4.6,
    },
    {
        teamName: "Platinum",
        totalAgents: 10,
        activeAgents: 9,
        callsToday: 310,
        avgCallTime: "3m 45s",
        resolutionRate: 90,
        csat: 4.7,
    },
]

// Helper badge component
const StatusBadge = ({
    value,
    type,
}: {
    value: string | number
    type: "success" | "warning" | "error"
}) => {
    const colorMap = {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
    }

    return (
        <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorMap[type]}`}
        >
            {type === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
            {type === "warning" && <AlertCircle className="w-3 h-3 mr-1" />}
            {value}
        </span>
    )
}

const getBadgeType = (percent: number): "success" | "warning" | "error" => {
    if (percent >= 85) return "success"
    if (percent >= 70) return "warning"
    return "error"
}

const getCSATType = (score: number): "success" | "warning" | "error" => {
    if (score >= 4.5) return "success"
    if (score >= 4.0) return "warning"
    return "error"
}

const TeamPerformanceOverview = () => {
    return (
        <div className="p-6 bg-white shadow border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Team Performance Overview</h2>

            <Table>
                <TableCaption className="text-sm text-muted-foreground">
                    Overview of all active support teams today
                </TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="text-sm font-semibold text-gray-600">Team</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">Total Agents</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">Active Now</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">Calls Today</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">Avg. Call Time</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">Resolution Rate</TableHead>
                        <TableHead className="text-sm font-semibold text-gray-600">CSAT Score</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {teamData.map((team) => (
                        <TableRow key={team.teamName}>
                            <TableCell className="font-medium">{team.teamName}</TableCell>
                            <TableCell>{team.totalAgents}</TableCell>
                            <TableCell>{team.activeAgents}</TableCell>
                            <TableCell>{team.callsToday}</TableCell>
                            <TableCell>{team.avgCallTime}</TableCell>
                            <TableCell>
                                <StatusBadge
                                    value={`${team.resolutionRate}%`}
                                    type={getBadgeType(team.resolutionRate)}
                                />
                            </TableCell>
                            <TableCell>
                                <StatusBadge
                                    value={`${team.csat}/5`}
                                    type={getCSATType(team.csat)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamPerformanceOverview