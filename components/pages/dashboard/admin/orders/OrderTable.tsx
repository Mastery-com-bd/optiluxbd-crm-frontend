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
import { Eye, X } from "lucide-react";
import Loading from "@/components/pages/shared/Loading";
import { OrderData } from "@/types/orders";
import Link from "next/link";
import { formatCurrency } from "@/utills/formatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlaceBulkOrder } from "../../couriar/bulkOrder/PlaceBulkOrder";
export function OrderTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "orderDate",
    limit: 10,
    page: 1,
    search: "",
  });

  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courierOrders, setCourierOrders] = useState<{ [key: string]: any[] }>({});
  const { data, isLoading } = useGetAllOrdersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const toggleSelection = (orderId: number) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    const currentOrderIds = orders.map((order: OrderData) => order.id);
    const allSelected = currentOrderIds.every((id: number) =>
      selectedOrders.includes(id)
    );
    if (allSelected) {
      setSelectedOrders((prev) =>
        prev.filter((id) => !currentOrderIds.includes(id))
      );
    } else {
      const newSelections = currentOrderIds.filter(
        (id: number) => !selectedOrders.includes(id)
      );
      setSelectedOrders((prev) => [...prev, ...newSelections]);
    }
  };

  const allPageOrdersSelected =
    orders.length > 0 &&
    orders.every((order: OrderData) => selectedOrders.includes(order.id));

  const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });


  const handleBookToCourier = () => {
    const data = orders
      .filter((order: { id: number }) => selectedOrders.includes(order.id))
      .map((order: OrderData) => {
        const invoice = `INV-${order.id}`;
        const recipient_name = order.customer?.name ?? "Unknown";
        const recipient_phone = order.customer?.phone ?? "N/A";
        const cod_amount = String(Number(order.totalAmount) + 100);

        const parts = [
          order.shipping_address_street,
          order.shipping_address_thana,
          order.shipping_address_city,
          order.shipping_address_post,
          order.shipping_address_division,
        ].filter(Boolean);

        const recipient_address = parts.length > 0
          ? parts.join(", ")
          : "No address provided";

        return {
          invoice,
          recipient_name,
          recipient_phone,
          recipient_address,
          cod_amount,
        };
      });
    const processedOrders = { data }
    console.log(processedOrders);
    setCourierOrders(processedOrders);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-4 dark:bg-muted/50 rounded-xl border shadow-sm mt-5 transition-all">
      {/* process bulk order */}
      <PlaceBulkOrder
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        orders={courierOrders}
      />

      {/* Filter Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
        <Input
          type="date"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              from: e.target.value || undefined,
              page: 1,
            }))
          }
        />
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
        <Select
          onValueChange={(val) =>
            setFilters((f) => ({ ...f, sortBy: val }))
          }
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

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{selectedOrders.length} selected</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedOrders([])}
          >
            <X className="w-4 h-4 mr-1" />
            Deselect All
          </Button>
          <Button
            onClick={handleBookToCourier}
            className="cursor-pointer"
          >
            book to courier
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {isLoading ? (
          <div className="mx-auto border w-screen">
            <Loading />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted">
                <TableHead className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-border cursor-pointer"
                    checked={allPageOrdersSelected}
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Order ID
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Date
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                  Quantity
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                  Total Amount
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                  Commission
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                  Commission Rate
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order: OrderData) => {
                  const isSelected = selectedOrders.includes(order.id);
                  return (
                    <TableRow
                      key={order.id}
                      className={`border-b border-muted hover:bg-muted/40 transition-colors ${isSelected ? "bg-muted/30" : ""
                        }`}
                    >
                      <TableCell className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-border cursor-pointer"
                          checked={isSelected}
                          onChange={() => toggleSelection(order.id)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 font-medium">
                        {order.id}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {formatDate(order.orderDate)}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {order.customer?.name ??
                          `Customer ${order.customerId}`}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        {order.quantity}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        {formatCurrency(order.totalAmount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        {formatCurrency(order.commission)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        {order.commissionRate}%
                      </TableCell>
                      <TableCell className="px-4 py-3">
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
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        pagination={pagination}
        onPrev={() => {
          setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }));
          setSelectedOrders([]); // optional: clear selections when changing pages
        }}
        onNext={() => {
          setFilters((f) => ({ ...f, page: f.page + 1 }));
          setSelectedOrders([]); // optional
        }}
      />
    </div>
  );
}