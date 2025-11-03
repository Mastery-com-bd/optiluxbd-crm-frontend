"use client"

import { Trash2, CalendarDays, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type ProductItem = {
    name: string
    brand: string
    image: string
    price: number
    qty: number
}

const products: ProductItem[] = [
    {
        name: "Wireless Earbuds",
        brand: "My Furniture",
        image: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
        price: 79.99,
        qty: 2,
    },
    {
        name: "Smart Watch",
        brand: "Tech World",
        image: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
        price: 199.0,
        qty: 1,
    },
    {
        name: "Gaming Funkey Shoes",
        brand: "Pro Gamerz",
        image: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
        price: 49.5,
        qty: 3,
    },
]

const taxRate = 0.1
const discountRate = 0.05
const shippingFee = 10.0

export function OrderSummarySection() {
    const subtotal = products.reduce((acc, item) => acc + item.price * item.qty, 0)
    const tax = subtotal * taxRate
    const discount = subtotal * discountRate
    const grandTotal = subtotal + tax - discount + shippingFee

    return (
        <div className="bg-white dark:bg-muted p-6 rounded-lg shadow-md w-full">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Order <span className="text-muted-foreground">#WB20100</span>
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        24 Apr, 2025 10:10 AM
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <Badge className="bg-emerald-100 text-emerald-700">Paid</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Shipped</Badge>
                    <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Modify
                    </Button>
                    <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <hr className="my-4 border-muted" />

            <div>
                <h3 className="text-md font-semibold mb-2">Order Summary</h3>

                {/* Responsive Table */}
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
                            {products.map((item, i) => (
                                <tr key={i} className="border-b last:border-none">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={40}
                                                height={40}
                                                className="rounded object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">by: {item.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                                    <td className="px-4 py-3">{item.qty}</td>
                                    <td className="px-4 py-3 font-medium">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </td>
                                </tr>
                            ))}

                            {/* Summary Footer */}
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Subtotal
                                </td>
                                <td className="px-4 py-2">${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Tax (10%)
                                </td>
                                <td className="px-4 py-2">${tax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Discount (5%)
                                </td>
                                <td className="px-4 py-2 text-red-500">-${discount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground">
                                    Shipping fee
                                </td>
                                <td className="px-4 py-2">${shippingFee.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-muted/10">
                                <td colSpan={3} className="px-4 py-2 text-right font-semibold">
                                    GRAND TOTAL
                                </td>
                                <td className="px-4 py-2 font-bold text-foreground">
                                    ${grandTotal.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}