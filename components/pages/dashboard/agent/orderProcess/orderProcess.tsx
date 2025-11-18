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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAssignCustomersQuery } from "@/redux/features/leads/leadsAgentApi";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  User
} from "lucide-react";
import { useState } from "react";

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

/* const MocCustomer: customer[] = [
  {
    id: 1,
    name: "Rahim Uddin",
    phone: "01711223344",
    email: null,
    customerId: "CUST-0001",
    addresses: [],
    assignedAt: "2024-06-01T10:00:00Z",
    batch: { id: 101, leaderId: 201, status: "active" },
    batchId: 101,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 2,
    name: "Karim Ahmed",
    phone: "01822334455",
    email: null,
    customerId: "CUST-0002",
    addresses: [],
    assignedAt: "2024-06-01T10:05:00Z",
    batch: { id: 101, leaderId: 201, status: "active" },
    batchId: 101,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 3,
    name: "Fatima Begum",
    phone: "01933445566",
    email: null,
    customerId: "CUST-0003",
    addresses: [],
    assignedAt: "2024-06-01T10:10:00Z",
    batch: { id: 102, leaderId: 202, status: "active" },
    batchId: 102,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 4,
    name: "Abdul Matin",
    phone: "01644556677",
    email: null,
    customerId: "CUST-0004",
    addresses: [],
    assignedAt: "2024-06-01T10:15:00Z",
    batch: { id: 102, leaderId: 202, status: "active" },
    batchId: 102,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 5,
    name: "Shabnam Chowdhury",
    phone: "01555667788",
    email: null,
    customerId: "CUST-0005",
    addresses: [],
    assignedAt: "2024-06-01T10:20:00Z",
    batch: { id: 103, leaderId: 203, status: "active" },
    batchId: 103,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 6,
    name: "Imran Hossain",
    phone: "01466778899",
    email: null,
    customerId: "CUST-0006",
    addresses: [],
    assignedAt: "2024-06-01T10:25:00Z",
    batch: { id: 103, leaderId: 203, status: "active" },
    batchId: 103,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 7,
    name: "Nasima Akter",
    phone: "01377889900",
    email: null,
    customerId: "CUST-0007",
    addresses: [],
    assignedAt: "2024-06-01T10:30:00Z",
    batch: { id: 104, leaderId: 204, status: "active" },
    batchId: 104,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 8,
    name: "Jamal Sheikh",
    phone: "01288990011",
    email: null,
    customerId: "CUST-0008",
    addresses: [],
    assignedAt: "2024-06-01T10:35:00Z",
    batch: { id: 104, leaderId: 204, status: "active" },
    batchId: 104,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 9,
    name: "Salma Khatun",
    phone: "01199001122",
    email: null,
    customerId: "CUST-0009",
    addresses: [],
    assignedAt: "2024-06-01T10:40:00Z",
    batch: { id: 105, leaderId: 205, status: "active" },
    batchId: 105,
    lastContactAt: null,
    status: "pending",
  },
  {
    id: 10,
    name: "Tareq Aziz",
    phone: "01000112233",
    email: null,
    customerId: "CUST-0010",
    addresses: [],
    assignedAt: "2024-06-01T10:45:00Z",
    batch: { id: 105, leaderId: 205, status: "active" },
    batchId: 105,
    lastContactAt: null,
    status: "pending",
  },
]; */

const OrderProcessingSystem = () => {
  const [showHistory, setShowHistory] = useState(false);
  // const [processedOrders, setProcessedOrders] = useState<customer[]>([]);
  const [customerOutcome, setCustomerOutcome] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const { data, isLoading } = useGetAssignCustomersQuery(undefined);
  const customerData: customer[] = data?.data;
  const firstCustomer = customerData?.[0];

  if (customerData) {
    console.log(customerData);
  }

  const handleStatusUpdate = () => {
    const payload = {
      customerId: firstCustomer?.customerId,
      outcome: customerOutcome,
      note: note,
    }
    console.log(payload);



    /*
    
    Save to local store for tracking
    
    // Retrieve existing processed IDs from localStorage or initialize empty array
    const existingIdsStr = localStorage.getItem("processedCustomerIds");
    let processedIds: string[] = [];
    if (existingIdsStr) {
      try {
        processedIds = JSON.parse(existingIdsStr);
      } catch (e) {
        processedIds = [];
      }
    }

    // Add current customer ID if not already present
    if (firstCustomer?.customerId && !processedIds.includes(firstCustomer.customerId)) {
      processedIds.push(firstCustomer.customerId);
    }

    // Save updated array back to localStorage
    localStorage.setItem("processedCustomerIds", JSON.stringify(processedIds));

    console.log("Updated processedCustomerIds:", processedIds);
  
 */









  };

/*   const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      case "fake":
        return "bg-orange-500";
      case "duplicate":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "canceled":
        return <XCircle className="w-4 h-4" />;
      case "fake":
        return <AlertCircle className="w-4 h-4" />;
      case "duplicate":
        return <Copy className="w-4 h-4" />;
      default:
        return null;
    }
  }; */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Loading orders...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

 /*  if (showHistory) {
    return (
      <div className="min-h-screen bg-white dark:bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl pt-0 overflow-hidden ">
            <CardHeader className="border-b pt-4">
              <CardTitle className="text-2xl md:text-3xl">
                Processing Summary
              </CardTitle>
              <CardDescription className="text-indigo-100 dark:text-indigo-200">
                You&apos;ve processed {processedOrders.length} orders
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {processedOrders.map((order, idx) => (
                  <Card
                    key={idx}
                    className="border-2 hover:shadow-md transition-shadow "
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg dark:text-gray-100">
                            {order.orderNumber}
                          </CardTitle>
                          <CardDescription className="text-sm dark:text-gray-400">
                            {order.customerName}
                          </CardDescription>
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            order.status
                          )} text-white flex items-center gap-1 dark:text-gray-100`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Package className="w-4 h-4" />
                        <span>{order.product}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4" />
                        <span className="truncate">{order.phone}</span>
                      </div>
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                        ৳{order.amount.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className=" rounded-2xl mx-5 flex flex-col-reverse sm:flex-row-reverse gap-3 bg-linear-to-r from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-b-xl p-6">
              <Button
                onClick={loadNewOrders}
                disabled={processedOrders.length < orders.length}
                className="w-full sm:w-auto "
              >
                {processedOrders.length < orders.length
                  ? `Processing... (${processedOrders.length}/${orders.length})`
                  : "Load New Orders"}
              </Button>
              <Button
                onClick={() => setShowHistory(false)}
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-500 transition-all duration-300 font-medium"
              >
                Back to Current Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  } */

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Current Order Details */}
        <Card className="shadow-xl overflow-hidden">
          <CardHeader className="border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-2xl md:text-3xl dark:text-gray-100">
                  0001
                </CardTitle>
                <CardDescription className="text-indigo-100 dark:text-indigo-200 mt-1">
                  New Order - Awaiting Processing
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="w-fit bg-white text-indigo-600 dark:bg-gray-900 dark:text-indigo-400"
              >
                <Clock className="w-4 h-4 mr-1" />
                {new Date(firstCustomer?.assignedAt || "").toLocaleString()}
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
                      {firstCustomer?.name || "N/A"}
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
                      {firstCustomer?.phone || "N/A"}
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
                      {firstCustomer?.email || "N/A"}
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
                      {firstCustomer?.addresses || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-4">
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
                  <SelectItem value={"ORDER_PLACED"}>Order Placed</SelectItem>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Status
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderProcessingSystem;
