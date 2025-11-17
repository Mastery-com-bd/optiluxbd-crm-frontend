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
import PaginationControls from "@/components/ui/paginationComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCustomerQuery } from "@/redux/features/customers/cutomersApi";
import { useAssignCustomerToLeadersMutation } from "@/redux/features/leadsmanagement/leedsApi";
import { TCustomer } from "@/types/customer.types";
import { TTeam } from "@/types/teamleader.types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import ModalSkeleton from "../ModalSkeleton";

const CustomerdataModal = ({
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

  const { data, isLoading } = useGetAllCustomerQuery(filters, {
    refetchOnMountOrArgChange: false,
  });

  const customers = (data?.data as TCustomer[]) || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
  const [endDate, setEndDate] = useState<string>("");
  const [assignAgent] = useAssignCustomerToLeadersMutation();
  const [openModal, setOpenModal] = useState(false);

  const toggleCustomerSelection = (id: number) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleConfirmAssign = async () => {
    const data: { leaderId: number; customerIds: number[]; endDate?: string } =
      {
        leaderId: selectedTeam?.leader.id as number,
        customerIds: selectedCustomerIds,
      };

    if (endDate) data.endDate = endDate;
    // Show loading toast
    const toastId = toast.loading("Assigning customers to team...");
    try {
      const res = await assignAgent(data).unwrap();
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpenModal(false);
        setSelectedTeam(null);
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorInfo =
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button disabled={!selectedTeam} onClick={() => setOpenModal(true)}>
          Assign Customers
        </Button>
      </DialogTrigger>
      {isLoading ? (
        <ModalSkeleton />
      ) : (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Customers</DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto border rounded-md pb-4 max-h-96">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                <TableRow>
                  <TableHead className="text-center">Select</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No customers available
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedCustomerIds.includes(customer.id)}
                          onChange={() => toggleCustomerSelection(customer.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.customerLevel}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <PaginationControls
              pagination={pagination}
              onPrev={() => setFilters({ ...filters, page: filters.page - 1 })}
              onNext={() => setFilters({ ...filters, page: filters.page + 1 })}
            />
          </div>

          {/* End Date Field */}
          <div className="mt-4">
            <label className="text-sm font-medium">End Date (optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCustomerIds([]);
                setEndDate("");
                setOpenModal(false);
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={selectedCustomerIds.length === 0}
              onClick={handleConfirmAssign}
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CustomerdataModal;
