"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Customer } from "@/types/orders";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type Props = {
    customer: Customer;
};

export function CustomerDetailsCard({ customer }: Props) {
    return (
        <Card className="bgGlass p-6 rounded-xl shadow-md w-full ">
            {/* Title */}
            <div className="flex justify-between items-center ">
                <h3 className="text-md font-medium text-foreground">Customer Details</h3>
            </div>

            {/* Customer Info */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src="https://i.ibb.co.com/kJq7275/user6.png"
                        alt="Customer Avatar"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-foreground">{customer?.name}</p>
                            <span className="text-xl">BD</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer?.email || "email not provided"}</p>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
                {/* <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{customer?.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{customer?.phone || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{customer?.location || "N/A"}</span>
                </div> */}
                <Link href={`/dashboard/admin/orders/3/${customer?.id}`}>
                    Customer Order Details
                </Link>
            </div>
        </Card>
    )
}