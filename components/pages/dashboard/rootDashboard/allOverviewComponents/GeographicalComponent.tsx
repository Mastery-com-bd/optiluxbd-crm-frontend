"use client";

import { Card } from "@/components/ui/card";
import {
  IGeographicDistributionItem,
  TGeographicPerformance,
} from "@/types/overAllReport/geographicOerformance";
import {
  AlertCircle,
  Award,
  ClipboardList,
  CheckCircle,
  DollarSign,
  MapPin,
  TrendingUp,
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
} from "recharts";

const GeographicalComponent = ({
  geographicDistribution,
}: {
  geographicDistribution: TGeographicPerformance;
}) => {
  const summary = geographicDistribution?.summary;
  const locations =
    (geographicDistribution?.topLocations as IGeographicDistributionItem[]) ||
    [];

  const totalMetrics = locations.reduce(
    (acc, loc) => ({
      totalOrders: acc.totalOrders + loc.totalOrders,
      deliveredOrders: acc.deliveredOrders + loc.deliveredOrders,
      returnedOrders: acc.returnedOrders + loc.returnedOrders,
      totalRevenue: acc.totalRevenue + loc.totalRevenue,
    }),
    { totalOrders: 0, deliveredOrders: 0, returnedOrders: 0, totalRevenue: 0 }
  );

  const overallSuccessRate =
    totalMetrics.totalOrders > 0
      ? (
          (totalMetrics.deliveredOrders / totalMetrics.totalOrders) *
          100
        ).toFixed(1)
      : "0.0";

  const overallReturnRate =
    totalMetrics.totalOrders > 0
      ? (
          (totalMetrics.returnedOrders / totalMetrics.totalOrders) *
          100
        ).toFixed(1)
      : "0.0";

  const avgOrderValue =
    totalMetrics.totalOrders > 0
      ? (totalMetrics.totalRevenue / totalMetrics.totalOrders).toFixed(0)
      : "0";

  // Format Currency
  const formatCurrency = (amount: number) =>
    `৳${amount.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;

  // Pie Chart: Order Status Distribution
  const pieData = [
    {
      name: "Delivered",
      value: totalMetrics.deliveredOrders,
      color: "#10b981",
    },
    { name: "Returned", value: totalMetrics.returnedOrders, color: "#ef4444" },
    {
      name: "In Transit/Pending",
      value:
        totalMetrics.totalOrders -
        totalMetrics.deliveredOrders -
        totalMetrics.returnedOrders,
      color: "#f59e0b",
    },
  ].filter((item) => item.value > 0);

  const pieDataWithPercent = pieData.map((item) => ({
    ...item,
    percentage:
      totalMetrics.totalOrders > 0
        ? ((item.value / totalMetrics.totalOrders) * 100).toFixed(1)
        : "0.0",
  }));

  // Bar Chart: Top 8 Locations by Orders
  const topLocationsByOrders = [...locations]
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, 8)
    .map((loc) => ({
      name:
        loc.city === "Unknown"
          ? "Other/Unknown"
          : loc.city.length > 12
          ? loc.city.substring(0, 12) + "..."
          : loc.city,
      orders: loc.totalOrders,
      revenue: Math.round(loc.totalRevenue / 1000), // in thousands
      aov: parseFloat(loc.averageOrderValue),
    }));

  // Top 5 Revenue Generating Locations
  const topRevenueLocations = [...locations]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {/* Total Locations */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalLocations ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Locations
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
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
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {overallSuccessRate}%
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Delivery Success
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
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
        {/* Gradient Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-linear-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg">
                <MapPin className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Orders
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalMetrics.totalOrders}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Across {locations.length} locations
            </p>
          </Card>

          <Card className="bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
              </div>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Delivery Success
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {overallSuccessRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {totalMetrics.deliveredOrders} delivered
            </p>
          </Card>

          <Card className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Return Rate
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {overallReturnRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {totalMetrics.returnedOrders} returned
            </p>
          </Card>

          <Card className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-700 dark:text-purple-300" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg Order Value
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(Number(avgOrderValue))}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              From {totalMetrics.totalOrders} orders
            </p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Pie Chart */}
          <Card className="bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Order Status Distribution
              </h2>
              <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full">
                All Locations
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieDataWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {pieDataWithPercent.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => v} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {pieDataWithPercent.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Bar Chart - Top Locations */}
          <Card className="bg-white dark:bg-gray-800 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Top Performing Locations
              </h2>
              {/* <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button> */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topLocationsByOrders}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="orders"
                  fill="#6366f1"
                  name="Orders"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#10b981"
                  name="Revenue (k)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Revenue Locations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topRevenueLocations.map((loc, i) => (
            <Card
              key={i}
              className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded">
                    #{i + 1} Revenue Leader
                  </span>
                  <h3 className="font-bold text-base mt-2">
                    {loc.city === "Unknown" ? "Other Areas" : loc.city}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {loc.division} • {loc.thana}
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-bold">{loc.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-bold text-purple-600">
                    {formatCurrency(loc.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AOV</span>
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(Number(loc.averageOrderValue))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span
                    className={`font-bold ${
                      parseFloat(loc.deliverySuccessRate) >= 80
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {loc.deliverySuccessRate}%
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Top Courier</span>
                  <span className="font-medium text-indigo-600">
                    {loc.topCourierService || "N/A"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Table */}
        <Card className="bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              All Locations Performance Details
            </h2>
            {/* <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </Button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">
                    Location
                  </th>
                  <th className="text-center py-3 px-4">Orders</th>
                  <th className="text-center py-3 px-4">Delivered</th>
                  <th className="text-center py-3 px-4">Returned</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">AOV</th>
                  <th className="text-center py-3 px-4">Success %</th>
                  <th className="text-center py-3 px-4">Top Courier</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">
                          {loc.city === "Unknown" ? "Other" : loc.city}
                        </div>
                        <div className="text-xs text-gray-500">
                          {loc.division} • {loc.thana}
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      {loc.totalOrders}
                    </td>
                    <td className="text-center text-green-600">
                      {loc.deliveredOrders}
                    </td>
                    <td className="text-center text-red-600">
                      {loc.returnedOrders}
                    </td>
                    <td className="text-right font-bold text-purple-600">
                      {formatCurrency(loc.totalRevenue)}
                    </td>
                    <td className="text-right text-emerald-600">
                      {formatCurrency(Number(loc.averageOrderValue))}
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          parseFloat(loc.deliverySuccessRate) >= 80
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {loc.deliverySuccessRate}%
                      </span>
                    </td>
                    <td className="text-center text-indigo-600 text-xs">
                      {loc.topCourierService || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeographicalComponent;
