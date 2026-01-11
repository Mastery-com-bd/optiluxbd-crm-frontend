"use client";

import { ChevronDown, Funnel, Grid2X2, Search, Upload } from "lucide-react";
import AddLeadsModal from "./AddLeadsModal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { debounce } from "@/utills/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import AssignLeadsTable from "../../teamLeader/assignleades/AssignLeadsTable";
import PageHeader from "../../../shared/pageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/ui/CustomPagination";

const AllLeads = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [inputValue, setInputValue] = useState("");
  const [tag, setTag] = useState("All");
  const [priority, setPriority] = useState("All");
  const [show, setShow] = useState("10");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [isGridView, setIsGridView] = useState(false);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <PageHeader title="All Leads" description="Manage, filter, and assign your leads." />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddLeadsModal />
        </div>
      </div>

      {/* filter section */}
      <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
        <div className="flex  gap-3 items-center">
          <Input
            className="w-64 text-sm bg-transparent"
            value={inputValue}
            icon={<Search />}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search product by name"
          />
          <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
            <Funnel size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setFilters((prev) => ({
                ...prev,
                category: value === "all" ? undefined : value,
                page: 1,
              }));
            }}
          >
            <SelectTrigger className="w-40" aria-label="Category Filter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {["high", "medium", "low"]?.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setFilters((prev) => ({
                ...prev,
                status: value === "all" ? undefined : value,
                page: 1,
              }));
            }}
          >
            <SelectTrigger className="w-36" aria-label="Status Filter">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="default"
            className="rounded-full  cursor-pointer text-2xl effect size-10"
            onClick={() => setIsGridView((prev) => !prev)}
          >
            <Grid2X2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* all leads table */}
      <AssignLeadsTable />

      <CustomPagination
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => setFilters({ ...filters, page })}
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </div>
  );
};

export default AllLeads;
