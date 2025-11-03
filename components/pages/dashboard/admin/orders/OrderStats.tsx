"use client"
import {
    CheckCircle,
    Hourglass,
    XCircle,
    ShoppingCart,
    RefreshCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"

type StatCardProps = {
    value: string
    label: string
    icon: React.ReactNode
    change: string
    isPositive: boolean
}

const statData: StatCardProps[] = [
    {
        value: "91k",
        label: "Completed Orders",
        icon: <CheckCircle className="text-green-500" size={28} />,
        change: "+3.34%",
        isPositive: true,
    },
    {
        value: "557",
        label: "Pending Orders",
        icon: <Hourglass className="text-yellow-500" size={28} />,
        change: "-1.12%",
        isPositive: false,
    },
    {
        value: "269",
        label: "Canceled Orders",
        icon: <XCircle className="text-red-500" size={28} />,
        change: "-0.75%",
        isPositive: false,
    },
    {
        value: "9k",
        label: "New Orders",
        icon: <ShoppingCart className="text-sky-500" size={28} />,
        change: "+4.22%",
        isPositive: true,
    },
    {
        value: "8,741",
        label: "Returned Orders",
        icon: <RefreshCcw className="text-purple-500" size={28} />,
        change: "+0.56%",
        isPositive: true,
    },
]

const StatCard = ({ value, label, icon, change, isPositive }: StatCardProps) => (
    <div className="flex flex-col justify-between w-full sm:w-[48%] lg:w-[19%] bg-white dark:bg-muted p-4 rounded-xl shadow-sm border border-muted/30">
        <div className="flex justify-between items-center">
            <div>
                <div className="text-2xl font-semibold">{value}</div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{label}</p>
            </div>
            <div className="ml-4">{icon}</div>
        </div>
        <div
            className={cn(
                "mt-3 text-xs font-medium px-2 py-0.5 w-fit rounded-full",
                isPositive ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            )}
        >
            {change}
        </div>
    </div>
)

export function OrderStats() {
    return (
        <div className="flex flex-wrap gap-4 w-full">
            {statData.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}