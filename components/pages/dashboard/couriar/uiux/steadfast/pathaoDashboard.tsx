"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  Home,
  Package,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DeliveryAnalytics } from "./steadfast-delivery-report";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import AssignmentTable from "./assignmentTable";
import ReturnTable from "./returnTable";

const deliverySteps = [
  {
    id: 1,
    title: "Order Placed",
    description: "Your order has been received and is being processed",
    date: "Nov 25, 2024 at 10:30 AM",
    status: "completed",
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: "Order Confirmed",
    description: "Order confirmed and payment verified",
    date: "Nov 25, 2024 at 11:15 AM",
    status: "completed",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Packed",
    description: "Your items have been packed and ready for shipment",
    date: "Nov 25, 2024 at 2:45 PM",
    status: "completed",
    icon: Package,
  },
  {
    id: 4,
    title: "Shipped",
    description: "Package picked up by courier and in transit",
    date: "Nov 26, 2024 at 9:00 AM",
    status: "current",
    icon: Truck,
  },
  {
    id: 5,
    title: "Out for Delivery",
    description: "Package is out for delivery to your address",
    date: "Expected: Nov 27, 2024",
    status: "pending",
    icon: Home,
  },
  {
    id: 6,
    title: "Delivered",
    description: "Package successfully delivered",
    date: "Pending",
    status: "pending",
    icon: CheckCircle,
  },
];

export function PathaoDashboard() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-white mb-1">
          Pathao Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-green-500">API Connected</span>
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">Updated 5m ago</span>
        </div>
      </div>

      {/* Tabs and Actions */}
      <Tabs defaultValue="assignment" className="w-full">
        <div className="flex items-center justify-between mb-8">
          <TabsList className="bg-transparent gap-2 h-auto p-0">
            <LiquidGlass borderRadius="12px">
              <TabsTrigger
                value="assignment"
                className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-white border-none data-[state=inactive]:text-gray-400"
              >
                Assignment
              </TabsTrigger>
            </LiquidGlass>
            <LiquidGlass borderRadius="12px">
              <TabsTrigger
                value="tracking"
                className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-white border-none data-[state=inactive]:text-gray-400"
              >
                Tracking
              </TabsTrigger>
            </LiquidGlass>
            <LiquidGlass borderRadius="12px">
              <TabsTrigger
                value="delivery-report"
                className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-white border-none data-[state=inactive]:text-gray-400"
              >
                Delivery Report
              </TabsTrigger>
            </LiquidGlass>
            <LiquidGlass borderRadius="12px">
              <TabsTrigger
                value="returned"
                className="px-4 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-white border-none data-[state=inactive]:text-gray-400"
              >
                Returned
              </TabsTrigger>
            </LiquidGlass>
          </TabsList>
          <div className="flex gap-3">
            <LiquidGlass borderRadius="12px">
              <button className="px-4 py-2 rounded-lg text-sm font-medium">
                Selected Leads 0
              </button>
            </LiquidGlass>
            <LiquidGlass borderRadius="12px">
              <button className="px-4 py-2 rounded-lg text-sm font-medium">
                Assign to Courier
              </button>
            </LiquidGlass>
          </div>
        </div>

        <TabsContent value="assignment" className="mt-0">
          <div>
            <AssignmentTable />
          </div>
        </TabsContent>

        {/* Tracking Tab Content */}
        <TabsContent value="tracking" className="mt-0">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[36px] font-semibold text-white mb-1">
                Track Order
              </h2>
              <p className="text-[#B1B1B1] font-medium text-[16px]">
                Real-time shipment status and location.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Tracking Number (e.g., TRK-8829)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-[340px] pl-10 pr-4 py-3 rounded-[30px] bg-[#2a2440] border border-[#3d3555] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#4d4565]"
              />
            </div>
          </div>

          <div className="flex gap-6">
            {/* Left Column */}
            <LiquidGlass borderRadius="14px" className="flex-1 p-6">
              {/* Tracking Information Card */}
              <LiquidGlass
                borderRadius="14px"
                className="rounded-2xl p-1 mb-6 shadow-none"
              >
                <div className="rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">
                    Tracking Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Tracking Number
                      </p>
                      <p className="text-[#d4a855] font-medium">
                        SBC-1234567890
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Shipping Method
                      </p>
                      <p className="text-white">Express Delivery</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Courier Service
                      </p>
                      <p className="text-white">Sundarban Courier</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Current Location
                      </p>
                      <p className="text-white">Dhaka Distribution Center</p>
                    </div>
                  </div>
                </div>
              </LiquidGlass>

              {/* Delivery Progress */}
              <div className="mb-4">
                <h3 className="text-white font-semibold mb-4">
                  Delivery Progress
                </h3>
                <div className="space-y-0">
                  {deliverySteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = step.status === "completed";
                    const isCurrent = step.status === "current";
                    const isPending = step.status === "pending";
                    const isLast = index === deliverySteps.length - 1;

                    return (
                      <div key={step.id} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isCompleted || isCurrent
                                ? "bg-[#d4a855]/20 border border-[#d4a855]/50"
                                : "bg-[#2a2440] border border-[#3d3555]"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                isCompleted || isCurrent
                                  ? "text-[#d4a855]"
                                  : "text-gray-500"
                              }`}
                            />
                          </div>
                          {!isLast && (
                            <div
                              className={`w-0.5 h-20 ${
                                isCompleted ? "bg-[#d4a855]/50" : "bg-[#3d3555]"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-3">
                            <h4
                              className={`font-medium ${
                                isPending
                                  ? "text-gray-500"
                                  : isCurrent
                                  ? "text-[#d4a855]"
                                  : "text-white"
                              }`}
                            >
                              {step.title}
                            </h4>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded text-xs border border-[#d4a855]/50 text-[#d4a855]">
                                Current
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              isPending ? "text-gray-600" : "text-gray-400"
                            }`}
                          >
                            {step.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <Clock
                              className={`w-3.5 h-3.5 ${
                                isPending ? "text-gray-600" : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isPending ? "text-gray-600" : "text-gray-400"
                              }`}
                            >
                              {step.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </LiquidGlass>

            {/* Right Column */}
            <div className="w-[320px] space-y-4">
              <LiquidGlass borderRadius="32px" className="rounded-[32px] p-5">
                <h3 className="text-[#FDFDFD] text-[20px] font-bold mb-4">
                  Order Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#B1B1B1] text-[16px] font-normal">
                      Product
                    </span>
                    <span className="text-[#FDFDFD] font-medium text-[16px]">
                      MacBook Pro M2
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B1B1B1] text-[16px] font-normal">
                      Amount
                    </span>
                    <span className="text-[#FDFDFD] font-medium text-[16px]">
                      $1,299.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B1B1B1] text-[16px] font-normal">
                      Payment
                    </span>
                    <span className="text-[#22C55E] font-medium text-[16px]">
                      Paid (VISA)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B1B1B1] text-[16px] font-normal">
                      Weight
                    </span>
                    <span className="text-[#FDFDFD] font-medium text-[16px]">
                      2.4 kg
                    </span>
                  </div>
                </div>
              </LiquidGlass>

              <LiquidGlass borderRadius="32px" className="rounded-[32px] p-5">
                <h3 className="text-[#FDFDFD] font-semibold mb-4">
                  Customer Info
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    width={48}
                    height={48}
                    src="/customer-profile.png"
                    alt="John Doe"
                    className="w-12 h-12 rounded-full object-contain"
                  />
                  <div>
                    <p className="text-[#FDFDFD] text-[16px] font-medium">
                      John Doe
                    </p>
                    <p className="text-[#B1B1B1] text-sm">+880 1712 345678</p>
                  </div>
                </div>
                <LiquidGlass borderRadius="24px" className="rounded-[24px] p-3">
                  <p className="text-[#B1B1B1] text-[16px]">
                    House 42, Road 13/A, Block E, Banani, Dhaka-1213
                  </p>
                </LiquidGlass>
              </LiquidGlass>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="delivery-report" className="mt-0">
          <DeliveryAnalytics />
        </TabsContent>

        <TabsContent value="returned" className="mt-0">
          <ReturnTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
