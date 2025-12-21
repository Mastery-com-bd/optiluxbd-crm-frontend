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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Eye,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";
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

type TCustomerData = {
  custoemrId: string;
  name: string;
  mobile: string;
  points: number;
  orders: number;
  tier: "Bronze" | "Silver" | "Gold" | "Diamond" | "Platinum" | "VIP";
  status: "inactive" | "active";
};

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
  const customerData: TCustomerData[] = [
    {
      custoemrId: "LD-10001",
      name: "Aminul Islam",
      mobile: "01780530300",
      points: 1500,
      orders: 50,
      tier: "VIP",
      status: "active",
    },
    {
      custoemrId: "LD-10002",
      name: "Rahim Uddin",
      mobile: "01712345678",
      points: 800,
      orders: 30,
      tier: "Platinum",
      status: "active",
    },
    {
      custoemrId: "LD-10003",
      name: "Karim Ahmed",
      mobile: "01898765432",
      points: 500,
      orders: 20,
      tier: "Gold",
      status: "inactive",
    },
    {
      custoemrId: "LD-10004",
      name: "Sonia Rahman",
      mobile: "01911223344",
      points: 200,
      orders: 10,
      tier: "Silver",
      status: "active",
    },
    {
      custoemrId: "LD-10005",
      name: "Farhan Hossain",
      mobile: "01766778899",
      points: 50,
      orders: 2,
      tier: "Bronze",
      status: "inactive",
    },
    {
      custoemrId: "LD-10006",
      name: "Nabila Akter",
      mobile: "01855667788",
      points: 1200,
      orders: 45,
      tier: "VIP",
      status: "active",
    },
    {
      custoemrId: "LD-10007",
      name: "Tanvir Chowdhury",
      mobile: "01999887766",
      points: 900,
      orders: 35,
      tier: "Platinum",
      status: "inactive",
    },
    {
      custoemrId: "LD-10008",
      name: "Rumana Khatun",
      mobile: "01733445566",
      points: 600,
      orders: 25,
      tier: "Gold",
      status: "active",
    },
    {
      custoemrId: "LD-10009",
      name: "Shakib Al Hasan",
      mobile: "01822334455",
      points: 300,
      orders: 15,
      tier: "Silver",
      status: "inactive",
    },
    {
      custoemrId: "LD-10010",
      name: "Meherun Nesa",
      mobile: "01911224455",
      points: 100,
      orders: 5,
      tier: "Bronze",
      status: "active",
    },
  ];

  const headers = [
    "Customer ID",
    "Customer Name",
    "Mobile Number",
    "Loyality Points",
    "Total Orders",
    "Tier",
    "Status",
    "Actions",
  ];
  return (
    <div className="overflow-x-auto w-full ">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {headers.map((label, ind) => (
              <TableHead
                first={ind === 0}
                last={ind === headers.length - 1}
                key={label}
                className="text-left text-xs font-semibold uppercase text-muted-foreground"
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {customerData.map((item, i) => (
            <TableRow key={i} className="group">
              <TableCell>
                <div className="text-sm flex items-center justify-center w-full px-8">
                  {item?.custoemrId}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.mobile}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.points}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.orders}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.tier}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.status}
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] flex flex-col "
                  >
                    <Link href={`/dashboard/customers/${2}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="w-4 h-4 mr-2" />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      //   onClick={() => {
                      //     setDeleteProductId(product.id);
                      //     setDeleteDialogOpen(true);
                      //   }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-destructive mr-2" />
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
  );
}
