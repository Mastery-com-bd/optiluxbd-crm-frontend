"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberProps } from "@/types/teamleader.types";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LeaderDataTable = ({
  members,
  setModalOpen,
  setSelectedWorkers,
}: MemberProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    (typeof members)[0] | null
  >(null);

  const handleOpen = (member: (typeof members)[0]) => {
    setSelectedMember(member);
    setOpen(true);
  };
  console.log(members);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Agent Performance Table</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Assigned Leads</TableHead>
            <TableHead>Accepted Leads</TableHead>
            <TableHead>Pending Leads</TableHead>
            <TableHead>Achieved Target</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const assignedLeads = member?.currentBatch?.totalCustomers;
            const acceptedLeads =
              member?.currentBatch?.assignedCustomers.length;
            const pendingLeads = member?.currentBatch?.pendingCustomers.length;

            return (
              <TableRow key={member?.id}>
                <TableCell>{member?.agent?.name || "-"}</TableCell>
                <TableCell>coming soon</TableCell>
                <TableCell>{assignedLeads}</TableCell>
                <TableCell>{acceptedLeads}</TableCell>
                <TableCell>{pendingLeads}</TableCell>
                <TableCell>coming soon</TableCell>
                <TableCell>coming soon</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Eye
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleOpen(member)}
                  />
                  <Plus
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedWorkers(member?.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Dialog for member details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agent Details</DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedMember.agent?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedMember.agent?.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedMember.agent?.phone}
              </p>
              <p>
                <strong>Assigned Leads:</strong>{" "}
                {selectedMember.currentBatch.totalCustomers}
              </p>
              <p>
                <strong>Accepted Leads:</strong>{" "}
                {selectedMember.currentBatch.assignedCustomers.length}
              </p>
              <p>
                <strong>Pending Leads:</strong>{" "}
                {selectedMember.currentBatch.pendingCustomers.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaderDataTable;
