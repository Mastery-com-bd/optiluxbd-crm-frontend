"use client";

import {
  TargetIcon,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { OverviewCard } from "../../../shared/overviewCard";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

const stats = [
  {
    icon: Users,
    label: "Total Teams",
    value: "128",
    change: "36.8",
    isPositive: true,
    highlight: false,
    highlightColor:"text-green-600"
  },
  {
    icon: User,
    label: "Total Members",
    value: "512",
    change: "36.8",
    isPositive: true,
    highlight: false,
    highlightColor:"text-green-600"
  },
  {
    icon: TrendingUp,
    label: "Avg Conversion",
    value: "63%",
    change: "36.8",
    isPositive: true,
    highlight: true,
    highlightColor:"text-green-600"
  },
  {
    icon: TargetIcon,
    label: "Total Leads",
    value: "8555",
    change: "36.8",
    isPositive: true,
    highlight: true,
    highlightColor:"text-green-600"
  },
];
const TeamOverViewCard = () => {
  const [activeFilter, setActiveFilter] = useState("1Y");
  return (
    <div className="space-y-6 w-full mx-auto">
      <OverviewCard stats={stats}/>
    </div>
  );
};

export default TeamOverViewCard;
