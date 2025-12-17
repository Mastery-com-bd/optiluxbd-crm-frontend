"use client";

import { Card } from "@/components/ui/card";
import PieChartComponent from "./PieChartComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import LeadOvreviewBarChart from "./BarChart";

const ChartSection = () => {
  const [date, setDate] = useState("All");
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6">
      {/* pie chart */}
      <Card className="bg-white/10 h-full relative rounded-3xl px-6 py-4">
        {/* top and bottom border effect */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

        {/* main content */}
        <div className=" w-full h-full rounded-3xl ">
          <PieChartComponent />
          <div className="w-full">
            <div className="grid grid-cols-2 gap-1 mx-auto">
              <p className="flex items-center gap-1">
                <span className="h-4 w-4 rounded-full bg-[#1EAAE7]" />
                <span className="text-text-secondary font-medium">
                  Referral
                </span>
              </p>
              <p className="flex items-center gap-1">
                <span className="h-4 w-4 rounded-full bg-[#FF7A30]" />
                <span className="text-text-secondary font-medium">Organic</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="h-4 w-4 rounded-full bg-[#6418C3]" />
                <span className="text-text-secondary font-medium">
                  Facebook
                </span>
              </p>

              <p className="flex items-center gap-1">
                <span className="h-4 w-4 rounded-full bg-success" />
                <span className="text-text-secondary font-medium">
                  Cold Call
                </span>
              </p>
              <p className="flex items-center gap-1">
                <span className="h-4 w-4 rounded-full bg-brand" />
                <span className="text-text-secondary font-medium">
                  LinkedIn
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* bar chart */}
      <Card className="bg-white/10 h-full relative rounded-3xl px-6 pt-4 pb-0">
        {/* top and bottom border effect */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

        {/* main content */}
        <div className=" w-full h-full rounded-3xl">
          {/* header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Lead Conversion Funnel</h1>
            <div className="flex items-center gap-6">
              {/* status drodpown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <LiquidGlass
                    glowIntensity="xs"
                    shadowIntensity="xs"
                    borderRadius="12px"
                  >
                    <Button
                      variant="default"
                      className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                    >
                      <p className="flex items-center gap-2">
                        <span className="text-[14px]">
                          {date === "All" ? "Select Days" : date}
                        </span>
                        <ChevronDown size={18} />
                      </p>
                    </Button>
                  </LiquidGlass>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/5 backdrop-blur-2xl"
                >
                  {["7", "14", "21", "30"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setDate(item);
                        setFilters((prev) => ({
                          ...prev,
                          limit: Number(item),
                          page: 1,
                        }));
                      }}
                      className={item === date ? "font-medium" : ""}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* main content */}
          <LeadOvreviewBarChart />
        </div>
      </Card>
    </div>
  );
};

export default ChartSection;
