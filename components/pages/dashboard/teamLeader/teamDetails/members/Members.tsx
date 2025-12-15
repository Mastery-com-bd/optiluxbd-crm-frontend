"use client";

import { Card } from "@/components/ui/card";
import AssignMembers from "./AssignMembers";
import MembersCard from "./MembersCard";

export type TMemberData = {
  name: string;
  email: string;
  phone: string;
  image: string;
  calls: number;
  conversionRate: string;
  rank: string;
};

const Members = () => {
  const membaerData: TMemberData[] = [
    {
      name: "Rahul Khan",
      email: "rahulkhan@gmail.com",
      phone: "+8801845477161",
      image:
        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80",
      calls: 54,
      conversionRate: "72.5%",
      rank: "1",
    },
    {
      name: "Arif Hossain",
      email: "arif.hossain@gmail.com",
      phone: "+8801712345678",
      image:
        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80",
      calls: 47,
      conversionRate: "68.2%",
      rank: "2",
    },
    {
      name: "Nusrat Jahan",
      email: "nusrat.jahan@gmail.com",
      phone: "+8801911223344",
      image:
        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80",
      calls: 39,
      conversionRate: "61.9%",
      rank: "3",
    },
    {
      name: "Tanvir Ahmed",
      email: "tanvir.ahmed@gmail.com",
      phone: "+8801610987654",
      image:
        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80",
      calls: 33,
      conversionRate: "55.4%",
      rank: "4",
    },
    {
      name: "Sadia Rahman",
      email: "sadia.rahman@gmail.com",
      phone: "+8801812233445",
      image:
        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80",
      calls: 28,
      conversionRate: "49.8%",
      rank: "5",
    },
  ];
  return (
    <Card className="relative bg-white/5 rounded-3xl py-0 px-0">
      {/* top and bottom border section */}
      <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-lg font-medium">Team Members (0)</h1>
          <AssignMembers />
        </div>
        <div className="space-y-4">
          {membaerData.map((data, i) => {
            return <MembersCard key={i} data={data} />;
          })}
        </div>
      </div>
    </Card>
  );
};

export default Members;
