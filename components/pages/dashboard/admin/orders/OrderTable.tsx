"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "@/redux/features/orders/ordersApi";
import { debounce } from "@/utills/debounce";
import { Eye, Edit, Trash } from "lucide-react";
// import { Image } from "@/components/ui/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Loading from "@/components/pages/shared/Loading";
import Image from "next/image";

type ApiOrder = {
    id: number;
    agentId: number;
    customerId: number;
    productId: number | null;
    packageId: number | null;
    quantity: number;
    totalAmount: number;
    commissionRate: number;
    commission: number;
    orderDate: string | Date;
    customer?: {
        id?: number;
        name?: string;
        avatar?: string;
        email?: string;
    };
    product?: {
        id: number;
        name?: string;
        image_url?: string;
        sku?: string;
        price?: number;
    };
    package?: {
        id: number;
        name?: string;
        price?: number;
    };
};

export function OrderTable() {
    const [filters, setFilters] = useState({
        sortBy: "orderDate",
        limit: 10,
        page: 1,
        search: "",
    });
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllOrdersQuery(filters);
    const [deleteOrder] = useDeleteOrderMutation();
    const [search, setSearch] = useState("");

    const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

    // Helpers
    const formatCurrency = (n: number) =>
        new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

    const formatDate = (d: string | Date) =>
        new Date(d).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const handleSearch = (val: string) => {
        setFilters((f) => ({
            ...f,
            search: val,
            page: 1,
        }));
    };
    const debouncedLog = debounce(handleSearch, 100, { leading: false });

    const paginatedOrders: ApiOrder[] =
        data?.orders ? (data.orders as ApiOrder[]) : [];

    // Search sync
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setSearch(v);
        debouncedLog(v);
    };

    // Delete handler (assuming API has deleteOrder mutation)
    const handleDelete = async (id: number) => {
        try {
            await toast.promise(deleteOrder(id).unwrap(), {
                loading: "Deleting order...",
                success: "Order deleted successfully!",
                error: "Failed to delete order.",
            });
            // Optional: refetch or update UI after delete
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-muted rounded-xl border shadow-sm mt-5 transition-all">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <Input
                    placeholder="Search order..."
                    className="max-w-sm"
                    value={search}
                    onChange={onSearchChange}
                />
                <div className="flex flex-wrap items-center gap-2">
                    {/* Items per page */}
                    <Select onValueChange={(val) => { console.log(val); }} defaultValue={String(filters.limit)}>
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder="10" />
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
                {isLoading ? (
                    <div className="mx-auto border w-screen"><Loading /></div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted">
                                <th className="px-4 py-3 text-left">
                                    <input type="checkbox" className="rounded border-border" />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Total Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Commission</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Commission Rate</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-muted hover:bg-muted/40 transition-colors">
                                        <td className="px-4 py-3">
                                            <input type="checkbox" className="rounded border-border" />
                                        </td>
                                        <td className="px-4 py-3 font-medium">{order.id}</td>
                                        <td className="px-4 py-3">{formatDate(order.orderDate)}</td>
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            {order.customer?.avatar ? (
                                                <Image src={"https://i.ibb.co.com/pKnCKD0/user6.png"} alt={order.customer.name ?? `Customer ${order.customerId}`} width={28} height={28} className="rounded-full" />
                                            ) : (
                                                <span className="w-7" />
                                            )}
                                            <span>{order.customer?.name ?? `Customer ${order.customerId}`}</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">{order.quantity}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(order.totalAmount)}</td>
                                        <td className="px-4 py-3 text-right">{order.commission.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right">{order.commissionRate.toFixed(2)}%</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-red-500" title="Delete">
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the order.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(order.id)}>
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Controls */}
            <PaginationControls
                pagination={pagination}
                onPrev={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}
                onNext={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            />
        </div>
    );
}