"use client";

import {
  AwardIcon,
  TrendingUp,
  UserCheck,
  Users2
} from "lucide-react";
import AddAgent from "./addAgent";
import { OverviewCard } from "../shared/overviewCard";
import PageHeader from "../shared/pageHeader";

const stats = [
  {
    icon: Users2,
    label: "Total Agent",
    value: "128",
    highlight: false,
  },
  {
    icon: UserCheck,
    label: "Active Agent",
    value: "512",

    highlight: false,
  },
  {
    icon: TrendingUp,
    label: "Avg Conversion Rate",
    value: "120.4k",
    isPositive: true,
    change: "12%",
    highlight: true,
  },
  {
    icon: AwardIcon,
    label: "Top Performer",
    value: "25%",
    isPositive: true,
    change: "12%",
    highlight: false,
  },
];

export function AgentOverview() {

  return (
    <div className="mb-8 w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="All Agents"
            description="Browse and manage All Agent"
          />
        </div>
        <AddAgent />
      </div>

      {/* Overview Card */}
      <OverviewCard stats={stats} />
    </div>
  );
}
