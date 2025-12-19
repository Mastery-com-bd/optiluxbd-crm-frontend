"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import AddLeadsModal from "../all-leads/AddLeadsModal";
import ChartSection from "./ChartSection";
import LeadOverviewCard from "./LeadOverviewCard";
import { Edit, Pencil, Plus, Trash2 } from "lucide-react";

const LeadOverview = () => {
  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Lead Overview</h1>
          <p className="text-[#A1A1A1] leading-5">
            Operational overview and quick actions.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddLeadsModal />
          <ButtonComponent buttonName="Add Leads" icon={Trash2} />
        </div>
      </div>

      <LeadOverviewCard />
      <ChartSection />
    </div>
  );
};

export default LeadOverview;
