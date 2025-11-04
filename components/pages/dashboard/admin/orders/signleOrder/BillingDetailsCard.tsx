"use client"

import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type BillingDetailsProps = {
    customerName: string
    address: string[]
    cardType: string
    cardLast4: string
    cardExpiry: string
    status: "Paid" | "Pending" | "Failed"
}

const statusMap = {
    Paid: {
        label: "Paid",
        className: "bg-emerald-100 text-emerald-700",
    },
    Pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
    },
    Failed: {
        label: "Failed",
        className: "bg-red-100 text-red-700",
    },
}

// Dummy data (replace later with dynamic props)
const billingData: BillingDetailsProps = {
    customerName: "John Doe",
    address: [
        "5678 Oak Avenue",
        "Suite 101",
        "Chicago, IL 60611",
        "United States",
    ],
    cardType: "Mastercard",
    cardLast4: "4242",
    cardExpiry: "08/26",
    status: "Paid",
}

export function BillingDetailsCard() {
    const statusStyle = statusMap[billingData.status]

    return (
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-foreground">Billing Details</h3>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Pencil className="w-4 h-4" />
                </Button>
            </div>

            {/* User and address */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{billingData.customerName}</p>
                    <Badge className="text-xs bg-blue-100 text-blue-700">Billing Address</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    {billingData.address.map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>

            <hr className="my-4 border-muted" />

            {/* Card Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src="https://i.ibb.co.com/Xfx69qYG/icon-256x256.png"
                        alt="card logo"
                        width={36}
                        height={24}
                        className="object-contain"
                    />
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            {billingData.cardType} Ending in {billingData.cardLast4}
                        </p>
                        <p className="text-xs text-muted-foreground">Expiry: {billingData.cardExpiry}</p>
                    </div>
                </div>

                <Badge className={`text-xs ${statusStyle.className}`}>{statusStyle.label}</Badge>
            </div>
        </div>
    )
}