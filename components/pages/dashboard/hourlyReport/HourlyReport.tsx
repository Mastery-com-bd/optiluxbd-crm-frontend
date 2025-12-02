"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import HourlyTeamreport from "./HourlyTeamreport";
import HourlyTeamTarget from "./HourlyteamTarget";

const tabs = ["Team Hourly Report", "Team Hourly target"];
type TTabs = "Team Hourly Report" | "Team Hourly target";

const HourlyReport = () => {
  const [activeTab, setActiveTab] = useState<TTabs | string>(
    "Team Hourly Report"
  );
  return (
    <div className="p-6 space-y-6">
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
      {activeTab === "Team Hourly Report" && <HourlyTeamreport />}
      {activeTab === "Team Hourly target" && <HourlyTeamTarget />}
    </div>
  );
};

export default HourlyReport;
