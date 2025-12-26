"use client"
import AllProducts from "@/components/pages/dashboard/products/allProduct/allProducts";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { useHasPermission } from "@/utills/permission";
import { AlertTriangle, Box, Plus, Upload, User, XCircle } from "lucide-react";
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
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <PageHeader
            title="All Products"
            description="Browse and manage your complete product catalog"
          />
        </div>
        {permission && (
          <Link href={"/dashboard/admin/products/add-product"}>
            <ButtonComponent varient="yellow" buttonName="Add Product" icon={Upload} />
          </Link>
        )}
      </div>
      <OverviewCard stats={stats} />
      <AllProducts />
    </div>
  );
};

export default Page;