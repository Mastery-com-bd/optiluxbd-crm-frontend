"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { useState } from "react";
import AssignLeadsToTeam from "./AssignLeadsToTeam";
import { ChevronDown, Search } from "lucide-react";
import { debounce } from "@/utills/debounce";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AssignLeadsTable from "./AssignLeadsTable";

const Assignleades = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
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
    <section className=" bg-transparent text-foreground space-y-5 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Leads Assignment</h1>
          <p className="text-[#A1A1A1] leading-5">
            Manage, filter, and assign your leads.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <div className="bg-transparent flex items-center px-3 py-1.5 rounded-2xl border border-brand">
              <h1 className="flex items-center gap-1 text-sm">
                Selected Leads <span>{selectedLeads.length}</span>
              </h1>
            </div>
          </LiquidGlass>
          <AssignLeadsToTeam selectedLeads={selectedLeads} />
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
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
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
              className="bg-white/5 backdrop-blur-2xl"
            >
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
                  className={item === tag ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* status dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
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
              className="bg-white/5 backdrop-blur-2xl"
            >
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
                  className={item === priority ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AssignLeadsTable
        selectedLeads={selectedLeads}
        setSelectedLeads={setSelectedLeads}
      />
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-6">
          <p className="text-sm text-[#7E7E7E]">
            Showing 1 to 10 of 10 entries
          </p>
          {/* status drodpown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">Show {show}</span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl"
            >
              {["10", "20", "30", "40", "50"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setShow(item);
                    setFilters((prev) => ({
                      ...prev,
                      limit: Number(item),
                      page: 1,
                    }));
                  }}
                  className={item === show ? "font-medium" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default Assignleades;
