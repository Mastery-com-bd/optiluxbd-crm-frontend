/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  Eye,
  Funnel,
  Logs,
  Plus,
  Search,
  SquarePen,
  Trash2,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TComboPackage } from "@/types/comboPackage";
import ComboDropdown from "./ComboDropdown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CombocardSkeleton from "./CombocardSkeleton";
import Image from "next/image";
import ComboCard from "@/components/ui/ComboCard";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

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

  // get current user
  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const handleTag = async (val: any) => {
    const cleaned = val
      .split(",")
      .map((v: string) => v.trim())
      .filter((v: string) => v !== "")
      .join(",");
    setFilters((prev) => ({
      ...prev,
      tags: cleaned,
      page: 1,
    }));
  };

  const [inputValue, setInputValue] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [is_active, setIs_active] = useState("All");
  const [is_featured, setIs_featured] = useState("All");
  const [priceRange, setPriceRange] = useState([1, 100000]);
  const debouncedLog = debounce(handleSearch, 100, { leading: false });
  const debouncedLogTag = debounce(handleTag, 100, { leading: false });

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-4 w-full">
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
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-[48px] bg-white/10 border-none"
            >
              <Logs />
            </Button>
          </LiquidGlass>
        </div>
      </div>

      {/* card section */}
      <div className="mx-auto ">
        {/* {isLoading ? (
          <CombocardSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {comboPackages?.map((item) => (
              <Card
                key={item?.id}
                className="border border-muted bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
              >
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {item?.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      SKU: {item?.sku}
                    </p>
                  </div>

                  <ComboDropdown id={item?.id} activity={item?.is_active} />
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium">
                        {item?.packagePrice} <span className="text-xl">৳</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Discount</p>
                      <p className="font-medium">
                        {item?.discountPrice} <span className="text-xl">৳</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Savings</p>
                      <p className="font-medium">
                        {item.savingsAmount} <span className="text-xl">৳</span>{" "}
                        ({item.savingsPercent}%)
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Total Products</p>
                      <p className="font-medium">{item?.items.length}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge
                      className={cn(
                        item?.is_active ? "bg-green-600" : "bg-red-600",
                        "text-white"
                      )}
                    >
                      {item?.is_active ? "Active" : "Inactive"}
                    </Badge>

                    <Badge
                      className={cn(
                        item?.is_featured ? "bg-blue-600" : "bg-gray-600",
                        "text-white"
                      )}
                    >
                      {item?.is_featured ? "Featured" : "Regular"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )} */}

        <section className="flex justify-center">
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <LiquidGlass
                  glowIntensity="xs"
                  shadowIntensity="xs"
                  borderRadius="20px"
                  className="w-[380px] cursor-default"
                  key={i}
                >
                  <ComboCard className="space-y-4" key={i}>
                    {/* photo section */}
                    <div className="relative mx-auto w-full h-[300px] rounded-[20px] ">
                      <Image
                        src="https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                        alt="sunglass"
                        height={500}
                        width={500}
                        className="object-cover rounded-[20px] h-full "
                      />
                      {/* badge section */}
                      <div className="absolute top-3 flex items-center justify-between gap-3 px-3 w-full">
                        {/* activate */}
                        <div className="border border-[#58E081] bg-[#B2F0C5] rounded-[12px] px-2 py-1 text-[#06D043]">
                          Activet
                        </div>
                        {/* offer */}
                        <div className="bg-[#FFB13F] rounded-[12px] px-2 py-1 text-white">
                          17% OFF
                        </div>
                      </div>
                    </div>

                    {/* details section */}
                    <div className="space-y-2">
                      {/* title section */}
                      <div className="flex items-center justify-between ">
                        <h1>Sunglasses Bundle</h1>
                        <div className="flex items-center gap-2">
                          <LiquidGlass
                            glowIntensity="xs"
                            shadowIntensity="xs"
                            borderRadius="12px"
                          >
                            <button className=" w-7 h-7 p-1.5 rounded-[12px] bg-white/10 cursor-pointer">
                              <Eye size={16} className="text-[#DE9C3A]" />
                            </button>
                          </LiquidGlass>

                          <LiquidGlass
                            glowIntensity="xs"
                            shadowIntensity="xs"
                            borderRadius="12px"
                          >
                            <button className=" w-7 h-7 p-1.5 rounded-[12px] bg-white/10 cursor-pointer">
                              <SquarePen size={16} className="text-[#58E081]" />
                            </button>
                          </LiquidGlass>

                          <LiquidGlass
                            glowIntensity="xs"
                            shadowIntensity="xs"
                            borderRadius="12px"
                          >
                            <button className=" w-7 h-7 p-1.5 rounded-[12px] bg-white/10 cursor-pointer">
                              <Trash2 size={16} className="text-[#F50F0F]" />
                            </button>
                          </LiquidGlass>
                        </div>
                      </div>

                      {/* categpry section */}
                      <h1>Summer Special - Sunglasses + Case</h1>

                      {/* price section */}
                      <div className="flex items-center justify-between text-xs ">
                        <p className="line-through text-[#E5B061]  font-medium">
                          <span className="text-base">৳</span> 15,000
                        </p>
                        <p className="text-white/90 font-medium">
                          <span className="text-base">৳</span> 12,500
                        </p>
                        <h1 className="text-white/50 font-medium">COMBO-001</h1>
                      </div>

                      {/* stock section */}
                      <div className="border-t border-white/50 text-white/60 flex items-center gap-4">
                        <h1>
                          Sold: <span className="text-white">45</span>
                        </h1>
                        <h1>
                          Stock: <span className="text-[#DE9C3A]">28</span>
                        </h1>
                      </div>

                      {/* product list */}
                      <LiquidGlass
                        glowIntensity="xs"
                        shadowIntensity="xs"
                        borderRadius="20px"
                        className="cursor-default"
                      >
                        <div className="w-full bg-white/10 px-4 py-2 rounded-[20px] space-y-2 ">
                          <h1 className="text-white/60 leading-5">
                            Includes 2 items:
                          </h1>
                          <div className="space-y-1">
                            <h1 className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-[#DE9C3A]"></span>
                              <p className="text-white/80 leading-5">
                                Ray-Ban Aviator ,
                              </p>
                            </h1>
                            <h1 className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-[#DE9C3A]"></span>
                              <p className="text-white/80 leading-5">
                                Premium Leather Case ,
                              </p>
                            </h1>
                          </div>
                        </div>
                      </LiquidGlass>
                    </div>
                  </ComboCard>
                </LiquidGlass>
              );
            })}
          </div>
        </section>

        {/* Pagination Controls */}
        <PaginationControls
          pagination={pagination}
          onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
          onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
        />
      </div>
    </div>
  );
};

export default AllCombo;
