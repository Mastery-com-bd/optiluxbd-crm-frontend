import LeaderBoard from "@/components/pages/dashboard/agent/leaderboard/leaderboard";

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
      </div>
      {/* Leaderboard */}
      <LeaderBoard />
    </div>
  );
};

export default Page;
