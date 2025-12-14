"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { ArrowDownIcon, ArrowUpIcon, LucideIcon } from "lucide-react";
import { useState } from "react";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

interface OverviewCardProps {
  stats: {
    icon: LucideIcon;
    label: string;
    value: string;
    isPositive?: boolean;
    change?: string;
    highlight?: boolean;
  }[];
}

export function OverviewCard({ stats }: OverviewCardProps) {
  const [activeFilter, setActiveFilter] = useState("1M");

  return (
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
                className={`px-4 py-2 text-sm font-semibold ${
                  activeFilter !== filter ? " text-gray-400" : "text-[#F3F3F3]"
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
          <div key={index} className="">
            {/* Icon */}
            <LiquidGlass
              showBG={false}
              shadowIntensity="xxs"
              className="w-16 h-16 rounded-full bg-linear-to-br from-[#3a3a4e] to-[#2a2a3e] flex items-center justify-center shadow-lg mb-8"
            >
              <stat.icon className="w-6 h-6 text-gray-300" />
            </LiquidGlass>

            <p
              className={`text-lg font-semibold  mb-2 ${
                stat.highlight ? "text-[#58E081]" : "text-white"
              }`}
            >
              {stat.label}
            </p>

            {/* Value */}
            <p
              className={`text-[50px] leading-[1.2] font-normal ${
                stat.highlight ? "text-[#58E081]" : "text-white"
              } mb-3`}
            >
              {stat.value}
            </p>

            {/* Change */}
            {stat.change && (
              <div className="flex items-center gap-2">
                <LiquidGlass
                  borderRadius="10px"
                  showBG={false}
                  shadowIntensity="xxs"
                >
                  <div className="flex justify-center items-center px-2 py-1.5 gap-1">
                    {stat.isPositive ? (
                      <div>
                        {stat?.isPositive ? (
                          <ArrowUpIcon className="w-3 h-3" />
                        ) : (
                          <ArrowDownIcon className="w-3 h-3" />
                        )}
                      </div>
                    ) : null}
                    <span
                      className={`${
                        stat?.isPositive ? "text-[#00A656]" : "text-[#FF6A55]"
                      }`}
                    >
                      {stat.change}
                    </span>{" "}
                    %
                  </div>
                </LiquidGlass>
                <span className="text-[#EBEBEB] text-sm">vs last year</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </LiquidGlass>
  );
}
