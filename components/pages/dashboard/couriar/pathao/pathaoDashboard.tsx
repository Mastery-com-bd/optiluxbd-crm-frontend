"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { PathaoCouriarDashboardPrpos } from "@/lib/interface";
import { useGetAllPathaoCouriarQuery } from "@/redux/features/couriar/pathao/pathaoCouriarAPI";
import {
  CheckCircle,
  Clock,
  EllipsisVertical,
  Mail,
  Package,
  Phone,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import CouriarDashboardHeader from "../components/couriarDashboardHeader";
import PathaoDashboardSkeleton from "./pathaoDashboardSkeleton";

// Mock data
const mockParcels = Array.from({ length: 50 }, (_, i) => ({
  id: `PAR-${1000 + i}`,
  customerName: `Customer ${i + 1}`,
  customerPhone: `+8801${Math.floor(Math.random() * 9e8) + 1e8}`,
  address: `House ${i + 1}, Road ${i + 1}, Dhaka`,
  status: ["pending", "processing", "in_transit", "delivered", "cancelled"][
    Math.floor(Math.random() * 5)
  ] as string,
  weight: `${(Math.random() * 5 + 0.5).toFixed(2)} kg`,
  codAmount: Math.floor(Math.random() * 5000) + 100,
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
  ).toISOString(),
  agent: {
    id: `AGT-${200 + (i % 10)}`,
    name: `Agent ${(i % 10) + 1}`,
    phone: `+8801${Math.floor(Math.random() * 9e8) + 1e8}`,
    email: `agent${(i % 10) + 1}@optiluxbd.com`,
    avatar: `https://avatar.vercel.sh/agent${(i % 10) + 1}.png`,
    joinedAt: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ).toISOString(),
  },
}));

const statusBackgroundColor: Record<
  string,
  {
    bg: string;
  }
> = {
  PENDING: { bg: "text-slate-200 bg-black" }, // Neutral gray
  PICKED_UP: { bg: "bg-amber-600" }, // Rich amber
  IN_TRANSIT: { bg: "bg-blue-600" }, // Deep blue
  OUT_FOR_DELIVERY: { bg: "bg-cyan-600" }, // Cyan (highly visible)
  DELIVERED: { bg: "bg-green-600" }, // Strong green
  CANCELLED: { bg: "bg-rose-600" }, // Rose/red (distinct from red)
  RETURNED: { bg: "bg-purple-600" }, // Purple (clear difference)
  PARTIAL_DELIVERED: { bg: "bg-lime-600" }, // Lime (bright and different)
};

export default function SteadFastDashboard() {
  const [page, setPage] = useState(1);

  const counts = mockParcels.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = mockParcels.length;
  const pending = counts.pending || 0;
  const processing = counts.processing || 0;
  const inTransit = counts.in_transit || 0;
  const delivered = counts.delivered || 0;
  const cancelled = counts.cancelled || 0;

  const payload = {
    page: page,
    limit: 10,
  };

  const { data, isLoading: couriarIsLoading } = useGetAllPathaoCouriarQuery(payload);
  const couriarData: PathaoCouriarDashboardPrpos[] = data?.data;

  console.log("Pathao Couriar Data:", couriarData);

  const handleRefund = () => {
    toast.success("Comming Soon!");
  };

  if (couriarIsLoading) {
    return <PathaoDashboardSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      <CouriarDashboardHeader
        title="Pathao Courier Dashboard"
        desc="Manage and track all your courier parcels in one place."
        buttonText="Create Courier"
        link="/dashboard/couriar/pathao/create"
      />
      {/* Metrics Cards Row 1 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Parcels
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
            <CardDescription>Awaiting pickup</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Processing Parcels
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processing}</div>
            <CardDescription>Being prepared</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Transit Parcels
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransit}</div>
            <CardDescription>On the way to customer</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Cards Row 2 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cancelled Parcels
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelled}</div>
            <CardDescription>Orders cancelled</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered Parcels
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delivered}</div>
            <CardDescription>Successfully delivered</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <CardDescription>All time parcels</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Parcels Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Parcels</CardTitle>
          <CardDescription>List of every parcel with details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>COD & Charge</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {couriarData.map((parcel) => (
                <TableRow key={parcel.id}>
                  <TableCell className="font-mono text-xs">
                    {parcel.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{parcel.recipientName}</div>
                    <div className="text-xs text-muted-foreground">
                      {parcel.recipientPhone}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate text-sm">
                    {parcel?.recipientAddress}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusBackgroundColor[parcel?.status]?.bg}`}
                    >
                      {parcel?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ৳{parcel.codAmount} + ৳{parcel.deliveryCharge}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex flex-col items-start justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={parcel.order.agent?.avatar || ""}
                                  alt={parcel.order.agent?.name}
                                />
                                <AvatarFallback>
                                  {parcel.order.agent?.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">
                                {parcel.order.agent?.name}
                              </span>
                            </div>
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {new Date(parcel.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="backdrop-blur-md bg-slate-200 p-6">
                        <DialogHeader>
                          <DialogTitle>Agent Details</DialogTitle>
                          <DialogDescription>
                            Full information of the call-center agent
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={parcel.order.agent?.avatar || ""}
                                alt={parcel.order.agent?.name}
                              />
                              <AvatarFallback>
                                {parcel.order.agent?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {parcel.order.agent?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ID: {parcel.order.agent?.id}
                              </p>
                            </div>
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{parcel.order.agent?.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{parcel.order.agent?.email}</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/couriar/steadFast/id/${parcel.id}`}
                          >
                            View Details
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleRefund()}>
                          Refund Request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(data?.pagination?.page - 1 || 1)}
              disabled={!data?.pagination?.hasPrevious}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {data?.pagination?.page || 1} of{" "}
              {data?.pagination?.totalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(data?.pagination?.page + 1 || 1)}
              disabled={!data?.pagination?.hasNext}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
