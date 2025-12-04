"use client";

import { Card } from "@/components/ui/card";
import {
  Order,
  TAgentPerformanceType,
} from "@/types/overAllReport/agentPerformanceType";
import { ArrowUp, ClipboardList, Coins, DollarSign, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "@/components/ui/tooltip";

const AgentPerformence = ({
  agentPerformance,
}: {
  agentPerformance: TAgentPerformanceType;
}) => {
  const summary = agentPerformance?.summary;
  const topAgents = agentPerformance?.topAgents || [];

  const calculateSalesDistribution = () => {
    const categoryMap: { [key: string]: number } = {};
    let totalSales = 0;

    topAgents.forEach((agent) => {
      agent?.orders.forEach((order) => {
        // Handle both product and package data
        const categoryName =
          order?.product?.subCategory?.category?.name ||
          (order?.package ? "Packages" : "Uncategorized");
        const amount = parseFloat(order?.totalAmount);
        categoryMap[categoryName] = (categoryMap[categoryName] || 0) + amount;
        totalSales += amount;
      });
    });

    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
    return Object.entries(categoryMap).map(([name, value], index) => ({
      name,
      value: totalSales > 0 ? Math.round((value / totalSales) * 100) : 0,
      color: colors[index % colors.length],
    }));
  };

  // Calculate monthly sales data from orders
  const calculateMonthlySales = () => {
    const monthlyData: {
      [key: string]: { online: number; instore: number; projected: number };
    } = {};

    topAgents.forEach((agent) => {
      agent.orders.forEach((order) => {
        const date = new Date(order?.orderDate);
        const monthKey = date.toLocaleString("default", { month: "short" });
        const amount = parseFloat(order?.totalAmount) / 1000; // Scale down for chart

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { online: 0, instore: 0, projected: 0 };
        }

        // Assuming all orders are online for this example
        monthlyData[monthKey].online += amount;
        monthlyData[monthKey].projected = monthlyData[monthKey].online * 1.1;
      });
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months
      .map((month) => ({
        month,
        online: Math.round(monthlyData[month]?.online || 0),
        instore: Math.round(monthlyData[month]?.instore || 0),
        projected: Math.round(monthlyData[month]?.projected || 0),
      }))
      .filter((data) => data.online > 0 || data.instore > 0);
  };

  // Get unique products from all orders
  const getProductInventory = () => {
    const itemMap: {
      [key: string]: {
        name: string;
        totalStock: number;
        price: string;
        type: "product" | "package";
      };
    } = {};

    topAgents.forEach((agent) => {
      agent.orders.forEach((order) => {
        // Handle products
        if (order?.product) {
          const productId = `product-${order.product.id}`;
          if (!itemMap[productId]) {
            itemMap[productId] = {
              name: order.product.name,
              totalStock: 0,
              price: order.product.price,
              type: "product",
            };
          }
          itemMap[productId].totalStock += order.quantity;
        }

        // Handle packages
        if (order?.package) {
          const packageId = `package-${order.package.id}`;
          if (!itemMap[packageId]) {
            itemMap[packageId] = {
              name: order.package.name,
              totalStock: 0,
              price: order.package.packagePrice,
              type: "package",
            };
          }
          itemMap[packageId].totalStock += order.quantity;
        }
      });
    });

    return Object.values(itemMap).map((item) => ({
      name: item.name,
      stock: item.totalStock,
      ratings: (4.0 + Math.random()).toFixed(1),
      price: `৳${parseFloat(item.price).toFixed(2)}`,
      type: item.type,
    }));
  };

  // Get recent orders from all agents
  const getRecentOrders = () => {
    const allOrders: Order[] = [];
    topAgents.forEach((agent) => {
      allOrders.push(...agent?.orders);
    });

    return allOrders
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )
      .slice(0, 5)
      .map((order) => ({
        id: `#ORD-${order?.id.toString().padStart(4, "0")}`,
        customer: order?.customer?.name,
        date: new Date(order?.orderDate).toLocaleDateString(),
        amount: `৳${parseFloat(order?.totalAmount).toFixed(2)}`,
        status:
          order?.courier?.status ||
          (order?.quantity > 0 ? "Pending" : "Unknown"),
      }));
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("delivered") || statusLower.includes("complete"))
      return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
    if (statusLower.includes("pending") || statusLower.includes("processing"))
      return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    if (statusLower.includes("cancel"))
      return "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
    if (statusLower.includes("return"))
      return "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
    return "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const salesDistribution = calculateSalesDistribution();
  const salesData = calculateMonthlySales();
  const productInventory = getProductInventory();
  const recentOrders = getRecentOrders();

  // Calculate total pending orders
  const totalPendingOrders = topAgents.reduce(
    (sum, agent) => sum + agent.pendingOrders,
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {/* Total Agents */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalAgents ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Agents
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        {/* Total Orders */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalOrders ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalRevenue.toFixed(2) ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Revenue
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
          </div>
        </Card>

        {/* Total Commission */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalCommission.toFixed(2) ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Commission
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Coins className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Total Sales
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You have {totalPendingOrders} pending orders awaiting fulfillment.
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
                      {item?.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item?.value}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
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
                  stroke="#f0f0f0"
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
                <Bar dataKey="instore" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
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
            {topAgents.map((agent, index) => (
              <div
                key={agent.agentId}
                className="group relative p-5 bg-linear-to-br from-indigo-50 dark:from-indigo-950 via-white dark:via-gray-800 to-purple-50 dark:to-purple-950 rounded-xl border border-indigo-100 dark:border-indigo-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Avatar className="w-10 h-10 shadow-md">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.agentName}`}
                    />
                    <AvatarFallback>
                      {getInitials(agent.agentName)}
                    </AvatarFallback>
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
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm truncate">
                  {agent?.agentName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
                  {agent?.agentEmail}
                </p>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Orders
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {agent?.totalOrders}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Delivered
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {agent?.deliveredOrders}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Delivery Rate
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {agent?.deliveryRate}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sales Amount
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      ৳{agent?.totalSalesAmount.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Commission
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ৳{agent?.totalCommission.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Avg Order Value
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      ৳{parseFloat(agent?.averageOrderValue).toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${parseFloat(agent.deliveryRate)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Product Inventory
              </h2>
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
                        {product?.name}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                        {product?.stock}
                      </td>
                      <td className="py-3 px-2 text-sm text-center">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-amber-500">★</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {product?.ratings}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">
                        {product?.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Recent Orders
              </h2>
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
                        {order?.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
                          order?.status
                        )}`}
                      >
                        {order?.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {order?.customer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                      {order?.date}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {order?.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformence;