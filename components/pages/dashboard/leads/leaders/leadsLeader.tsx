"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import {
  useGetAllLeadsQuery,
  useGetAllTeamMembersQuery,
  useGetAllUnAssignedCustomersQuery,
} from "@/redux/features/leads/teamLeaderLeadsApi";
import Agentcard from "./Agentcard";
import LeadersDataModal from "./LeadersDataModal";
import TeamReportModal from "./TeamReportModal";
import InprogressdataModal from "./InprogressdataModal";
import LeadersSkeleton from "./LeadersSkeleton";
import AutoDistributeModal from "./AutoDistributeModal";

const LeadsLeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<number | null>(null);
  const { data, isLoading } = useGetAllLeadsQuery(undefined);
  const { data: teamMembersData, isLoading: teamMembersLoading } =
    useGetAllTeamMembersQuery(undefined);

  const { data: unassignedCustomerData, isLoading: unAssignedCustomerLoading } =
    useGetAllUnAssignedCustomersQuery(undefined);

  const allLeads = data?.data;
  const teamMembers = teamMembersData?.data;
  const unAssignedCustomer = unassignedCustomerData?.data || [];

  const toggleWorker = (id: number) => {
    if (selectedWorkers === id) {
      setSelectedWorkers(null);
    } else {
      setSelectedWorkers(id);
    }
  };

  return (
    <div>
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Team Leader Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Distribute held leads to agents and monitor assignments.
          </p>
        </div>
        {isLoading || teamMembersLoading || unAssignedCustomerLoading ? (
          <LeadersSkeleton />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {teamMembers?.teamSize}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    All Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {allLeads?.customers?.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Unassigned Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {unAssignedCustomer?.customers?.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Assign Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {allLeads?.customers?.length -
                      unAssignedCustomer?.customers?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-6 flex items-center justify-between">
                <TeamReportModal />
                <InprogressdataModal />
                <div className="flex items-center gap-2">
                  <Button
                    disabled={!selectedWorkers}
                    onClick={() => setModalOpen(true)}
                  >
                    <SendIcon className="mr-2 h-4 w-4" /> Assign to agents
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AutoDistributeModal selectedWorkers={selectedWorkers} />
              </CardHeader>
              <CardContent className="space-y-2">
                <Agentcard
                  onToggle={toggleWorker}
                  selectedIds={selectedWorkers}
                  allMembers={teamMembers?.members}
                />
              </CardContent>
            </Card>

            <LeadersDataModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              assigneeIds={selectedWorkers as number}
              customers={allLeads?.customers}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LeadsLeader;
