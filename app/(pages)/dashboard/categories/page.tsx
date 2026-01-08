'use client';
import { CategoryGrid } from "@/components/pages/dashboard/categories/category-grid";
import { OverviewCard } from "@/components/pages/dashboard/shared/overviewCard";
import { ArrowUpRight, Box, Briefcase, User } from "lucide-react";

const Page = () => {
  const stats = [
    {
      icon: Box,
      label: "Active Combo",
      value: "128",
      isPositive: true,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: User,
      label: "Total Sales",
      value: "512",
      isPositive: false,
      change: "36.8%",
      highlight: false,
    },
    {
      icon: Briefcase,
      label: "Revenue Generated",
      value: "120.4k",
      isPositive: true,
      change: "36.8%",
      highlight: true,
      highlightColor: "text-emerald-400" // Figma-te eai card-er color green/emerald chilo
    },
    {
      icon: ArrowUpRight,
      label: "Avg. Discount",
      value: "25%",
      isPositive: true,
      change: "36.8%",
      highlight: false,
    },
  ];
  return (
    <div className=" items-center justify-center min-h-screen my-10">
      {/* <CategoryOverview /> */}
      <OverviewCard stats={stats} />
      <CategoryGrid />
    </div>
  );
};

export default Page;
