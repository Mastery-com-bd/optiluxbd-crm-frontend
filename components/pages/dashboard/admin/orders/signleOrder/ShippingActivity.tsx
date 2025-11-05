"use client"

import { cn } from "@/lib/utils"

type TrackingEvent = {
    status: string
    timestamp: string
    trackingNumber: string
    description: string
    by: string
    active?: boolean
}

const trackingEvents: TrackingEvent[] = [
    {
        status: "Pending Delivery",
        timestamp: "Today, 9:00 AM",
        trackingNumber: "TRK123456789",
        description: "The package is out for delivery and will reach you shortly.",
        by: "Delivery Agent",
        active: true,
    },
    {
        status: "Out for Delivery",
        timestamp: "Today, 7:00 AM",
        trackingNumber: "TRK123456789",
        description: "Courier picked up the package for final delivery.",
        by: "Local Courier",
    },
    {
        status: "Arrived at Local Hub",
        timestamp: "Yesterday, 3:15 PM",
        trackingNumber: "TRK123456789",
        description: "Shipment arrived at the nearest delivery center.",
        by: "Sorting Facility",
    },
    {
        status: "Departed Transit Facility",
        timestamp: "Monday, 6:00 PM",
        trackingNumber: "TRK123456789",
        description: "Package left the main transit distribution hub.",
        by: "Central Logistics",
    },
    {
        status: "Arrived at Transit Facility",
        timestamp: "Monday, 8:00 AM",
        trackingNumber: "TRK123456789",
        description: "Package arrived at the central hub for processing.",
        by: "Transit Center",
    },
    {
        status: "Dispatched from Warehouse",
        timestamp: "Last Saturday, 2:00 PM",
        trackingNumber: "TRK123456789",
        description: "Package dispatched by carrier from fulfillment center.",
        by: "Fulfillment Center",
    },
    {
        status: "Order Confirmed",
        timestamp: "Last Friday, 5:00 PM",
        trackingNumber: "TRK123456789",
        description: "The order was successfully placed and is now being processed.",
        by: "Order System",
    },
]

export function ShippingActivity() {
    return (
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full mt-6">
            <h3 className="text-md font-semibold mb-6 text-foreground">Shipping Activity</h3>
            <div className="relative border-l border-muted/40 pl-5 space-y-10">
                {trackingEvents.map((event, index) => (
                    <div key={index} className="relative group">
                        {/* Timeline dot */}
                        <div
                            className={cn(
                                "absolute -left-2.5 top-1 h-3 w-3 rounded-full border-2",
                                event.active
                                    ? "bg-emerald-500 border-emerald-500 shadow-lg"
                                    : "bg-muted border-white"
                            )}
                        />

                        {/* Event Content */}
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                            <p className="text-sm font-semibold text-foreground">{event.status}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <p className="text-sm text-muted-foreground">
                                Tracking No:{" "}
                                <a
                                    href="#"
                                    className="text-sky-600 font-medium hover:underline underline-offset-2"
                                >
                                    {event.trackingNumber}
                                </a>
                            </p>
                            <p className="text-xs text-muted-foreground">By {event.by}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}