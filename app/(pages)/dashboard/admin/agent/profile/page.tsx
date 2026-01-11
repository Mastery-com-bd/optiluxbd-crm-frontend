import AddAgent from "@/components/pages/dashboard/agent/addAgent";
import { AgentProfile } from "@/components/pages/dashboard/agent/profile/agent-profile";
import { MonthlyAttendance } from "@/components/pages/dashboard/agent/profile/monthly-attendence";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <p className="text-[32px] font-bold text-white">Attendence</p>
          <p className="text-gray-400 text-sm">
            Browse and manage All Combo Pack
          </p>
        </div>
        <AddAgent />
      </div>
      {/* Leaderboard */}
      <AgentProfile />
      <div className="mt-8">
        <MonthlyAttendance />
      </div>
    </div>
  );
};

export default Page;
