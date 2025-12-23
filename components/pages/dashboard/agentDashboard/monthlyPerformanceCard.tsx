import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp } from "lucide-react";
import React from "react";

const MonthlyPerformanceCard = () => {
  return (
    <LiquidGlass className="w-full max-w-[360px]">
      {/* Monthly Performance */}
      <Card className="rounded-4xl">
        <CardHeader>
          <CardTitle className="w-full flex justify-between items-center text-xl font-normal text-white">
            <span>Monthly Performance</span>
            <Award className="w-6 h-6 text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4 px-0">
          <div className="text-white/50 mb-4">November 2025</div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Leads</span>
              <span className="text-xl font-semibold">145</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Conversions</span>
              <span className="text-xl font-semibold text-green-500">87</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Conversion Rate</span>
              <span className="text-xl font-semibold text-purple-500">
                60.0%
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-white/70">Total Sales</span>
              <span className="text-2xl font-semibold">৳456,789</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </CardContent>
      </Card>
    </LiquidGlass>
  );
};

export default MonthlyPerformanceCard;
