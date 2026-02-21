/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { HexColorPicker } from "react-colorful";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const productUpdateSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  stock: z.number().int().min(0, { message: "Stock must be 0 or greater" }),
  description: z.string().optional(),
  price: z.number().min(0, { message: "Price must be non-negative" }),
  costPrice: z.number().min(0, { message: "Cost price must be non-negative" }).optional(),
  discountPrice: z.number().min(0, { message: "Discount price must be non-negative" }).optional(),
  brand: z.string().optional(),
  subCategoryId: z.string().min(1, { message: "Sub category is required" }),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT", "ARCHIVED"]),
  stock_status: z.enum(["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK", "DISCONTINUED"]),
  tags: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
});

type ProductUpdateForm = z.infer<typeof productUpdateSchema>;

type UpdateProductProps = {
  product: TProduct;
  subCategories: TSubCategories;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (val: boolean) => void;
};

const UpdateProduct = ({
  product,
  subCategories,
  isUpdateOpen,
  setIsUpdateOpen,
}: UpdateProductProps) => {
  const [imagePreview, setImagePreview] = useState(product.image_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log("clor-->> ",product.color)
  // Color state
  const [colorOpen, setColorOpen] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[] | null>([
    "#dc2626",
    "#2563eb",
    "#16a34a",
    "#ca8a04",
    "#ea580c",
    "#ffffff",
  ]);
  const [newColor, setNewColor] = useState<string>("#ffffff");
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [colorEnabled, setColorEnabled] = useState<boolean>(false);

  // Size state
  const [sizeOpen, setSizeOpen] = useState(false);
  const [availableSize, setAvailableSize] = useState<string[]>([
    "S",
    "M",
    "X",
    "XL",
  ]);
  const [newSize, setNewSize] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [sizeEnabled, setSizeEnabled] = useState<boolean>(false);

  // Initialize color and size from product
  // useEffect(() => {
  //   if (product.color) {
  //     try {
  //       const colors = typeof product.color === 'string'
  //         ? JSON.parse(product.color)
  //         : product.color;

  //       if (Array.isArray(colors) && colors.length > 0) {
  //         setSelectedColor(colors);
  //         setColorEnabled(true);
  //         // Add product colors to available colors if not already present
  //         colors.forEach(color => {
  //           if (!availableColors.includes(color)) {
  //             setAvailableColors(prev => [...prev, color]);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error parsing product colors:", error);
  //     }
  //   }

  //   if (product.size) {
  //     try {
  //       const sizes = typeof product.size === 'string'
  //         ? JSON.parse(product.size)
  //         : product.size;

  //       if (Array.isArray(sizes) && sizes.length > 0) {
  //         setSelectedSize(sizes);
  //         setSizeEnabled(true);
  //         // Add product sizes to available sizes if not already present
  //         sizes.forEach(size => {
  //           if (!availableSize.includes(size)) {
  //             setAvailableSize(prev => [...prev, size]);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error parsing product sizes:", error);
  //     }
  //   }
  // }, [product.color, product.size]);

  const form = useForm<ProductUpdateForm>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      stock: product.stock,
      price: Number(product.price),
      costPrice: product.costPrice ? Number(product.costPrice) : undefined,
      discountPrice: product.discountPrice ? Number(product.discountPrice) : undefined,
      brand: product.brand || "",
      subCategoryId: product.subCategoryId.toString(),
      status: product.status,
      stock_status: product.stock_status,
      is_active: product.is_active,
      is_featured: product.is_featured,
      weight: product.weight || "",
      dimensions: product.dimensions || "",
      tags: product.tags?.join(", ") || "",
    },
  });

  const { isDirty } = form.formState;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

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

  const handleRemoveImage = () => {
    setImagePreview(product.image_url || "");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleColorToggle = (color: string) => {
    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter((c) => c !== color));
    } else {
      setSelectedColor([...selectedColor, color]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSize.includes(size)) {
      setSelectedSize(selectedSize.filter((s) => s !== size));
    } else {
      setSelectedSize([...selectedSize, size]);
    }
  };

  const handleAddColor = () => {
    if (newColor && !availableColors.includes(newColor)) {
      setAvailableColors((prev) => [...prev, newColor]);
    }
    setColorOpen(false);
  };

  const handleAddSize = () => {
    if (newSize && !availableSize.includes(newSize)) {
      setAvailableSize((prev) => [...prev, newSize]);
      setNewSize("");
    }
    setSizeOpen(false);
  };

  const onSubmit = async (values: ProductUpdateForm) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating product...");

    try {
      const updateData = {
        name: values.name,
        description: values.description,
        price: values.price,
        costPrice: values.costPrice,
        discountPrice: values.discountPrice,
        stock: values.stock,
        brand: values.brand,
        status: values.status,
        stock_status: values.stock_status,
        is_active: values.is_active,
        is_featured: values.is_featured,
        weight: values.weight,
        dimensions: values.dimensions,
        tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
        color: colorEnabled ? selectedColor : [],
        size: sizeEnabled ? selectedSize : [],
      };

      const res = await updateProduct(product.id, updateData, imageFile);

      if (res.success) {
        toast.success(res.message || "Product updated successfully!", {
          id: toastId,
        });
        setIsUpdateOpen(false);
        form.reset(values);
        setImageFile(null);
      } else {
        toast.error(res.message || "Failed to update product", { id: toastId });
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    handleRemoveImage();
    setIsUpdateOpen(false);
  };

  const hasChanges = isDirty || imageFile !== null ||
    (colorEnabled && selectedColor.length > 0) ||
    (sizeEnabled && selectedSize.length > 0);

  return (
    <Sheet open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
      <SheetContent side="bottom" className="lg:w-[50%] w-full mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 max-h-[calc(100vh-60px)] overflow-y-auto space-y-6"
          >
            {/* 1. Basic Information */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-semibold text-lg">Basic Details</h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter product name"
                        disabled={isSubmitting}
                      />
                    </FormControl>
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
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Brand name"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                        placeholder="Product description"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 2. Pricing & Inventory */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-semibold text-lg">Pricing & Stock</h3>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Price <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
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
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
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
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Stock <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IN_STOCK">In Stock</SelectItem>
                          <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                          <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                          <SelectItem value="DISCONTINUED">
                            Discontinued
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 3. Media & Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
                <h3 className="font-semibold">Product Image</h3>

                <div className="relative group aspect-square rounded-lg border-2 border-dashed overflow-hidden">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isSubmitting}
                        >
                          <Pencil className="w-4 h-4 mr-1" /> Change
                        </Button>
                        {imageFile && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveImage}
                            disabled={isSubmitting}
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSubmitting}
                        className="flex-col h-full w-full"
                      >
                        <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                        <span className="text-sm">Upload Image</span>
                      </Button>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB
                </p>
              </div>

              {/* Visibility Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Visibility Settings</h3>

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>
                          Make product visible in store
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured Product</FormLabel>
                        <FormDescription>
                          Show on homepage and featured section
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Available Color */}
                <div className="border rounded-xl p-4 bg-muted/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Available Colors</h3>
                    <Switch
                      checked={colorEnabled}
                      onCheckedChange={setColorEnabled}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        disabled={!colorEnabled || isSubmitting}
                        onClick={() => handleColorToggle(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.includes(color)
                            ? "border-primary scale-110"
                            : "border-muted"
                          } ${!colorEnabled
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer hover:scale-105"
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}

                    {colorEnabled && !isSubmitting && (
                      <button
                        type="button"
                        onClick={() => setColorOpen(true)}
                        className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Available Size */}
                <Card className="border bg-muted/20 p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Available Sizes</h3>
                    <Switch
                      checked={sizeEnabled}
                      onCheckedChange={setSizeEnabled}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {availableSize.map((size) => (
                      <button
                        key={size}
                        type="button"
                        disabled={!sizeEnabled || isSubmitting}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-full border transition-all ${selectedSize.includes(size)
                            ? "bg-primary text-primary-foreground"
                            : "bg-background"
                          } ${!sizeEnabled
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer hover:scale-105"
                          }`}
                      >
                        {size}
                      </button>
                    ))}

                    {sizeEnabled && !isSubmitting && (
                      <button
                        type="button"
                        onClick={() => setSizeOpen(true)}
                        className="px-4 py-2 rounded-full border border-dashed flex items-center gap-1 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* 4. Specifications */}
            <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
              <h3 className="font-semibold text-lg">Specifications</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 1.2kg"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 10x5x2 cm"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="electronics, gadget, smart (comma separated)"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Separate tags with commas
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Actions */}
            <div className="py-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={!hasChanges || isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Update</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to update this product? This will
                      modify the product details.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Continue"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </SheetContent>

      {/* Color Picker Dialog */}
      <Dialog open={colorOpen} onOpenChange={setColorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Color</DialogTitle>
            <DialogDescription>
              Pick a color to add to available colors
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <HexColorPicker
              color={newColor}
              onChange={setNewColor}
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-lg border"
                style={{ backgroundColor: newColor }}
              />
              <div>
                <p className="text-sm font-medium">Selected Color</p>
                <p className="text-sm text-muted-foreground">{newColor}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddColor}>Add Color</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Size Input Dialog */}
      <Dialog open={sizeOpen} onOpenChange={setSizeOpen}>
        <DialogContent className="max-w-[425px]! z-50!">
          <DialogHeader>
            <DialogTitle>Add New Size</DialogTitle>
            <DialogDescription>Enter a new size option</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="newSize">Size</Label>
            <Input
              id="newSize"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value.toUpperCase())}
              placeholder="e.g., XXL, 2XL"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddSize} disabled={!newSize}>
              Add Size
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};

export default UpdateProduct;