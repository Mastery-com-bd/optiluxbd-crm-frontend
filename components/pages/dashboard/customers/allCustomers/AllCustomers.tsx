"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCustomerQuery } from "@/redux/features/customers/cutomersApi";
import { TCustomer } from "@/types/customer.types";
import { debounce } from "@/utills/debounce";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CustomerTableSkeleton from "./CustomerTableSkeleton";
import CustomerTable from "../components/customerTable";
import CustomerPagination from "../components/pagination";

const AllCustomers = () => {
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

  const HandlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Search Bar */}
        <CardContent className="pt-4 flex justify-end items-center">
          <Link href="/dashboard/customers/add">
            <Button variant={"outline"} className="w-full gap-2 sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </CardContent>

        {/* Filter Panel */}
        <Card className="border-0.5 bg-transparent shadow-none">
          <CardContent className="p-0 space-y-8">
            <div className="flex flex-col gap-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, address, profession, or address"
                  // value={searchTerm}
                  onChange={(e) => {
                    debouncedLog(e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
              {/* Customer Level Filter */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="sm:col-span-1">
                  <Label className="text-md font-semibold mb-1">Level</Label>
                  <Select
                    value={filters.customerLevel}
                    onValueChange={(value) =>
                      setFilters({ ...filters, customerLevel: value })
                    }
                  >
                    <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRONZE_PENDING">
                        Bronze Pending
                      </SelectItem>
                      <SelectItem value="BRONZE">Bronze</SelectItem>
                      <SelectItem value="SILVER_PENDING">
                        Silver Pending
                      </SelectItem>
                      <SelectItem value="SILVER">Silver</SelectItem>
                      <SelectItem value="GOLD_PENDING">Gold Pending</SelectItem>
                      <SelectItem value="GOLD">Gold</SelectItem>
                      <SelectItem value="DIAMOND_PENDING">
                        Diamond Pending
                      </SelectItem>
                      <SelectItem value="DIAMOND">Diamond</SelectItem>
                      <SelectItem value="PLATINUM_PENDING">
                        Platinum Pending
                      </SelectItem>
                      <SelectItem value="PLATINUM">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender Filter */}
                <div className="sm:col-span-1">
                  <Label className="text-md font-semibold mb-1">Gender</Label>
                  <Select
                    value={filters.gender}
                    onValueChange={(value) =>
                      setFilters({ ...filters, gender: value })
                    }
                  >
                    <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Marital Status Filter */}
                <div className="sm:col-span-1">
                  <Label className="text-md font-semibold mb-1">Married</Label>
                  <Select
                    value={filters.isMarried}
                    onValueChange={(value) =>
                      setFilters({ ...filters, isMarried: value })
                    }
                  >
                    <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* District Filter */}
                <div className="sm:col-span-1">
                  <Label className="text-md font-semibold mb-1">District</Label>
                  <Select>
                    <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                      <SelectItem value="Chattogram">Chattogram</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="Khulna">Khulna</SelectItem>
                      <SelectItem value="Barishal">Barishal</SelectItem>
                      <SelectItem value="Sylhet">Sylhet</SelectItem>
                      <SelectItem value="Rangpur">Rangpur</SelectItem>
                      <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Thana Filter */}
                <div className="sm:col-span-1">
                  <Label className="text-md font-semibold mb-1">Thana</Label>
                  <Select>
                    <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Gulshan">Gulshan</SelectItem>
                      <SelectItem value="Banani">Banani</SelectItem>
                      <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                      <SelectItem value="Uttara">Uttara</SelectItem>
                      <SelectItem value="Mirpur">Mirpur</SelectItem>
                      <SelectItem value="Mohammadpur">Mohammadpur</SelectItem>
                      <SelectItem value="Badda">Badda</SelectItem>
                      <SelectItem value="Khilgaon">Khilgaon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                <div className="col-span-2 sm:col-span-1 flex items-end mt-6">
                  <Button variant="outline" className=" w-full text-xs">
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              Showing {data?.pagination.limit} of {data?.pagination.total}{" "}
            </div>
          </CardContent>
        </Card>

        {/* Customer Table */}
        {isLoading ? (
          <CustomerTableSkeleton />
        ) : (
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <CustomerTable customers={customers} />
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        <CustomerPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={HandlePageChange}
        />
      </div>
    </div>
  );
};

export default AllCustomers;
