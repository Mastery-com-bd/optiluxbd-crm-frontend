/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAutoDistributionCustomerToLeaderMutation,
  useGetAllteamsQuery,
} from "@/redux/features/leadsmanagement/leedsApi";
import { TTeam } from "@/types/teamleader.types";
import { useState } from "react";
import LeaderAssignSkeleton from "../leaderAssignment/LeaderAssignSkeleton";
import { Check } from "lucide-react";
import CustomerdataModal from "./CustomerdataModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AssignCustomer = () => {
  const { data, isLoading } = useGetAllteamsQuery(undefined);
  const teams = (data?.data as TTeam[]) || [];
  const [selectedTeam, setSelectedTeam] = useState<TTeam | null>(null);
  const [autoDistribute] = useAutoDistributionCustomerToLeaderMutation();

  const handleCardClick = (team: TTeam) => {
    if (selectedTeam?.leader.id === team.leader.id) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team);
    }
  };

  const handleAutoDistribute = async () => {
    const toastId = toast.loading(
      "automatic distributing customers to leaders",
      { duration: 3000 }
    );
    try {
      const res = await autoDistribute(undefined).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setSelectedTeam(null);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };
  return (
    <div className="p-2 lg:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Distributions
        </h1>
        <p className="text-sm text-muted-foreground">
          Distribute customers to the teams
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-between">
          <div>
            <Button onClick={handleAutoDistribute}>
              {" "}
              Auto Distribute Customer
            </Button>
          </div>
          <div className="flex items-center justify-end">
            <CustomerdataModal
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
          {teams.map((team, index) => {
            const isSelected = selectedTeam?.leader.id === team.leader.id;
            console.log(team);
            return (
              <Card
                key={index}
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

                <CardContent className="text-sm grid grid-cols-2 gap-2">
                  <span className="font-medium">Team Size:</span>
                  <span>{team.teamSize}</span>
                  <span className="font-medium">Members:</span>
                  <span>{team.members.length}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignCustomer;
