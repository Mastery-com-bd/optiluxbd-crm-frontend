"use client";

import { Lead } from "@/types/teamleader.types";
import { debounce } from "@/utills/debounce";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatsCard from "../../shared/StatsCard";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, Pencil, Search, Trash2, X } from "lucide-react";
import AssignLeadsToTeam from "../../admin/teamLeader/assignleades/AssignLeadsToTeam";
import Link from "next/link";
import CustomPagination from "@/components/ui/CustomPagination";

const myLeads = [
  {
    id: 0,
    leadId: "LD-98989",
    leadName: "Aminul Islam",
    mobileNumber: "01780530300",
    leadSource: "Facebook",
    interestedProduct: "RB3025",
    status: "Assigned",
    priority: "High",
  },
  {
    id: 1,
    leadId: "LD-98989",
    leadName: "Fatema Rahman",
    mobileNumber: "01518660316",
    leadSource: "Website",
    interestedProduct: "RB3025",
    status: "Assigned",
    priority: "Medium",
  },
  {
    id: 2,
    leadId: "LD-98989",
    leadName: "Shakib Al Hasan",
    mobileNumber: "01518660316",
    leadSource: "Organic",
    interestedProduct: "PR17WS",
    status: "Assigned",
    priority: "Low",
  },
  {
    id: 3,
    leadId: "LD-98989",
    leadName: "Nusrat Jahan",
    mobileNumber: "01518660316",
    leadSource: "Referral",
    interestedProduct: "BLBOO1",
    status: "Unassigned",
    priority: "High",
  },
  {
    id: 4,
    leadId: "LD-98989",
    leadName: "Rashidul Karim",
    mobileNumber: "01518660316",
    leadSource: "Whatsapp",
    interestedProduct: "BLBOO1",
    status: "Unassigned",
    priority: "Low",
  },
  {
    id: 5,
    leadId: "LD-98989",
    leadName: "Sadia Begum",
    mobileNumber: "01780530300",
    leadSource: "Facebook",
    interestedProduct: "RB3025",
    status: "Unassigned",
    priority: "Low",
  },
  {
    id: 6,
    leadId: "LD-98989",
    leadName: "Tariq Ahmed",
    mobileNumber: "01780530300",
    leadSource: "Organic",
    interestedProduct: "PR17WS",
    status: "Assigned",
    priority: "High",
  },
  {
    id: 7,
    leadId: "LD-98989",
    leadName: "Zainab Sultana",
    mobileNumber: "01780530300",
    leadSource: "Facebook",
    interestedProduct: "PR17WS",
    status: "Assigned",
    priority: "High",
  },
];
const keys = [
  "checkbox",
  "LeadID",
  "Lead Name",
  "Mobile Number",
  "Lead Source",
  "Interested Product",
  "Status",
  "Priority",
  "Action",
];

const MyLeads = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    search: "",
    status: "",
    priority: "",
  });
  const toggleSelection = (leadId: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const toggleSelectAll = () => {
    const currentOrderIds = myLeads.map((lead: Lead) => lead.leadId);
    const allSelected = currentOrderIds.every((id: string) =>
      selectedLeads.includes(id)
    );
    if (allSelected) {
      setSelectedLeads((prev) =>
        prev.filter((id) => !currentOrderIds.includes(id))
      );
    } else {
      const newSelections = currentOrderIds.filter(
        (id: string) => !selectedLeads.includes(id)
      );
      setSelectedLeads((prev) => [...prev, ...newSelections]);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = async (val: any) => {
    setFilters({ ...filters, search: val });
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });
  const allPageLeadsSelected =
    myLeads.length > 0 &&
    myLeads.every((lead: Lead) => selectedLeads.includes(lead.leadId));
  return (
    <div className="p-6 ">
      <h3 className="text-xl font-semibold mb-6">My Leads</h3>
      <StatsCard />
      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground  justify-end my-4">
          <Button
            variant="outline"
            className="border border-yellow-600! cursor-pointer py-6 rounded-2xl"
            size="sm"
            onClick={() => setSelectedLeads([])}
          >
            <X className="w-4 h-4 mr-1" />
            Selected Leads {selectedLeads.length}
          </Button>
          {/* <Button
                        variant="outline"
                        onClick={() => console.log('clicked')}
                        className="cursor-pointer py-6 rounded-2xl"
                    >
                        Assign to Agent
                    </Button> */}
          <AssignLeadsToTeam selectedLeads={selectedLeads} />
        </div>
      )}
      {/* Filter Options */}
      <div className="flex justify-between gap-4 my-4 ">
        <Input
          placeholder="Search product by id name sku...."
          className="w-[40%]"
          value={inputValue}
          icon={<Search />}
          onChange={(e) => {
            debouncedLog(e.target.value);
            setInputValue(e.target.value);
          }}
        />

        <div className="flex  gap-4">
          <Select
            onValueChange={(val) => setFilters((f) => ({ ...f, status: val }))}
            defaultValue="orderDate"
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orderDate">Order Date</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
              <SelectItem value="totalAmount">Total Amount</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) =>
              setFilters((f) => ({ ...f, priority: val }))
            }
            defaultValue="orderDate"
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orderDate">Order Date</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
              <SelectItem value="totalAmount">Total Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="my-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {keys.map((label, ind) => (
                <TableHead
                  first={ind === 0}
                  last={ind === keys.length - 1}
                  key={label}
                  className="text-left text-xs font-semibold uppercase text-muted-foreground"
                >
                  {label === "checkbox" ? (
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={allPageLeadsSelected}
                      onChange={toggleSelectAll}
                    />
                  ) : (
                    label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {myLeads?.map((lead: Lead) => (
              <TableRow
                key={lead.id}
                className="border-muted hover:bg-muted/50 transition-colors"
              >
                <TableCell className="px-4 py-3">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={selectedLeads.includes(lead.leadId)}
                    onChange={() => toggleSelection(lead.leadId)}
                  />
                </TableCell>
                <TableCell className="px-4 py-3">{lead.leadId}</TableCell>
                <TableCell className="px-4 py-3">{lead.leadName}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-center">
                  {lead.mobileNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-center">
                  {lead.leadSource}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-center">
                  {lead.interestedProduct}
                </TableCell>

                {/* ✅ Styled Status Pill */}
                <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                  <span
                    className={`px-4 py-1 text-sm font-medium rounded-md
                                                         ${
                                                           lead.status ===
                                                           "Assigned"
                                                             ? "bg-green-800/30 text-green-400 border border-green-500/30"
                                                             : "bg-red-800/30 text-red-400 border border-red-500/30"
                                                         }`}
                  >
                    {lead.status}
                  </span>
                </TableCell>

                {/* ✅ Styled Priority Pill */}
                <TableCell className="px-4 py-3 text-center">
                  <span
                    className={`px-4 py-1 text-sm font-medium rounded-md border ${
                      lead.priority === "High"
                        ? "bg-red-800/30 text-red-400 border-red-500/30"
                        : lead.priority === "Medium"
                        ? "bg-yellow-800/30 text-yellow-300 border-yellow-400/30"
                        : "bg-blue-800/30 text-blue-300 border-blue-400/30"
                    }`}
                  >
                    {lead.priority}
                  </span>
                </TableCell>

                {/* Action Dropdown */}
                <TableCell className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[180px] flex flex-col"
                    >
                      <Link
                        href={`/dashboard/admin/products/all-products/${lead.id}`}
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="w-4 h-4 mr-2" /> Update
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Trash2 className="w-4 h-4 text-destructive mr-2" />{" "}
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomPagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
      </div>
    </div>
  );
};

export default MyLeads;
