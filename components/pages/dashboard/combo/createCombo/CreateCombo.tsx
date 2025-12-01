"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/paginationComponent";
import { useGetAllProductQuery } from "@/redux/features/products/productsApi";
import { Product } from "@/types/product";
import { debounce } from "@/utills/debounce";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductDetails from "../../products/productDetails/ProductDetails";
import CreateComboModal from "./CreateComboModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComboTableSkeleton from "./ComboTableSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { toast } from "sonner";

export type TComboData = { productId: number; quantity: number };

const CreateCombo = () => {
  const [filters, setFilters] = useState({
    search: "",
    limit: 10,
    page: 1,
    status: "ACTIVE",
  });
  // get all products
  const { data, isLoading } = useGetAllProductQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const products = data?.data?.products as Product[];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  // local state
  const [selectedProducts, setSelectedProducts] = useState<TComboData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("all");
  // redux state
  const user = useAppSelector(currentUser);
  const { permissions } = getPermissions(user as TAuthUSer);

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-700";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.productId === id);
      if (exists) {
        // If already selected → remove it
        return prev.filter((p) => p.productId !== id);
      } else {
        // If not selected → add with quantity = 1
        return [...prev, { productId: id, quantity: 1 }];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      // Unselect all
      setSelectedProducts([]);
    } else {
      // Select all with quantity = 1
      const all = products.map((p: any) => ({ productId: p.id, quantity: 1 }));
      setSelectedProducts(all);
    }
  };

  const updateQuantity = (product: Product, type: "increase" | "decrease") => {
    setSelectedProducts((prev) =>
      prev.map((item) => {
        if (item.productId === product?.id) {
          if (type === "increase") {
            if (item.quantity + 1 > product?.stock) {
              toast.error("Not enough stock available", {
                duration: 2000,
              });
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          };
        }
        return item;
      })
    );
  };

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
            <div>
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
            </div>
            {permissions.includes("PACKAGES CREATE") && (
              <CreateComboModal
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            )}
          </div>
        </Card>

        {/* Product Table */}
        {isLoading ? (
          <div>
            <ComboTableSkeleton />
          </div>
        ) : (
          <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-border"
                        checked={
                          selectedProducts.length === products.length &&
                          products.length > 0
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    {[
                      "Product",
                      "SKU",
                      "Category",
                      "Stock",
                      "Price",
                      "Status",
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
                <tbody>
                  {products &&
                    products.length > 0 &&
                    products.map((product: Product) => (
                      <tr
                        key={product?.id}
                        className="border-b border-muted hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            disabled={product?.stock < 1}
                            className="rounded border-border"
                            checked={selectedProducts.some(
                              (p) => p.productId === product.id
                            )}
                            onChange={() => toggleSelectProduct(product.id)}
                          />

                          {/* Quantity Controls */}
                          {selectedProducts.some(
                            (p) => p.productId === product.id
                          ) && (
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                className="px-2 py-1 border rounded"
                                onClick={() =>
                                  updateQuantity(product, "decrease")
                                }
                              >
                                -
                              </button>
                              <span className="text-sm">
                                {selectedProducts.find(
                                  (p) => p.productId === product.id
                                )?.quantity ?? 1}
                              </span>
                              <button
                                className="px-2 py-1 border rounded"
                                onClick={() =>
                                  updateQuantity(product, "increase")
                                }
                              >
                                +
                              </button>
                            </div>
                          )}
                        </td>
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
                        <td className="px-4 py-3 text-sm">
                          {product.category}
                        </td>
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
                            <ProductDetails
                              product={product}
                              buttonName="View Details"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
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

export default CreateCombo;
