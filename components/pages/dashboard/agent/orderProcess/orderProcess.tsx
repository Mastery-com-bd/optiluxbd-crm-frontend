"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
  AlertCircle,
  CheckCircle,
  Clock,
  Copy,
  Mail,
  MapPin,
  Package,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  product: string;
  quantity: number;
  amount: number;
  orderDate: string;
  notes: string;
  status: string;
}

// Mock data generator
const generateMockOrders = (count = 10) => {
  const products = [
    "Wireless Headphones",
    "Smart Watch",
    "Laptop Stand",
    "USB-C Hub",
    "Mechanical Keyboard",
    "Mouse Pad",
    "Phone Case",
    "Tablet",
    "Monitor",
    "Webcam",
  ];
  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
  ];
  const firstNames = [
    "Ahmed",
    "Fatima",
    "Karim",
    "Nadia",
    "Rahim",
    "Sadia",
    "Jamal",
    "Ayesha",
    "Farhan",
    "Zara",
  ];
  const lastNames = [
    "Khan",
    "Rahman",
    "Ali",
    "Chowdhury",
    "Hossain",
    "Islam",
    "Ahmed",
    "Begum",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `ORD-${Date.now()}-${i + 1}`,
    orderNumber: `#${10000 + i + 1}`,
    customerName: `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    } ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    phone: `+880 1${Math.floor(Math.random() * 900000000 + 100000000)}`,
    email: `customer${i + 1}@example.com`,
    address: `${Math.floor(Math.random() * 999 + 1)}, ${
      cities[Math.floor(Math.random() * cities.length)]
    }, Bangladesh`,
    product: products[Math.floor(Math.random() * products.length)],
    quantity: Math.floor(Math.random() * 3 + 1),
    amount: Math.floor(Math.random() * 5000 + 1000),
    orderDate: new Date(
      Date.now() - Math.floor(Math.random() * 86400000)
    ).toISOString(),
    notes:
      Math.random() > 0.5
        ? "Please deliver before 5 PM"
        : "Call before delivery",
    status: "",
  }));
};

const OrderProcessingSystem = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedOrders, setProcessedOrders] = useState<Order[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const loadNewOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setProcessedOrders([]);
      setOrders([]);
      const newOrders = generateMockOrders(10);
      setOrders(newOrders);
      setCurrentIndex(0);
      setShowHistory(false);
      setLoading(false);
    }, 800);
  };

  if (orders.length === 0) {
    const newOrders = generateMockOrders(10);
    setOrders(newOrders);
    setLoading(false);
  }

  const handleStatusUpdate = (status: string) => {
    setProcessing(true);

    setTimeout(() => {
      const currentOrder = orders[currentIndex];
      const processedOrder = {
        ...currentOrder,
        status,
        processedAt: new Date().toISOString(),
      };

      setProcessedOrders((prev) => [...prev, processedOrder]);

      if (currentIndex < orders.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowHistory(true);
      }

      setProcessing(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
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
  };

  if (loading) {
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

  if (showHistory) {
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
                disabled={processedOrders.length < 10}
                className="w-full sm:w-auto "
              >
                {processedOrders.length < 10
                  ? `Processing... (${processedOrders.length}/10)`
                  : "Load 10 New Orders"}
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
  }

  const currentOrder = orders[currentIndex];

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Progress Bar */}
        <Card className="shadow-lg lg:flex-row">
          <CardHeader className="py-0 w-full lg:w-1/3">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Processing Progress
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Track your order processing progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Order {currentIndex + 1} of {orders.length}
              </span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {Math.round(((currentIndex + 1) / orders.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / orders.length) * 100}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Order Details */}
        <Card className="shadow-xl overflow-hidden">
          <CardHeader className="border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-2xl md:text-3xl dark:text-gray-100">
                  {currentOrder.orderNumber}
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
                {new Date(currentOrder.orderDate).toLocaleString()}
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
                      {currentOrder.customerName}
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
                      {currentOrder.phone}
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
                      {currentOrder.email}
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
                      {currentOrder.address}
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
                      {currentOrder.product}
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
                      {currentOrder.quantity}
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
                      ৳{currentOrder.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            {currentOrder.notes && (
              <Alert className="dark:bg-gray-900 dark:border-gray-700">
                <AlertCircle className="h-4 w-4 dark:text-gray-400" />
                <AlertDescription className="dark:text-gray-300">
                  <strong className="dark:text-gray-200">Note:</strong>{" "}
                  {currentOrder.notes}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-900 py-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
              Select order status:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              <Button
                onClick={() => handleStatusUpdate("confirmed")}
                disabled={processing}
                className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm
              </Button>
              <Button
                onClick={() => handleStatusUpdate("canceled")}
                disabled={processing}
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={() => handleStatusUpdate("fake")}
                disabled={processing}
                className="bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-700 dark:hover:bg-orange-600"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Fake
              </Button>
              <Button
                onClick={() => handleStatusUpdate("duplicate")}
                disabled={processing}
                className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-700 dark:hover:bg-yellow-600"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
            </div>
            {processedOrders.length > 0 && (
              <Button
                onClick={() => setShowHistory(true)}
                variant="outline"
                className="w-full mt-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                View Processed Orders ({processedOrders.length})
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderProcessingSystem;
