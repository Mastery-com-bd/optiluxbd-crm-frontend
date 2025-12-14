"use client"

import { AwardIcon, TrendingUp, UserCheck, Users2 } from "lucide-react";
import AddAgent from "../addAgent";
import { OverviewCard } from "../../shared/overviewCard";
import PageHeader from "../../shared/pageHeader";

const stats = [
  {
    icon: Users2,
    label: "Present Today",
    value: "50",
    highlight: true,
  },
  {
    icon: UserCheck,
    label: "Late",
    value: "8",
    highlight: false,
  },
  {
    icon: TrendingUp,
    label: "Absent",
    value: "5",
    highlight: true,
  },
  {
    icon: AwardIcon,
    label: "On Leave",
    value: "8",
    isPositive: true,
  },
];

const AttendenceOverview = () => {
  return (
    <div className="w-full max-w-[1135px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        {/* Header */}
        <PageHeader
          title="Attendence Overview"
          description="Browse and manage All Combo Pack"
        />
        <AddAgent />
      </div>

      {/* Overview Card */}
      <OverviewCard stats={stats} />
    </div>
  );
};

export default AttendenceOverview;
