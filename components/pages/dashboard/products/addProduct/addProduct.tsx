/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  LinkIcon,
  ImageIcon,
  Image,
} from "lucide-react"
import { toast } from "sonner"
import {
  useAddProductImageMutation,
  useAddProductMutation,
} from "@/redux/features/products/productsApi"
import { useGetAllCategoryQuery, useGetCategoryAndSubcategoryQuery, } from "@/redux/features/category/categoryApi"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  sku: z
    .string()
    .min(1, { message: "SKU is required" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "SKU can only contain letters, numbers, hyphens, and underscores",
    }),
  stock: z
    .int()
    .min(0, { message: "Stock must be 0 or greater" }),
  description: z.string().optional(),
  basePrice: z
    .int()
    .min(0, { message: "Base Price must be non-negative" }),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .number()
    .min(0, { message: "Discount value must be 0 or greater" })
    .optional(),
  brand: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  subCategoryId: z.string().min(1, { message: "subCategoryId is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  tags: z.string().optional(),
})

type InferedFormData = z.infer<typeof productSchema>

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<InferedFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      productName: "",
      sku: "",
      stock: 0,
      description: "",
      basePrice: 0,
      discountType: "percentage",
      discountValue: 0,
      brand: "",
      category: "",
      subCategoryId: "",
      status: "",
      tags: "",
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation()
  const [addImage, { isLoading: isAddingImage }] = useAddProductImageMutation()
  const isSubmitting = isAddingProduct || isAddingImage

  const handleDivClick = () => {
    fileInputRef.current?.click()
  }
  const onSubmit = async (data: InferedFormData) => {
    const productInfo = {
      name: data.productName,
      description: data.description ?? "",
      sku: data.sku,
      price: data.basePrice,
      stock: data.stock,
      subCategoryId: Number(data.subCategoryId),
      brand: data.brand,
      public_id: "",
      secure_url: "",
      isActive: true,
    }
    try {
      const res = await addProduct(productInfo).unwrap()
      if (res.success) {
        if (image) {
          const result = await addImage({ id: res?.data?.id, image }).unwrap()
          if (result.success) {
            toast.success("Product added successfully")
          } else {
            toast.error("Image upload failed")
          }
        } else {
          toast.success("Product added successfully")
        }
        reset()
        setImage(null)
        setPreviewUrl(null)
      } else {
        toast.error("Failed to add product")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err?.data?.errors?.[0]?.message)
      const errorMessage =
        err?.data?.errors?.[0]?.message ||
        err?.data?.message ||
        "Something went wrong"
      toast.error(errorMessage)
    }
  }

  const onDiscard = () => {
    reset()
    setImage(null)
    setPreviewUrl(null)
  }
  const { data: categories, data: isCategoryLoading } = useGetAllCategoryQuery(undefined);

  const [parentCategory, setParentCategory] = useState<number | null>(null);
  const { data: subcategoriesData, isLoading: isSubCategoryIdLoading } = useGetCategoryAndSubcategoryQuery(
    parentCategory,
    { skip: !parentCategory, refetchOnMountOrArgChange: true, }
  )
  const subCategories = subcategoriesData?.subCategories;
  return (
    <div className="min-h-screen  text-foreground p-4 lg:p-8">
      <div className=" max-w-[1130px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Product</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            {/* LEFT Section */}
            <div className="flex flex-col lg:flex-row gap-6  w-full">
              {/* Product Details Section */}
              <div className="flex-1 min-w-0  ">
                <div className="bgGlass rounded-xl p-6 h-full flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-white">Product details</h2>
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      {...register("productName")}
                      placeholder="Product name"
                      className="mt-2"
                    />
                    {errors.productName && (
                      <p className="text-destructive text-sm">
                        {errors.productName?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      {...register("sku")}
                      className="mt-2"
                    />
                    {errors.sku && (
                      <p className="text-destructive text-sm">{errors.sku?.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <Controller
                      control={control}
                      name="category"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setParentCategory(Number(value));
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          {
                            <SelectContent>
                              {
                                categories?.map((cat: { id: number; name: string }) => (
                                  <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          }
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-destructive text-sm">{errors.category?.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>subCategoryId *</Label>
                    <Controller
                      control={control}
                      name="subCategoryId"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!parentCategory}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pick a sub category" />
                          </SelectTrigger>
                          <SelectContent>
                            {isSubCategoryIdLoading ? (
                              <div>Loading subcategories...</div>
                            ) : (
                              subCategories?.map((sub: { id: number; name: string }) => (
                                <SelectItem key={sub.id} value={String(sub.id)}>
                                  {sub.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subCategoryId && (
                      <p className="text-destructive text-sm">{errors.subCategoryId?.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing + Color Section */}
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                {/* Stock & Pricing */}
                <div className="bgGlass rounded-xl p-6  space-y-5">
                  <h2 className="text-xl font-semibold text-white">Stock & Pricing</h2>

                  <div className="flex justify-between gap-2">
                    <div className="w-1/2">
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        {...register("stock", { valueAsNumber: true })}
                        className="mt-2"
                      />
                      {errors.stock && (
                        <p className="text-destructive text-sm">{errors.stock?.message}</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <Label>Base Price *</Label>
                      <Input
                        type="number"
                        {...register("basePrice", { valueAsNumber: true })}
                        className="mt-2"
                        placeholder="e.g., 199.99"
                      />
                      {errors.basePrice && (
                        <p className="text-destructive text-sm">{errors.basePrice?.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Checkbox + Discount Fields */}
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="discountCheck" className="accent-purple-500" />
                    <label htmlFor="discountCheck" className="text-white text-sm">
                      Schedule a discount
                    </label>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <Label>Discount Type</Label>
                      <Controller
                        control={control}
                        name="discountType"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <Label>Discount Value</Label>
                      <Input
                        type="number"
                        {...register("discountValue", { valueAsNumber: true })}
                        className="mt-2"
                        placeholder="10 or 50"
                      />
                      {errors.discountValue && (
                        <p className="text-destructive text-sm">{errors.discountValue?.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Available Color */}
                <div className="bgGlass rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-medium">Available Color</h2>
                    {/* a radio button here. */}
                    <Switch id="airplane-mode" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox className="bg-red-600! p-3 accent-white cursor-pointer flex justify-center text-white rounded-full " />
                    <Checkbox className="bg-blue-600! p-3 accent-white cursor-pointer flex justify-center text-white rounded-full " />
                    <Checkbox className="bg-yellow-500! p-3 accent-white cursor-pointer flex justify-center text-white rounded-full " />
                    <Checkbox className="bg-orange-500! p-3 accent-white cursor-pointer flex justify-center text-white rounded-full " />
                    <Checkbox className="bg-green-500! p-3 accent-white cursor-pointer flex justify-center text-white rounded-full " />
                    <button className="w-6 h-6 rounded-full  text-white text-xs flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Image Upload */}
              <div className="flex-1 min-w-0">
                <div className="bgGlass rounded-xl p-6 h-full flex flex-col border border-white/20 shadow-lg">
                  <h2 className="text-lg font-medium text-white mb-4">Product Image</h2>
                  <div
                    className="border-2 border-dashed border-white/30 bg-white/10 hover:bg-white/20 transition duration-300 px-4 py-8 text-center w-full h-full rounded-2xl cursor-pointer flex flex-col justify-center items-center"
                    onClick={handleDivClick}
                  >
                    <Image className="w-10 h-10 mx-auto mb-4 text-white opacity-80" />
                    <p className="text-base font-semibold text-white mb-2">Upload your product image.</p>
                    <p className="text-sm text-white/70">Only PNG, JPG format allowed.</p>
                    <p className="text-sm text-white/70">500x500 pixels are recommended.</p>

                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0]
                          setImage(file)
                          setPreviewUrl(URL.createObjectURL(file))
                        }
                      }}
                    />

                    {image && (
                      <p className="text-sm mt-4 text-green-400 font-medium">
                        Selected: {image.name}
                      </p>
                    )}
                    {previewUrl && (
                      <div className="mt-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto rounded-md border w-32 h-32 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*Section */}
            <div className="grid grid-cols-3 w-full gap-6 my-6">
              {/* Organize */}
              <div className="flex flex-col gap-6">
                <Card className="bgGlass p-5 rounded-2xl text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Available Size</h3>
                    <Switch className="data-[state=checked]:bg-amber-400" />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {["S", "M", "X", "XL", "+"].map((size) => (
                      <span
                        key={size}
                        className="w-10 h-10 p-0 flex justify-center items-center rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white bg-white/5 border"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </Card>
                <Card className="p-6 space-y-4 bgGlass ">
                  <h2 className="text-lg font-semibold">Organize</h2>
                  <div>
                    <Label>Brand</Label>
                    <Input {...register("brand")} className="mt-2" />
                  </div>
                  <div>
                    <Label>Status *</Label>
                    <Controller
                      control={control}
                      name="status"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.status && (
                      <p className="text-destructive text-sm">{errors.status?.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <Input {...register("tags")} className="mt-2" placeholder="chair,wood" />
                  </div>
                </Card>
              </div>
              {/* Product description */}
              <Card className=" space-y-4 bgGlass col-span-2 flex flex-col gap-0">
                <CardHeader className="">Product Description</CardHeader>
                <CardContent className="h-full">
                  <div className="flex gap-2 border-b p-2 px-4 bgGlass rounded-b-none!  overflow-auto">
                    <Bold className="w-4 h-4" />
                    <Italic className="w-4 h-4" />
                    <Underline className="w-4 h-4" />
                    <Strikethrough className="w-4 h-4" />
                    <Code className="w-4 h-4" />
                    <List className="w-4 h-4" />
                    <LinkIcon className="w-4 h-4" />
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="rounded h-[90%]">
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Product description..."
                      className="h-full bgGlass border-t-0! rounded-t-none!  border-red-600 border"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="red"
              onClick={onDiscard}
              disabled={isSubmitting}
              className="py-5 rounded-2xl"
            >
              Discard
            </Button>
            <Button
              variant="purple"
              disabled={isSubmitting}
              className="py-5 rounded-2xl"
            >
              Save as Draft
            </Button>
            <Button
              variant="yellow"
              type="submit"
              disabled={isSubmitting}
              className="py-5 rounded-2xl"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddProduct;