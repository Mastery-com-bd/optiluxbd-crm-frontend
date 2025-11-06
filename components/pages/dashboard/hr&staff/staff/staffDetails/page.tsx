"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  DollarSign,
  Edit2,
  Eye,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Jan", calls: 65, duration: 45, customers: 24 },
  { month: "Feb", calls: 78, duration: 52, customers: 32 },
  { month: "Mar", calls: 92, duration: 61, customers: 45 },
  { month: "Apr", calls: 85, duration: 58, customers: 38 },
  { month: "May", calls: 110, duration: 72, customers: 52 },
  { month: "Jun", calls: 125, duration: 85, customers: 61 },
  { month: "Jul", calls: 118, duration: 80, customers: 58 },
  { month: "Aug", calls: 135, duration: 92, customers: 68 },
  { month: "Sep", calls: 142, duration: 98, customers: 75 },
  { month: "Oct", calls: 155, duration: 105, customers: 82 },
  { month: "Nov", calls: 168, duration: 115, customers: 90 },
  { month: "Dec", calls: 180, duration: 125, customers: 98 },
];

const customerInteractions = [
  {
    id: 1,
    customerName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    calls: 5,
    lastCall: "2 hours ago",
    status: "Active",
    orders: 3,
    totalSpent: "$1,250",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0124",
    calls: 8,
    lastCall: "1 day ago",
    status: "Active",
    orders: 5,
    totalSpent: "$2,840",
  },
  {
    id: 3,
    customerName: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1-555-0125",
    calls: 3,
    lastCall: "3 days ago",
    status: "Inactive",
    orders: 1,
    totalSpent: "$450",
  },
  {
    id: 4,
    customerName: "Emily Davis",
    email: "emily.d@email.com",
    phone: "+1-555-0126",
    calls: 12,
    lastCall: "30 mins ago",
    status: "Active",
    orders: 8,
    totalSpent: "$4,120",
  },
  {
    id: 5,
    customerName: "David Wilson",
    email: "d.wilson@email.com",
    phone: "+1-555-0127",
    calls: 6,
    lastCall: "5 hours ago",
    status: "Active",
    orders: 4,
    totalSpent: "$1,890",
  },
];

// Mock new order data
const newOrderData = {
  orderId: "ORD-2024-001",
  orderDate: "2024-01-15",
  status: "New",
  total: 1250.0,
  items: [
    { name: "Premium Headphones", quantity: 2, price: 199.99 },
    { name: "Wireless Mouse", quantity: 1, price: 79.99 },
    { name: "USB-C Hub", quantity: 1, price: 49.99 },
  ],
  customer: {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1-555-0199",
    address: "123 Main St, New York, NY 10001",
  },
  shipping: {
    method: "Express Delivery",
    estimatedDelivery: "2024-01-17",
  },
};

export default function StaffDetailPage() {
  const params = useParams();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [newOrderPopup, setNewOrderPopup] = useState(false); // Start with popup open for demo
  const id = params.id;

  if (!id) {
    return <div>Invalid Staff ID</div>;
  }

  // Mock data - in real app, fetch based on params.id
  const executive = {
    id,
    name: "Sophia Carter",
    designation: "Senior Call Executive",
    email: "sophia.carter@crm.com",
    phone: "+1-555-0100",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    joinedDate: "2017",
    location: "New York, NY",
    department: "Sales",
    manager: "Emily Carter",
    businessType: "Premium Call Center",
    support: "support@crm.com",
    website: "www.crm.com",
    totalCalls: 1234,
    avgCallDuration: 8.5,
    customersContacted: 856,
    successRate: 87.5,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background p-4 md:p-8">
      {/* New Order Modal/Popup */}
      {newOrderPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      New Order Received
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Order #{newOrderData.orderId}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNewOrderPopup(false)}
                  className="hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Order Status Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {newOrderData.status}
                </span>
              </div>

              {/* Customer Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">
                        {newOrderData.customer.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">
                        {newOrderData.customer.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold text-foreground">
                        {newOrderData.customer.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-semibold text-foreground flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      {newOrderData.customer.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {newOrderData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground dark:text-gray-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground dark:text-gray-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Shipping Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Shipping Method
                    </p>
                    <p className="font-semibold text-foreground">
                      {newOrderData.shipping.method}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Delivery
                    </p>
                    <p className="font-semibold text-foreground">
                      {newOrderData.shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-foreground dark:text-gray-100">
                      Total Amount
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${newOrderData.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setNewOrderPopup(false)}
                  className="flex-1"
                >
                  View Full Details
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setNewOrderPopup(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {executive.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {executive.designation}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setNewOrderPopup(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Popup</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push(`/dashboard/hr&staff/staff/${id}/orderProcess`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">New Route</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <img
                src={executive.avatar || "/placeholder.svg"}
                alt={executive.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-center text-foreground mb-1">
                {executive.name}
              </h2>
              <p className="text-sm text-center text-muted-foreground mb-6">
                Since {executive.joinedDate}
              </p>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Manager</p>
                    <p className="font-semibold text-foreground">
                      {executive.manager}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Business Type
                    </p>
                    <p className="font-semibold text-foreground">
                      {executive.businessType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Support</p>
                    <p className="font-semibold text-foreground">
                      {executive.support}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="font-semibold text-foreground">
                      {executive.website}
                    </p>
                  </div>
                </div>
              </div>

              <Textarea
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-3 resize-none"
                rows={4}
              />
              <Button className="w-full">Send Message</Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Calls
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {executive.totalCalls}
                    </p>
                  </div>
                  <Phone className="w-10 h-10 text-blue-500 opacity-20" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Avg Duration
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {executive.avgCallDuration}m
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Customers
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {executive.customersContacted}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-purple-500 opacity-20" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {executive.successRate}%
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-orange-500 opacity-20" />
                </div>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Performance Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calls" fill="#3b82f6" name="Calls" />
                  <Bar
                    dataKey="duration"
                    fill="#10b981"
                    name="Duration (min)"
                  />
                  <Bar dataKey="customers" fill="#f59e0b" name="Customers" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Customer Interactions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Customer Interactions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Calls
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Last Call
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Orders
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Total Spent
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerInteractions.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium text-foreground">
                          {customer.customerName}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {customer.email}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {customer.phone}
                        </td>
                        <td className="py-3 px-4 text-foreground font-semibold">
                          {customer.calls}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {customer.lastCall}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              customer.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-foreground font-semibold">
                          {customer.orders}
                        </td>
                        <td className="py-3 px-4 text-foreground font-semibold">
                          {customer.totalSpent}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit2 className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
