"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllteamsQuery } from "@/redux/features/leadsmanagement/leedsApi";
import { Check } from "lucide-react";
import { useState } from "react";
import { TTeam } from "@/types/teamleader.types";
import AgentDataModal from "./AgentDataModal";
import LeaderAssignSkeleton from "./LeaderAssignSkeleton";
import TeamMemberRow from "./TeamMemberRow";

const AssignLeaders = () => {
  const { data, isLoading } = useGetAllteamsQuery(undefined);
  const teams = (data?.data as TTeam[]) || [];
  const [selectedTeam, setSelectedTeam] = useState<TTeam | null>(null);

  const handleCardClick = (team: TTeam) => {
    if (selectedTeam?.leader.id === team.leader.id) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team);
    }
  };

  return (
    <div className="p-2 lg:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Agent Distributions
        </h1>
        <p className="text-sm text-muted-foreground">
          Distribute agents to the teams
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-end">
            <AgentDataModal
              setSelectedTeam={setSelectedTeam}
              selectedTeam={selectedTeam}
            />
          </div>
        </CardContent>
      </Card>
      {isLoading ? (
        <LeaderAssignSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => {
            const isSelected = selectedTeam?.leader.id === team.leader.id;
            return (
              <Card
                key={team.leader.id}
                className={`shadow-sm border rounded-xl cursor-pointer transition-all relative ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : "hover:ring-1 hover:ring-blue-300"
                }`}
                onClick={() => handleCardClick(team)}
              >
                {isSelected && (
                  <Check className="absolute top-2 right-2 w-5 h-5 text-blue-500" />
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {team.leader.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{team.leader.email}</p>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Team Size:</span>
                    <span>{team.teamSize}</span>
                    <span className="font-medium">Members:</span>
                    <span>{team.members.length}</span>
                  </div>
                  {/* Members List */}
                  <div className="border rounded-md p-2 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    {team.members.length === 0 ? (
                      <p className="text-gray-500 text-xs">
                        No members assigned
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {team.members.map((member) => (
                          <TeamMemberRow key={member.id} member={member} />
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignLeaders;
