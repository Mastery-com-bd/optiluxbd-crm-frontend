/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRemoveAgentsFromALeaderMutation } from "@/redux/features/leads/adminLeedsApi";
import { TTeamMember } from "@/types/teamleader.types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TeamMemberRow = ({ member }: { member: TTeamMember }) => {
  const [removeAgent, { isLoading }] = useRemoveAgentsFromALeaderMutation();
  const [open, setOpen] = useState(false);

  const handleRemove = async () => {
    const data = {
      agentId: member.id,
    };
    const toastId = toast.loading("Removing agent...");
    try {
      const res = await removeAgent(data).unwrap();
      toast.success(res.message, { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove!", {
        id: toastId,
      });
    }
  };

  return (
    <li className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded mb-1">
      <div>
        <p className="font-medium">{member?.name}</p>
        <p className="text-xs text-gray-400">{member?.email}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="p-1 text-red-500 hover:bg-red-100 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={16} />
          </button>
        </DialogTrigger>

        {/* Confirmation Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove this member?
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500">
            {member.name} will be removed from this team.
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default TeamMemberRow;
