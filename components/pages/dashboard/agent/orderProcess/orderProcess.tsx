"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAcceptPendingLeadsMutation,
  useGetAssignCustomersQuery,
  useGetPendingCustomersQuery,
  useRejectPendingLeadsMutation,
  useUpdateLeadStatusMutation,
} from "@/redux/features/leads/leadsAgentApi";
import {
  CheckCircle,
  Clock,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type BatchType = {
  id: number;
  leaderId: number;
  status: string;
};

interface customer {
  id: number;
  name: string;
  phone: string;
  email: null;
  customerId: string;
  addresses: [];
  assignedAt: string;
  batch: BatchType;
  batchId: number;
  lastContactAt: null;
  status: string;
}

interface TCurrentCustomer extends customer {
  agentId: number;
  customers: customer[];
}

interface PendingLeadsType {
  id: number;
  customerId: string;
  name: string;
  phone: string;
  email: null;
  assignedAt: string;
  status: string;
}

const OrderProcessingSystem = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customerOutcome, setCustomerOutcome] = useState<string>("");
  const [note, setNote] = useState<string>("");

  /* Pending Customer Data */
  const { data: pendingLeads, isLoading: pendingLeadsLoading } =
    useGetPendingCustomersQuery(undefined);
  const pendingLeadsData = pendingLeads?.data;

  /* Accept Pending Customer Data */
  const [acceptPendingLeads, { isLoading: acceptLoading }] =
    useAcceptPendingLeadsMutation();

  /* Reject Pending Customer Data */
  const [rejectPendingLeads, { isLoading: rejectLoading }] =
    useRejectPendingLeadsMutation();

  /* Update Lead Status */
  const [updateLeadStatus] = useUpdateLeadStatusMutation();

  /* Assigned Customer Data */
  const { data: assignedLeads, isLoading: assignedLeadsLoading } =
    useGetAssignCustomersQuery(undefined);
  const assignedCustomerData: TCurrentCustomer = assignedLeads?.data;
  const currentCustomer = assignedCustomerData?.customers[0];

  const handleStatusUpdate = async () => {
    setLoading(true);
    toast.loading("Updating status...");

    const payload = {
      customerId: currentCustomer?.id,
      outcome: customerOutcome,
      note: note,
    };
    if (!customerOutcome || !note) {
      toast.error("Please select outcome and add note");
      setLoading(false);
      return;
    }
    try {
      const res = await updateLeadStatus(payload).unwrap();
      console.log("Update Lead Status Response", res);
      if (res?.success) {
        toast.dismiss();
        setLoading(false);
        toast.success(res?.message, {
          duration: 3000,
        });
        // Reload the page to reflect the updated status
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update status");
      setLoading(false);
    }

  };

  const handleAccept = async (batchId: number) => {
    try {
      const payload = {
        batchId: batchId,
      };
      const res = await acceptPendingLeads(payload).unwrap();
      console.log("Accept Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (batchId: number) => {
    try {
      const payload = {
        batchId: batchId,
      };
      const res = await rejectPendingLeads(payload).unwrap();
      console.log("Reject Response", res);
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          duration: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (assignedLeadsLoading || pendingLeadsLoading || acceptLoading || rejectLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Loading leads...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const activeTab = pendingLeadsData?.customers?.length > 0 ? "Pending" : "Assigned";

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Tabs Start */}
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="Pending">Pending Leads</TabsTrigger>
            <TabsTrigger value="Assigned">Assigned Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="Pending">
            {/* Pending Leads Tab */}
            <div className="space-y-4">
              {pendingLeadsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="ml-3 text-gray-600 dark:text-gray-300">
                    Loading pending leads...
                  </p>
                </div>
              ) : pendingLeadsData?.customers?.length > 0 ? (
                <>
                  {/* Re-imagined Pending Leads Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          Pending Leads
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {pendingLeadsData.pendingCount || 0} leads waiting for
                          acceptance
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="default"
                        className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          handleAccept(pendingLeadsData.batch.id);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept All
                      </Button>
                      <Button
                        size="default"
                        className="bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          handleReject(pendingLeadsData.batch.id);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject All
                      </Button>
                    </div>
                  </div>

                  {/* Table with shadcn/ui components */}
                  <div className="w-full max-w-7xl mx-auto p-4">
                    {/* Desktop Table View */}
                    <div className="hidden md:block rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Name
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Phone
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Email
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Assigned At
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                              </th>
                              <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {pendingLeadsData.customers.map(
                              (lead: PendingLeadsType) => (
                                <tr
                                  key={lead.id}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                  <td className="p-4 align-middle font-medium">
                                    <div>
                                      <p className="font-medium">{lead.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {lead.customerId}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    {lead.phone || "N/A"}
                                  </td>
                                  <td className="p-4 align-middle">
                                    <span className="truncate block max-w-[150px]">
                                      {lead.email || "N/A"}
                                    </span>
                                  </td>
                                  <td className="p-4 align-middle">
                                    {new Date(lead.assignedAt).toLocaleString()}
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Badge
                                      variant="secondary"
                                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    >
                                      {lead.status}
                                    </Badge>
                                  </td>
                                  <td className="p-4 align-middle text-center">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0"
                                        >
                                          <Eye className="h-4 w-4" />
                                          <span className="sr-only">
                                            View details
                                          </span>
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Lead Details
                                          </DialogTitle>
                                          <DialogDescription>
                                            Detailed information for {lead.name}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              Name
                                            </Label>
                                            <div className="col-span-3">
                                              {lead.name}
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              ID
                                            </Label>
                                            <div className="col-span-3">
                                              {lead.customerId}
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              Phone
                                            </Label>
                                            <div className="col-span-3">
                                              {lead.phone || "N/A"}
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              Email
                                            </Label>
                                            <div className="col-span-3">
                                              {lead.email || "N/A"}
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              Assigned
                                            </Label>
                                            <div className="col-span-3">
                                              {new Date(
                                                lead.assignedAt
                                              ).toLocaleString()}
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right font-medium">
                                              Status
                                            </Label>
                                            <div className="col-span-3">
                                              <Badge
                                                variant="secondary"
                                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                              >
                                                {lead.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button variant="outline">
                                              Close
                                            </Button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                      {pendingLeadsData.customers.map(
                        (lead: PendingLeadsType) => (
                          <div
                            key={lead.id}
                            className="rounded-lg border bg-card p-4 space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-base">
                                  {lead.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {lead.customerId}
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              >
                                {lead.status}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Phone:
                                </span>
                                <span className="font-medium">
                                  {lead.phone || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Email:
                                </span>
                                <span className="font-medium truncate ml-2 max-w-[180px]">
                                  {lead.email || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Assigned:
                                </span>
                                <span className="font-medium text-xs">
                                  {new Date(lead.assignedAt).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Lead Details</DialogTitle>
                                  <DialogDescription>
                                    Detailed information for {lead.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      Name
                                    </Label>
                                    <div className="col-span-3">
                                      {lead.name}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      ID
                                    </Label>
                                    <div className="col-span-3">
                                      {lead.customerId}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      Phone
                                    </Label>
                                    <div className="col-span-3">
                                      {lead.phone || "N/A"}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      Email
                                    </Label>
                                    <div className="col-span-3">
                                      {lead.email || "N/A"}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      Assigned
                                    </Label>
                                    <div className="col-span-3">
                                      {new Date(
                                        lead.assignedAt
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">
                                      Status
                                    </Label>
                                    <div className="col-span-3">
                                      <Badge
                                        variant="secondary"
                                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      >
                                        {lead.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <Package className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      No pending leads available
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      All leads have been processed or assigned
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="Assigned">
            {/* Current Order Details */}
            <Card className="shadow-xl overflow-hidden">
              <CardHeader className="border-b dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl dark:text-gray-100">
                      {currentCustomer?.customerId || "N/A"}
                    </CardTitle>
                    <CardDescription className="dark:text-indigo-200 mt-1">
                      Customer ID
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="w-fit bg-white text-indigo-600 dark:bg-gray-900 dark:text-indigo-400"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    {currentCustomer?.assignedAt
                      ? new Date(currentCustomer.assignedAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      : "N/A"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2">
                    Customer Details :
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <User className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Customer Name
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <Phone className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.phone || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border md:col-span-2">
                      <Mail className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border md:col-span-2">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Delivery Address
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {/* TODO: Assign Address Properly */}
                          TODO: Add Address
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                {/* <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b dark:border-gray-700 pb-2">
                    Order Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Product
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Product details
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 font-bold">
                        ×
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Quantity
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          produc Quantuty
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg md:col-span-2">
                      <div className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 font-bold">
                        ৳
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Amount
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ৳99999
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* Contact Outcome Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact Outcome
                  </label>
                  <Select onValueChange={(value) => setCustomerOutcome(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"CONTACTED"}>Contacted</SelectItem>
                      <SelectItem value={"NO_ORDER"}>No Order</SelectItem>
                      <SelectItem value={"ORDER_PLACED"}>
                        Order Placed
                      </SelectItem>
                      <SelectItem value={"CANCELLED"}>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Order Notes
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full min-h-[80px] p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                    placeholder="Enter any special notes for this order..."
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-900 py-6">
                <Button
                  onClick={() => handleStatusUpdate()}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Confirm Status
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderProcessingSystem;
