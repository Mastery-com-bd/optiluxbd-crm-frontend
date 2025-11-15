/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRemoveAgentsFromALeaderMutation } from "@/redux/features/leadsmanagement/leedsApi";
import { TTeamMember } from "@/types/teamleader.types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const TeamMemberRow = ({ member }: { member: TTeamMember }) => {
  const [removeAgent, { isLoading }] = useRemoveAgentsFromALeaderMutation();

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
    <li className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded">
      <div>
        <p className="font-medium">{member.name}</p>
        <p className="text-xs text-gray-500">{member.email}</p>
      </div>

      <button
        className="p-1 text-red-500 hover:bg-red-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        disabled={isLoading}
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
};

export default TeamMemberRow;
