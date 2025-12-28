import { Card } from "@/components/ui/card";
import { TTeamdata } from "./AllTeams";
import { Calendar, Crown, Eye, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TeamCard = ({ data }: { data: TTeamdata }) => {
  return (
    <Card className="bg-white/10 rounded-3xl gap-4 py-5 relative w-full">
      {/* top and bottom border */}
      <div className="absolute top-0 left-px inset-5 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-px inset-5 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-3xl pointer-events-none" />

      {/* team name leader and team moto */}
      <div className="space-y-2 px-5">
        <h1 className="text-lg font-semibold">{data?.teamName}</h1>
        <p className="flex items-center gap-1">
          <span>
            <Crown size={14} className="text-[#FDC700]" />
          </span>
          <span className="text-[#B1B1B1] text-sm">{data?.leader}</span>
        </p>
        <p className="font-medium text-sm w-[17vw]">{data?.description}</p>
      </div>

      {/* team member and lead info */}
      <div className="border-y border-white/10 py-5 px-8 space-y-4">
        {/* member and leads card */}
        <div className="flex items-center justify-between gap-4">
          {/* member card */}
          <div className="p-4 rounded-2xl bg-white/10 relative">
            {/* top and bottom border */}
            <div className="absolute top-0 left-px inset-4 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-4 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-2xl pointer-events-none" />

            {/* main content */}
            <div className="space-y-2">
              <h1 className="flex items-center gap-2">
                <span className="text-[#51A2FF]">
                  <Users />
                </span>{" "}
                <span className="text-sm">Members</span>
              </h1>
              <p className="text-xl font-semibold">{data?.members}</p>
            </div>
          </div>

          {/* leads card */}
          <div className=" p-4 rounded-2xl bg-white/10 relative">
            {/* top and bottom border */}
            <div className="absolute top-0 left-px inset-4 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-4 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-2xl pointer-events-none" />
            <div className="space-y-2">
              <h1 className="flex items-center gap-2">
                <span className="text-[#FDC700]">
                  <Target />
                </span>{" "}
                <span className="text-sm">Members</span>
              </h1>
              <p className="text-xl font-semibold">{data?.members}</p>
            </div>
          </div>
        </div>

        {/* conversion rate */}
        <div className="relative bg-white/10 rounded-3xl py-4 px-6">
          <div className="absolute top-0 left-px inset-5 border-l-[1.5px] border-t-[1.5px] border-white/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-5 border-r-[1.5px] border-b-[1.5px] border-white/30 rounded-br-3xl pointer-events-none" />

          {/*main content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm flex items-center gap-2">
                <span>
                  <TrendingUp className="text-[#05DF72]" />
                </span>{" "}
                Conversion Rate
              </p>
              <p className="text-[#05DF72] text-xl font-semibold">
                {data?.conversionRate}
              </p>
            </div>

            {/* percentage line showing */}
            <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[linear-gradient(90deg,#00C950_0%,#05DF72_100%)] transition-all duration-500 ease-out"
                style={{
                  width: `${parseFloat(data?.conversionRate)}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <p className="text-base font-medium">
            <span className="text-[#B1B1B1] text-sm">Target:</span>{" "}
            <span>{data?.target} calls/day</span>
          </p>
          <p className="text-[#B1B1B1] flex items-center gap-1">
            <Calendar size={14} /> <span>{data?.endDate}</span>
          </p>
        </div>
      </div>

      {/* team view button */}
      <div className="px-5">
        <Link href={`/dashboard/team/${2}`}>
          <Button className="bg-white/10 rounded-4xl w-full text-sm font-medium cursor-pointer py-2">
            <span className="flex items-center gap-2">
              <Eye /> View Team Details
            </span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TeamCard;
