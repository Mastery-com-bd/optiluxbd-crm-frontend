"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import CustomerTable from "./components/customerTable";
import CustomerPagination from "./components/pagination";
// import CustomerMetrics from "@/components/customer-metrics"
// import CustomerTable from "@/components/customer-table"
// import { CustomerFilterPanel } from "@/components/customer-filter-panel"
// import { useCustomerFilter } from "@/hooks/use-customer-filter"
// import { getUniqueProfessions, getUniqueDistricts, getUniqueThanas } from "@/lib/filter-utils"

// Define the customer type
export interface Customer {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  district?: string;
  thana?: string;
  date_of_birth?: string;
  profession?: string;
  isMarried?: boolean;
  gender?: string;
  customerLevel: string;
  created_at: string;
  updated_at: string;
}

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    created_at: "2023-10-01",
    isMarried: true,
    customerLevel: "BRONZE",
    profession: "Engineer",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Male",
    phone: "01712345678",
    email: "john@example.com",
    address: "123 Gulshan Ave",
    updated_at: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    created_at: "2023-10-02",
    isMarried: false,
    customerLevel: "SILVER",
    profession: "Teacher",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Female",
    phone: "01712345679",
    email: "jane@example.com",
    address: "456 Gulshan Ave",
    updated_at: "2023-10-02",
  },
  {
    id: 3,
    name: "Alice Johnson",
    created_at: "2023-10-03",
    isMarried: true,
    customerLevel: "GOLD",
    profession: "Doctor",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Female",
    phone: "01712345680",
    email: "alice@example.com",
    address: "789 Gulshan Ave",
    updated_at: "2023-10-03",
  },
  {
    id: 4,
    name: "Bob Brown",
    created_at: "2023-10-04",
    isMarried: false,
    customerLevel: "PLATINUM",
    profession: "Lawyer",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Male",
    phone: "01712345681",
    email: "bob@example.com",
    address: "101 Gulshan Ave",
    updated_at: "2023-10-04",
  },
  {
    id: 5,
    name: "Charlie Davis",
    created_at: "2023-10-05",
    isMarried: true,
    customerLevel: "PLATINUM",
    profession: "Engineer",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Male",
    phone: "01712345682",
    email: "charlie@example.com",
    address: "102 Gulshan Ave",
    updated_at: "2023-10-05",
  },
  {
    id: 6,
    name: "David Wilson",
    created_at: "2023-10-06",
    isMarried: true,
    customerLevel: "PLATINUM",
    profession: "Lawyer",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Male",
    phone: "01712345683",
    email: "david@example.com",
    address: "103 Gulshan Ave",
    updated_at: "2023-10-06",
  },
  {
    id: 7,
    name: "Eve Martinez",
    created_at: "2023-10-07",
    isMarried: false,
    customerLevel: "PLATINUM",
    profession: "Artist",
    district: "Dhaka",
    thana: "Gulshan",
    gender: "Female",
    phone: "01712345684",
    email: "eve@example.com",
    address: "104 Gulshan Ave",
    updated_at: "2023-10-07",
  },

  // Add more mock customers as needed
];

export default function AllCustomersPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-2 border-0 bg-transparent shadow-none">
          <CardHeader className="p-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Customers
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage and organize your customer database
                </p>
              </div>
              <Link href="/dashboard/customers/add">
                <Button variant={"outline"} className="w-full gap-2 sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Customer
                </Button>
              </Link>
            </div>
            <Separator className="my-2 border-0.5" />
          </CardHeader>
        </Card>

        {/* Search Bar */}
        <Card className="border-0.5 bg-transparent shadow-none py-0">
          <CardContent className="p-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, email, address, profession, or location..."
                // value={searchTerm}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filter Panel */}
        <Card className="border-0.5 bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {/* Customer Level Filter */}
              <div className="sm:col-span-1">
                <Label className="text-md font-semibold mb-1">Level</Label>
                <Select>
                  <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="BRONZE_PENDING">
                      Bronze Pending
                    </SelectItem>
                    <SelectItem value="BRONZE">Bronze</SelectItem>
                    <SelectItem value="SILVER_PENDING">
                      Silver Pending
                    </SelectItem>
                    <SelectItem value="SILVER">Silver</SelectItem>
                    <SelectItem value="GOLD_PENDING">Gold Pending</SelectItem>
                    <SelectItem value="GOLD">Gold</SelectItem>
                    <SelectItem value="DIAMOND_PENDING">
                      Diamond Pending
                    </SelectItem>
                    <SelectItem value="DIAMOND">Diamond</SelectItem>
                    <SelectItem value="PLATINUM_PENDING">
                      Platinum Pending
                    </SelectItem>
                    <SelectItem value="PLATINUM">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Filter */}
              <div className="sm:col-span-1">
                <Label className="text-md font-semibold mb-1">Gender</Label>
                <Select>
                  <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Marital Status Filter */}
              <div className="sm:col-span-1">
                <Label className="text-md font-semibold mb-1">Married</Label>
                <Select>
                  <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* District Filter */}
              <div className="sm:col-span-1">
                <Label className="text-md font-semibold mb-1">District</Label>
                <Select>
                  <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Chattogram">Chattogram</SelectItem>
                    <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="Khulna">Khulna</SelectItem>
                    <SelectItem value="Barishal">Barishal</SelectItem>
                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                    <SelectItem value="Rangpur">Rangpur</SelectItem>
                    <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thana Filter */}
              <div className="sm:col-span-1">
                <Label className="text-md font-semibold mb-1">Thana</Label>
                <Select>
                  <SelectTrigger className="min-w-[100px] w-full h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Gulshan">Gulshan</SelectItem>
                    <SelectItem value="Banani">Banani</SelectItem>
                    <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                    <SelectItem value="Uttara">Uttara</SelectItem>
                    <SelectItem value="Mirpur">Mirpur</SelectItem>
                    <SelectItem value="Mohammadpur">Mohammadpur</SelectItem>
                    <SelectItem value="Badda">Badda</SelectItem>
                    <SelectItem value="Khilgaon">Khilgaon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <div className="col-span-2 sm:col-span-1 flex items-end mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-full text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters Display */}
        <div className="border-0.5 mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 text-sm shadow-sm backdrop-blur-sm">
          <span className="text-muted-foreground">
            Showing 10 of 100 customers
          </span>

          <Separator orientation="vertical" className="h-4" />

          <Badge variant="outline" className="h-6 px-2 text-xs font-medium">
            Gender: Male
          </Badge>

          <Badge variant="outline" className="h-6 px-2 text-xs font-medium">
            Level: Platinum
          </Badge>

          <Badge variant="outline" className="h-6 px-2 text-xs font-medium">
            Profession: Artist
          </Badge>

          <Badge variant="outline" className="h-6 px-2 text-xs font-medium">
            District: Dhaka
          </Badge>

          <Badge variant="outline" className="h-6 px-2 text-xs font-medium">
            Thana: Dhaka
          </Badge>
        </div>

        {/* Customer Table */}
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <CustomerTable customers={mockCustomers} />
          </CardContent>
        </Card>
        {/* Pagination */}
        <CustomerPagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => console.log("Page Changed")}
        />
      </div>
    </div>
  );
}
