import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Phone, Target } from "lucide-react";

const StatCards = () => {
  return (
    <div>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Today's Calls",
            value: "38",
            sub: "Total calls made",
            icon: Phone,
            color: "text-blue-500",
            bg: "linear-gradient(135deg, rgba(42, 133, 255, 0.08) 0%, rgba(42, 133, 255, 0.04) 50%, rgba(0, 0, 0, 0.00) 100%)",
          },
          {
            title: "Pending",
            value: "12",
            sub: "Awaiting follow-up",
            icon: Clock,
            color: "text-orange-500",
            bg: "linear-gradient(135deg, rgba(255, 157, 52, 0.08) 0%, rgba(255, 157, 52, 0.04) 50%, rgba(0, 0, 0, 0.00) 100%)",
          },
          {
            title: "Success",
            value: "14",
            sub: "Converted today",
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "linear-gradient(135deg, rgba(0, 166, 86, 0.08) 0%, rgba(0, 166, 86, 0.04) 50%, rgba(0, 0, 0, 0.00) 100%)",
          },
          {
            title: "Conversion",
            value: "36.8%",
            sub: "Success rate",
            icon: Target,
            color: "text-purple-500",
            bg: "linear-gradient(135deg, rgba(127, 95, 255, 0.08) 0%, rgba(127, 95, 255, 0.04) 50%, rgba(0, 0, 0, 0.00) 100%)",
          },
        ].map((stat, i) => (
          <LiquidGlass key={i} className="max-w-[261px]" borderRadius="32px">
            <Card
              className="p-6 relative rounded-4xl border-none overflow-hidden group"
              style={{
                background: stat.bg,
              }}
            >
              <CardContent className="px-0">
                <div className="flex justify-between items-start">
                  <span className="text-white/70 font-medium">
                    {stat.title}
                  </span>
                  <div className={`p-2 rounded-full ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.sub}</div>
              </CardContent>
            </Card>
          </LiquidGlass>
        ))}
      </div>
    </div>
  );
};

export default StatCards;
