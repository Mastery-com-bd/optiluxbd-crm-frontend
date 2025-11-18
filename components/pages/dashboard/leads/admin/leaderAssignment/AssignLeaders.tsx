"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllteamsQuery } from "@/redux/features/leadsmanagement/leedsApi";
import { useState } from "react";
import { TTeam } from "@/types/teamleader.types";
import AgentDataModal from "./AgentDataModal";
import { useGetAllUnassignedAgentsQuery } from "@/redux/features/user/userApi";
import Leadercard from "../Leadercard";
import LeaderAssignSkeleton from "./LeaderAssignSkeleton";
import TeamReportModal from "./TeamReportModal";

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

  // get all teams
  const { data, isLoading } = useGetAllteamsQuery(undefined);
  const teams = (data?.data as TTeam[]) || [];
  const totalTeams = teams.length;

  // get un assigned agents
  const { data: unassignedAgentData } = useGetAllUnassignedAgentsQuery({
    refetchOnMountOrArgChange: false,
  });
  const unassignedCount = unassignedAgentData?.pagination?.total || 0;

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
    <section className=" lg:p-6 space-y-3">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Agent Distributions
        </h1>
        <p className="text-sm text-muted-foreground">
          Distribute agents to the teams
        </p>
      </div>

      <Card className="shadow-sm border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Team Summary</CardTitle>
        </CardHeader>

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
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {unassignedCount}
            </p>
          </div>
          {/* team report dropdown */}
          <TeamReportModal teams={teams} />
          {/* Assign Button */}
          <div className="flex items-center justify-center p-2">
            <AgentDataModal
              setSelectedTeam={setSelectedTeam}
              selectedTeam={selectedTeam}
            />
          </div>
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
