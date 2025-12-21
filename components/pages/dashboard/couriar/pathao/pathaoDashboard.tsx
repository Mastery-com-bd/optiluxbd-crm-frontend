"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
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
  XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CouriarDashboardHeader from "../components/couriarDashboardHeader";
import PathaoDashboardSkeleton from "./pathaoDashboardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";


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

export default function PathaoDashboard() {
  const [page, setPage] = useState(1);


  const total = 495;
  const pending = 99;
  const processing = 99;
  const inTransit = 99;
  const delivered = 99;
  const cancelled = 99;

  const payload = {
    page: page,
    limit: 10,
  };

  const { data, isLoading: couriarIsLoading } = useGetAllPathaoCouriarQuery(payload);
  const couriarData: PathaoCouriarDashboardPrpos[] = data?.data;

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
            <TableBody>
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
                            href={`/dashboard/couriar/pathao/id/${parcel.id}`}
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
            </TableBody> 
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
