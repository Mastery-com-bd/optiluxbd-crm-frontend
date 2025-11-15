/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";
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

const AllCombo = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const { data, isLoading } = useGetAllComboPackageQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const comboPackages = data?.data?.packages as TComboPackage[];

  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

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
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Filters */}
        <Card className="bg-card text-card-foreground border shadow-sm p-4 md:p-5 mb-5 flex">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-[50%] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground " />
                <Input
                  value={inputValue}
                  onChange={(e) => {
                    debouncedLog(e.target.value);
                    setInputValue(e.target.value);
                  }}
                  placeholder="search by product name or SKU"
                />
              </div>
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground " />
                <Input
                  value={tagInput}
                  onChange={(e) => {
                    debouncedLogTag(e.target.value);
                    setTagInput(e.target.value);
                  }}
                  placeholder="tag name separate with comma"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                >
                  {is_active === "All" ? "Filter by activity" : is_active}
                  <ChevronDown size={16} />
                </Button>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                >
                  {is_featured === "All" ? "Filter by featured" : is_featured}
                  <ChevronDown size={16} />
                </Button>
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
                        is_featured:
                          item === "All" ? undefined : item === "Yes",
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
          </div>
          <div className="flex flex-col gap-3 lg:w-[50%]">
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
          </div>
        </Card>

        {/* Product Table */}
        {isLoading ? (
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

                  {/* Actions */}
                  <ComboDropdown id={item?.id} activity={item?.is_active} />
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                  {/* Price Section */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium">
                        {item?.totalPrice} <span className="text-xl">৳</span>
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

                  {/* Status */}
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

                  {/* Tags */}
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
        )}

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
