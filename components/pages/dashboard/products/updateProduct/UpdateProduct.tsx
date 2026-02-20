"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Upload } from "lucide-react";
import { Product } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TProduct } from "@/types/products/product.type";
import { updateProduct } from "@/service/product-service/product.service";
import { TSubCategories } from "@/types/category.type";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";



type FormValues = {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  stock_status: string;
  is_active: boolean;
  is_featured: boolean;
};

type updateProductProps = {
  product: TProduct,
  subCategories: TSubCategories,
  isUpdateOpen: boolean,
  setIsUPdateOpen: (val: boolean) => void;
}
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  costPrice: z.coerce.number().optional(),
  discountPrice: z.coerce.number().optional(),
  sku: z.string().min(1, "SKU is required"),
  stock: z.coerce.number().int().min(0),
  brand: z.string().optional(),
  subCategoryId: z.string().min(1, "Category is required"),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  status: z.string().default("PUBLISHED"),
  stock_status: z.string().default("IN_STOCK"),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  tags: z.string().optional(),
});

const UpdateProduct = ({ product, subCategories, isUpdateOpen, setIsUPdateOpen }: updateProductProps) => {
  console.log("update product->>>", product)
  const [imagePreview, setImagePreview] = useState(product.image_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      price: Number(product.price),
      costPrice: Number(product.costPrice || 0),
      discountPrice: Number(product.discountPrice || 0),
      sku: product.sku,
      stock: product.stock,
      brand: product.brand || "",
      subCategoryId: product.subCategoryId.toString(),
      is_active: product.is_active,
      is_featured: product.is_featured,
      status: product.status,
      stock_status: product.stock_status,
      weight: product.weight || "",
      dimensions: product.dimensions || "",
      tags: product.tags?.join(", ") || "",
    },
  });
  const { isDirty } = form.formState;
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    return
    // setSheetOpen(false);
    // const toastId = toast.loading("updating ....")
    // const res = await updateProduct(productId: Number(product.id), data: values, img: ImageFile);
    // if (res.success) {
    //   toast.success("Product updated successfully", { id: toastId })
    // }
    // else {
    //   toast.error("update fail", { id: toastId });
    // }
  };

  return (
    <Sheet open={isUpdateOpen} onOpenChange={setIsUPdateOpen}>
      <SheetContent side="bottom" className="lg:w-[50%] w-full mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 max-h-[calc(100vh-60px)] overflow-y-auto space-y-6">
            {/* 1. Basic Information */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-medium text-primary">Basic Details</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 2. Pricing & Inventory */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-medium text-primary">Pricing & Stock</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Price</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 3. Media & Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Preview Area */}
              <div className="space-y-4">
                <FormLabel>Product Image</FormLabel>
                <div className="relative group aspect-square rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                          <Pencil className="w-4 h-4 mr-1" /> Change
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button type="button" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </Button>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
                </div>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                        <FormDescription>Show in store</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>Show on homepage</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 4. Specifications & Tags */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-medium text-primary">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl><Input placeholder="1.2kg" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl><Input placeholder="10x5x2 cm" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (separated by comma)</FormLabel>
                    <FormControl><Input placeholder="electronics, gadget, smart" {...field} /></FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pb-6">
              <Button type="button" variant="outline" onClick={() => setIsUPdateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isDirty && !imageFile}>
                Update Product
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProduct;
