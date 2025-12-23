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
import { Eye, MoreVertical, Pencil, X } from "lucide-react";
import Loading from "@/components/pages/shared/Loading";
import { OrderData, OrderItem, TProfileOrderData } from "@/types/orders";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlaceBulkOrder } from "../../couriar/bulkOrder/PlaceBulkOrder";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

  const keys = [
    "checkbox",
    "OrderID",
    "SKU",
    "Customer",
    "Date",
    "Item",
    "Courier",
    "Amount",
    "Status",
    "Actions",
  ];
  return (
    <div className="rounded-xl  shadow-sm mt-5 transition-all">
      {/* process bulk order */}
      <PlaceBulkOrder
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
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
          placeholder="order ID"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              orderId: e.target.value ? Number(e.target.value) : undefined,
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
          <Card className="p-0 bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 border-none">
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    {keys.map((label, ind) => (
                      <TableHead
                        first={ind === 0}
                        last={ind === keys.length - 1}
                        key={label}
                        className="text-left text-xs font-semibold uppercase text-muted-foreground"
                      >
                        {label === "checkbox" ? (
                          <input
                            type="checkbox"
                            checked={allPageOrdersSelected}
                            onChange={toggleSelectAll}
                          />
                        ) : (
                          label
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order: OrderItem) => (
                    <TableRow
                      key={order.id}
                      className="border-muted hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleSelection(order.id)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">ORD-{order.id}</p>
                              <p className="text-xs text-muted-foreground">
                                {/* by {order.by} */}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-center">
                        {/* {order?.products?.sku} */} sku
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-center">
                        {order?.customer?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium text-center">
                        {new Date(order.orderDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                        {order.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.courier ? order.courier.name : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.totalAmount}
                      </TableCell>
                      <TableCell className="text-center">
                        {order?.status}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center ">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[180px] flex flex-col "
                          >
                            <Link
                              href={`/dashboard/admin/orders/${order.id}`}
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="w-4 h-4 mr-2" /> view
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <Pencil className="w-4 h-4 mr-2" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem
                              onClick={() => {
                                setDeleteorderId(order.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 text-destructive mr-2" />
                              Delete
                            </DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
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