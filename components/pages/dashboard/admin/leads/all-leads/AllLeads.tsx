"use client";

import { ChevronDown, Search, Upload } from "lucide-react";
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
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import AssignLeadsTable from "../../teamLeader/assignleades/AssignLeadsTable";
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

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">All Leads</h1>
          <p className="text-[#A1A1A1] leading-5">
            Manage, filter, and assign your leads.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddLeadsModal />
        </div>
      </div>

      {/* filter section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2  "
          />
          <Input
            className="px-10 py-1.5 w-64 text-sm bg-transparent"
            value={inputValue}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search Agent by name or ID"
          />
        </div>

        {/* dropdown */}
        <div className="flex items-center gap-8">
          {/* tag drodpown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px">
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent">
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {tag === "All" ? "Tag" : tag}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl">
              {["All", "Hot", "Warm", "Cold"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setTag(item);
                    setFilters((prev) => ({
                      ...prev,
                      tag: item === "All" ? undefined : item,
                      page: 1,
                    }));
                  }}
                  className={item === tag ? "font-medium" : ""}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* priority dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px">
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent">
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {priority === "All" ? "Priority" : priority}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl">
              {["All", "High", "Medium", "Low"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setPriority(item);
                    setFilters((prev) => ({
                      ...prev,
                      priority: item === "All" ? undefined : item,
                      page: 1,
                    }));
                  }}
                  className={item === priority ? "font-medium" : ""}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className={`relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden`}>
            {/* Button text */}
            <p className="flex items-center gap-2">
              <Upload size={18} />
              <span className="text-sm">Export</span>
            </p>

            {/* top and bottom line */}
            <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

            {/* bottom yellow glow line */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <CornerGlowSvg />
          </button>
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
