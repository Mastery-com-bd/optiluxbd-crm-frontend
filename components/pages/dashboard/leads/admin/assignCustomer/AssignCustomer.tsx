"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllteamsQuery } from "@/redux/features/leadsmanagement/leedsApi";
import { TTeam } from "@/types/teamleader.types";
import { useState } from "react";
import CustomerdataModal from "./CustomerdataModal";
import Leadercard from "../Leadercard";
import { useGetAllUnassignedAgentsQuery } from "@/redux/features/user/userApi";
import LeaderAssignSkeleton from "../leaderAssignment/LeaderAssignSkeleton";
import { useGetUnassignedCustomersByAdminQuery } from "@/redux/features/customers/cutomersApi";
import { TCustomer } from "@/types/customer.types";

const AssignCustomer = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 50,
    page: 1,
  });
  // get all team data
  const { data, isLoading } = useGetAllteamsQuery(undefined);
  const teams = (data?.data as TTeam[]) || [];
  const totalTeams = teams.length;

  // get unassigned agent data
  const { data: unassignedAgentData } = useGetAllUnassignedAgentsQuery({
    refetchOnMountOrArgChange: false,
  });
  const unassignedCount = unassignedAgentData?.pagination?.total || 0;

  // get unassigned customer data
  const { data: unAssignedCustomer, isLoading: unAssignedCustomerLoading } =
    useGetUnassignedCustomersByAdminQuery(filters, {
      refetchOnMountOrArgChange: false,
    });
  const customers = (unAssignedCustomer?.data as TCustomer[]) || [];
  const customersPagination = unAssignedCustomer?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const [selectedTeam, setSelectedTeam] = useState<TTeam | null>(null);

  const handleCardClick = (team: TTeam) => {
    if (selectedTeam?.leader.id === team.leader.id) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team);
    }
  };

  if (isLoading) {
    return <LeaderAssignSkeleton />;
  }

  return (
    <div className="p-2 lg:p-6 space-y-6">
      <Card className="shadow-sm border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Team Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
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
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Customers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {0}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unassigned Customers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {customersPagination?.total}
            </p>
          </div>
        </CardContent>
        <CardContent className="flex items-center justify-end ">
          <CustomerdataModal
            setSelectedTeam={setSelectedTeam}
            selectedTeam={selectedTeam}
            customers={customers}
            pagination={customersPagination}
            isLoading={unAssignedCustomerLoading}
            setFilters={setFilters}
            filters={filters}
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
    </div>
  );
};

export default AssignCustomer;
