"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"

const liveCallMetrics = [
    {
        label: "Currently Active Calls",
        value: 24,
        color: "text-green-600",
    },
    {
        label: "Longest Running Call",
        value: "18m 23s",
        color: "text-yellow-600",
    },
    {
        label: "Waiting Queue",
        value: 5,
        color: "text-blue-600",
    },
    {
        label: "Dropped Calls",
        value: 3,
        color: "text-red-600",
    },
    {
        label: "SLA Breach",
        value: 2,
        color: "text-orange-700 font-semibold",
    },
]

const LiveCallMonitoring = () => {
    return (
        <Card className="w-full max-w-5xl mx-auto mt-6 shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">Live Call Monitoring</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {liveCallMetrics.map((item, index) => (
                        <motion.div
                            key={item.label}
                            className="rounded-lg bg-gray-100 p-4 text-center shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`text-2xl font-bold ${item.color}`}>
                                {item.value}
                            </div>
                            <div className="text-sm text-gray-700 mt-1">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LiveCallMonitoring