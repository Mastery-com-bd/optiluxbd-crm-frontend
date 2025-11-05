"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";

export interface Customer {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  district?: string;
  thana?: string;
  date_of_birth?: string;
  profession?: string;
  isMarried?: boolean;
  gender?: string;
  customerLevel: string;
  created_at: string;
  updated_at: string;
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
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Profession
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {customer.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {customer.gender?.replace(/_/g, " ")}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-foreground">{customer.phone}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {customer.district && customer.thana ? (
                      <>
                        <p>{customer.district}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.thana}
                        </p>
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {customer.profession || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        customer.customerLevel
                      )}`}
                    >
                      {customer.customerLevel.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(customer.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/customers/id/${customer.id}`}
                              className="cursor-pointer flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/customers/id/${customer.id}`}
                              className="cursor-pointer flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this customer?"
                                )
                              ) {
                                // Handle delete logic here
                                console.log("Delete customer", customer.id);
                              }
                            }}
                            className="cursor-pointer text-red-600 focus:text-red-600 flex items-center"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <p className="text-foreground">📧 {customer.email}</p>
                {customer.district && (
                  <p className="text-foreground">
                    📍 {customer.district}, {customer.thana}
                  </p>
                )}
                {customer.profession && (
                  <p className="text-foreground">💼 {customer.profession}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Joined {formatDate(customer.created_at)}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/customers/${customer.id}`} className="flex-1">
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
