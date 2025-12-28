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

type TTire = "Bronze" | "Silver" | "Gold" | "Diamond" | "Platinum" | "VIP";

type TCustomerData = {
  custoemrId: string;
  name: string;
  mobile: string;
  points: number;
  orders: number;
  tier: TTire;
  status: "inactive" | "active";
};

const tierTextColorMap: Record<string, string> = {
  Bronze: "text-orange-600",
  Silver: "text-slate-500 ",
  Gold: "text-yellow-600 ",
  Diamond: "text-cyan-600 ",
  Platinum: "text-purple-600 ",
  VIP: "text-red-600 ",
};

const statusTextColor: Record<string, string> = {
  inactive: "text-red-700",
  active: "text-success",
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

  const getTierTextColor = (tier: TTire) => {
    return tierTextColorMap[tier];
  };
  const getStatusColor = (status: "inactive" | "active") => {
    return statusTextColor[status];
  };

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

              <TableCell className=" px-6">
                <div
                  className={`${getTierTextColor(
                    item?.tier
                  )} bg-[rgba(230,253,242,0.10)] px-2 py-1 rounded-lg w-full text-center relative backdrop-blur-2xl`}
                >
                  <div className="absolute top-0 left-0 inset-1.5 border-l border-t border-white/30 rounded-tl-lg pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-1.5 border-r border-b border-white/30 rounded-br-lg pointer-events-none" />
                  {item?.tier}
                </div>
              </TableCell>

              <TableCell className=" px-6">
                <div
                  className={`${getStatusColor(
                    item?.status
                  )} bg-[rgba(230,253,242,0.10)] px-2 py-1 rounded-lg w-full text-center relative backdrop-blur-2xl`}
                >
                  <div className="absolute top-0 left-0 inset-1.5 border-l border-t border-white/30 rounded-tl-lg pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-1.5 border-r border-b border-white/30 rounded-br-lg pointer-events-none" />
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
