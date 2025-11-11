/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Download,
  Grid3x3,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/products/productsApi"
import { toast } from "sonner"
import PaginationControls from "@/components/ui/paginationComponent"
import Link from "next/link"
import { debounce } from "@/utills/debounce"
import ProductDetails from "../productDetails/ProductDetails"
import { Product } from "@/types/product"
import UpdateProduct from "../updateProduct/UpdateProduct"
import Loading from "@/components/pages/shared/Loading"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


const AllProducts = () => {

  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });

  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [viewMode, setViewMode] = useState("list")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [deleteProduct] = useDeleteProductMutation()
  const { data: productRes, refetch, isLoading } = useGetAllProductQuery(filters, { refetchOnMountOrArgChange: false });
  const PRODUCTS = productRes?.data || []
  const pagination = productRes?.pagination || { page: 1, totalPages: 1, total: 0 }
  const [inputValue, setInputValue] = useState("")

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(id).unwrap();
      if (res.success) {
        toast.success("Product deleted successfully!");
        refetch();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-700"
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-amber-400" : "text-muted-foreground opacity-40"}
        >
          ★
        </span>
      ))}
    </div>
  )

  const toggleSelectAll = () => {
    if (selectedProducts.length === PRODUCTS.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(PRODUCTS.map((p: any) => p.id))
    }
  }

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">CRM</span>
              <span>›</span>
              <span>Dashboard</span>
              <span>›</span>
              <span>All Products</span>
            </div>
          </div>
          <Link href={'/dashboard/admin/products/add-product'}>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="bg-card text-card-foreground border shadow-sm p-4 md:p-5 mb-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground " />
              <Input
                value={inputValue}
                onChange={(e) => {
                  debouncedLog(e.target.value)
                  setInputValue(e.target.value)
                }

                }
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value)
                  setFilters((prev) => ({
                    ...prev,
                    category:
                      value === "all" ? undefined : value,
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

              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value)
                  setFilters((prev) => ({
                    ...prev,
                    status:
                      value === "all" ? undefined : value,
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

              <div className="flex items-center gap-2 border-l pl-3">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Table */}
        {isLoading ? <div className="mx-auto border w-screen"><Loading /></div> :
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
                          selectedProducts.length === PRODUCTS.length &&
                          PRODUCTS.length > 0
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    {["Product", "SKU", "Category", "Stock", "Price", "Sold", "Rating", "Status", "Actions"].map(
                      (label) => (
                        <th
                          key={label}
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase"
                        >
                          {label}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    PRODUCTS.map((product: Product) => (
                      <tr
                        key={product.id}
                        className="border-b border-muted hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleSelectProduct(product.id)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product?.image_url || "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">by {product.by}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{product.sku}</td>
                        <td className="px-4 py-3 text-sm">{product.category}</td>
                        <td className="px-4 py-3 text-sm font-medium">{product.stock}</td>
                        <td className="px-4 py-3 text-sm font-semibold">${product.price}</td>
                        <td className="px-4 py-3 text-sm">{product.sold}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            {/* <span className="text-xs text-muted-foreground ml-1">
                          ({product.reviews})
                        </span> */}
                          </div>
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
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  className="cursor-pointer"
                                  variant="ghost"
                                  size="icon"
                                >
                                  <Trash2 className="w-4 h-4 text-destructive " />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(product.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        }

        {/* Pagination Controls */}
        <PaginationControls
          pagination={pagination}
          onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
          onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
        />
      </div>
    </div>
  )
}

export default AllProducts