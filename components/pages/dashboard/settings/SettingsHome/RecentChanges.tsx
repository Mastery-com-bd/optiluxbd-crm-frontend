import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

type TChangeData = {
  title: string;
  role: string;
  changeItem: string;
  time: string;
};
const recentData: TChangeData[] = [
  {
    title: "Email SMTP Updated",
    role: "Admin",
    changeItem: "Email",
    time: "2 hours ago",
  },
  {
    title: "New User Added",
    role: "Manager",
    changeItem: "User",
    time: "5 hours ago",
  },
  {
    title: "Backup Schedule Modified",
    role: "Admin",
    changeItem: "Backup",
    time: "1 day ago",
  },
  {
    title: "API Key Generated",
    role: "Admin",
    changeItem: "API",
    time: "2 days ago",
  },
];

const RecentChanges = () => {
  return (
    <Card className="bg-white/5 w-full relative rounded-3xl">
      {/* top and bottom border */}
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

      {/* main content */}
      <div className="space-y-4">
        <div className="p-0 flex items-center justify-between">
          <h1 className="p-0 text-xl text-[#FDFDFD]">
            Recent Settings Changes
          </h1>
          <button className="text-[#B1B1B1] cursor-pointer">View All</button>
        </div>
        {/* cards section */}

        <div className="space-y-4">
          {recentData.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[rgba(64,64,64,0.30)] py-3 px-5 rounded-2xl relative flex items-center justify-between "
              >
                <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
                <div className="flex items-center gap-5">
                  <p className="bg-[#2C2C2C] p-3 rounded-full">
                    <Building2 className="text-brand" />
                  </p>
                  <div>
                    <h1>{item.title}</h1>
                    <p className="text-text-secondary flex items-center gap-2 text-sm">
                      <span>Changed by</span> <span>{item.role}</span>
                      <span className="block h-1 w-1 rounded-full bg-[#B1B1B1]" />
                      <span>{item.changeItem}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#B1B1B1]">{item.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default RecentChanges;
