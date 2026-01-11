"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { convertDate } from "@/utills/dateConverter";
import { getRelativeTime } from "@/utills/getRelativeTime";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckBig,
  Clock,
  Database,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

type TStats = {
  icon: LucideIcon;
  label: string;
  value: string;
  change: number | null;
  isPositive: boolean;
  highlight: boolean;
};

const stats: TStats[] = [
  {
    icon: Database,
    label: "Total Backups",
    value: "4",
    change: 36.8,
    isPositive: true,
    highlight: false,
  },
  {
    icon: CircleCheckBig,
    label: "Successful",
    value: "5",
    change: 36.8,
    isPositive: false,
    highlight: false,
  },
  {
    icon: Clock,
    label: "Last Backup",
    value: "2026-01-08 08:30 AM",
    change: null,
    isPositive: true,
    highlight: true,
  },
  {
    icon: Database,
    label: "Total Size",
    value: "2.01 GB",
    change: 36.8,
    isPositive: true,
    highlight: false,
  },
];

const BackupOverview = () => {
  const [activeFilter, setActiveFilter] = useState("1Y");
  return (
    <div className="space-y-6 w-full mx-auto">
      {/* Overview Card */}
      <LiquidGlass
        shadowIntensity="xxs"
        glowIntensity="none"
        className="rounded-3xl bg-white/5 backdrop-blur-3xl p-6 md:p-8">
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
                className="">
                <button
                  className={`px-4 py-2 text-sm font-semibold cursor-pointer ${
                    activeFilter !== filter
                      ? " text-gray-400"
                      : "text-[#F3F3F3]"
                  }`}>
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
              }`}>
              {/* Icon */}
              <LiquidGlass
                showBG={false}
                shadowIntensity="xxs"
                className="w-16 h-16 rounded-full bg-linear-to-br from-[#3a3a4e] to-[#2a2a3e] flex items-center justify-center shadow-lg mb-8">
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.label === "Total Backups" && "text-[#00A656]"
                  } ${stat.label === "Successful" && "text-[#FF6B00]"} ${
                    stat.label === "Last Backup" && "text-[#2A85FF]"
                  } ${stat.label === "Total Size" && "text-[#7F5FFF]"}`}
                />
              </LiquidGlass>

              {/* Label */}
              <p className={`text-lg text-text-secondary font-medium mb-2`}>
                {stat.label}
              </p>

              {/* Value */}
              <div
                className={`text-[32px] font-normal leading-10 mb-3 ${
                  stat.highlight ? "text-success" : "text-white"
                }`}>
                {stat.label === "Last Backup" ? (
                  <p className="text-2xl flex items-center gap-1 pb-2">
                    <span>
                      {new Date(stat.value).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(stat.value).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                ) : (
                  <span>{stat.value}</span>
                )}
              </div>

              {/* Change */}
              <div className="flex items-center gap-2">
                <LiquidGlass
                  borderRadius="10px"
                  showBG={false}
                  shadowIntensity="xxs">
                  <div className="flex justify-center items-center px-2 py-1.5 gap-1">
                    {stat.isPositive ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    <span
                      className={`${
                        stat.isPositive ? "text-[#00A656]" : "text-[#FF6A55]"
                      }`}>
                      {stat.label === "Last Backup"
                        ? getRelativeTime(new Date(stat.value))
                        : stat.change}
                    </span>
                    %
                  </div>
                </LiquidGlass>
                {stat.label === "Total Backups" && (
                  <span className="text-text-secondary text-sm">
                    vs last year
                  </span>
                )}
                {stat.label === "Successful" && (
                  <span className="text-text-secondary text-sm">
                    Requires attention
                  </span>
                )}
                {stat.label === "Last Backup" && (
                  <span className="text-text-secondary text-sm">
                    ago
                  </span>
                )}
                {stat.label === "Total Size" && (
                  <span className="text-text-secondary text-sm">
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

export default BackupOverview;
