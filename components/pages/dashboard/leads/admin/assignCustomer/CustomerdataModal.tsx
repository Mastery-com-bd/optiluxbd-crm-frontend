/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useAssignCustomerToLeadersMutation } from "@/redux/features/leadsmanagement/leedsApi";
import { TCustomer } from "@/types/customer.types";
import { TTeam } from "@/types/teamleader.types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import ModalSkeleton from "../ModalSkeleton";
import { TFiltering } from "@/types/filter.types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "@/utills/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
// types are here
type TPagination = { page: 1; totalPages: 1; total: 0 };
type TCustomerModalProps = {
  setSelectedTeam: Dispatch<SetStateAction<TTeam | null>>;
  selectedTeam: TTeam | null;
  customers: TCustomer[];
  pagination: TPagination;
  isLoading: boolean;
  filters: TFiltering;
  setFilters: Dispatch<SetStateAction<TFiltering>>;
};
// component starts
const CustomerdataModal = ({
  setSelectedTeam,
  selectedTeam,
  customers,
  pagination,
  isLoading,
  filters,
  setFilters,
}: TCustomerModalProps) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
  const [endDate, setEndDate] = useState<string>("");
  const [count, setCount] = useState(0);
  const [assignCustomer] = useAssignCustomerToLeadersMutation();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  console.log(selectedCustomerIds.length);
  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  const toggleCustomerSelection = (id: number) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCustomerIds.length === customers.length) {
      setSelectedCustomerIds([]);
    } else {
      const all = customers.map((item: TCustomer) => item.id);
      setSelectedCustomerIds(all);
    }
  };

  const handleQuickSelect = (value: number) => {
    const sliced = customers.slice(0, value);
    const ids = sliced.map((c) => c.id);
    setSelectedCustomerIds(ids);
  };

  const resetModalState = () => {
    setSelectedCustomerIds([]);
    setEndDate("");
    setCount(0);
    setFilters({
      search: "",
      sortBy: "created_at",
      order: "desc",
      limit: 50,
      page: 1,
    });
    setSelectedStatus("All");
  };

  const handleConfirmAssign = async () => {
    const customerIdsToAssign =
      count > 0
        ? customers.slice(0, count).map((c) => c.id)
        : selectedCustomerIds;
    const data = {
      leaderId: selectedTeam?.leader.id as number,
      customerIds: customerIdsToAssign,
      ...(endDate && { endDate }),
    };

    // Show loading toast
    const toastId = toast.loading("Assigning customers to team...");

    setLoading(true);
    try {
      const res = await assignCustomer(data).unwrap();
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpenModal(false);
        setSelectedTeam(null);
        setLoading(false);
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorInfo =
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);
        if (!isOpen) {
          resetModalState();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          disabled={!selectedTeam}
          onClick={() => setOpenModal(true)}
        >
          Assign Customers
        </Button>
      </DialogTrigger>
      {isLoading ? (
        <ModalSkeleton />
      ) : (
        <DialogContent className="sm:max-w-lg">
          <h1 className="flex justify-center items-center">
            Distribute Customers
          </h1>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Count"
              disabled={selectedCustomerIds.length > 0}
              className="w-28"
              value={count}
              max={customers.length}
              onChange={(e) => setCount(Number(e.target.value))}
            />

            <Select
              disabled={count > 0}
              onValueChange={(v) => handleQuickSelect(Number(v))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Quick select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`${Math.round(customers.length * 0.1)}`}>
                  10%
                </SelectItem>
                <SelectItem value={`${Math.round(customers.length * 0.2)}`}>
                  20%
                </SelectItem>
                <SelectItem value={`${Math.round(customers.length * 0.3)}`}>
                  30%
                </SelectItem>
                <SelectItem value={`${Math.round(customers.length * 0.4)}`}>
                  40%
                </SelectItem>

                <SelectItem value={`${Math.round(customers.length * 0.5)}`}>
                  50%
                </SelectItem>
                <SelectItem value={`${Math.round(customers.length * 0.6)}`}>
                  60%
                </SelectItem>

                <SelectItem value={`${Math.round(customers.length * 0.7)}`}>
                  70%
                </SelectItem>

                <SelectItem value={`${Math.round(customers.length * 0.8)}`}>
                  80%
                </SelectItem>

                <SelectItem value={`${Math.round(customers.length * 0.9)}`}>
                  90%
                </SelectItem>

                <SelectItem value={`${customers.length}`}>100%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogHeader>
            <DialogTitle>Select Customers</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <div className="w-full sm:w-1/2">
              <Input
                type="text"
                placeholder="Search by name or ID"
                value={filters.search}
                onChange={(e) => debouncedLog(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                >
                  {selectedStatus === "All"
                    ? "Filter by Level"
                    : selectedStatus}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {[
                  "All",
                  "BRONZE_PENDING",
                  "BRONZE",
                  "SILVER_PENDING",
                  "SILVER",
                  "GOLD_PENDING",
                  "GOLD",
                  "DIAMOND_PENDING",
                  "DIAMOND",
                  "PLATINUM_PENDING",
                  "PLATINUM",
                ].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setFilters((prev) => ({
                        ...prev,
                        customerLevel:
                          status === "All" ? undefined : status.toUpperCase(),
                        page: 1,
                      }));
                    }}
                    className={status === selectedStatus ? "font-medium" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="overflow-y-auto border rounded-md pb-4 max-h-72">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                <TableRow>
                  <TableHead className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={
                        selectedCustomerIds.length === customers.length &&
                        customers.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
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
                          disabled={count > 0}
                          checked={selectedCustomerIds.includes(customer.id)}
                          onChange={() => toggleCustomerSelection(customer.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer?.customerId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer?.name}
                      </TableCell>
                      <TableCell>{customer?.customerLevel}</TableCell>
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
          <div>
            <label className="text-sm font-medium">End Date (optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div className=" flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => {
                setSelectedCustomerIds([]);
                setEndDate("");
                setOpenModal(false);
                setCount(0);
                setFilters({
                  search: "",
                  sortBy: "created_at",
                  order: "desc",
                  limit: 50,
                  page: 1,
                });
                setSelectedStatus("All");
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={(selectedCustomerIds.length === 0 && !count) || loading}
              onClick={handleConfirmAssign}
              className="cursor-pointer"
            >
              Assign
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CustomerdataModal;
