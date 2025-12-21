'use client'
import LowStockProducts from "@/components/pages/dashboard/products/lowStockProducts/LowStockProducts";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { useHasPermission } from "@/utills/permission";
import { ArrowBigDown, ArrowUp, Box, Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
    const stats = [
        {
            icon: Box,
            label: "Critical stock",         // Screenshot e 1st item
            value: "128",
            isPositive: true,
            change: "↑ 36.8%",
            highlight: true,
        },
        {
            icon: ArrowBigDown,
            label: "Low Stock Items",        // Screenshot e 2nd item
            value: "512",
            isPositive: false,
            change: "↓ 36.8%",
            highlight: true,
            highlightColor: "text-red-600"
        },
        {
            icon: Box,
            label: "Total Products",         // Screenshot e 3rd item
            value: "6812",
            isPositive: true,
            change: "↑ 36.8%",
            highlight: false,
        },
        {
            icon: ArrowUp,
            label: "Average Stock Level",    // Screenshot e 4th item
            value: "8565",
            isPositive: true,
            change: "↑ 36.8%",
            highlight: false,
        },
    ];
    const permission = useHasPermission("PRODUCTS CREATE");
    return (
        <div className="px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="">
                        <h3 className="text-2xl font-bold">Low stock products</h3>
                        <br />
                        <p className="text-gray-500">Browse and manage your complete product catalog.</p>
                    </div>
                </div>
                {permission && (
                    <Link href={"/dashboard/admin/products/add-product"}>
                        <ButtonComponent
                            buttonName="Add Product"
                            icon={Plus}
                            varient="yellow"
                        />
                    </Link>
                )}
            </div>
            <div className="mb-6">
                <OverviewCard stats={stats} />
            </div>
            <LowStockProducts />
        </div>
    );
};

export default Page;