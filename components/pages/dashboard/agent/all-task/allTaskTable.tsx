"use client";
import CustomPagination from "@/components/ui/CustomPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVerticalIcon, Search } from "lucide-react";
import { useState } from "react";

const AllTaskTable = () => {
  const [filters, setFilters] = useState({
    search: "",
    customerLevel: "",
    gender: "",
    isMarried: "",
    thana: "",
    district: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [show, setShow] = useState("10");
  const [status, setStatus] = useState("all");
  return (
    <div className="">
      <div className="flex justify-between items-center my-6">
        <div className="relative w-full max-w-[340px]">
          <Input
            placeholder="Search Agent by name or ID"
            className="w-full "
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setFilters((prev) => ({
                ...prev,
                status: value === "all" ? undefined : value,
                page: 1,
              }));
            }}>
            <SelectTrigger className="w-36" aria-label="Status Filter">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            {[
              "Task ID",
              "Lead Name",
              "Phone",
              "Assigned Agent",
              "Last Call Date",
              "Next Action Date",
              "Interested Product ",
              "Status",
              "Action",
            ].map((label, ind) => (
              <TableHead
                first={ind === 0}
                last={ind === 8}
                key={label}
                className="text-left text-xs font-semibold uppercase text-muted-foreground">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-center">
                John Doe
              </TableCell>
              <TableCell className="text-center">AGT-00{i + 1}</TableCell>
              <TableCell className="text-center">Alpha Squad</TableCell>
              <TableCell className="text-center">42</TableCell>
              <TableCell className="text-center">23%</TableCell>
              <TableCell className="text-center">Gold</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreVerticalIcon size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
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
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </div>
  );
};

export default AllTaskTable;
