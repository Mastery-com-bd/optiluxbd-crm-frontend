"use client";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Box, Briefcase, Search, User } from "lucide-react";
import Link from "next/link";
import { TCategoryPageProps } from "./all/all-categories";
import Image from "next/image";
import { OverviewCard } from "../shared/overviewCard";

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
    highlightColor: "text-emerald-400",
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

export function CategoryGrid({ categories }: TCategoryPageProps) {
  return (
    <section className="space-y-10">
      <OverviewCard stats={stats} />
      <div className="space-y-6 w-full">
        {/* Header with search and link */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Input
              icon={<Search className="w-4 h-4" />}
              type="text"
              placeholder="Search In category"
              className=""
            />
          </div>
          <Link href={"/dashboard/admin/categories"} className="relative">
            <div className="relative">
              <ButtonComponent
                buttonName="See all Category"
                varient="purple"
                clasName="p-[12px]"
              />
            </div>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* First row */}
          {categories.map((category) => (
            <div
              key={category?.id}
              className="effectBlack p-6 cursor-pointer hover:scale-[1.02] transition-transform rounded-xl"
            >
              {/* Inner bordered image container */}
              <div className="effectBlack flex justify-center items-center min-h-24 rounded-xl">
                <Image
                  src={
                    category?.image_url ||
                    "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                  }
                  height={300}
                  width={300}
                  alt={category?.name}
                  className="h-24 w-24 object-contain"
                />
              </div>
              {/* Category name */}
              <h3 className="text-white font-semibold text-center mt-4">
                {category?.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
