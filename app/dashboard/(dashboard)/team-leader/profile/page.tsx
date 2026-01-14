import { AgentProfile } from "@/components/pages/dashboard/agent/profile/agent-profile";
import { MonthlyAttendance } from "@/components/pages/dashboard/agent/profile/monthly-attendence";

const TeamLeaderProfile = () => {
  return (
    <section>
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <p className="text-[32px] font-bold text-white">Profile</p>
          </div>
        </div>
        {/* Leaderboard */}
        <AgentProfile />
        <div className="mt-8">
          <MonthlyAttendance />
        </div>
      </div>
    </section>
  );
};

export default TeamLeaderProfile;
