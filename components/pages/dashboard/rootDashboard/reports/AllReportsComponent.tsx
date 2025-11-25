"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import AllOverview from "./reportComponent/AllOverview";
import DailyReport from "./reportComponent/DailyReport";
import AgentReport from "./reportComponent/AgentReport";
import TeamReport from "./reportComponent/TeamReport";
import ProductReport from "./reportComponent/ProductReport";
import PackageReport from "./reportComponent/PackageReport";
import CourierReport from "./reportComponent/CourierReport";
import GeographicReport from "./reportComponent/GeographicReport";
const tabs = [
  "All Overview",
  "Daily Reports",
  "Agent Report",
  "Team Report",
  "Product Report",
  "Package Report",
  "Courier Report",
  "Geographic Report",
];
type TTabs =
  | "All Overview"
  | "Daily Reports"
  | "Agent Report"
  | "Team Report"
  | "Product Report"
  | "Package Report"
  | "Courier Report"
  | "Geographic Report";

const AllReportsComponent = () => {
  const [activeTab, setActiveTab] = useState<TTabs | string>("All Overview");

  return (
    <div className="space-y-4">
      {/* Dropdown */}
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-56 justify-between"
            >
              {activeTab}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="cursor-pointer"
              >
                {tab}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* report table */}
      <div>
        {activeTab === "All Overview" && <AllOverview />}
        {activeTab === "Daily Reports" && <DailyReport />}
        {activeTab === "Agent Report" && <AgentReport />}
        {activeTab === "Team Report" && <TeamReport />}
        {activeTab === "Product Report" && <ProductReport />}
        {activeTab === "Package Report" && <PackageReport />}
        {activeTab === "Courier Report" && <CourierReport />}
        {activeTab === "Geographic Report" && <GeographicReport />}
      </div>
    </div>
  );
};

export default AllReportsComponent;
