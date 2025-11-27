"use client";

import {
  ArrowUp,
  CreditCard,
  Download,
  Plus,
  RefreshCw,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import DashboardHistoryModal from "./DashboardHistoryModal";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetOverviewReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";

const DashboardStats = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const { data, isLoading } = useGetOverviewReportsQuery(
    {
      startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const overview = data?.data;
  console.log(data);

  const salesData = [
    { month: "Jan", online: 1200, instore: 2100, projected: 3100 },
    { month: "Feb", online: 1400, instore: 2300, projected: 2800 },
    { month: "Mar", online: 1000, instore: 1900, projected: 2900 },
    { month: "Apr", online: 1300, instore: 2200, projected: 3000 },
    { month: "May", online: 1250, instore: 2050, projected: 2700 },
    { month: "Jun", online: 1350, instore: 2250, projected: 3000 },
    { month: "Jul", online: 1500, instore: 2450, projected: 3400 },
    { month: "Aug", online: 1100, instore: 1950, projected: 3100 },
    { month: "Sep", online: 1400, instore: 2300, projected: 2600 },
    { month: "Oct", online: 1300, instore: 2200, projected: 3500 },
    { month: "Nov", online: 1250, instore: 2100, projected: 2900 },
    { month: "Dec", online: 1450, instore: 2350, projected: 3300 },
  ];

  const salesDistribution = [
    { name: "Online Store", value: 35, color: "#6366f1" },
    { name: "Retail Stores", value: 28, color: "#8b5cf6" },
    { name: "B2B Revenue", value: 22, color: "#10b981" },
    { name: "Marketplace", value: 15, color: "#e5e7eb" },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "Alice Cooper",
      product: 'MacBook Pro 16"',
      amount: "$2,499",
      date: "Oct 27, 2025",
      status: "Delivered",
    },
    {
      id: "#ORD-2024-002",
      customer: "Bob Martin",
      product: "iPhone 15 Pro",
      amount: "$1,199",
      date: "Oct 27, 2025",
      status: "Processing",
    },
    {
      id: "#ORD-2024-003",
      customer: "Carol White",
      product: "AirPods Pro 2",
      amount: "$249",
      date: "Oct 26, 2025",
      status: "Shipped",
    },
    {
      id: "#ORD-2024-004",
      customer: "Dan Brown",
      product: "iPad Air M2",
      amount: "$599",
      date: "Oct 26, 2025",
      status: "Delivered",
    },
    {
      id: "#ORD-2024-005",
      customer: "Eva Green",
      product: "Apple Watch Ultra",
      amount: "$799",
      date: "Oct 25, 2025",
      status: "Processing",
    },
  ];

  const productInventory = [
    { name: "MacBook Pro", stock: 45, ratings: 4.8, price: "$2,499" },
    { name: "iPhone 15 Pro", stock: 123, ratings: 4.9, price: "$1,199" },
    { name: "iPad Air", stock: 67, ratings: 4.7, price: "$599" },
    { name: "AirPods Pro", stock: 234, ratings: 4.6, price: "$249" },
    { name: "Apple Watch", stock: 89, ratings: 4.8, price: "$399" },
  ];

  const topExecutives = [
    { name: "James Anderson", calls: 234, conversions: 89, rate: "38%" },
    { name: "Lisa Rodriguez", calls: 218, conversions: 95, rate: "44%" },
    { name: "Tom Harris", calls: 205, conversions: 78, rate: "38%" },
    { name: "Nina Patel", calls: 198, conversions: 82, rate: "41%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full mx-auto ">
      {/* Header */}
      {/* <div className="flex items-center justify-end pb-4">
        <DashboardHistoryModal />
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-6">
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overview?.agentPerformance?.summary?.totalOrders ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overview?.agentPerformance?.summary?.totalRevenue ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Revenue
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-teal-600 dark:text-teal-300" />
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overview?.productPerformance?.summary?.totalQuantitySold ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Quantity Sold
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overview?.courierPerformance?.summary?.totalShipments ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Shipment
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overview?.geographicDistribution?.summary?.totalLocations ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Location
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Sales Distribution Pie Chart */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Total Sales
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            You have 21 pending orders awaiting fulfillment.
          </p>

          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={salesDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {salesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {salesDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Sales Analytics Chart */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Sales Analytics
            </h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1">
              View Reports
              <ArrowUp className="w-4 h-4 rotate-45" />
            </button>
          </div>

          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-gray-600 dark:text-gray-300">
                Online Sales
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-gray-600 dark:text-gray-300">
                In-store Sales
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <span className="text-gray-600 dark:text-gray-300">
                Projected Sales
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0 dark:#374151"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="online" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="instore"
                fill="#e5e7eb dark:#4b5563"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#10b981", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Call Center Executives */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 mb-6 rounded-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Top Call Center Executives
          </h2>
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
            Live Performance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topExecutives.map((exec, index) => (
            <div
              key={index}
              className="group relative p-5 bg-linear-to-br from-indigo-50 dark:from-indigo-950 via-white dark:via-gray-800 to-purple-50 dark:to-purple-950 rounded-xl border border-indigo-100 dark:border-indigo-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Avatar className="w-10 h-10 shadow-md">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rank
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    #{index + 1}
                  </p>
                </div>
              </div>

              {/* Name */}
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-sm truncate">
                {exec.name}
              </h3>

              {/* Metrics */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Calls
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {exec.calls}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Conversions
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {exec.conversions}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Conv. Rate
                  </span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {exec.rate}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${parseInt(exec.rate)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Product Inventory */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Product Inventory
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600"
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Product
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Stock
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Ratings
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {productInventory.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                      {product.stock}
                    </td>
                    <td className="py-3 px-2 text-sm text-center">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {product.ratings}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">
                      {product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Recent Orders
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Order
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600"
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    {order.date}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {order.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
