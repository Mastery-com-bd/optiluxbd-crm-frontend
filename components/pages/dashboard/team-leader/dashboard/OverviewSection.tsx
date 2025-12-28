import { Card } from "@/components/ui/card";
import { CircleCheck, Target, TrendingUp, Users } from "lucide-react";

const OverviewSection = () => {
  return (
    <div className="flex items-center gap-5">
      {/* first card */}
      <Card className="bg-[linear-gradient(135deg,rgba(42,133,255,0.08)_0%,rgba(42,133,255,0.04)_50%,rgba(0,0,0,0)_100%)] flex flex-row px-4 py-2 w-full relative rounded-3xl overflow-hidden">
        {/* borders bottom and top */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />
        <div className="w-full space-y-2">
          <h1 className="flex items-center justify-between w-full">
            <span className="text-[#B1B1B1] text-xl font-semibold">
              Total Leads
            </span>
            <span className="text-[#2A85FF]">
              <Users size={20} />
            </span>
          </h1>
          <p className="text-xl font-semibold text-[#2A85FF]">38</p>
          <p className="text-[#E8E8E8] text-sm">Total leads received</p>
        </div>
      </Card>

      {/* second card */}
      <Card className="bg-[linear-gradient(135deg,rgba(0,166,86,0.08)_0%,rgba(0,166,86,0.04)_50%,rgba(0,0,0,0)_100%)] flex flex-row px-4 py-2 w-full relative rounded-3xl overflow-hidden">
        {/* borders bottom and top */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />
        <div className="w-full space-y-2">
          <h1 className="flex items-center justify-between w-full">
            <span className="text-[#B1B1B1] text-xl font-semibold">
              Distributed to Agents
            </span>
            <span className="text-success">
              <CircleCheck size={20} />
            </span>
          </h1>
          <p className="text-xl font-semibold text-success">14</p>
          <p className="text-[#E8E8E8] text-sm">Leads assigned</p>
        </div>
      </Card>

      {/* third card */}
      <Card className="bg-[linear-gradient(135deg,rgba(255,157,52,0.08)_0%,rgba(255,157,52,0.04)_50%,rgba(0,0,0,0)_100%)] flex flex-row px-4 py-2 w-full relative rounded-3xl overflow-hidden">
        {/* borders bottom and top */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />
        <div className="w-full space-y-2">
          <h1 className="flex items-center justify-between w-full">
            <span className="text-[#B1B1B1] text-xl font-semibold">
              Pending Assignment
            </span>
            <span className="text-[#FF9D34]">
              <TrendingUp size={20} />
            </span>
          </h1>
          <p className="text-xl font-semibold text-[#FF9D34]">12</p>
          <p className="text-[#E8E8E8] text-sm">Need to assign</p>
        </div>
      </Card>

      {/* fourth card */}
      <Card className="bg-[linear-gradient(135deg,rgba(127,95,255,0.08)_0%,rgba(127,95,255,0.04)_50%,rgba(0,0,0,0)_100%)] flex flex-row px-4 py-2 w-full relative rounded-3xl overflow-hidden">
        {/* borders bottom and top */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />
        <div className="w-full space-y-2">
          <h1 className="flex items-center justify-between w-full">
            <span className="text-[#B1B1B1] text-xl font-semibold">
              Conversion Rate
            </span>
            <span className="text-[#7F5FFF]">
              <Target size={20} />
            </span>
          </h1>
          <p className="text-xl font-semibold text-[#7F5FFF]">36.8%</p>
          <p className="text-[#E8E8E8] text-sm">This Week</p>
        </div>
      </Card>
    </div>
  );
};

export default OverviewSection;
