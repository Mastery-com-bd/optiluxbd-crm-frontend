"use client";

import { Card } from "@/components/ui/card";
import CreateTeam from "../team/CreateTeam";
import OverviewChart from "./OverviewChart";
import TeamOverViewCard from "./TeamOverViewCard";
import PageHeader from "../../../shared/pageHeader";

const TeamOverview = () => {
  return (
    <section className="min-h-screen bg-transparent text-foreground space-y-4 w-full px-4">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <PageHeader title="Teams Overview" description="Operational overview and quick actions." />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateTeam />
        </div>
      </div>

      {/* overview section */}
      <TeamOverViewCard />

      {/* overview chart */}
      <Card className="effect w-full h-full relative rounded-3xl px-6 py-2 mt-8 border-0">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl pt-4 space-y-4">
          <PageHeader
            title="Team Performance"
            description="Conversion rates and lead performance across all teams (sorted by
              highest conversion)"
          />
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
