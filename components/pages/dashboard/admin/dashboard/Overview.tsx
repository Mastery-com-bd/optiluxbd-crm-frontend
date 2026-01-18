"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRight,
  Box,
  Briefcase,
  User,
} from "lucide-react";
import { useState } from "react";
import { OverviewCard } from "../../shared/overviewCard";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

const stats = [
  {
    icon: Box,
    label: "Active Agent",
    value: "128",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
  {
    icon: User,
    label: "New Leads",
    value: "512",
    change: "36.8",
    isPositive: false,
    highlight: false,
  },
  {
    icon: Briefcase,
    label: "Total Sales",
    value: "6812",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
  {
    icon: ArrowUpRight,
    label: "Total Orders",
    value: "8565",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
];

const Overview = () => {
  const [activeFilter, setActiveFilter] = useState("1Y");
  return (
    <OverviewCard stats={stats} />
  );
};

export default Overview;
