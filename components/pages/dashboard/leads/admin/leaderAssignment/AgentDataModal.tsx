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
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/paginationComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAssignAGentToLeaderMutation } from "@/redux/features/leadsmanagement/leedsApi";
import { useGetAllUnassignedAgentsQuery } from "@/redux/features/user/userApi";
import { TTeam } from "@/types/teamleader.types";
import { TUser } from "@/types/user/user.types";
import { debounce } from "@/utills/debounce";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import ModalSkeleton from "../ModalSkeleton";

const AgentDataModal = ({
  setSelectedTeam,
  selectedTeam,
}: {
  setSelectedTeam: Dispatch<SetStateAction<TTeam | null>>;
  selectedTeam: TTeam | null;
}) => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetAllUnassignedAgentsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });

  const agents = (data?.data as TUser[]) || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [assignAgent] = useAssignAGentToLeaderMutation();
  console.log(pagination);
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  const handleConfirmAssign = async () => {
    const data = {
      leaderId: selectedTeam?.leader.id,
      agentId: selectedAgentId,
    };
    const toastId = toast.loading("assigning agent to team", {
      duration: 3000,
    });
    try {
      const res = await assignAgent(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setOpenModal(false);
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
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button disabled={!selectedTeam} onClick={() => setOpenModal(true)}>
          Assign Agent
        </Button>
      </DialogTrigger>
      {isLoading ? (
        <ModalSkeleton />
      ) : (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select an Agent</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                placeholder="Search by name"
                value={filters.search}
                onChange={(e) => debouncedLog(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>
          <div className=" overflow-y-auto border rounded-md pb-4">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                <TableRow>
                  <TableHead className="text-center">Select</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No agents available
                    </TableCell>
                  </TableRow>
                ) : (
                  agents.map((agent) => {
                    return (
                      <TableRow
                        key={agent.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setSelectedAgentId(agent.id)}
                      >
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name="selectedAgent"
                            checked={selectedAgentId === agent.id}
                            onChange={() => setSelectedAgentId(agent.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {agent?.name}
                        </TableCell>
                        <TableCell>{agent?.email}</TableCell>
                        <TableCell className="capitalize">
                          {agent?.phone}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            <PaginationControls
              pagination={pagination}
              onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
              onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
            />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedAgentId(null);
                setOpenModal(false);
              }}
            >
              Cancel
            </Button>
            <Button disabled={!selectedAgentId} onClick={handleConfirmAssign}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AgentDataModal;
