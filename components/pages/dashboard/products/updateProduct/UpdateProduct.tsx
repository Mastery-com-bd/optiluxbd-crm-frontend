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
import { Pencil } from "lucide-react";
import { Product } from "@/types/product";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useAddProductImageMutation,
  useUpdateProductMutation,
} from "@/redux/features/products/productsApi";
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

interface UpdateProductProps {
  product: Product;
}

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

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
  const [imagePreview, setImagePreview] = useState(product.image_url);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [addImage] = useAddProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description ?? "",
      price: Number(product.price),
      stock: product.stock,
      status: product.status,
      stock_status: product.stock_status,
      is_active: product.is_active,
      is_featured: product.is_featured,
    },
  });

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
    setSheetOpen(false);

    const updateAndUpload = (async () => {
      await updateProduct({ id: product.id, data: values }).unwrap();
      if (imageFile) {
        await addImage({ id: product.id, image: imageFile }).unwrap();
      }
    })();

    toast.promise(updateAndUpload, {
      loading: "Updating product...",
      success: "Product updated successfully!",
      error: "Failed to update product.",
    });
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setSheetOpen(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="lg:w-[50%] w-full mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 max-h-[calc(100vh-60px)] overflow-y-auto space-y-6"
        >
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>
              Update the product details. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          {/* Product Info */}
          <section className="border rounded-md p-4 bg-muted/10 space-y-4">
            <h3 className="text-md font-semibold">Product Information</h3>
            <Label>Name</Label>
            <Input {...register("name")} />
            <Label>Brand</Label>
            <Input {...register("brand")} />
            <Label>Category</Label>
            <Input {...register("category")} />
            <Label>Description</Label>
            <Textarea rows={4} {...register("description")} />
          </section>

          {/* Inventory */}
          <section className="border rounded-md p-4 bg-muted/10 space-y-4">
            <h3 className="text-md font-semibold">Pricing & Inventory</h3>
            <Label>Price</Label>
            <Input type="number" {...register("price")} />
            <Label>Stock</Label>
            <Input type="number" {...register("stock")} />
            <Label>Status</Label>
            <Input {...register("status")} />
            <Label>Stock Status</Label>
            <Input {...register("stock_status")} />
          </section>

          {/* Toggles + Image */}
          <div className="flex gap-4">
            {/* Image Upload */}
            <section className="border rounded-md p-4 bg-muted/10 w-1/2">
              <h3 className="text-md font-semibold mb-2">Product Image</h3>
              <div className="relative w-full h-48">
                <img
                  src={imagePreview}
                  alt="Product"
                  className="w-full h-full object-cover rounded-md border"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-black/60 text-white rounded"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Edit Image
                </button>
                <button
                  type="button"
                  className={`absolute top-2 left-2 px-3 py-1 text-xs bg-red-500 text-white rounded ${imageFile ? "block" : "hidden"
                    }`}
                  onClick={() => {
                    setImagePreview(product.image_url);
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Remove Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </section>

            {/* Visibility */}
            <section className="border rounded-md p-4 bg-muted/10 w-1/2 space-y-4">
              <h3 className="text-md font-semibold">Visibility</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Active</Label>
                <Controller
                  control={control}
                  name="is_active"
                  render={({ field }) => (
                    <Switch
                      id="is_active"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">Featured</Label>
                <Controller
                  control={control}
                  name="is_featured"
                  render={({ field }) => (
                    <Switch
                      id="is_featured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </section>
          </div>

          <SheetFooter className="pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={!(isDirty || imageFile)}>Save Changes</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      onClick={() => void handleSubmit(onSubmit)()}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      disabled={!(isDirty || imageFile)}
                    >
                      Continue
                    </button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProduct;
