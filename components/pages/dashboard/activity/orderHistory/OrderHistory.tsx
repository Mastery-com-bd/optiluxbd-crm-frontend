"use client";

import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useState } from "react";
import UserActivityTableSkeleton from "../userActivity/UserActivityTableSkeleton";
import { debounce } from "@/utills/debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { OrderData } from "@/types/orders";
import { formatCurrency } from "@/utills/formatCurrency";
import PaginationControls from "@/components/ui/paginationComponent";
import OrderActivityModal from "./OrderActivityModal";

const OrderHistory = () => {
  const [filters, setFilters] = useState({
    sortBy: "orderDate",
    limit: 50,
    page: 1,
    search: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const orders = (data?.data?.orders as OrderData[]) || [];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  const [category, setCategory] = useState("All");

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });
  console.log(filters);
  if (isLoading) {
    return <UserActivityTableSkeleton />;
  }
  return (
    <section className=" w-full rounded-2xl shadow p-6 space-y-6 border">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              type="text"
              placeholder="Search by order id or agent name"
              value={filters.search}
              onChange={(e) => debouncedLog(e.target.value)}
              className="w-full  text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {category === "All" ? "Filter by category" : category}{" "}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <DropdownMenuItem
                onClick={() => {
                  setCategory("All");
                  setFilters((prev) => ({
                    ...prev,
                    role: "",
                    page: 1,
                  }));
                }}
                className={category === "All" ? "font-medium" : ""}
              >
                All
              </DropdownMenuItem>

              {[
                "Electronics",
                "Home & Office",
                "Fashion",
                "Fitness",
                "Gaming",
                "Furniture",
                "Toys",
              ]?.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setFilters((prev) => ({
                      ...prev,
                      category: category === "All" ? "" : category,
                      page: 1,
                    }));
                  }}
                  className={category === category ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Order ID
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Date
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Customer
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Total Amount
              </TableHead>
              <TableHead className="text-center text-gray-800 dark:text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order: OrderData) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {order?.id}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {order?.orderDate}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {order.customer?.name ?? `Customer ${order.customerId}`}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {formatCurrency(order.totalAmount)}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    <OrderActivityModal
                      id={order?.id}
                      name={order?.customer?.name}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        pagination={pagination}
        onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
        onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
      />
    </section>
  );
};

export default OrderHistory;
