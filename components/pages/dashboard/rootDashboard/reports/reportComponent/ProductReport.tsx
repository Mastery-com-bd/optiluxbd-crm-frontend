/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetProductsReportsQuery } from "@/redux/features/report&analytics/reportAndAnalyticsApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SearchProductFields from "./inputFields/SearchProductFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductReportSkeleton from "./reportSkeleton/ProductReportSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TProductPerformance } from "@/types/report/productReportdataTypes";

// COLORS (auto‑cycled)
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f7f",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
];

export type TProductReportFilter = {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  category: string;
  productId: string;
};
const ProductReport = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [startDate, setStartDate] = useState<Date>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date>(today);
  const [category, setCategory] = useState("all");

  const [filters, setFilters] = useState({
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
    category: "",
    productId: "",
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (!startDate || !endDate) return;

      setFilters((prev: any) => ({
        ...prev,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),

        page: 1,
      }));
    });
  }, [startDate, endDate]);

  const { data, isLoading } = useGetProductsReportsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const report = data?.data;
  const products = (report?.data as TProductPerformance[]) || [];
  const revenueData = products.map((p) => ({
    name: p.productName,
    value: p.totalRevenue,
  }));

  // Orders Bar Chart Data
  const orderData = products.map((p) => ({
    name: p.productName.slice(0, 10) + "...",
    orders: p.totalOrders,
  }));
  const resetFilters = () => {
    setFilters({
      sortBy: "created_at",
      order: "desc",
      limit: 10,
      page: 1,
      startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
      category: "",
      productId: "",
    });
    setStartDate(firstDayOfMonth);
    setEndDate(today);
    setCategory("All");
  };

  if (isLoading) {
    return <ProductReportSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <SearchProductFields
            reportFilter={filters}
            setReportFilter={setFilters}
          />
          <div>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setFilters((prev) => ({
                  ...prev,
                  category: value === "all" ? "" : value,
                  page: 1,
                }));
              }}
            >
              <SelectTrigger className="w-40" aria-label="Category Filter">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Home & Office">Home & Office</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Toys">Toys</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(startDate, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date: any) => date && setStartDate(date)}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(endDate, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date: any) => date && setEndDate(date)}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-transparent">Reset</label>
            <Button
              variant="destructive"
              className="px-4"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-900 dark:text-white">
            {report?.reportType}
          </p>
          <p className="flex flex-col space-y-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {format(new Date(report?.period.startDate), "yyyy-MM-dd")} →{" "}
              {format(new Date(report?.period.endDate), "yyyy-MM-dd")}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Order
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalOrders}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Product
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalProducts}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Quantity SOld
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalQuantitySold}
            </p>
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                  bg-white dark:bg-gray-900 
                  border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {report?.summary?.totalRevenue}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution (Pie Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full ">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders Per Product (Bar Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <BarChart data={orderData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders">
                    {orderData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        {/* TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Comm. Paid</TableHead>
                    <TableHead>Success %</TableHead>
                    <TableHead>Return %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.productId}>
                      <TableCell>{p.productName}</TableCell>
                      <TableCell>{p.productCategory}</TableCell>
                      <TableCell>{p.totalOrders}</TableCell>
                      <TableCell>{p.totalQuantitySold}</TableCell>
                      <TableCell>{p.totalRevenue.toFixed(2)}</TableCell>
                      <TableCell>{p.totalCommissionPaid.toFixed(2)}</TableCell>
                      <TableCell>{p.deliverySuccessRate}%</TableCell>
                      <TableCell>{p.returnRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductReport;
