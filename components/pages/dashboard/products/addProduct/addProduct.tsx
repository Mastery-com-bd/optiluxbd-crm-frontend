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
import Link from "next/link"
import { useAddProductMutation } from "@/redux/features/products/productsApi"

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
  const[ addProduct, isLoading, ] = useAddProductMutation();

  const onSubmit = async (data: FormData) => {
    const productInfo = {
      name: data.productName,
      description: data.description,
      sku: data.sku,
      price: data.basePrice,
      quantity: data.stock,
      category: data.category,
      brand: data.brand,
      isActive: data.status === "published",
      imageUrl:"",
    }
    const res = await addProduct(productInfo).unwrap();
    console.log(res);

  }

  const onDiscard = () => {
    reset()
    setImage(null)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Product</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">UBold</Link>
            <span>›</span>
            <Link href="/products" className="hover:text-foreground">Ecommerce</Link>
            <span>›</span>
            <span>Add Product</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            {/* MAIN SECTION */}
            <div className="col-span-2 space-y-8">
              <Card className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">Product Information</h2>

                {/* Product Name */}
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    {...register("productName", { required: true })}
                    placeholder="Product name"
                    className="mt-2"
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                {/* SKU + Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      {...register("sku", { required: true })}
                      className="mt-2"
                    />
                    {errors.sku && <p className="text-red-500 text-sm">Required</p>}
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock", { required: true, valueAsNumber: true })}
                      className="mt-2"
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">Required</p>
                    )}
                  </div>
                </div>

                {/* Text Editor & Description */}
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <div className="mt-2 border rounded">
                    <div className="flex gap-2 border-b p-2 bg-gray-50">
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

              {/* Image Upload */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Product Image</h2>
                <div className="border-2 border-dashed px-4 py-8 rounded text-center">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload an image</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImage(e.target.files[0])
                      }
                    }}
                  />
                  {image && (
                    <p className="text-sm mt-2 text-green-600 font-medium">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Pricing</h2>

                <div>
                  <Label>Base Price *</Label>
                  <Input
                    type="number"
                    {...register("basePrice", { required: true, valueAsNumber: true })}
                    className="mt-2"
                    placeholder="e.g., 199.99"
                  />
                </div>

                {/* Discount */}
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

          {/* Buttons */}
          {/* Action buttons below form */}
          <div className="flex justify-center gap-4 mt-8">
            {/* Discard */}
            <Button
              type="button"
              variant="outline"
              className="text-red-500 bg-transparent hover:bg-red-50"
              onClick={() => {
                reset()
                setImage(null)
              }}
            >
              Discard
            </Button>

            {/* Save as Draft (skip validation) */}
            <Button
              type="button"
              variant="outline"
            >
              Save as Draft
            </Button>

            {/* Publish (runs full validation) */}
            <Button
              type="submit"
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct