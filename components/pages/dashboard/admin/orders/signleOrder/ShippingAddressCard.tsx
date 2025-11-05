"use client"

import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ShippingAddressCard() {
    return (
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full">
            {/* Title */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-foreground">Shipping Address</h3>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Pencil className="w-4 h-4" />
                </Button>
            </div>

            {/* Google Map */}
            <div className="rounded-md overflow-hidden border mb-4">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps?q=Khulna&output=embed"
                    width="100%"
                    height="200"
                    loading="lazy"
                    className="border-0"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Address Info */}
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <Badge className="text-xs bg-emerald-100 text-emerald-700">Primary Address</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    1234 Elm Street, <br />
                    Apt 567,<br />
                    Springfield, IL 62704,<br />
                    United States
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                    <p><span className="font-medium">Phone:</span> (123) 456-7890</p>
                    <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                </div>
            </div>

            {/* Delivery Instructions */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-sm rounded-md">
                <p className="font-medium text-amber-900 mb-1">Delivery Instructions:</p>
                <p className="text-amber-800">
                    Please leave the package at the front door if no one is home. Call upon arrival.
                </p>
            </div>
        </div>
    )
}