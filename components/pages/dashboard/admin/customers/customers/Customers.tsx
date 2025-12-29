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
import { ChevronDown, Search, Upload } from "lucide-react";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";
import CustomerTable from "./customerTable";
import CustomerTableSkeleton from "./CustomerTableSkeleton";

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
  const [status, setStatus] = useState("All");
  const [tire, setTire] = useState("All");
  const [show, setShow] = useState("10");

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
          <h1 className="text-3xl font-semibold">Customer Overview</h1>
          <p className="text-[#A1A1A1] leading-5">
            Operational overview and quick actions
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateCustomerModal />
        </div>
      </div>

      {/* filter section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2  "
          />
          <Input
            className="px-10 py-1.5 w-64 text-sm bg-transparent"
            value={inputValue}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search customer by id"
          />
        </div>

        {/* dropdown */}
        <div className="flex items-center gap-7">
          {/* tire drodpown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {tire === "All" ? "Tire" : tire}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl"
            >
              {[
                "All",
                "BRONZE",
                "SILVER",
                "GOLD",
                "DIAMOND",
                "PLATINUM",
                "VIP",
              ].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setTire(item);
                    setFilters((prev) => ({
                      ...prev,
                      tire: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === tire ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* status dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {status === "All" ? "Status" : status}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl"
            >
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setStatus(item);
                    setFilters((prev) => ({
                      ...prev,
                      status: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === status ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* export svg button */}
          <div className="flex items-center justify-end ">
            <ButtonComponent
              buttonName="Export"
              icon={Upload}
              varient="dark yellow"
            />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      {isLoading ? (
        <CustomerTableSkeleton />
      ) : (
        <CustomerTable customers={customers} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <CustomPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />

        <div className="flex items-center gap-6">
          <p className="text-sm text-[#7E7E7E]">
            Showing 1 to 10 of 10 entries
          </p>
          {/* status drodpown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">Show {show}</span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl"
            >
              {["10", "20", "30", "40", "50"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setShow(item);
                    setFilters((prev) => ({
                      ...prev,
                      limit: Number(item),
                      page: 1,
                    }));
                  }}
                  className={item === show ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Customers;
