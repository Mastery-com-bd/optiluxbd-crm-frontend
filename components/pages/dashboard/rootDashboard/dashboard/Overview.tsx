"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRight,
  Box,
  Briefcase,
  User,
} from "lucide-react";
import { useState } from "react";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

const stats = [
  {
    icon: Box,
    label: "Active Agent",
    value: "128",
    change: 36.8,
    isPositive: true,
    highlight: false,
  },
  {
    icon: User,
    label: "New Leads",
    value: "512",
    change: 36.8,
    isPositive: false,
    highlight: false,
  },
  {
    icon: Briefcase,
    label: "Total Sales",
    value: "6812",
    change: 36.8,
    isPositive: true,
    highlight: false,
  },
  {
    icon: ArrowUpRight,
    label: "Total Orders",
    value: "8565",
    change: 36.8,
    isPositive: true,
    highlight: false,
  },
];

const Overview = () => {
  const [activeFilter, setActiveFilter] = useState("1Y");
  return (
    <div className="space-y-6 w-full mx-auto">
      {/* Overview Card */}
      <LiquidGlass
        shadowIntensity="xxs"
        glowIntensity="none"
        className="rounded-3xl bg-white/5 backdrop-blur-3xl p-6 md:p-8"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-xl font-semibold">Overview</h2>

          {/* Time Filters */}
          <div className="flex items-center gap-1 p-1">
            {timeFilters.map((filter, idx) => (
              <LiquidGlass
                showBG={false}
                onClick={() => setActiveFilter(filter)}
                key={idx}
                shadowIntensity={activeFilter === filter ? "xxs" : "none"}
                glowIntensity={activeFilter === filter ? "xs" : "none"}
                borderRadius="12px"
                className=""
              >
                <button
                  className={`px-4 py-2 text-sm font-semibold cursor-pointer ${
                    activeFilter !== filter
                      ? " text-gray-400"
                      : "text-[#F3F3F3]"
                  }`}
                >
                  {filter}
                </button>
              </LiquidGlass>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${
                index !== stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              {/* Icon */}
              <LiquidGlass
                showBG={false}
                shadowIntensity="xxs"
                className="w-16 h-16 rounded-full bg-linear-to-br from-[#3a3a4e] to-[#2a2a3e] flex items-center justify-center shadow-lg mb-8"
              >
                <stat.icon className="w-6 h-6 text-gray-300" />
              </LiquidGlass>

              {/* Label */}
              <p className={`text-lg text-white font-medium mb-2`}>
                {stat.label}
              </p>

              {/* Value */}
              <p
                className={`text-[32px] font-normal leading-10 mb-3 ${
                  stat.highlight ? "text-success" : "text-white"
                }`}
              >
                {stat.value}
              </p>

              {/* Change */}
              <div className="flex items-center gap-2">
                <LiquidGlass
                  borderRadius="10px"
                  showBG={false}
                  shadowIntensity="xxs"
                >
                  <div className="flex justify-center items-center px-2 py-1.5 gap-1">
                    {stat.isPositive ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    <span
                      className={`${
                        stat.isPositive ? "text-[#00A656]" : "text-[#FF6A55]"
                      }`}
                    >
                      {stat.change}
                    </span>
                    %
                  </div>
                </LiquidGlass>
                {stat.label === "Active Agent" && (
                  <span className="text-[#EBEBEB] text-sm">vs last year</span>
                )}
                {stat.label === "New Leads" && (
                  <span className="text-[#EBEBEB] text-sm">
                    Requires attention
                  </span>
                )}
                {stat.label === "Total Sales" && (
                  <span className="text-[#EBEBEB] text-sm">Need to assign</span>
                )}
                {stat.label === "Total Orders" && (
                  <span className="text-[#EBEBEB] text-sm">
                    Lead to Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </LiquidGlass>
    </div>
  );
};

export default Overview;
