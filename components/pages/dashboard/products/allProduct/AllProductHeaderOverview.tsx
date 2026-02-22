'use client'
import { AlertTriangle, Box, Upload, User, XCircle } from "lucide-react";
import PageHeader from "../../shared/pageHeader";
import Link from "next/link";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { OverviewCard } from "../../shared/overviewCard";

export default function AllProductHeaderOverview() {
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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <PageHeader
                        title="All Products"
                        description="Browse and manage your complete product catalog"
                    />
                </div>
                <Link href={"/dashboard/admin/products/add-product"}>
                    <ButtonComponent varient="yellow" buttonName="Add Product" icon={Upload} />
                </Link>
            </div>
            <OverviewCard stats={stats} />
        </div>
    )
}
