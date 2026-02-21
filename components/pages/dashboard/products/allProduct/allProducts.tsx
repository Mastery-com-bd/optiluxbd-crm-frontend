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
  Funnel,
  Grid2X2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useDeleteProductMutation,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";
import Link from "next/link";
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
import CustomPagination from "@/components/ui/CustomPagination";
import { TPagination } from "@/types/shared";
import useFilters from "@/hooks/useFilters";
import ResetButton from "@/components/ui/ResetButton";
import { TSubCategories } from "@/types/category.type";
import { TProduct, TProductsList } from "@/types/products/product.type";
import UpdateProduct from "../updateProduct/UpdateProduct";

const AllProducts = ({ products, pagination, subCategories }: { products: TProductsList, pagination: TPagination, subCategories: TSubCategories }) => {
  const [isGridView, setIsGridView] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const PRODUCTS = products || [];
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [productForUpdate, setProductForUpdate] = useState<TProduct | undefined>(undefined);

  const handleDelete = async (id: number) => {
    try {
      toast.promise(deleteProduct(id).unwrap(), {
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
  const { handleChange, show, setShow, currentPage, setCurrentPage } = useFilters();
  return (
    <div className="bg-transparent text-foreground my-4">
      <div className="w-full">
        {/* Filters */}
        <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-0">
          <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
            <div className="flex  gap-3 items-center">
              <Input
                className="w-64 text-sm bg-transparent"
                onChange={(e) => handleChange("search", e.target.value)}
                placeholder="Search products..."
              />
              <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
                <Funnel size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={useFilters().getParam("category") || "all"}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="w-40" aria-label="Category Filter">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {subCategories?.map((category: { id: number; name: string }) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={useFilters().getParam("status") || "all"}
                onValueChange={(value) => handleChange("status", value)}
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
              <ResetButton setLimit={setShow} setCurrPage={setCurrentPage} />
              <Button
                variant="default"
                className="rounded-full  cursor-pointer text-2xl effect size-10"
                onClick={() => setIsGridView((prev) => !prev)}>
                <Grid2X2 className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
        {/* Product Table */}
        {!isGridView ? (
          <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 p-0 pt-2 border-none ">
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    {keys.map((label, ind) => (
                      <TableHead
                        first={ind === 0}
                        last={ind === keys.length - 1}
                        key={label}
                        className="text-left text-xs font-semibold uppercase text-muted-foreground">
                        {label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PRODUCTS?.map((product: TProduct) => (
                    <TableRow
                      key={product.id}
                      className="border-muted hover:bg-muted/50 transition-colors">
                      <TableCell className="px-4 py-3">
                        <div>
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
                            </div>
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
                            }`}>
                          {product.status.toLocaleLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(product.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          },
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center ">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[180px] flex flex-col ">
                            <Link
                              href={`/dashboard/admin/products/all-products/${product.id}`}>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="w-4 h-4 mr-2" /> view
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setIsUpdateOpen(true);
                                setProductForUpdate(product);
                              }}>
                              <Pencil className="w-4 h-4 mr-2" />  Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setDeleteProductId(product.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="cursor-pointer">
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
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-6  my-6">
            {PRODUCTS?.map((product: TProduct) => (
              <ProductCart
                key={product.id}
                product={product}
                setDeleteProductId={setDeleteProductId}
                setDeleteDialogOpen={setDeleteDialogOpen}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <CustomPagination
          totalPage={pagination?.totalPages}
          show={show}
          currentPage={currentPage}
          setShow={setShow}
          setCurrentPage={setCurrentPage}
          handleChange={handleChange}
        />
      </div>

      {/* update modal */}
      {productForUpdate && <UpdateProduct product={productForUpdate} subCategories={subCategories} isUpdateOpen={isUpdateOpen} setIsUpdateOpen={setIsUpdateOpen} />}
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
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllProducts;
