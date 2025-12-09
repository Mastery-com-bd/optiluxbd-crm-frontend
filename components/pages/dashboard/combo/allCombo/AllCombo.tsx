/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, Funnel, Logs, Plus, Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TComboPackage } from "@/types/comboPackage";
import CombocardSkeleton from "./CombocardSkeleton";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

import CardView from "./CardView";
import TableView from "./TableView";

const AllCombo = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  // get all combo
  const { data, isLoading } = useGetAllComboPackageQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const comboPackages = data?.data?.packages as TComboPackage[];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const [inputValue, setInputValue] = useState("");
  // const [tagInput, setTagInput] = useState("");
  const [is_active, setIs_active] = useState("All");
  const [is_featured, setIs_featured] = useState("All");
  // const [priceRange, setPriceRange] = useState([1, 100000]);
  const [view, setView] = useState<"Table View" | "Grid View">("Grid View");

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  // const handleTag = async (val: any) => {
  //   const cleaned = val
  //     .split(",")
  //     .map((v: string) => v.trim())
  //     .filter((v: string) => v !== "")
  //     .join(",");
  //   setFilters((prev) => ({
  //     ...prev,
  //     tags: cleaned,
  //     page: 1,
  //   }));
  // };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });
  // const debouncedLogTag = debounce(handleTag, 100, { leading: false });

  if (isLoading) {
    return <CombocardSkeleton />;
  }

  return (
    <section className="min-h-screen bg-transparent text-foreground space-y-4 w-full">
      {/* header section */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold">All Combo Pack</h1>
          <p className="text-[#A1A1A1] leading-5">
            Browse and manage All Combo Pack
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Button
              variant="default"
              className="p-3 flex rounded-2xl border-none cursor-pointer"
            >
              <p className="flex items-center gap-2">
                <Upload />
                <span className="text-[14px]">Bulk Upload</span>
              </p>
            </Button>
          </LiquidGlass>
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <Button
              variant="yellow"
              className="p-3 flex rounded-2xl border-none cursor-pointer"
            >
              <p className="flex items-center gap-2">
                <Plus />
                <span className="text-[14px]">Create Combo</span>
              </p>
            </Button>
          </LiquidGlass>
        </div>
      </div>

      {/* stats card section */}
      <Card className="bg-transparent text-card-foreground border shadow-sm p-4 md:p-5 mb-5 flex">
        this is a card
        {/* <div className="flex flex-col gap-3 lg:w-[50%]">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Range: {priceRange[0]} - {priceRange[1]}
          </label>
          <Slider
            // defaultValue={[priceRange[0], priceRange[1]]}
            value={priceRange}
            min={1}
            max={100000}
            step={100}
            onValueChange={(val) => {
              setPriceRange(val);
              setFilters((prev: any) => ({
                ...prev,
                minPrice: val[0],
                maxPrice: val[1],
                page: 1,
              }));
            }}
          />
        </div> */}
      </Card>

      {/* filtyer section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className=" w-full flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute z-20 left-4 top-1/2 -translate-y-1/2  "
            />
            <Input
              className="px-10 py-1.5 w-64 text-sm bg-white/10"
              value={inputValue}
              onChange={(e) => {
                debouncedLog(e.target.value);
                setInputValue(e.target.value);
              }}
              placeholder="Search product by name"
            />
          </div>

          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="12px"
          >
            <button className=" w-9 h-9 p-2.5 rounded-[12px] bg-white/10 cursor-pointer">
              <Funnel size={16} />
            </button>
          </LiquidGlass>
        </div>

        {/* dropdown */}
        <div className="flex items-center gap-7">
          {/* category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer "
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {is_featured === "All" ? "All Categories" : is_featured}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setIs_featured(item);
                    setFilters((prev) => ({
                      ...prev,
                      is_featured: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === is_featured ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer "
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {is_active === "All" ? "All Status" : is_active}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setIs_active(item);
                    setFilters((prev) => ({
                      ...prev,
                      is_active: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === is_active ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* view button table or grid */}
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="48px"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-[48px] bg-white/10 border-none cursor-pointer"
                >
                  <Logs />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center" className="rounded-xl">
                {["Table View", "Grid View"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setView(item as "Table View" | "Grid View")}
                    className="cursor-pointer"
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </LiquidGlass>
        </div>
      </div>

      <div className="mx-auto ">
        {/* card section */}
        {view === "Grid View" && (
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5">
              {comboPackages.map((item, i) => (
                <CardView key={i} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* table section */}
        {view === "Table View" && (
          <div className="flex justify-center">
            <TableView packages={comboPackages} />
          </div>
        )}

        {/* Pagination Controls */}
        <PaginationControls
          pagination={pagination}
          onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
          onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
        />
      </div>
    </section>
  );
};

export default AllCombo;
