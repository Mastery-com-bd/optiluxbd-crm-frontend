"use client";

import { Package, RotateCcw, Truck, Users } from "lucide-react";
import { OverviewCard } from "../shared/overviewCard";

const stats = [
  {
    icon: Package,
    label: "Unassigned Orders",
    value: "128",
    isPositive: true,
    change: "36.8%",
    highlight: false,
  },
  {
    icon: Users,
    label: "Assigned Orders",
    value: "512",
    isPositive: true,
    change: "36.8%",
    highlight: false,
  },
  {
    icon: Truck,
    label: "Delivered",
    value: "6334",
    isPositive: true,
    change: "36.8%",
    highlight: true,
  },
  {
    icon: RotateCcw,
    label: "Returned",
    value: "38",
    isPositive: true,
    change: "36.8%",
    highlight: false,
  },
];

const CourierOverview = () => {
  return <OverviewCard stats={stats} />;
};

export default CourierOverview;
