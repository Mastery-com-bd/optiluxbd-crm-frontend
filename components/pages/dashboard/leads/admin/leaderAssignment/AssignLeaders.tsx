"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetAllteamsQuery } from "@/redux/features/leads/adminLeedsApi";
import { useState } from "react";
import { TTeam } from "@/types/teamleader.types";
import AgentDataModal from "./AgentDataModal";
import { useGetAllUnassignedAgentsQuery } from "@/redux/features/user/userApi";
import Leadercard from "../Leadercard";
import LeaderAssignSkeleton from "./LeaderAssignSkeleton";
import TeamReportModal from "./TeamReportModal";
import { useGetUnassignedCustomersByAdminQuery } from "@/redux/features/customers/cutomersApi";
import { TCustomer } from "@/types/customer.types";
import CustomerdataModal from "../assignCustomer/CustomerdataModal";
import AssignTarget from "../assignTarget/AssignTarget";

export interface TTeamReport {
  batch: {
    id: number;
  };
  leaderId: number;
  totals: {
    cancelled: number;
    draft: number;
    ordered: number;
    totalAssigned: number;
  };
}

const AssignLeaders = () => {
  // local states
  const [selectedTeam, setSelectedTeam] = useState<TTeam | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 50,
    page: 1,
  });

  // get all teams
  const { data, isLoading } = useGetAllteamsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const teams = (data?.data as TTeam[]) || [];
  const totalTeams = teams.length;

  // get un assigned agents
  const { data: unassignedAgentData, isLoading: unassignedAgentLoading } =
    useGetAllUnassignedAgentsQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const unassignedCount = unassignedAgentData?.pagination?.total || 0;

  // get unAssigned customers
  const { data: unAssignedCustomer, isLoading: unAssignedCustomerLoading } =
    useGetUnassignedCustomersByAdminQuery(filters, {
      refetchOnMountOrArgChange: false,
    });
  const customers = (unAssignedCustomer?.data as TCustomer[]) || [];
  const totalCustomer = unAssignedCustomer?.meta?.totalCustomers ?? 0;
  const customersPagination = unAssignedCustomer?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const handleCardClick = (team: TTeam) => {
    if (selectedTeam?.leader.id === team.leader.id) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team);
    }
  };

  if (isLoading || unassignedAgentLoading || unAssignedCustomerLoading) {
    return <LeaderAssignSkeleton />;
  }

  return (
    <section className=" lg:p-6 space-y-3">
      <Card className="shadow-sm border dark:border-gray-700">
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
          {/* Total Teams */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Teams
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalTeams}
            </p>
          </div>

          {/* Total Unassigned Agents */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unassigned Agents
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {unassignedCount}
            </p>
          </div>

          {/* total customers */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Customers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalCustomer}
            </p>
          </div>

          {/* total unassigned custoemr */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unassigned Customers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {customersPagination?.total}
            </p>
          </div>
        </CardContent>
        <CardContent className=" flex flex-wrap lg:flex-nowrap items-center justify-between">
          <TeamReportModal teams={teams} />
          <AgentDataModal
            setSelectedTeam={setSelectedTeam}
            selectedTeam={selectedTeam}
          />
          <CustomerdataModal
            setSelectedTeam={setSelectedTeam}
            selectedTeam={selectedTeam}
            customers={customers}
            pagination={customersPagination}
            isLoading={unAssignedCustomerLoading}
            setFilters={setFilters}
            filters={filters}
          />
          <AssignTarget
            setSelectedTeam={setSelectedTeam}
            selectedTeam={selectedTeam}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => {
          const isSelected = selectedTeam?.leader.id === team.leader.id;
          return (
            <Leadercard
              key={team?.leader.id}
              team={team}
              isSelected={isSelected}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AssignLeaders;
