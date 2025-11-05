"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Edit, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CreateUser from "./CreateUser";

const users = [
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Lancy Lona",
    role: "Agent",
    email: "lancy@example.com",
    phone: "+8801845477161",
    country: "Bangladesh",
    status: "Active",
    createdAt: "2025-02-17T18:35:22.534+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Michael A. Miner",
    role: "Manager",
    email: "michael@example.com",
    phone: "+8801745112233",
    country: "Bangladesh",
    status: "Pending",
    createdAt: "2024-12-09T10:20:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Theresa T. Brose",
    role: "Agent",
    email: "theresa@example.com",
    phone: "+8801934332121",
    country: "India",
    status: "Inactive",
    createdAt: "2023-08-12T12:15:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "James L. Erickson",
    role: "Admin",
    email: "james@example.com",
    phone: "+8801999777111",
    country: "Bangladesh",
    status: "Active",
    createdAt: "2024-06-22T09:10:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Lily W. Wilson",
    role: "Support",
    email: "lily@example.com",
    phone: "+8801788991122",
    country: "Sri Lanka",
    status: "Pending",
    createdAt: "2023-10-01T11:00:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Sarah M. Brooks",
    role: "Agent",
    email: "sarah@example.com",
    phone: "+8801556677889",
    country: "Nepal",
    status: "Active",
    createdAt: "2024-01-14T17:45:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "David K. Richards",
    role: "Supervisor",
    email: "david@example.com",
    phone: "+8801665432199",
    country: "Bangladesh",
    status: "Inactive",
    createdAt: "2023-05-09T08:30:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Nina Patel",
    role: "Agent",
    email: "nina@example.com",
    phone: "+8801345987123",
    country: "India",
    status: "Active",
    createdAt: "2025-03-25T13:22:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Adam S. Cruz",
    role: "Admin",
    email: "adam@example.com",
    phone: "+8801922334455",
    country: "Bangladesh",
    status: "Pending",
    createdAt: "2024-09-19T15:00:00.000+00:00",
  },
  {
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    name: "Karen T. Adams",
    role: "Support",
    email: "karen@example.com",
    phone: "+8801456123499",
    country: "Bhutan",
    status: "Active",
    createdAt: "2023-11-28T19:05:00.000+00:00",
  },
];

const ManageUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const options = ["Today", "This Week", "This Month", "This Year"];
  const [selected, setSelected] = useState("This Month");
  const [page, setPage] = useState(1);

  const perPage = 1;
  const totalPages = Math.ceil(users.length / perPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <section className="w-full bg-white rounded-2xl shadow p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            All Users List
          </h2>
          <CreateUser />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedStatus === "All" ? "Filter by Status" : selectedStatus}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["All", "Active", "Pending", "Inactive"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  // onClick={() => handleFilterChange(status)}
                  className={status === selectedStatus ? "font-medium" : ""}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium"
              >
                {selected} <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`${
                    selected === option ? "font-semibold text-primary" : ""
                  }`}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    width={500}
                    height={500}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-yellow-100 hover:bg-yellow-200"
                  >
                    <Edit size={16} className="text-yellow-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                aria-disabled={page === 1}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 
            ${
              page === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"
            }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 cursor-pointer ${
                  p === page
                    ? " border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                aria-disabled={page === totalPages}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 
            ${
              page === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"
            }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default ManageUsers;
