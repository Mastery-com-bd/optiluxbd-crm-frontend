import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Phone, Target } from "lucide-react";

const LeadsStatus = () => {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-semibold text-white mb-6">My Leads</h1>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Today's Calls",
            value: "38",
            sub: "Total calls made",
            icon: Phone,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
          },
          {
            title: "Pending",
            value: "12",
            sub: "Awaiting follow-up",
            icon: Clock,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            borderColor: "border-orange-500/20",
          },
          {
            title: "Success",
            value: "14",
            sub: "Converted today",
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "bg-green-500/10",
            borderColor: "border-green-500/20",
          },
          {
            title: "Conversion",
            value: "36.8%",
            sub: "Success rate",
            icon: Target,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
          },
        ].map((stat, i) => (
          <LiquidGlass key={i}>
            <Card
              className=" rounded-3xl shadow-none border-none bg-none"
              style={{ width: "260px", maxHeight: "150px" }}
            >
              <CardContent className="px-0">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="text-[#B1B1B1] font-semibold text-[18px]">
                    {stat.title}
                  </span>
                  <div>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-[14px]">{stat.sub}</div>
              </CardContent>
            </Card>
          </LiquidGlass>
        ))}
      </div>
    </div>
  );
};

export default LeadsStatus;
