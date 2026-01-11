"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import CustomPagination from "@/components/ui/CustomPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useGetAllCustomerQuery } from "@/redux/features/customers/cutomersApi";
import { TCustomer } from "@/types/customer.types";
import { debounce } from "@/utills/debounce";
import { ChevronDown, Download, Funnel, Grid2X2, Search, Upload } from "lucide-react";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";
import CustomerTable from "./customerTable";
import CustomerTableSkeleton from "./CustomerTableSkeleton";
import PageHeader from "../../../shared/pageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Customers = () => {
  const [filters, setFilters] = useState({
    search: "",
    customerLevel: "",
    gender: "",
    isMarried: "",
    thana: "",
    district: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("all");
  const [tire, setTire] = useState("All");
  const [show, setShow] = useState("10");
  const [category, setCategory] = useState("all");
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Apparel" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports" },
  ];
  const { data, isLoading } = useGetAllCustomerQuery(filters, {
    refetchOnMountOrArgChange: false,
  });

  // Derive customers directly from data
  const customers: TCustomer[] = (data?.data as TCustomer[]) ?? [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full px-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <PageHeader title="All Customers" description="Operational overview and quick actions" />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateCustomerModal />
        </div>
      </div>

      {/* filter section */}
      <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
        <div className="flex  gap-3 items-center">
          <Input
            className="w-64 text-sm bg-transparent"
            value={inputValue}
            icon={<Search />}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search product by name"
          />
          <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
            <Funnel size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setFilters((prev) => ({
                ...prev,
                category: value === "all" ? undefined : value,
                page: 1,
              }));
            }}
          >
            <SelectTrigger className="w-40" aria-label="Category Filter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category: { id: number; name: string }) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setFilters((prev) => ({
                ...prev,
                status: value === "all" ? undefined : value,
                page: 1,
              }));
            }}
          >
            <SelectTrigger className="w-36" aria-label="Status Filter">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <ButtonComponent icon={Download} buttonName="Export" varient="yellow"/>
        </div>
      </div>

      {/* Customer Table */}
      {isLoading ? (
        <CustomerTableSkeleton />
      ) : (
        <CustomerTable customers={customers} />
      )}

      {/* Pagination */}
      <CustomPagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Customers;
