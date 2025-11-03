"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Bold, Italic, Underline, Strikethrough, Code, List, LinkIcon, ImageIcon } from "lucide-react"
import Link from "next/link"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    stock: "",
    description: "",
    basePrice: "",
    discountType: "percentage",
    discountValue: "",
    brand: "",
    category: "",
    subCategory: "",
    status: "",
    tags: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDiscard = () => {
    setFormData({
      productName: "",
      sku: "",
      stock: "",
      description: "",
      basePrice: "",
      discountType: "percentage",
      discountValue: "",
      brand: "",
      category: "",
      subCategory: "",
      status: "",
      tags: "",
    })
  }

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", formData)
    alert("Product saved as draft!")
  }

  const handlePublish = () => {
    if (
      !formData.productName ||
      !formData.sku ||
      !formData.stock ||
      !formData.category ||
      !formData.subCategory ||
      !formData.status
    ) {
      alert("Please fill in all required fields")
      return
    }
    console.log("Publishing product:", formData)
    alert("Product published successfully!")
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Product</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              UBold
            </Link>
            <span>›</span>
            <Link href="/products" className="hover:text-foreground">
              Ecommerce
            </Link>
            <span>›</span>
            <span>Add Product</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Product Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Product Information</h2>
              <p className="text-sm text-muted-foreground mb-6">
                To add a new product, please provide the necessary details in the fields below.
              </p>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="productName" className="text-foreground font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku" className="text-foreground font-medium">
                      SKU <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="SOFA-10058"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-foreground font-medium">
                      Stock <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      placeholder="250"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground font-medium">
                    Product Description <span className="text-gray-500 text-sm">(Optional)</span>
                  </Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 p-3 border-b bg-gray-50">
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <Underline className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <Strikethrough className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1" />
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <Code className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Introducing the Azure Comfort Single Sofa, a perfect blend of modern design and luxurious comfort..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border-0 min-h-40 resize-none"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Product Image */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Product Image</h2>
              <p className="text-sm text-muted-foreground mb-6">
                To upload a product image, please use the option below to select and upload the relevant file.
              </p>

              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Drop files here or click to upload.</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  You can drag images here, or browse files via the button below.
                </p>
                <Button variant="outline">Browse Images</Button>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Pricing</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Set the base price and applicable discount for the product using the options below.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="basePrice" className="text-foreground font-medium">
                    Base Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex mt-2">
                    <Input
                      id="basePrice"
                      name="basePrice"
                      placeholder="Enter base price (e.g., 199.99)"
                      type="number"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      className="rounded-r-none"
                    />
                    <div className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r flex items-center text-foreground">
                      $
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="discountType" className="text-foreground font-medium">
                    Discount Type <span className="text-gray-500 text-sm">(Optional)</span>
                  </Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value) => handleSelectChange("discountType", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountValue" className="text-foreground font-medium">
                    Discount Value <span className="text-gray-500 text-sm">(Optional)</span>
                  </Label>
                  <div className="flex mt-2">
                    <Input
                      id="discountValue"
                      name="discountValue"
                      placeholder="Enter discount amount or percentage"
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      className="rounded-r-none"
                    />
                    <div className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r flex items-center text-foreground">
                      {formData.discountType === "percentage" ? "%" : "$"}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Organize */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Organize</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Organize your product by selecting the appropriate brand, category, sub-category, status, and tags.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand" className="text-foreground font-medium">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    name="brand"
                    placeholder="Enter brand name"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Office</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="toys">Toys</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subCategory" className="text-foreground font-medium">
                    Sub Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.subCategory}
                    onValueChange={(value) => handleSelectChange("subCategory", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose Sub Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subcategory1">Sub Category 1</SelectItem>
                      <SelectItem value="subcategory2">Sub Category 2</SelectItem>
                      <SelectItem value="subcategory3">Sub Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-foreground font-medium">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-foreground font-medium">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" className="text-red-500 bg-transparent hover:bg-red-50" onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="outline" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct