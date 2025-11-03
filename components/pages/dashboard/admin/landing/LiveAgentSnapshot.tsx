"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { motion } from "framer-motion"

// Dummy Data
const agentSnapshotData = {
    totalAgents: 70,
    activeNow: 62,
    onBreak: 5,
    idle: 3,
}

const LiveAgentSnapshot = () => {
    const { totalAgents, activeNow, onBreak, idle } = agentSnapshotData

    const metrics = [
        {
            label: "Total Agents",
            value: totalAgents,
            color: "text-black",
        },
        {
            label: "Active Now",
            value: activeNow,
            color: "text-green-600",
        },
        {
            label: "On Break",
            value: onBreak,
            color: "text-yellow-500",
        },
        {
            label: "Idle",
            value: idle,
            color: "text-red-500",
        },
    ]

    return (
        <Card className="w-full max-w-4xl mx-auto mt-6 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">Live Agent Activity Snapshot</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {metrics.map((item, index) => (
                        <motion.div
                            key={item.label}
                            className="rounded-md bg-gray-100 p-4 flex flex-col items-center justify-center text-center shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                            <span className={`text-2xl font-bold ${item.color}`}>
                                {item.value}
                            </span>
                            <span className="text-sm text-gray-600 mt-1">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LiveAgentSnapshot