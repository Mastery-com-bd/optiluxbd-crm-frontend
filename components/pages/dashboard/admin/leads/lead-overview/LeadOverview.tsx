"use client";
import { OverviewCard } from "../../../shared/overviewCard";
import PageHeader from "../../../shared/pageHeader";
import AddLeadsModal from "../all-leads/AddLeadsModal";
import ChartSection from "./ChartSection";
import { Box, User, Briefcase, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    icon: Box,
    label: "Total Leads",
    value: "128",
    isPositive: true,
    change: "36.8",
    highlight: false,
  },
  {
    icon: User,
    label: "New Today",
    value: "512",
    isPositive: true,
    change: "36.8",
    highlight: false,
  },
  {
    icon: Briefcase,
    label: "Unassigned",
    value: "12",
    isPositive: true,
    change: "36.8",
    highlight: true,
    highlightColor: "text-red-600"   
  },
  {
    icon: ArrowUpRight,
    label: "Assigned",
    value: "85",
    isPositive: true,
    change: "36.8",
    highlight: false,
  },
];
const LeadOverview = () => {
  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          {/* <h1 className="text-3xl font-semibold">Lead Overview</h1>
          <p className="text-[#A1A1A1] leading-5">
            Operational overview and quick actions.
          </p> */}
          <PageHeader title="Lead Overview" description="Operational overview and quick actions." />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddLeadsModal />
        </div>
      </div>

      <OverviewCard stats={stats}/>
      <ChartSection />
    </div>
  );
};

export default LeadOverview;
