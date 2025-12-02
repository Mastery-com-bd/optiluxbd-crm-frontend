"use client";
import {
  TProductPerformanceItem,
  TProductPerformence,
} from "@/types/report/productReportdataTypes";
import {
  Award,
  ClipboardList,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card } from "@/components/ui/card";

const ProductPerofrmence = ({
  profuctPerformance,
}: {
  profuctPerformance: TProductPerformence;
}) => {
  const summary = profuctPerformance?.summary;
  const products =
    (profuctPerformance?.topProducts as TProductPerformanceItem[]) || [];

  const totalMetrics = {
    totalRevenue: products.reduce((sum, p) => sum + p?.totalRevenue, 0),
    totalOrders: products.reduce((sum, p) => sum + p?.totalOrders, 0),
    totalQuantity: products.reduce((sum, p) => sum + p?.totalQuantitySold, 0),
    totalCommission: products.reduce(
      (sum, p) => sum + p?.totalCommissionPaid,
      0
    ),
    totalDelivered: products.reduce((sum, p) => sum + p?.deliveredOrders, 0),
    totalReturned: products.reduce((sum, p) => sum + p?.returnedOrders, 0),
  };

  // Revenue distribution by category
  const categoryRevenue = products.reduce((acc, product) => {
    const category = product?.productCategory;
    acc[category] = (acc[category] || 0) + product?.totalRevenue;
    return acc;
  }, {} as Record<string, number>);

  const revenueDistribution = Object.entries(categoryRevenue).map(
    ([name, value], index) => ({
      name,
      value: Math.round(value),
      percentage: ((value / totalMetrics.totalRevenue) * 100).toFixed(1),
      color: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][index % 5],
    })
  );

  // Top products by revenue for bar chart
  const topProductsByRevenue = [...products]
    .sort((a, b) => b?.totalRevenue - a?.totalRevenue)
    .slice(0, 6)
    .map((p) => ({
      name:
        p?.productName.length > 15
          ? p?.productName.substring(0, 15) + "..."
          : p?.productName,
      revenue: Math.round(p?.totalRevenue / 1000),
      orders: p?.totalOrders,
      quantity: p?.totalQuantitySold,
    }));

  // Performance metrics for radar chart
  const getPerformanceMetrics = (product: TProductPerformanceItem) => {
    const maxRevenue = Math.max(...products.map((p) => p?.totalRevenue));
    const maxOrders = Math.max(...products.map((p) => p?.totalOrders));
    const maxQuantity = Math.max(...products.map((p) => p?.totalQuantitySold));

    return [
      {
        metric: "Revenue",
        value: (product?.totalRevenue / maxRevenue) * 100,
      },
      {
        metric: "Orders",
        value: (product?.totalOrders / maxOrders) * 100,
      },
      {
        metric: "Quantity",
        value: (product?.totalQuantitySold / maxQuantity) * 100,
      },
      {
        metric: "Success Rate",
        value: parseFloat(product?.deliverySuccessRate),
      },
      {
        metric: "Customers",
        value:
          (product?.uniqueCustomers /
            Math.max(...products.map((p) => p?.uniqueCustomers))) *
          100,
      },
    ];
  };

  // Top 3 products for radar comparison
  const topThreeProducts = [...products]
    .sort((a, b) => b?.totalRevenue - a?.totalRevenue)
    .slice(0, 3);

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;
  };

  const getStatusBadge = (
    rate: string,
    type: "success" | "warning" | "danger"
  ) => {
    const value = parseFloat(rate);
    if (type === "success") {
      if (value >= 80) return "bg-green-100 text-green-800 border-green-200";
      if (value >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200";
      return "bg-red-100 text-red-800 border-red-200";
    } else if (type === "warning") {
      if (value <= 5) return "bg-green-100 text-green-800 border-green-200";
      if (value <= 15) return "bg-yellow-100 text-yellow-800 border-yellow-200";
      return "bg-red-100 text-red-800 border-red-200";
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const radarData = [
    "Revenue",
    "Orders",
    "Quantity",
    "Success Rate",
    "Customers",
  ].map((metric) => ({
    metric,
    product1:
      getPerformanceMetrics(topThreeProducts[0]).find(
        (m) => m.metric === metric
      )?.value ?? 0,
    product2:
      getPerformanceMetrics(topThreeProducts[1]).find(
        (m) => m.metric === metric
      )?.value ?? 0,
    product3:
      getPerformanceMetrics(topThreeProducts[2]).find(
        (m) => m.metric === metric
      )?.value ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
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
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        {/* Total Products */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalProducts ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Products
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        {/* Total Quantity Sold */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalQuantitySold ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Quantity Sold
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-300" />
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
              <DollarSign className="w-6 h-6 text-teal-600 dark:text-teal-300" />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-linear-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg">
                <DollarSign className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalMetrics.totalRevenue)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              From {totalMetrics.totalOrders} orders
            </p>
          </Card>

          <Card className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-purple-700 dark:text-purple-300" />
              </div>
              <Package className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Total Orders
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalMetrics.totalOrders}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {totalMetrics.totalQuantity} units sold
            </p>
          </Card>

          <Card className="bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
                <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Commission Paid
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalMetrics.totalCommission)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(
                (totalMetrics.totalCommission / totalMetrics.totalRevenue) *
                100
              ).toFixed(1)}
              % of revenue
            </p>
          </Card>

          <Card className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
                <Users className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
              <Package className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Delivery Status
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalMetrics.totalDelivered}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Delivered · {totalMetrics.totalReturned} returned
            </p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue Distribution Pie Chart */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Revenue by Category
              </h2>
              <span className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full">
                {revenueDistribution.length} Categories
              </span>
            </div>

            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ percentage }) => `${percentage}%`}
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {revenueDistribution.map((item, index) => (
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
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Products Bar Chart */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Top Products Performance
              </h2>
              {/* <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button> */}
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topProductsByRevenue}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  label={{
                    value: "Revenue (K)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "revenue") return [`৳${value}K`, "Revenue"];
                    return [value, name === "orders" ? "Orders" : "Quantity"];
                  }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  name="Revenue (K)"
                />
                <Bar
                  dataKey="orders"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
                <Bar
                  dataKey="quantity"
                  fill="#ec4899"
                  radius={[4, 4, 0, 0]}
                  name="Quantity"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Product Performance Radar Chart */}
        {topThreeProducts.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Top 3 Products - Comparative Performance
              </h2>
              <span className="text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full">
                Multi-Metric Analysis
              </span>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#9ca3af" }}
                />

                <Radar
                  name={topThreeProducts[0].productName}
                  dataKey="product1"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
                <Radar
                  name={topThreeProducts[1].productName}
                  dataKey="product2"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                <Radar
                  name={topThreeProducts[2].productName}
                  dataKey="product3"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.3}
                />

                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Detailed Product Table */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Complete Product Performance Details
            </h2>
            {/* <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400"
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
            </div> */}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Product Info
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Orders
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Quantity
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Delivered
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Returned
                  </th>
                  <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Commission
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Customers
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Success Rate
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Return Rate
                  </th>
                  <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Avg Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {product.productName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {product.productSKU}
                        </span>
                        <span className="mt-1 inline-block w-fit text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-0.5 rounded">
                          {product.productCategory}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {product.totalOrders}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {product.totalQuantitySold}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {product.deliveredOrders}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {product.returnedOrders}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {formatCurrency(product.totalRevenue)}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(product.totalCommissionPaid)}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {product.uniqueCustomers}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                          product.deliverySuccessRate,
                          "success"
                        )}`}
                      >
                        {product.deliverySuccessRate}%
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                          product.returnRate,
                          "warning"
                        )}`}
                      >
                        {product.returnRate}%
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                        {formatCurrency(parseFloat(product.averageOrderValue))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {products.slice(0, 3).map((product, index) => (
            <Card
              key={product.productId}
              className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block mb-2 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded">
                    #{index + 1} Top Product
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-1">
                    {product.productName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SKU: {product.productSKU}
                  </p>
                </div>
                <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Price
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(product.productPrice)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(product.totalRevenue)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Commission
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(product.totalCommissionPaid)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Top Agent ID
                  </span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    #{product.topAgentId}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Top Agent Sales
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {product.topAgentSales}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Top City
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {product.topSalesCity || "N/A"} ({product.topSalesCityCount}
                    )
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    Performance Score
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {(
                      (parseFloat(product.deliverySuccessRate) +
                        (100 - parseFloat(product.returnRate))) /
                      2
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{
                      width: `${
                        (parseFloat(product.deliverySuccessRate) +
                          (100 - parseFloat(product.returnRate))) /
                        2
                      }%`,
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPerofrmence;
