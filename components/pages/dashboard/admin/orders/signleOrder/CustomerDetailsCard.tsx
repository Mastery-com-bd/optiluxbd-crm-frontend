"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Customer } from "@/types/orders";
import Link from "next/link";

type Props = {
    customer: Customer;
};

export function CustomerDetailsCard({ customer }: Props) {
    console.log(customer);
    return (
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full ">
            {/* Title */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-md font-medium text-foreground">Customer Details</h3>
            </div>

            {/* Customer Info */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src="https://i.ibb.co.com/Xfx69qYG/icon-256x256.png"
                        alt="Customer Avatar"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-foreground">Sophia Carter</p>
                            <span className="text-xl">BD</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Since 2020</p>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>sophia@designhub.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>+44 7911 123456</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>London, UK</span>
                </div>
                <Link href={`/dashboard/admin/orders/3/${customer?.id}`}>
                    <Button>See Customer Order Details</Button>
                </Link>
            </div>
        </div>
    )
}