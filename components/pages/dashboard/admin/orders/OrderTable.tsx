"use client"

import { Eye, Edit, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function OrderTable() {
    const [search, setSearch] = useState("")
    const [paymentFilter, setPaymentFilter] = useState<string>("")
    const [perPage, setPerPage] = useState<number>(8)
    const [currentPage, setCurrentPage] = useState(1)

    type OrderType = {
        id: string
        date: string
        customer: {
            name: string
            email: string
            avatar: string
        }
        amount: string
        paymentStatus: "Paid" | "Failed" | "Pending"
        orderStatus: "Delivered" | "Processing" | "Cancelled" | "Shipped"
        paymentMethod: string
    }

    const dummyOrders: OrderType[] = [
        {
            id: "#WB20101",
            date: "7 May, 2025 11:45 AM",
            customer: {
                name: "Ava Martin",
                email: "ava.martin@marketplace.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$87",
            paymentStatus: "Pending",
            orderStatus: "Processing",
            paymentMethod: "MasterCard xxxx 5487",
        },
        {
            id: "#WB20102",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Paid",
            orderStatus: "Delivered",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20103",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20104",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20105",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20106",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20107",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20108",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB20109",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Paid",
            orderStatus: "Delivered",
            paymentMethod: "Paypal xxx@email.com",
        },
        {
            id: "#WB201010",
            date: "26 Apr, 2025 1:20 PM",
            customer: {
                name: "Noah Wilson",
                email: "noah.wilson@ecomsite.com",
                avatar: "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png",
            },
            amount: "$59.9",
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            paymentMethod: "Paypal xxx@email.com",
        },
    ]

    // Filtered & paginated data
    const filteredOrders = dummyOrders
        .filter(
            (order) =>
                order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
                order.id.toLowerCase().includes(search.toLowerCase())
        )
        .filter((order) => {
            if (paymentFilter === "All" || !paymentFilter) return true
            return order.paymentStatus === paymentFilter
        })

    const totalPages = Math.ceil(filteredOrders.length / perPage)

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    )

    return (
        <div className="p-4 bg-white dark:bg-muted rounded-xl border shadow-sm mt-5 transition-all">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <Input
                    placeholder="Search order..."
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex flex-wrap items-center gap-2">
                    {/* Payment Status Filter */}
                    <Select onValueChange={setPaymentFilter} defaultValue="">
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Items per page */}
                    <Select onValueChange={(val) => setPerPage(Number(val))} defaultValue="8">
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder="8" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">+ Add Order</Button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                    <thead>
                        <tr className="text-left border-b border-muted">
                            <th className="px-4 py-2">ORDER ID</th>
                            <th>DATE</th>
                            <th>CUSTOMER</th>
                            <th>AMOUNT</th>
                            <th>PAYMENT STATUS</th>
                            <th>ORDER STATUS</th>
                            <th>PAYMENT METHOD</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-muted-foreground">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-muted/40">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td>{order.date}</td>
                                    <td className="flex items-center gap-2 py-2">
                                        <Image
                                            src={order.customer.avatar}
                                            alt={order.customer.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <div>{order.customer.name}</div>
                                            <div className="text-xs text-gray-500 hidden sm:block">
                                                {order.customer.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.amount}</td>
                                    <td>
                                        <span
                                            className={`text-sm font-medium ${order.paymentStatus === "Paid"
                                                ? "text-green-600"
                                                : order.paymentStatus === "Pending"
                                                    ? "text-yellow-500"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-medium ${order.orderStatus === "Delivered"
                                                ? "bg-green-100 text-green-600"
                                                : order.orderStatus === "Shipped"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : order.orderStatus === "Cancelled"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td>{order.paymentMethod}</td>
                                    <td className="space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <p>
                    Showing {(currentPage - 1) * perPage + 1} to{" "}
                    {Math.min(currentPage * perPage, filteredOrders.length)} of{" "}
                    {filteredOrders.length} orders
                </p>
                <div className="flex gap-1">
                    {/* Prev Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="rounded-md"
                    >
                        {"<"}
                    </Button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
                            className={`w-8 h-8 text-sm font-medium rounded-md border 
          ${currentPage === idx + 1
                                    ? "bg-orange-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-muted dark:text-muted-foreground"
                                }`}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="rounded-md"
                    >
                        {">"}
                    </Button>
                </div>
            </div>
        </div>
    )
}