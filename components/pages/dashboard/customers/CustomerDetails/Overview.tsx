"use client";

import { Card } from "@/components/ui/card";
import {
  CircleCheckBig,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* card section */}
      <div className="flex items-center gap-5">
        {/* first card */}
        <Card className="bg-white/5 flex flex-row px-4 w-full relative rounded-4xl overflow-hidden">
          {/* borders bottom and top */}
          <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />
          <TrendingUp
            size={100}
            className="text-[rgba(5,223,114,0.10)] absolute top-6 right-10"
          />

          {/* icon*/}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(0,201,80,0.20)_0%,rgba(0,166,62,0.20)_100%)] rounded-xl border border-[rgba(0,201,80,0.40)] flex items-center justify-center">
            <span>
              <TrendingUp className="text-[#05DF72]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Total Spend</p>
            <h1 className="text-3xl">6,850</h1>
          </div>
        </Card>

        {/* second card */}
        <Card className="bg-white/5 flex flex-row px-4 w-full relative rounded-4xl">
          {/* borders bottom and top */}
          <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />

          <ShoppingCart
            size={70}
            className="text-[rgba(81,162,255,0.20)] absolute top-6 right-12"
          />

          {/* icon */}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(43,127,255,0.20)_0%,rgba(21,93,252,0.20))] rounded-xl border border-[rgba(43,127,255,0.30)] flex items-center justify-center">
            <span>
              <TrendingUp className="text-[#51A2FF]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Total Order</p>
            <h1 className="text-3xl">12</h1>
          </div>
        </Card>

        {/* third card */}
        <Card className="bg-white/5 flex flex-row px-4 w-full relative rounded-4xl">
          {/* borders bottom and top */}
          <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />

          <Target
            size={70}
            className="text-[rgba(194,122,255,0.10)] absolute top-6 right-12"
          />

          {/* icon */}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(173,70,255,0.20)_0%,rgba(152,16,250,0.20)_100%)] rounded-xl border border-[rgba(173,70,255,0.30)] flex items-center justify-center">
            <span>
              <Target className="text-[#C27AFF]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Avg Value</p>
            <h1 className="text-3xl">650</h1>
          </div>
        </Card>
      </div>

      {/* status section */}
      <Card className="bg-white/5 px-6 w-full rounded-4xl ">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="font-medium text-xl">Loyalty Status</h1>
            <p className="text-[#B1B1B1] leading-5">
              1,800 total points <br /> earned
            </p>
          </div>
          <div className="h-10 w-20 border-2 border-[#F0B10080] rounded-full bg-[linear-gradient(90deg,#F0B1004D_0%,#D0870066_100%)] flex items-center justify-center gap-1">
            <p className="text-[#FDC700] flex items-center gap-1">
              <Star size={16} />
              Gold
            </p>
          </div>
        </div>

        {/* status bar */}
        <div className="w-full space-y-3">
          {/* labels */}
          <div className="flex justify-between text-xs text-white/70">
            <span>Gold</span>
            <span>VIP</span>
          </div>

          {/* track */}
          <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[linear-gradient(90deg,#FDFDFD_0%,#FF6900_100%)]"
              style={{ width: "65%" }}
            />
          </div>
          <h1 className="flex items-center justify-center gap-1">
            <span>200 Points</span>{" "}
            <span className="text-[#B1B1B1]">needed to reach VIP tier</span>
          </h1>
        </div>
      </Card>

      {/* recent activity */}
      <Card className="bg-white/5 px-6 w-full rounded-4xl ">
        <h1 className="font-medium text-xl">Recent Activity</h1>
        <div className="space-y-4">
          {/* order */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[rgba(0,201,80,0.20)] flex items-center justify-center">
              <CircleCheckBig size={20} className="text-[#05DF72]" />
            </div>
            <div>
              <h1>Order #ORD-53443 Delivered</h1>
              <p className="text-[#B1B1B1]">Nov 6, 2025 - 2:30 PM</p>
            </div>
          </div>

          {/* update status */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[rgba(43,127,255,0.20)] flex items-center justify-center">
              <Star size={20} className="text-[#51A2FF]" />
            </div>
            <div>
              <h1>Upgraded to Gold Tier</h1>
              <p className="text-[#B1B1B1]">Jul 24, 2025 - 10:15 AM</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
