"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

export const description = "A linear area chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 114 },
    { month: "July", desktop: 514 },
    { month: "August", desktop: 714 },
    { month: "September", desktop: 114 },
    { month: "October", desktop: 244 },
    { month: "November", desktop: 264 },
    { month: "December", desktop: 294 },
]

const chartConfig = {
    desktop: {
        label: "Orders",
        color: "#FFD700",
    },
} satisfies ChartConfig

export function MonthlyOrder() {
    return (
        <Card className="rounded-2xl bgGlass p-4 border border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle>Monthly Orders</CardTitle>
                <CardDescription>
                    Showing total orders for the last 12 months
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="#FC5D23"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="80%"
                                    stopColor="#FC5D10"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#ffffff30"
                            strokeDasharray="6 6"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value: string) => value.slice(0, 3)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent indicator="dot" hideLabel={true} />
                            }
                        />

                        <Area
                            dataKey="desktop"
                            type="linear"
                            stroke="#FFB13F"
                            strokeWidth={2.5}
                            fill="url(#lineGradient)"
                            dot={{
                                r: 3.5,
                                stroke: "#fff",
                                strokeWidth: 1.5,
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                                stroke: "#FC5D23",
                                strokeWidth: 2,
                                fill: "#1a1a2e",
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}