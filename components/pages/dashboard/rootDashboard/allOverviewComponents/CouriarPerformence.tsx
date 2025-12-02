"use client";

import { Card } from "@/components/ui/card";
import {
  ICourierPerformanceItem,
  TCouriarperformanceType,
} from "@/types/overAllReport/couriarPerformanceType";
import {
  AlertCircle,
  Award,
  CheckCircle,
  DollarSign,
  Package,
  RotateCcw,
  TrendingUp,
  Truck,
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

const CouriarPerformence = ({
  couriarPerformance,
}: {
  couriarPerformance: TCouriarperformanceType;
}) => {
  const summary = couriarPerformance?.summary;
  const couriers =
    (couriarPerformance?.services as ICourierPerformanceItem[]) || [];

  const totalMetrics = {
    totalShipments: couriers.reduce(
      (sum, c) => sum + (c?.totalShipments || 0),
      0
    ),
    deliveredShipments: couriers.reduce(
      (sum, c) => sum + (c?.deliveredShipments || 0),
      0
    ),
    pendingShipments: couriers.reduce(
      (sum, c) => sum + (c?.pendingShipments || 0),
      0
    ),
    returnedShipments: couriers.reduce(
      (sum, c) => sum + (c?.returnedShipments || 0),
      0
    ),
    cancelledShipments: couriers.reduce(
      (sum, c) => sum + (c?.cancelledShipments || 0),
      0
    ),
    totalCODAmount: couriers.reduce(
      (sum, c) => sum + (c?.totalCODAmount || 0),
      0
    ),
    totalDeliveryCharge: couriers.reduce(
      (sum, c) => sum + (c?.totalDeliveryCharge || 0),
      0
    ),
  };

  // Pie Chart Data with Percentage
  const totalShipments = totalMetrics.totalShipments || 1;
  const shipmentStatusData = [
    {
      name: "Delivered",
      value: totalMetrics.deliveredShipments,
      color: "#10b981",
    },
    { name: "Pending", value: totalMetrics.pendingShipments, color: "#f59e0b" },
    {
      name: "Returned",
      value: totalMetrics.returnedShipments,
      color: "#ef4444",
    },
    {
      name: "Cancelled",
      value: totalMetrics.cancelledShipments,
      color: "#6b7280",
    },
  ].filter((d) => d.value > 0);

  const pieDataWithPercentage = shipmentStatusData.map((item) => ({
    ...item,
    percentage: ((item.value / totalShipments) * 100).toFixed(1),
  }));

  // Bar Chart: Top 6 Couriers by Total Shipments
  const topCouriersForBar = [...couriers]
    .sort((a, b) => b?.totalShipments - a?.totalShipments)
    .slice(0, 6)
    .map((c) => ({
      name:
        c?.courierService.length > 14
          ? c?.courierService.substring(0, 14) + "..."
          : c?.courierService,
      delivered: c?.deliveredShipments,
      pending: c?.pendingShipments,
      returned: c?.returnedShipments,
      cancelled: c?.cancelledShipments,
    }));

  // Radar Chart: Top 3 Couriers Comparison
  const topThree = [...couriers]
    .sort((a, b) => b?.totalShipments - a?.totalShipments)
    .slice(0, 3);

  const maxValues = {
    shipments: Math.max(...couriers.map((c) => c?.totalShipments), 1),
    delivered: Math.max(...couriers.map((c) => c?.deliveredShipments), 1),
    cod: Math.max(...couriers.map((c) => c?.totalCODAmount), 1),
  };

  const getRadarScore = (courier: ICourierPerformanceItem) => [
    {
      metric: "Shipments",
      value: (courier?.totalShipments / maxValues.shipments) * 100,
    },
    {
      metric: "Delivered",
      value: (courier?.deliveredShipments / maxValues.delivered) * 100,
    },
    { metric: "Success Rate", value: parseFloat(courier?.deliverySuccessRate) },
    { metric: "Low Return", value: 100 - parseFloat(courier?.returnRate) },
    {
      metric: "COD Value",
      value: (courier?.totalCODAmount / maxValues.cod) * 100,
    },
  ];

  const radarData = [
    "Shipments",
    "Delivered",
    "Success Rate",
    "Low Return",
    "COD Value",
  ].map((metric) => ({
    metric,
    [topThree[0]?.courierService || "C1"]: topThree[0]
      ? getRadarScore(topThree[0]).find((m) => m.metric === metric)?.value || 0
      : 0,
    [topThree[1]?.courierService || "C2"]: topThree[1]
      ? getRadarScore(topThree[1]).find((m) => m.metric === metric)?.value || 0
      : 0,
    [topThree[2]?.courierService || "C3"]: topThree[2]
      ? getRadarScore(topThree[2]).find((m) => m.metric === metric)?.value || 0
      : 0,
  }));

  const formatCurrency = (amount: number) =>
    `৳${amount.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;

  const getStatusBadge = (rate: string, type: "success" | "warning") => {
    const value = parseFloat(rate);
    if (type === "success") {
      if (value >= 90)
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      if (value >= 70)
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400";
    }
    if (type === "warning") {
      if (value <= 5)
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      if (value <= 10)
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400";
    }
    return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const overallSuccessRate =
    totalShipments > 0
      ? ((totalMetrics.deliveredShipments / totalShipments) * 100).toFixed(1)
      : "0.0";
  const overallReturnRate =
    totalShipments > 0
      ? ((totalMetrics.returnedShipments / totalShipments) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {/* Total Couriers */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalCouriers ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Couriers
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Truck className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        {/* Total Shipments */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalShipments ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Shipments
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        {/* Total Delivered */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalDelivered ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Delivered
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </Card>

        {/* Total Returned */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalReturned ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Returned
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          {/* Gradient Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-linear-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg">
                  <Truck className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Shipments
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {totalMetrics.totalShipments}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Across {couriers.length} services
              </p>
            </Card>

            <Card className="bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                </div>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Delivery Success
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {overallSuccessRate}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {totalMetrics.deliveredShipments} delivered
              </p>
            </Card>

            <Card className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                </div>
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Return Rate
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {overallReturnRate}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {totalMetrics.returnedShipments} returned
              </p>
            </Card>

            <Card className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-700 dark:text-purple-300" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Delivery Charges
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(totalMetrics.totalDeliveryCharge)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                COD: {formatCurrency(totalMetrics.totalCODAmount)}
              </p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Pie Chart */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Shipment Status Distribution
                </h2>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full">
                  {couriers.length} Services
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieDataWithPercentage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ percentage }) => `${percentage}%`}
                  >
                    {pieDataWithPercentage.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => v} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {pieDataWithPercentage.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
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

            {/* Bar Chart */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Top Courier Performance
                </h2>
                {/* <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button> */}
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topCouriersForBar}>
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
                    dataKey="delivered"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Delivered"
                  />
                  <Bar
                    dataKey="pending"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    name="Pending"
                  />
                  <Bar
                    dataKey="returned"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    name="Returned"
                  />
                  <Bar
                    dataKey="cancelled"
                    fill="#6b7280"
                    radius={[4, 4, 0, 0]}
                    name="Cancelled"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Radar Chart */}
          {topThree.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Top 3 Couriers - Comparative Performance
                </h2>
                <span className="text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full">
                  Multi-Metric Analysis
                </span>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {topThree.map((c, i) => (
                    <Radar
                      key={i}
                      name={c.courierService}
                      dataKey={c.courierService}
                      stroke={
                        i === 0 ? "#6366f1" : i === 1 ? "#8b5cf6" : "#ec4899"
                      }
                      fill={
                        i === 0 ? "#6366f1" : i === 1 ? "#8b5cf6" : "#ec4899"
                      }
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Detailed Table */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Complete Courier Performance Details
              </h2>
              {/* <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Courier
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Total
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Delivered
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Pending
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Returned
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Cancelled
                    </th>
                    <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      COD
                    </th>
                    <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Charge
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Success
                    </th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Return Rate
                    </th>
                    <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Avg Charge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {couriers.map((c, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-3">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {c.courierService}
                          </div>
                          <div className="text-xs text-gray-500">
                            Top City: {c.topDeliveryCity || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="text-center font-semibold">
                        {c.totalShipments}
                      </td>
                      <td className="text-center text-green-600 font-semibold">
                        {c.deliveredShipments}
                      </td>
                      <td className="text-center text-amber-600">
                        {c.pendingShipments}
                      </td>
                      <td className="text-center text-red-600">
                        {c.returnedShipments}
                      </td>
                      <td className="text-center text-gray-600">
                        {c.cancelledShipments}
                      </td>
                      <td className="text-right font-bold">
                        {formatCurrency(c.totalCODAmount)}
                      </td>
                      <td className="text-right text-emerald-600">
                        {formatCurrency(c.totalDeliveryCharge)}
                      </td>
                      <td className="text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                            c.deliverySuccessRate,
                            "success"
                          )}`}
                        >
                          {c.deliverySuccessRate}%
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                            c.returnRate,
                            "warning"
                          )}`}
                        >
                          {c.returnRate}%
                        </span>
                      </td>
                      <td className="text-right text-purple-600">
                        {formatCurrency(parseFloat(c.averageDeliveryCharge))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Top 3 Insight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {couriers.slice(0, 3).map((c, i) => (
              <Card
                key={i}
                className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded">
                      #{i + 1} Top Courier
                    </span>
                    <h3 className="font-bold text-base mt-2">
                      {c.courierService}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Division: {c.topDeliveryDivision || "N/A"}
                    </p>
                  </div>
                  <Truck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Total Shipments</span>
                    <span className="font-bold">{c.totalShipments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">COD Collected</span>
                    <span className="font-bold text-indigo-600">
                      {formatCurrency(c.totalCODAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="text-emerald-600">
                      {formatCurrency(c.totalDeliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Return Reason</span>
                    <span className="text-purple-600">
                      {c.topReturnReason || "N/A"} ({c.topReturnReasonCount})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Charge</span>
                    <span>
                      {formatCurrency(parseFloat(c.averageDeliveryCharge))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top City</span>
                    <span>
                      {c.topDeliveryCity || "N/A"} ({c.topDeliveryCityCount})
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Performance Score</span>
                    <span className="font-bold text-indigo-600">
                      {(
                        (parseFloat(c.deliverySuccessRate) +
                          (100 - parseFloat(c.returnRate))) /
                        2
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{
                        width: `${
                          (parseFloat(c.deliverySuccessRate) +
                            (100 - parseFloat(c.returnRate))) /
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
    </div>
  );
};

export default CouriarPerformence;
