import { TeamCards } from "@/components/pages/dashboard/agent/team/team-cards";
import { TeamHierarchyView } from "@/components/pages/dashboard/agent/team/team-hierarchy-view";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="min-h-screen max-w-[1130px] ">
        <TeamHierarchyView />
        <div className="w-full mx-auto">
          <TeamCards />
        </div>
      </div>
    </div>
  );
};

export default Page;
