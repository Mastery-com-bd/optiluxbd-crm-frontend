/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Grid2X2,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";
import PaginationControls from "@/components/ui/paginationComponent";
import Link from "next/link";
import { debounce } from "@/utills/debounce";
import { Product } from "@/types/product";
import Loading from "@/components/pages/shared/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/redux/hooks";
import {
  currentUser,
  TAuthUSer,
} from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { useGetSubcategoryQuery } from "@/redux/features/category/categoryApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductCart from "../productCard/ProductCart";

const AllProducts = () => {
  const user = useAppSelector(currentUser);
  const [isGridView, setIsGridView] = useState(false);
  const { permissions } = getPermissions(user as TAuthUSer);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [deleteProduct] = useDeleteProductMutation();
  const { data: productRes, isLoading } = useGetAllProductQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const PRODUCTS = productRes?.data?.products || [];
  const pagination = productRes?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  const [inputValue, setInputValue] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };
  const { data: categories } = useGetSubcategoryQuery(undefined);

  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

  const handleDelete = async (id: number) => {
    try {
      await toast.promise(deleteProduct(id).unwrap(), {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Failed to delete product.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const keys = [
    "Product",
    "SKU",
    "Category",
    "Stock",
    "Price",
    "Status",
    "Created Date",
    "Actions",
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">CRM</span>
              <span>›</span>
              <span>Dashboard</span>
              <span>›</span>
              <span>All Products</span>
            </div>
          </div>
          {permissions.includes("PRODUCTS CREATE") && (
            <Link href={"/dashboard/admin/products/add-product"}>
              <Button className="cursor-pointer" variant="yellow">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          )}
        </div>
        {/* Filters */}
        <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-4 md:p-5 mb-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search product by id name sku...."
                value={inputValue}
                icon={<Search />}
                onChange={(e) => {
                  debouncedLog(e.target.value);
                  setInputValue(e.target.value);
                }}
              />
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
              <Button
                variant="default"
                className="rounded-full py-6 cursor-pointer text-2xl bg-white/15"
                onClick={() => setIsGridView((prev) => !prev)}
              >
                <Grid2X2 className="size-6" />
              </Button>
            </div>
          </div>
        </Card>
        {/* Product Table */}
        {isLoading ? (
          <Loading />
        ) : (
          !isGridView ?
            <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 border-none">
              <div className="overflow-x-auto w-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      {keys.map((label, ind) => (
                        <TableHead
                          first={ind === 0}
                          last={ind === keys.length - 1}
                          key={label}
                          className="text-left text-xs font-semibold uppercase text-muted-foreground"
                        >
                          {label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PRODUCTS?.map((product: Product) => (
                      <TableRow
                        key={product.id}
                        className="border-muted hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={
                                product?.image_url ||
                                "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                              }
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                by {product.by}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm text-center">
                          {product.sku}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm text-center">
                          {product?.subCategory?.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm font-medium text-center">
                          {product.stock}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                          ${product.price}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <span
                            className={`px-6 bg-white/10 border border-white/20 py-1 text-sm font-medium rounded-md
                          ${product.status === "ACTIVE"
                                ? "text-green-500"
                                : "text-red-500"
                              }`}
                          >
                            {product.status.toLocaleLowerCase()}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(product.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center ">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer" >
                              <MoreVertical className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px] flex flex-col ">
                              <Link href={`/dashboard/admin/products/all-products/${product.id}`} >
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Details
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Pencil className="w-4 h-4 mr-2" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setDeleteProductId(product.id);
                                  setDeleteDialogOpen(true);
                                }}
                                className="cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-destructive mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card> :
            <div className="grid grid-cols-3 gap-8 w-[1150px] mx-auto">
              {PRODUCTS?.map((product: Product) => (
                <ProductCart
                  key={product.id} product={product}
                  setDeleteProductId={setDeleteProductId}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                />
              ))}
            </div>
        )}

        {/* Pagination */}
        <PaginationControls
          pagination={pagination}
          onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
          onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
        />
      </div>

      {/* Delete Confirm Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteProductId) {
                  handleDelete(deleteProductId);
                  setDeleteDialogOpen(false);
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllProducts;