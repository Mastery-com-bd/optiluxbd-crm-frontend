"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const courierServices = [
  {
    name: "Pathao",
    logo: "/logo/pathao-logo.png",
    gradient: "from-[#3a2a4a] via-[#4a3a5a] to-[#5a3a4a]",
    orders: "12,405",
    success: "92%",
    onTime: "88%",
    trend: "+4.5%",
    trendColor: "text-[#ef4444]",
    barColor: "bg-[#ef4444]",
    bars: [50, 60, 70, 75, 80, 85, 90],
  },
  {
    name: "RedX",
    logo: "/logo/redx-logo.png",
    gradient: "from-[#3a2a3a] via-[#4a2a2a] to-[#5a2a2a]",
    orders: "8,230",
    success: "89%",
    onTime: "85%",
    trend: "+2.1%",
    trendColor: "text-[#ef4444]",
    barColor: "bg-[#ef4444]",
    bars: [45, 50, 55, 60, 65, 70, 75],
  },
  {
    name: "Steadfast",
    logo: "/logo/steadfast-logo.png",
    gradient: "from-[#2a3a4a] via-[#2a4a5a] to-[#2a5a5a]",
    orders: "3,957",
    success: "95%",
    onTime: "92%",
    trend: "+12%",
    trendColor: "text-[#22c55e]",
    barColor: "bg-[#22c55e]",
    bars: [60, 65, 70, 75, 80, 85, 90],
  },
];

export function CourierPatnerCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courierServices.map((service) => (
        <LiquidGlass borderRadius="24px" key={service.name}>
          <div
            className={`relative rounded-3xl border overflow-hidden border-white/10 p-6 hover:scale-[1.02] transition-transform duration-300`}
          >
            <svg
              width="266"
              height="264"
              viewBox="0 0 266 264"
              fill="none"
              className="absolute top-0 right-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.2" filter="url(#filter0_f_600_31594)">
                <rect
                  x="80"
                  y="-56"
                  width="240"
                  height="240"
                  rx="120"
                  fill="#EF4444"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_600_31594"
                  x="0"
                  y="-136"
                  width="400"
                  height="400"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="40"
                    result="effect1_foregroundBlur_600_31594"
                  />
                </filter>
              </defs>
            </svg>

            <div className="absolute right-4 top-4">
              <button className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
                <ChevronRight className="h-5 w-5 text-white/60" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden bg-white">
                <Image
                  src={service.logo || "/placeholder.svg"}
                  alt={`${service.name} logo`}
                  width={40}
                  height={40}
                  className="h-[56px] w-[56px] object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#22c55e]" />
                  <span className="text-sm text-gray-400">Active Service</span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-2xl bg-black/30 p-4 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="mb-1 text-xs text-gray-400">Orders</div>
                  <div className="text-xl font-semibold text-white">
                    {service.orders}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">Success</div>
                  <div className="text-xl font-semibold text-[#22c55e]">
                    {service.success}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">On Time</div>
                  <div className="text-xl font-semibold text-[#3b82f6]">
                    {service.onTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">Performance Trend</span>
              <span className={`text-lg font-semibold ${service.trendColor}`}>
                {service.trend}
              </span>
            </div>

            <div className="flex items-end gap-1.5">
              {service.bars.map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t ${service.barColor} transition-all`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </LiquidGlass>
      ))}
    </div>
  );
}
