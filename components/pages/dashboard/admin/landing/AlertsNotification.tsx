"use client"

import { AlertCircle, Flame, ServerCrash, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { JSX } from "react"

interface Alert {
  type: "critical" | "warning" | "info"
  title: string
  message: string
  icon?: JSX.Element
  team?: string
}

const alertsData: Alert[] = [
  {
    type: "critical",
    title: "Ticket Backlog",
    message: "Gold Team has 150+ unresolved tickets pending for more than 24 hours.",
    icon: <AlertCircle className="h-5 w-5 text-white" />,
    team: "Gold",
  },
  {
    type: "warning",
    title: "Performance Dip",
    message: "Silver Team's CSAT dropped by 14% today. Investigation needed.",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    team: "Silver",
  },
  {
    type: "info",
    title: "System Issue",
    message: "Call routing API reported a 3 sec latency spike.",
    icon: <ServerCrash className="h-5 w-5 text-white" />,
  },
  {
    type: "critical",
    title: "Abnormal Call Volume",
    message: "Bronze Team experiencing 2.5x normal call volume. Add backup agents.",
    icon: <Flame className="h-5 w-5 text-white" />,
    team: "Bronze",
  },
]

const bgColors: Record<Alert["type"], string> = {
  critical: "bg-red-600",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
}

export default function AlertsNotification() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>

      <div className="space-y-3">
        {alertsData.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex items-start gap-4 text-white px-4 py-3 rounded-md shadow-sm ${bgColors[alert.type]}`}
          >
            <div className="p-2 bg-white/20 rounded-full">
              {alert.icon}
            </div>
            <div>
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm opacity-90">{alert.message}</p>
              {alert.team && (
                <p className="text-xs mt-1 opacity-80 italic">
                  Affected Team: {alert.team}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}