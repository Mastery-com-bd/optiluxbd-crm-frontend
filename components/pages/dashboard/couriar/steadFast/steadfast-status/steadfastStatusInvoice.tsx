/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyCheckStatusByInvoiceQuery } from "@/redux/features/couriar/steadfast/steadfastCouriarApi";
import {
  Barcode,
  Calendar,
  DollarSign,
  MapPin,
  Package,
  Search,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SteadfastStatusByInvoice() {
  const [id, setId] = useState("");
  const [data, setData] = useState<any | null>(null);

  const [trigger, { data: detail, isFetching }] =
    useLazyCheckStatusByInvoiceQuery();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await trigger(id);
    if (result.data) {
      setData(result.data.data);
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PENDING":
      case "PICKED_UP":
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "RETURNED":
        return "bg-purple-100 text-purple-800";
      case "PARTIAL_DELIVERED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // console.log("Details Data:",detail.data)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Steadfast Status by Invoice
          </h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg md:text-xl">Search Courier</CardTitle>
            <CardDescription>Enter courier ID to fetch details</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <Label htmlFor="courier-id" className="sr-only">
                  Courier ID
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="courier-id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="e.g. c-1001"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isFetching || !id.trim()}
                className="w-full sm:w-auto"
              >
                {isFetching ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isFetching && (
          <Card className="mt-6 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-1/4" />
            </CardContent>
          </Card>
        )}

        {data && !isFetching && (
          <Card className="mt-6 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg md:text-xl">
                    Courier Details
                  </CardTitle>
                  <CardDescription>ID: {data.id}</CardDescription>
                </div>
                <Badge className={statusColor(data.status)}>
                  {data.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{data.orderId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Barcode className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Tracking Code</p>
                    <p className="font-medium">{data.trackingCode || "—"}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Recipient Name</p>
                    <p className="font-medium">{data.recipientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{data.recipientPhone}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{data.recipientAddress}</p>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">COD Amount</p>
                    <p className="font-medium">BDT {data.codAmount}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Charge</p>
                    <p className="font-medium">BDT {data.deliveryCharge}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {data.note && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Note</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {data.note}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
