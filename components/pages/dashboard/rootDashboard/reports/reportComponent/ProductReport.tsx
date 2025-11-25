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
  console.log(report);
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
    return <h1>loading</h1>;
  }
  return (
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
          <Button variant="destructive" className="px-4" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
