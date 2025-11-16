"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendIcon } from "lucide-react";
import UserCards from "../UserCards";
import { useState } from "react";
import AssignModal from "../AssignModal";
import { useGetAllInProgressLeadsQuery, useGetAllLeadsQuery, useGetAllTeamMembersQuery } from "@/redux/features/leads/leadsApi";

const LeadsLeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const { data, isLoading: allLeadsLoading } = useGetAllLeadsQuery(undefined);
  const { data: inProgressLeadsData, isLoading: inProgressLeadsLoading } = useGetAllInProgressLeadsQuery(undefined);
  const { data: teamMembersData, isLoading: teamMembersLoading } = useGetAllTeamMembersQuery(undefined);
  const allLeads = data?.data;
  const inProgressLeads = inProgressLeadsData?.data;
  const teamMembers = teamMembersData?.data;


  console.log("All Leads: ", allLeads);
  console.log("In Progress Leads: ", inProgressLeads);
  console.log("Team Members: ", teamMembers?.members);

  const toggleWorker = (id: string) => {
    setSelectedWorkers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (allLeadsLoading) {
    return <div>Loading...</div>;
  }
  if (inProgressLeadsLoading) {
    return <div>Loading...</div>;
  }
  if (teamMembersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Team Leader Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Distribute held leads to workers and monitor assignments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                All Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allLeads?.customers?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unassigned Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assign Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Button disabled={selectedWorkers.length === 0} onClick={() => setModalOpen(true)}>
                <SendIcon className="mr-2 h-4 w-4" /> Assign to workers
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <UserCards
              onToggle={toggleWorker}
              selectedIds={selectedWorkers}
              allMembers={teamMembers?.members}
            />
          </CardContent>
        </Card>

        <AssignModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          scope="team_leader"
          assigneeIds={selectedWorkers}
          customers={allLeads?.customers}
        />
      </div>
    </div>
  );
};

export default LeadsLeader;
