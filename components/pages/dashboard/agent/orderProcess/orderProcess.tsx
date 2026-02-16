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
  ArrowBigUpDash,
  Calendar1Icon,
  CheckCircle,
  Clock,
  Eye,
  GraduationCapIcon,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Trash2,
  User,
  Users2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AddAddressDialog from "../addAddressDialog";
import CreateOrderForm from "../orders/create-order/CreateOrderForm";
import { Input } from "@/components/ui/input";
import { useUpdateCustomerInfoMutation } from "@/redux/features/customers/cutomersApi";
import EditCustomerDetails from "../editCustomerInfoDialog";

type BatchType = {
  id: number;
  leaderId: number;
  status: string;
};

interface PackageItem {
  product: {
    id: number;
    name: string;
    price: string;
  };
  quantity: number;
}

interface Package {
  id: number;
  name: string;
  packagePrice: string;
  items: PackageItem[];
}

interface CustomerOrder {
  id: number;
  orderDate: string; // ISO 8601 date string
  quantity: number;
  totalAmount: string;
  commission: string;
  commissionRate: string;
  shipping_address_tag: string;
  shipping_address_street: string;
  shipping_address_thana: string;
  shipping_address_city: string;
  shipping_address_post: string;
  shipping_address_division: string;
  product: null | {
    id: number;
    name: string;
    price: string;
  };
  package: null | Package;
}

interface CustomerAddress {
  id: number;
  user_id: number | null;
  customer_id: number;
  division: string;
  city: string;
  thana: string;
  post: string;
  street: string;
  zone_id: number | null;
  geo_lat: number | null;
  geo_lng: number | null;
  created_at: string;
  updated_at: string;
}

interface CustomField {
  fieldName: string;
  fieldValue: string;
}

interface customer {
  id: number;
  name: string;
  phone: string;
  email: null;
  customerId: string;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  assignedAt: string;
  batch: BatchType;
  batchId: number;
  lastContactAt: null;
  status: string;
  date_of_birth: string | null;
  profession: string | null;
  isMarried: boolean | null;
  customFields: {
    data: CustomField[] | null;
  };
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

  /* Upadte Customer Information */
  const [updateCustomerInfo] = useUpdateCustomerInfoMutation();

  /* Assigned Customer Data */
  const { data: assignedLeads, isLoading: assignedLeadsLoading } =
    useGetAssignCustomersQuery(undefined);
  const assignedCustomerData: TCurrentCustomer = assignedLeads?.data;
  const currentCustomer = assignedCustomerData?.customers[0];
  const currentCustomerCustomFields = currentCustomer?.customFields?.data;

  const [loading, setLoading] = useState<boolean>(false);
  const [customerOutcome, setCustomerOutcome] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [additionalInfo, setAdditionalInfo] = useState<CustomField[]>([]);

  /* Handle Add Additional Info */
  const handleAddAdditionalInfo = async (
    data: { fieldName: string; fieldValue: string }[],
  ) => {
    setLoading(true);
    toast.loading("Updating additional info...");

    const payload = {
      id: currentCustomer?.id,
      customerData: {
        customFields: {
          data: [...(currentCustomerCustomFields || []), ...data],
        },
      },
    };

    try {
      const res = await updateCustomerInfo(payload).unwrap();
      if (res?.success) {
        toast.dismiss();
        setLoading(false);
        toast.success(res?.message, {
          duration: 3000,
        });
        setAdditionalInfo([]);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update additional info");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (additionalInfo?.length) {
      handleAddAdditionalInfo(additionalInfo);
      return;
    }

    if (!selectedAddressId) {
      return toast.error("Please select address");
    }

    if (!customerOutcome) {
      return toast.error("Please select outcome");
    }

    setLoading(true);
    toast.loading("Updating status...");

    const payload = {
      customerId: currentCustomer?.id,
      outcome: customerOutcome,
      note: note,
      addressId: selectedAddressId,
    };

    try {
      const res = await updateLeadStatus(payload).unwrap();

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

  if (
    assignedLeadsLoading ||
    pendingLeadsLoading ||
    acceptLoading ||
    rejectLoading
  ) {
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
  const activeTab =
    pendingLeadsData?.customers?.length > 0 ? "Pending" : "Assigned";

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
                                                lead.assignedAt,
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
                              ),
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
                                        lead.assignedAt,
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
                        ),
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
                          },
                        )
                      : "N/A"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2">
                      Customer Details :
                    </h3>
                    <EditCustomerDetails
                      details={{
                        name: currentCustomer.name,
                        phone: currentCustomer.phone,
                        email: currentCustomer.email,
                        date_of_birth: currentCustomer.date_of_birth,
                        profession: currentCustomer.profession,
                        isMarried: currentCustomer.isMarried,
                      }}
                      userId={currentCustomer?.id}
                    />
                  </div>
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
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
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
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <Calendar1Icon className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Date Of Birth
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.date_of_birth || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <GraduationCapIcon className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Profession
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.profession || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <Users2 className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Married Status
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentCustomer?.isMarried ? "Married" : "Unmarried"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-full flex justify-between items-center border-b dark:border-gray-700 ">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2">
                        Additional Information
                      </h3>
                      <Button
                        onClick={() =>
                          setAdditionalInfo([
                            ...additionalInfo,
                            { fieldName: "", fieldValue: "" },
                          ])
                        }
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-2"
                      >
                        Add New
                      </Button>
                    </div>
                    <div className="w-full flex flex-col gap-4 mt-4">
                      {currentCustomerCustomFields?.map(
                        (
                          item: { fieldName: string; fieldValue: string },
                          index: number,
                        ) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
                          >
                            <div className="flex-1 space-y-1">
                              <p className="text-sm text-gray-900 dark:text-gray-100">
                                {item.fieldName}
                              </p>
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm text-gray-900 dark:text-gray-100">
                                {item.fieldValue}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="w-full flex flex-col gap-4 mt-4">
                      {additionalInfo?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={item.fieldName}
                            onChange={(e) => {
                              const newInfo = [...additionalInfo];
                              newInfo[index].fieldName = e.target.value;
                              setAdditionalInfo(newInfo);
                            }}
                            placeholder="Field name"
                            className="flex-1"
                          />
                          <span className="text-gray-500 dark:text-gray-400">
                            :
                          </span>
                          <Input
                            value={item.fieldValue}
                            onChange={(e) => {
                              const newInfo = [...additionalInfo];
                              newInfo[index].fieldValue = e.target.value;
                              setAdditionalInfo(newInfo);
                            }}
                            placeholder="Field value"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newInfo = additionalInfo.filter(
                                (_, i) => i !== index,
                              );
                              setAdditionalInfo(newInfo);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Address Selection */}
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        Delivery Address
                      </p>
                    </div>
                    <AddAddressDialog userId={currentCustomer?.id} />
                  </div>
                  {currentCustomer?.addresses?.length > 0 ? (
                    <div className="space-y-2">
                      {currentCustomer.addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className="flex items-center gap-4 p-4 rounded-xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            onChange={(e) =>
                              setSelectedAddressId(Number(e.target.value))
                            }
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div className="w-full flex items-center justify-between min-w-0">
                            <div>
                              {/* Primary address line */}
                              <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {addr.street}
                              </p>
                              {/* Secondary locality */}
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {addr.thana}, {addr.city} – {addr.post}
                              </p>
                            </div>
                            {/* Metadata row */}
                            <div className="gap-4 text-xs text-gray-500 dark:text-gray-400 space-y-1.5">
                              {/* Division badge */}
                              <div className="">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                  {addr.division}
                                </span>
                              </div>
                              {addr.zone_id && (
                                <span>
                                  Zone{" "}
                                  <span className="font-medium">
                                    {addr.zone_id}
                                  </span>
                                </span>
                              )}
                              {addr.geo_lat && addr.geo_lng && (
                                <span>
                                  Lat:{" "}
                                  <span className="font-medium">
                                    {addr.geo_lat}
                                  </span>
                                  , Lng:{" "}
                                  <span className="font-medium">
                                    {addr.geo_lng}
                                  </span>
                                </span>
                              )}
                              <span>
                                ID:{" "}
                                <span className="font-medium">{addr.id}</span>
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No addresses available
                    </p>
                  )}
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <div className="w-full flex justify-between items-center border-b dark:border-gray-700 ">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pb-2">
                      Order History
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-2"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Create Order
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <CreateOrderForm
                          showAddCustomer={false}
                          existingCustomerId={currentCustomer?.id}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  {currentCustomer?.orders?.length ? (
                    <div className="grid gap-4">
                      {currentCustomer.orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="rounded-lg border bg-card p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-base">
                                {order?.product
                                  ? order.product.name
                                  : order?.package?.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Order #{order.id} •{" "}
                                {new Date(order.orderDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            >
                              Total: ৳{order.totalAmount}
                            </Badge>
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="flex items-start gap-2">
                              <Package className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Quantity
                                </p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {order.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 font-bold">
                                ৳
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {order?.product
                                    ? "Unit Price"
                                    : "Total Price"}
                                </p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  ৳
                                  {order?.product
                                    ? order.product.price
                                    : order?.package?.packagePrice}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Package className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {order.product ? "Product ID" : "Package ID"}
                                </p>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {order.product
                                    ? order.product.id
                                    : order.package?.id}
                                </p>
                              </div>
                            </div>
                          </div>

                          {order?.package && (
                            <div className="pt-2 border-t dark:border-gray-700">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Package Items
                              </p>
                              <div className="space-y-2">
                                {order.package.items.map((item) => (
                                  <div
                                    key={item.product.id}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>
                                      {item.product.name} × {item.quantity}
                                    </span>
                                    <span>৳{item.product.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Shipping Address
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                              {order.shipping_address_street},{" "}
                              {order.shipping_address_thana},{" "}
                              {order.shipping_address_city},{" "}
                              {order.shipping_address_division} -{" "}
                              {order.shipping_address_post}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No orders found for this customer.
                    </p>
                  )}
                </div>

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
                    <span>
                      {additionalInfo?.length ? (
                        <ArrowBigUpDash className="w-4 h-4 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                    </span>
                  )}
                  {additionalInfo?.length ? "Update Info" : "Confirm Status"}
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
