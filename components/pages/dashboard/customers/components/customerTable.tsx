"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  district?: string | null;
  thana?: string | null;
  date_of_birth?: string | null;
  profession?: string | null;
  isMarried?: boolean | null;
  gender?: string | null;
  customerLevel: string;
  created_at?: string | null;
  updated_at?: string | null;
}

interface CustomerTableProps {
  customers: Customer[];
}

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    BRONZE_PENDING:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    BRONZE:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    SILVER:
      "bg-slate-200 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
    GOLD: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    PLATINUM:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return colors[level] || colors.BRONZE_PENDING;
};

export default function CustomerTable({ customers }: CustomerTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (customers.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No customers found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead className="text-center">Level</TableHead>
                <TableHead className="text-right">Joined</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, idx) => (
                <TableRow key={customer.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 flex items-center justify-center rounded-sm border text-primary font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        {customer.gender && (
                          <p className="text-xs text-muted-foreground capitalize">
                            {customer.gender.replace(/_/g, " ").toLowerCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{customer.phone}</p>
                      {customer.isMarried !== null && (
                        <p className="text-xs text-muted-foreground">
                          {customer.isMarried ? "Married" : "Single"}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.district || customer.thana ? (
                      <div className="text-sm">
                        <p className="font-medium">{customer.district || "—"}</p>
                        {customer.thana && (
                          <p className="text-xs text-muted-foreground">{customer.thana}</p>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{customer.profession || "—"}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getLevelColor(customer.customerLevel)} border-0`}>
                      {customer.customerLevel.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {customer.created_at ? formatDate(customer.created_at) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/customers/id/${customer.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/customers/id/${customer.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Customer
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this customer?")) {
                              console.log("Delete customer", customer.id);
                            }
                          }}
                          className="text-red-600 focus:text-red-600 flex items-center cursor-pointer"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {customer.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {customer.gender?.replace(/_/g, " ")}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                    customer.customerLevel
                  )}`}
                >
                  {customer.customerLevel.replace(/_/g, " ")}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p className="text-foreground">📞 {customer.phone}</p>
                {customer.district && (
                  <p className="text-foreground">
                    📍 {customer.district}, {customer.thana}
                  </p>
                )}
                {customer.profession && (
                  <p className="text-foreground">💼 {customer.profession}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Joined {customer.created_at ? customer.created_at : "—"}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1 bg-transparent"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
