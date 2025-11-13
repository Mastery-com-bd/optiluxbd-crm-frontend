/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import ComboTableSkeleton from "../createCombo/ComboTableSkeleton";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";

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
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const [inputValue, setInputValue] = useState("");
  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Filters */}
        <Card className="bg-card text-card-foreground border shadow-sm p-4 md:p-5 mb-5 flex">
          <div className="flex items-center justify-between">
            <div className="relative lg:w-[50%]">
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
            {/* <div>
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setFilters((prev) => ({
                    ...prev,
                    category: value === "all" ? "" : value,
                    page: 1,
                  }));
                }}
              >
                <SelectTrigger className="w-40" aria-label="Category Filter">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home & Office">Home & Office</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
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
