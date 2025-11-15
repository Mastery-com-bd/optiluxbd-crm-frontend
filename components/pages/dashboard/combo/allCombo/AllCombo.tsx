/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import ComboTableSkeleton from "../createCombo/ComboTableSkeleton";
import { Card } from "@/components/ui/card";
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
  const comboPackages = data?.package;
  console.log(comboPackages);
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

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
                  {is_featured === "All" ? "Filter by publish" : is_featured}
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
          <ComboTableSkeleton />
        ) : (
          <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {[
                      "Name",
                      "SKU",
                      " Price",
                      "Discount",
                      "Savings ",
                      "Active",
                      "Featured",
                      "Tags",
                      "Actions",
                    ].map((label) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* <tbody>
                  {comboPackages.map((packages: any) => (
                    <tr
                      key={packages?.id}
                      className="border-b border-muted hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 ">
                          <Image
                            src={
                              product?.image_url ||
                              "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                            }
                            alt={product.name}
                            width={200}
                            height={200}
                            className=" object-cover w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.sku}</td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {product.stock}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold">
                        ${product.price}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <ProductDetails product={product} />
                          <UpdateProduct product={product} refetch={refetch} />
                          <Button
                            className="cursor-pointer"
                            variant="ghost"
                            size="icon"
                            // onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive " />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </Card>
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
