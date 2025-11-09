"use client"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Card } from "@/components/ui/card"
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
} from "lucide-react"
import { toast } from "sonner"
import {
  useAddProductImageMutation,
  useAddProductMutation,
} from "@/redux/features/products/productsApi"

type FormData = {
  productName: string
  sku: string
  stock: number
  description: string
  basePrice: number
  discountType: "percentage" | "fixed"
  discountValue: string
  brand: string
  category: string
  subCategory: string
  status: string
  tags: string
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      productName: "",
      sku: "",
      stock: 0,
      description: "",
      basePrice: 0,
      discountType: "percentage",
      discountValue: "",
      brand: "",
      category: "",
      subCategory: "",
      status: "",
      tags: "",
    },
  })

  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation()
  const [addImage, { isLoading: isAddingImage }] = useAddProductImageMutation()

  const isSubmitting = isAddingProduct || isAddingImage

  const onSubmit = async (data: FormData) => {
    const productInfo = {
      name: data.productName,
      description: data.description,
      sku: data.sku,
      price: data.basePrice,
      quantity: data.stock,
      category: data.category,
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
      toast.error(err?.message || "Something went wrong")
    }
  }

  const onDiscard = () => {
    reset()
    setImage(null)
    setPreviewUrl(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 lg:p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Product</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Info */}
              <Card className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">Product Information</h2>
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    {...register("productName", { required: true })}
                    placeholder="Product name"
                    className="mt-2"
                  />
                  {errors.productName && (
                    <p className="text-destructive text-sm">Required</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      {...register("sku", { required: true })}
                      className="mt-2"
                    />
                    {errors.sku && <p className="text-destructive text-sm">Required</p>}
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className="mt-2"
                    />
                    {errors.stock && (
                      <p className="text-destructive text-sm">Required</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <div className="mt-2 border rounded">
                    <div className="flex gap-2 border-b p-2 bg-muted overflow-auto">
                      <Bold className="w-4 h-4" />
                      <Italic className="w-4 h-4" />
                      <Underline className="w-4 h-4" />
                      <Strikethrough className="w-4 h-4" />
                      <Code className="w-4 h-4" />
                      <List className="w-4 h-4" />
                      <LinkIcon className="w-4 h-4" />
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Product description..."
                      rows={6}
                      className="border-0"
                    />
                  </div>
                </div>
              </Card>

              {/* Product Image */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Product Image</h2>
                <div className="border-2 border-dashed px-4 py-8 rounded text-center">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload an image
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0]
                        setImage(file)
                        setPreviewUrl(URL.createObjectURL(file))
                      }
                    }}
                  />
                  {image && (
                    <p className="text-sm mt-2 text-green-600 font-medium">
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
              </Card>
            </div>

            {/* RIGHT Sidebar Section */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Pricing</h2>
                <div>
                  <Label>Base Price *</Label>
                  <Input
                    type="number"
                    {...register("basePrice", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="mt-2"
                    placeholder="e.g., 199.99"
                  />
                </div>
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
                    type="text"
                    {...register("discountValue")}
                    className="mt-2"
                    placeholder="10 or 50"
                  />
                </div>
              </Card>

              {/* Organize */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Organize</h2>
                <div>
                  <Label>Brand</Label>
                  <Input {...register("brand")} className="mt-2" />
                </div>

                <div>
                  <Label>Category *</Label>
                  <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label>Subcategory *</Label>
                  <Controller
                    control={control}
                    name="subCategory"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pick a sub category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chairs">Chairs</SelectItem>
                          <SelectItem value="tables">Tables</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                </div>

                <div>
                  <Label>Tags</Label>
                  <Input {...register("tags")} className="mt-2" placeholder="chair,wood" />
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={onDiscard}
              disabled={isSubmitting}
            >
              Discard
            </Button>
            <Button variant="outline" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct