'use client';

import Loading from '@/components/pages/shared/Loading';
import { Button } from '@/components/ui/button';
import PaginationControls from '@/components/ui/paginationComponent';
import { useGetAgentOrdersQuery } from '@/redux/features/orders/ordersApi';
import { OrderItem } from '@/types/orders';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Helper function: Format Date
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

// Helper function: Format money 💰
const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `$${num.toFixed(2)}`;
};

const AgentOrderTable = () => {
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
    });

    const { data, isLoading } = useGetAgentOrdersQuery(filters);
    const { orders = [], pagination = { page: 1, totalPages: 1, total: 0 } } = data?.data || {};

    return (
        <div className="p-4 bg-white dark:bg-muted/40 rounded-xl border shadow-sm mt-5 transition-all">
            <div className="w-full overflow-x-auto">
                {isLoading ? (
                    <div className="mx-auto w-full">
                        <Loading />
                    </div>
                ) : (
                    <table className="w-full min-w-[900px] text-sm text-foreground">
                        <thead>
                            <tr className="border-b border-border bg-muted text-muted-foreground uppercase text-xs font-semibold">
                                <th className="px-4 py-3 text-left">
                                    <input type="checkbox" className="rounded border-border" />
                                </th>
                                <th className="px-4 py-3 text-left">Order ID</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Customer</th>
                                <th className="px-4 py-3 text-right">Item</th>
                                <th className="px-4 py-3 text-right">Qty</th>
                                <th className="px-4 py-3 text-right">Total</th>
                                <th className="px-4 py-3 text-right">Commission</th>
                                <th className="px-4 py-3 text-right">Rate</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-6 text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: OrderItem) => {
                                    // order.product?.name ?? order.package?.name ??
                                    const itemLabel = 'product name';
                                    const customerName = order.customer?.name ?? `Customer ${order.customerId}`;
                                    return (
                                        <tr key={order.id} className="border-b border-muted hover:bg-muted/40 transition-colors">
                                            <td className="px-4 py-3">
                                                <input type="checkbox" className="rounded border-border" />
                                            </td>
                                            <td className="px-4 py-3 font-medium">{order.id}</td>
                                            <td className="px-4 py-3">{formatDate(order.orderDate)}</td>
                                            <td className="px-4 py-3">{customerName}</td>
                                            <td className="px-4 py-3 text-right">{itemLabel}</td>
                                            <td className="px-4 py-3 text-right">{order.quantity}</td>
                                            <td className="px-4 py-3 text-right">{formatCurrency(order.totalAmount)}</td>
                                            <td className="px-4 py-3 text-right">{formatCurrency(order.commission)}</td>
                                            <td className="px-4 py-3 text-right">{order.commissionRate}%</td>
                                            <td className="px-4 py-3 text-center">
                                                <Link
                                                    href={`/dashboard/admin/orders/${order.id}`}
                                                    title="View Order"
                                                >
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <PaginationControls
                pagination={pagination}
                onPrev={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}
                onNext={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            />
        </div>
    );
};

export default AgentOrderTable;