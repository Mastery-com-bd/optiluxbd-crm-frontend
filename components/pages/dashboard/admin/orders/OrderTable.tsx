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
import PaginationControls from "@/components/ui/paginationComponent"
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi"

export function OrderTable() {
    const [filters, setFilters] = useState({
        sortBy: "created_at",
        limit: 10,
        page: 1,
    });
    const [page, setPage] = useState(1);
    const { data: orders } = useGetAllOrdersQuery(filters);
    const pagination = { page: 1, totalPages: 1, total: 0 }
    console.log(orders);
    return (
        <div className="p-4 bg-white dark:bg-muted rounded-xl border shadow-sm mt-5 transition-all">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                {/* <Input
                    placeholder="Search order..."
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setFilters(e.target.value)}
                /> */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Payment Status Filter */}
                    {/* <Select onValueChange={setPaymentFilter} defaultValue="">
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                    </Select> */}

                    {/* Items per page */}
                    <Select onValueChange={(val) => { console.log(val) }} defaultValue="8">
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
                    {/* <tbody>
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
                    </tbody> */}
                </table>
            </div>

            {/* Pagination */}
            <PaginationControls
                pagination={pagination}
                onPrev={() => setPage((p) => Math.max(p - 1, 1))}
                onNext={() => setPage((p) => p + 1)}
            />
        </div>
    )
}