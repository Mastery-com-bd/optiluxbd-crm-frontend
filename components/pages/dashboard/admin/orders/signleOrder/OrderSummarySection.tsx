"use client";

import { CalendarDays, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { OrderData } from "@/types/orders";

const shippingFee = 10.0;

export function OrderSummarySection({ order }: { order: OrderData }) {
    const product = order?.product;
    const qty = order?.quantity || 1;

    const price = product?.price ?? 0;
    const subtotal = price * qty;

    const commission = order?.commission ?? 0;
    const totalAmount = order?.totalAmount ?? 0;

    const tax = totalAmount - subtotal;
    const finalAmount = totalAmount + shippingFee;

    const formattedDate = new Date(order?.orderDate).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <div className="bg-white dark:bg-muted p-6 rounded-lg shadow-md w-full">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Order{" "}
                        <span className="text-muted-foreground">
                            #WB{order?.id ?? "XXXX"}
                        </span>
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formattedDate}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <Badge className="bg-emerald-100 text-emerald-700">Paid</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Shipped</Badge>
                    {/* <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Modify
                    </Button> */}
                </div>
            </div>

            <hr className="my-4 border-muted" />

            <div>
                <h3 className="text-md font-semibold mb-2">Order Summary</h3>
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[600px] text-sm border">
                        <thead>
                            <tr className="bg-muted/50 text-muted-foreground text-left">
                                <th className="px-4 py-2 font-medium">Product</th>
                                <th className="px-4 py-2 font-medium">Price</th>
                                <th className="px-4 py-2 font-medium">Qty</th>
                                <th className="px-4 py-2 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b last:border-none">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src="https://i.ibb.co.com/Xfx69qYG/icon-256x256.png"
                                            alt={product?.name || "N/A"}
                                            width={40}
                                            height={40}
                                            className="rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{product?.name ?? "N/A"}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">${price}</td>
                                <td className="px-4 py-3">{qty}</td>
                                <td className="px-4 py-3 font-medium">
                                    ${(price * qty)}
                                </td>
                            </tr>

                            {/* Summary Footer */}
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Subtotal
                                </td>
                                <td className="px-4 py-2">${subtotal}</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Tax
                                </td>
                                <td className="px-4 py-2">${tax}</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Commission
                                </td>
                                <td className="px-4 py-2 text-red-500">-${commission}</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Shipping Fee
                                </td>
                                <td className="px-4 py-2">${shippingFee}</td>
                            </tr>

                            <tr className="bg-muted/10">
                                <td colSpan={3} className="px-4 py-2 text-right font-semibold">
                                    GRAND TOTAL
                                </td>
                                <td className="px-4 py-2 font-bold text-foreground">
                                    ${finalAmount}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}