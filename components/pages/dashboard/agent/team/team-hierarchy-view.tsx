import { Users } from "lucide-react";
import PageHeader from "../../shared/pageHeader";

export function TeamHierarchyView() {
  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <PageHeader
          title="Team & Hierarchy View"
          description="Browse and manage All Combo Pack"
        />
      </div>

      {/* Director Card */}
      <div className="flex flex-col items-center">
        <div
          className="neumorphism rounded-4xl p-8 flex flex-col items-center text-center w-md border-0"
        >
          {/* Icon Circle */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto effect"
          >
            <Users className="w-10 h-10 " strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1">Sales Director</h2>
          <p className="text-[#9a9099] text-base mb-6">Management</p>

          {/* Stats */}
          <div className="flex gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">13</p>
              <p className="text-[#9a9099] text-sm">Total Agents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">65.2%</p>
              <p className="text-[#9a9099] text-sm">Avg Conversion</p>
            </div>
          </div>
        </div>

        {/* Connector Line */}
        <div className="w-px h-16 bg-[#4a4055] mt-0"></div>
      </div>
    </div>
  );
}
