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
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { Eye } from "lucide-react";
import Loading from "@/components/pages/shared/Loading";
import { OrderData } from "@/types/orders";
import Link from "next/link";
import { formatCurrency } from "@/utills/formatCurrency";

export function OrderTable() {
  const [filters, setFilters] = useState({
    sortBy: "orderDate",
    limit: 10,
    page: 1,
    search: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="p-4 bg-white dark:bg-muted rounded-xl border shadow-sm mt-5 transition-all">
      {/* Header */}

      {/* Filter Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {/* Agent Filter */}
        <Input
          type="number"
          placeholder="Agent ID"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              agentId: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />

        {/* Customer Filter */}
        <Input
          type="number"
          placeholder="Customer ID"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              customerId: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />

        {/* Product Filter */}
        <Input
          type="number"
          placeholder="Product ID"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              productId: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />

        {/* Package Filter */}
        <Input
          type="number"
          placeholder="Package ID"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              packageId: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            }))
          }
        />

        {/* Date From */}
        <Input
          type="date"
          onChange={(e) => {
            setFilters((f) => ({
              ...f,
              from: e.target.value || undefined,
              page: 1,
            }));
          }}
        />

        {/* Date To */}
        <Input
          type="date"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              to: e.target.value || undefined,
              page: 1,
            }))
          }
        />

        {/* Sort By */}
        <Select
          onValueChange={(val) => setFilters((f) => ({ ...f, sortBy: val }))}
          defaultValue="orderDate"
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orderDate">Order Date</SelectItem>
            <SelectItem value="commission">Commission</SelectItem>
            <SelectItem value="totalAmount">Total Amount</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order */}
        <Select
          onValueChange={(val) =>
            setFilters((f) => ({ ...f, sort: val as "asc" | "desc" }))
          }
          defaultValue="desc"
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">ASC</SelectItem>
            <SelectItem value="desc">DESC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {isLoading ? (
          <div className="mx-auto border w-screen">
            <Loading />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-border" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Commission
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Commission Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders?.map((order: OrderData) => (
                  <tr
                    key={order.id}
                    className="border-b border-muted hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{formatDate(order.orderDate)}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {/* {order.customer?.avatar ? (
                                                <Image src={"https://i.ibb.co.com/pKnCKD0/user6.png"} alt={order.customer.name ?? `Customer ${order.customerId}`} width={28} height={28} className="rounded-full" />
                                            ) : (
                                                <span className="w-7" />
                                            )} */}
                      <span>
                        {order.customer?.name ?? `Customer ${order.customerId}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{order.quantity}</td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-right">{order.commission}</td>
                    <td className="px-4 py-3 text-right">
                      {order.commissionRate}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/dashboard/admin/orders/${order.id}`}>
                          <Button
                            variant="ghost"
                            className="cursor-pointer"
                            size="icon"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
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
        onPrev={() =>
          setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))
        }
        onNext={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
      />
    </div>
  );
}
