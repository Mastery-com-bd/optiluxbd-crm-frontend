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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreateSteadfastReturnRequestMutation,
  useGetCouriarDetailsByIdQuery,
} from "@/redux/features/couriar/steadfast/steadfastCouriarApi";
import {
  Barcode,
  Calendar,
  DollarSign,
  Loader2,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourierDetail {
  id: number;
  orderId: number;
  consignmentId: string | null;
  trackingCode: string | null;
  invoice: string;
  status: string;
  courierService: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  codAmount: string;
  deliveryCharge: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  order: {
    id: number;
    agentId: number;
    customerId: number;
    productId: number;
    packageId: string | null;
    quantity: number;
    totalAmount: string;
    commissionRate: string;
    commission: string;
    orderDate: string;
    batchId: string | null;
    addressId: string | null;
    shipping_address_tag: string | null;
    shipping_address_street: string | null;
    shipping_address_thana: string | null;
    shipping_address_city: string | null;
    shipping_address_post: string | null;
    shipping_address_division: string | null;
    shipping_address_geo_lat: string | null;
    shipping_address_geo_lng: string | null;
    customer: {
      id: number;
      name: string;
      phone: string;
    };
    agent: {
      id: number;
      name: string;
    };
    product: {
      id: number;
      name: string;
      price: string;
    };
    package: string | null;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returns: any[];
}

export default function CouriarDetails({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetCouriarDetailsByIdQuery(id);
  const router = useRouter();

  const details: CourierDetail = data?.data;

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

  const [returnRequest] = useCreateSteadfastReturnRequestMutation();
  const handleReturnRequest = async () => {
    const payload = {
      consignment_id: details.consignmentId || details.invoice || details.trackingCode,
      reason: "Customer refused delivery",
    };
    setLoading(true);
    toast.loading("Creating return request...");

    try {
      const res = await returnRequest(payload).unwrap();
      console.log("Return Request Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        setLoading(false);
        router.push("/dashboard/couriar/steadFast")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.dismiss();
      toast.dismiss();
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 mt-6 space-y-6">
        {/* Overview Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-16 w-64" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-4 h-4 mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recipient Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={i === 2 ? "sm:col-span-2" : ""}>
                <div className="flex items-start gap-2">
                  <Skeleton className="w-4 h-4 mt-0.5" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-4 h-4 mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timestamps Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="w-4 h-4 mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Summary Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Shipping Address Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-28" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Customer & Agent Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-16" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(i === 0 ? 3 : 2)].map((_, j) => (
                    <div
                      key={j}
                      className={i === 0 && j === 2 ? "sm:col-span-2" : ""}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <Skeleton className="h-3 w-12 mb-1" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Product Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Returns Skeleton */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-32 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // console.log("Details Data:",detail.data)

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Courier Lookup</h1>
          </div>
          <Button onClick={handleReturnRequest} className="px-4 py-2">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Request Return"
            )}
          </Button>
        </div>

        {details && !isLoading && (
          <div className="mt-6 space-y-6">
            {/* Overview */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl">
                      Courier Details
                    </CardTitle>
                    <CardDescription>ID: {details.id}</CardDescription>
                  </div>
                  <Badge className={statusColor(details.status)}>
                    {details.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Detail
                  label="Order ID"
                  value={details.orderId}
                  icon={<Package className="w-4 h-4" />}
                />
                <Detail
                  label="Consignment ID"
                  value={details.consignmentId || "—"}
                  icon={<Barcode className="w-4 h-4" />}
                />
                <Detail
                  label="Tracking Code"
                  value={details.trackingCode || "—"}
                  icon={<Barcode className="w-4 h-4" />}
                />
                <Detail
                  label="Invoice"
                  value={details.invoice}
                  icon={<Barcode className="w-4 h-4" />}
                />
                <Detail
                  label="Courier Service"
                  value={details.courierService}
                  icon={<Truck className="w-4 h-4" />}
                />
              </CardContent>
            </Card>

            {/* Recipient */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Recipient</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Name"
                  value={details.recipientName}
                  icon={<User className="w-4 h-4" />}
                />
                <Detail
                  label="Phone"
                  value={details.recipientPhone}
                  icon={<User className="w-4 h-4" />}
                />
                <div className="sm:col-span-2">
                  <Detail
                    label="Address"
                    value={details.recipientAddress}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Financial</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <Detail
                  label="COD Amount"
                  value={`BDT ${details.codAmount}`}
                  icon={<DollarSign className="w-4 h-4" />}
                />
                <Detail
                  label="Delivery Charge"
                  value={`BDT ${details.deliveryCharge}`}
                  icon={<DollarSign className="w-4 h-4" />}
                />
                <Detail label="Note" value={details.note || "—"} />
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Created"
                  value={
                    details.createdAt
                      ? new Date(details.createdAt).toLocaleString()
                      : "—"
                  }
                  icon={<Calendar className="w-4 h-4" />}
                />
                <Detail
                  label="Updated"
                  value={
                    details.updatedAt
                      ? new Date(details.updatedAt).toLocaleString()
                      : "—"
                  }
                  icon={<Calendar className="w-4 h-4" />}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Detail label="Order ID" value={details.order?.id} />
                <Detail label="Agent ID" value={details.order?.agentId} />
                <Detail label="Customer ID" value={details.order?.customerId} />
                <Detail label="Product ID" value={details.order?.productId} />
                <Detail
                  label="Package ID"
                  value={details.order?.packageId || "—"}
                />
                <Detail label="Quantity" value={details.order?.quantity} />
                <Detail
                  label="Total Amount"
                  value={`BDT ${details.order?.totalAmount}`}
                />
                <Detail
                  label="Commission Rate"
                  value={details.order?.commissionRate || "—"}
                />
                <Detail
                  label="Commission"
                  value={`BDT ${details.order?.commission || "—"}`}
                />
                <Detail
                  label="Order Date"
                  value={
                    details.order?.orderDate
                      ? new Date(details.order.orderDate).toLocaleString()
                      : "—"
                  }
                />
                <Detail
                  label="Batch ID"
                  value={details.order?.batchId || "—"}
                />
                <Detail
                  label="Address ID"
                  value={details.order?.addressId || "—"}
                />
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Detail
                  label="Tag"
                  value={details.order?.shipping_address_tag || "—"}
                />
                <Detail
                  label="Street"
                  value={details.order?.shipping_address_street || "—"}
                />
                <Detail
                  label="Thana"
                  value={details.order?.shipping_address_thana || "—"}
                />
                <Detail
                  label="City"
                  value={details.order?.shipping_address_city || "—"}
                />
                <Detail
                  label="Post"
                  value={details.order?.shipping_address_post || "—"}
                />
                <Detail
                  label="Division"
                  value={details.order?.shipping_address_division || "—"}
                />
                <Detail
                  label="Geo Lat"
                  value={details.order?.shipping_address_geo_lat || "—"}
                />
                <Detail
                  label="Geo Lng"
                  value={details.order?.shipping_address_geo_lng || "—"}
                />
              </CardContent>
            </Card>

            {/* Customer & Agent */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Customer & Agent</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Customer</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Detail
                      label="ID"
                      value={details.order?.customer?.id || "—"}
                    />
                    <Detail
                      label="Name"
                      value={details.order?.customer?.name || "—"}
                    />
                    <div className="sm:col-span-2">
                      <Detail
                        label="Phone"
                        value={details.order?.customer?.phone || "—"}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Agent</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Detail
                      label="ID"
                      value={details.order?.agent?.id || "—"}
                    />
                    <Detail
                      label="Name"
                      value={details.order?.agent?.name || "—"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Product</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <Detail label="ID" value={details.order?.product?.id || "—"} />
                <Detail
                  label="Name"
                  value={details.order?.product?.name || "—"}
                />
                <Detail
                  label="Price"
                  value={`BDT ${details.order?.product?.price || "—"}`}
                />
              </CardContent>
            </Card>

            {/* Returns */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Returns</CardTitle>
                <CardDescription>Raw data list for returns</CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(details.returns) &&
                details.returns?.length > 0 ? (
                  <div className="space-y-3">
                    {details.returns.map((item, idx) => (
                      <pre
                        key={idx}
                        className="rounded-md border p-3 text-sm overflow-x-auto"
                      >
                        {JSON.stringify(item, null, 2)}
                      </pre>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm">No return records</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon ? <div className="mt-0.5">{icon}</div> : null}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium wrap-break-word">{value}</p>
      </div>
    </div>
  );
}
