"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Customer } from "../allCustomers"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface CustomerFormProps {
  customer?: Customer
}

export default function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    address: customer?.address || "",
    district: customer?.district || "",
    thana: customer?.thana || "",
    date_of_birth: customer?.date_of_birth || "",
    profession: customer?.profession || "",
    gender: customer?.gender || "NOT_SPECIFIED",
    isMarried: customer?.isMarried || false,
    customerLevel: customer?.customerLevel || "BRONZE_PENDING",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    setIsLoading(false)
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter full name"
              required
              className="mt-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger id="gender" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                  <SelectItem value="NOT_SPECIFIED">Not Specified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="profession" className="text-sm font-medium">
              Profession
            </Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
              placeholder="Enter profession"
              className="mt-2"
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Marital Status</Label>
            <p className="text-xs text-muted-foreground">Indicate whether the customer is currently married</p>
            <div className="flex items-center gap-3">
              <Switch
                id="married"
                checked={formData.isMarried}
                onCheckedChange={(checked) => handleChange("isMarried", checked)}
              />
              <Label htmlFor="married" className="text-sm font-medium cursor-pointer select-none">
                Married
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Address Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter full address"
              className="mt-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="district" className="text-sm font-medium">
                District
              </Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
                placeholder="Enter district"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="thana" className="text-sm font-medium">
                Thana/Upazila
              </Label>
              <Input
                id="thana"
                value={formData.thana}
                onChange={(e) => handleChange("thana", e.target.value)}
                placeholder="Enter thana or upazila"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Classification Section */}
      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Customer Classification</h2>
        <div>
          <Label htmlFor="level" className="text-sm font-medium">
            Customer Level
          </Label>
          <Select value={formData.customerLevel} onValueChange={(value) => handleChange("customerLevel", value)}>
            <SelectTrigger id="level" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BRONZE_PENDING">Bronze Pending</SelectItem>
              <SelectItem value="BRONZE">Bronze</SelectItem>
              <SelectItem value="SILVER">Silver</SelectItem>
              <SelectItem value="GOLD">Gold</SelectItem>
              <SelectItem value="PLATINUM">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </form>
  )
}
