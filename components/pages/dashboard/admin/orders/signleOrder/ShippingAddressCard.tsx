"use client";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderData } from "@/types/orders";

interface ShippingAddressCardProps {
    order: OrderData;
}

export function ShippingAddressCard({ order }: ShippingAddressCardProps) {
    const {
        shipping_address_tag,
        shipping_address_line1,
        shipping_address_line2,
        shipping_address_city,
        shipping_address_postcode,
        customer,
    } = order || {};

    return (
        <div className="bg-white dark:bg-muted p-6 rounded-xl shadow-md w-full">
            {/* Title */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-foreground">Shipping Address</h3>
                <Button variant="ghost" size="icon" className="text-muted-foreground cursor-pointer">
                    <Pencil className="w-4 h-4" />
                </Button>
            </div>

            {/* Address Info */}
            <div className="space-y-2">
                {/* Name & Tag */}
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                        {customer?.name ?? "N/A"}
                    </p>
                    <Badge className="text-xs bg-emerald-100 text-emerald-700">
                        {shipping_address_tag || "N/A"}
                    </Badge>
                </div>

                {/* Address Fields with Labels */}
                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        <span className="font-medium">Address Line 1:</span>{" "}
                        {shipping_address_line1 || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Address Line 2:</span>{" "}
                        {shipping_address_line2 || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">City:</span>{" "}
                        {shipping_address_city || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Postcode:</span>{" "}
                        {shipping_address_postcode || "N/A"}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {customer?.phone ?? "N/A"}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span>{" "}
                        {customer?.email ?? "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}