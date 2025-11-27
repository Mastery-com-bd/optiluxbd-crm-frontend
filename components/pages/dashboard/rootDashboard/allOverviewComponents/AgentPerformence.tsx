"use client";

import { Card } from "@/components/ui/card";
import { TAgentPerformanceType } from "@/types/overAllReport/agentPerformanceType";
import { ClipboardList, Coins, DollarSign, Users } from "lucide-react";

const AgentPerformence = ({
  agentPerformance,
}: {
  agentPerformance: TAgentPerformanceType;
}) => {
  const summary = agentPerformance?.summary;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {/* Total Agents */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalAgents ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Agents
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        {/* Total Orders */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalOrders ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalRevenue ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Revenue
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
          </div>
        </Card>

        {/* Total Commission */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalCommission.toFixed(2) ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Commission
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Coins className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentPerformence;
