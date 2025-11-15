import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SendIcon } from "lucide-react";
import React from "react";
import UserCards from "../UserCards";
import AssignModal from "../AssignModal";

const LeadsLeader = () => {
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
          <div className="font-semibold text-lg">In_Progress Leads</div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Leads held (not yet distributed)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">99</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Button>
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
            <UserCards role="agents" />
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Leads held by team leader</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsTable
              status="assigned"
              assignedTo={effectiveLeaderId}
              onLoadedCount={(c) => setAvailableHeld(c)}
            />
          </CardContent>
        </Card> */}

        {/* <AssignModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          scope="team_leader"
          assignerId={effectiveLeaderId!}
          assigneeIds={selectedWorkers}
          available={availableHeld}
        /> */}
      </div>
    </div>
  );
};

export default LeadsLeader;
