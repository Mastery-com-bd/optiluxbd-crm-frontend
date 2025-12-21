"use client";

import { useGetCustomerAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useParams } from "next/navigation";
import Loading from "@/components/pages/shared/Loading";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import PaginationControls from "@/components/ui/paginationComponent";
import Link from "next/link";
import { useState } from "react";
import { OrderData } from "@/types/orders";

const TotalOrderTable = () => {
    const { customerId } = useParams();
    const [filters, setFilters] = useState({
        customerId,
        limit: 10,
        page: 1,
    });

    const { data, isLoading } = useGetCustomerAllOrdersQuery(filters);
    const orders: OrderData[] = data?.data?.orders || [];
    const pagination = data?.data?.pagination || { page: 1, totalPages: 1, total: 0 };

    const formatCurrency = (n: number | string) =>
        new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
        }).format(Number(n));

    const formatDate = (d: string | Date) =>
        new Date(d).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="p-4 my-1 transition-all w-full overflow-x-auto">
            {isLoading ? (
                <div className="w-full flex justify-center py-5">
                    <Loading />
                </div>
            ) : (
                <div className="w-full rounded-xl border shadow-sm p-4 bg-muted/40">
                    <table className="w-full rounded-xl text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/40">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Product</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Quantity</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Total Amount</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Commission</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Commission Rate</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: OrderData) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-border hover:bg-muted/20 transition-colors"
                                    >
                                        <td className="px-4 py-3 font-medium">{order.id}</td>
                                        <td className="px-4 py-3">{formatDate(order.orderDate)}</td>
                                        {/* {order?.product?.name ?? `Product ${order.productId}`} */}
                                        <td className="px-4 py-3">product name</td>
                                        <td className="px-4 py-3 text-right">{order.quantity}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(order.totalAmount)}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(order.commission)}</td>
                                        <td className="px-4 py-3 text-right">{order.commissionRate}%</td>
                                        <td className="px-4 py-3 text-center">
                                            <Link href={`/dashboard/admin/orders/${order.id}`} passHref>
                                                <Button variant="ghost" size="icon" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <PaginationControls
                        pagination={pagination}
                        onPrev={() =>
                            setFilters((f) => ({
                                ...f,
                                page: Math.max(1, f.page - 1),
                            }))
                        }
                        onNext={() =>
                            setFilters((f) => ({
                                ...f,
                                page: f.page + 1,
                            }))
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default TotalOrderTable;