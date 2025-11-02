"use client"

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type Metric = {
    label: string;
    value: string | number;
    color?: string;
};

const metrics: Metric[] = [
    {
        label: "Total Calls",
        value: 2135,
        color: "text-blue-700",
    },
    {
        label: "Resolved",
        value: 1780,
        color: "text-green-600",
    },
    {
        label: "Unresolved",
        value: 134,
        color: "text-red-500",
    },
    {
        label: "Pending Follow-ups",
        value: 221,
        color: "text-yellow-500",
    },
    {
        label: "Avg. CSAT (All Teams)",
        value: "4.5/5",
        color: "text-indigo-600",
    },
    {
        label: "SLA Compliance",
        value: "94%",
        color: "text-green-700",
    },
    {
        label: "First Call Resolution",
        value: "82%",
        color: "text-cyan-600",
    },
];

const TodaySummaryMetrics = () => {
    return (
        <Card className="w-full shadow-md p-4 px-5 border border-gray-200 bg-white">
            <h2 className="text-lg font-semibold mb-4">Today’s Summary Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {metrics.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="p-4 rounded-md border border-gray-100 shadow-sm bg-gray-50"
                    >
                        <div className={`${item.color} text-2xl font-bold`}>
                            {item.value}
                        </div>
                        <div className="text-sm text-gray-600">{item.label}</div>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
};

export default TodaySummaryMetrics;