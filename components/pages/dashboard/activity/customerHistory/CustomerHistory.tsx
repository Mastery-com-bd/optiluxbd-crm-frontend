"use client";

import { debounce } from "@/utills/debounce";
import { useState } from "react";
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
import { useGetAllCustomerQuery } from "@/redux/features/customers/cutomersApi";
import { TCustomer } from "@/types/customer.types";
import PaginationControls from "@/components/ui/paginationComponent";
import { ChevronDown } from "lucide-react";
import UserActivityTableSkeleton from "../userActivity/UserActivityTableSkeleton";
import CustomerActivityModal from "./CustomerActivityModal";

const CustomerHistory = () => {
  const [filters, setFilters] = useState({
    search: "",
    customerLevel: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 50,
    page: 1,
  });
  const [customerLevel, setCustomerLevel] = useState("All");
  // get all custoemrs
  const { data, isLoading } = useGetAllCustomerQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const customers = (data?.data as TCustomer[]) || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

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
              placeholder="Search by name"
              value={filters.search}
              onChange={(e) => debouncedLog(e.target.value)}
              className="w-full  text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {customerLevel === "All" ? "Filter by Level" : customerLevel}{" "}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <DropdownMenuItem
                onClick={() => {
                  setCustomerLevel("All");
                  setFilters((prev) => ({
                    ...prev,
                    role: "",
                    page: 1,
                  }));
                }}
                className={customerLevel === "All" ? "font-medium" : ""}
              >
                All
              </DropdownMenuItem>

              {[
                "All",
                "BRONZE_PENDING",
                "BRONZE",
                "SILVER_PENDING",
                "SILVER",
                "GOLD_PENDING",
                "GOLD",
                "DIAMOND_PENDING",
                "DIAMOND",
                "PLATINUM_PENDING",
                "PLATINUM",
              ]?.map((level) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => {
                    setCustomerLevel(level);
                    setFilters((prev) => ({
                      ...prev,
                      customerLevel:
                        customerLevel === "All" ? "" : customerLevel,
                      page: 1,
                    }));
                  }}
                  className={
                    customerLevel === customerLevel ? "font-medium" : ""
                  }
                >
                  {customerLevel}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Name
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Customer ID
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Contact
              </TableHead>
              <TableHead className="text-gray-800 dark:text-gray-200">
                Level
              </TableHead>
              <TableHead className="text-center text-gray-800 dark:text-gray-200">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers?.map((customer: TCustomer) => {
              return (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {customer?.name}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-200 ">
                    {customer?.customerId}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {customer?.phone}
                  </TableCell>

                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {customer.customerLevel}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <CustomerActivityModal
                      id={customer?.customerId}
                      name={customer?.name}
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

export default CustomerHistory;
