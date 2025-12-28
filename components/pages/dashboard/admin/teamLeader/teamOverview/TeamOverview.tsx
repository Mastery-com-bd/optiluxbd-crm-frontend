"use client";

import { Card } from "@/components/ui/card";
import CreateTeam from "../team/CreateTeam";
import OverviewChart from "./OverviewChart";
import TeamOverViewCard from "./TeamOverViewCard";

const TeamOverview = () => {
  return (
    <section className="min-h-screen bg-transparent text-foreground space-y-4 w-full px-4">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Teams Overview</h1>
          <p className="text-[#A1A1A1] leading-5">
            Operational overview and quick actions.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateTeam />
        </div>
      </div>

      {/* overview section */}
      <TeamOverViewCard />

      {/* overview chart */}
      <Card className="bg-white/10 w-full h-full relative rounded-3xl px-6 py-2">
        {/* top and bottom border effect */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

        {/* main content */}
        <div className=" w-full h-full rounded-3xl pt-4 space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Team Performance</h1>
            <p className="text-sm text-text-secondary font-medium">
              Conversion rates and lead performance across all teams (sorted by
              highest conversion)
            </p>
          </div>
          <OverviewChart />
          <div className="flex items-center justify-center gap-5">
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 rounded-full bg-[#F50F0F]" />
              <span className="text-text-secondary font-medium">
                Low (&lt; 30%)
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 rounded-full bg-[#FF7B0F]" />
              <span className="text-text-secondary font-medium">
                Medium (30-50% )
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 rounded-full bg-[#05BD3D]" />
              <span className="text-text-secondary font-medium">
                High (&gt; 50%)
              </span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default TeamOverview;
