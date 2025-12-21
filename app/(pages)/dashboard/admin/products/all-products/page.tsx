"use client"
import AllProducts from "@/components/pages/dashboard/products/allProduct/allProducts";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import { Button } from "@/components/ui/button";
import { useHasPermission } from "@/utills/permission";
import { AlertTriangle, Box, Plus, User, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  const permission = useHasPermission("PRODUCTS CREATE");
  const stats = [
    {
      icon: Box,
      label: "Total Product",
      value: "128",
      isPositive: true,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: User,
      label: "Active Products",
      value: "512",
      isPositive: false,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: AlertTriangle,
      label: "Low Stock Products",
      value: "12",
      isPositive: true,
      change: "36.8%",
      highlight: true,
    },
    {
      icon: XCircle,
      label: "Out Of Stock Product",
      value: "85",
      isPositive: false,
      change: "36.8%",
      highlight: true,
      highlightColor: "text-red-600"
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">CRM</span>
            <span>›</span>
            <span>Dashboard</span>
            <span>›</span>
            <span>All Products</span>
          </div>
        </div>
        {permission && (
          <Link href={"/dashboard/admin/products/add-product"}>
            <Button className="cursor-pointer" variant="yellow">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        )}
      </div>
      <OverviewCard stats={stats} />
      <AllProducts />
    </div>
  );
};

export default Page;
