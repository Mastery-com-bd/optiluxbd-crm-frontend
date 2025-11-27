"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardStats from "./dashboardStats/DashboardStats";
import AllReportsComponent from "./reports/AllReportsComponent";

const tabs = ["All Statistics", "All Reports"];
type TTabs = "All Statistics" | "All Reports";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState<TTabs | string>("All Statistics");

  return (
    <div className="min-h-screen px-4 md:p-6 lg:px-8 space-y-4">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            className=" justify-start cursor-pointer"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
      {activeTab === "All Statistics" && <DashboardStats />}
      {activeTab === "All Reports" && <AllReportsComponent />}
    </div>
  );
};

export default DashboardHome;
