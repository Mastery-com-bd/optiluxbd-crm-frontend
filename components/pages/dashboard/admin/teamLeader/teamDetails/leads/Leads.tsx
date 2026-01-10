"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import CreateLeads from "./CreateLeads";
import LeadsTable from "./LeadsTable";

const Leads = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("All");
  const [show, setShow] = useState("10");

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

  return (
    <Card className="relative bg-white/5 rounded-3xl ">
      {/* top and bottom border section */}
      <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

      <div className=" px-5 space-y-5">
        {/* header section */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-lg font-medium">Team Leads</h1>
            <p className="text-sm font-medium text-text-secondary">
              Total 0 leads assigned to this team
            </p>
          </div>
          <CreateLeads />
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
              placeholder="Search customer by id"
            />
          </div>

          {/* dropdown */}
          <div className="flex items-center gap-7">
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
                      <span className="text-[14px]">
                        {" "}
                        {status === "All" ? "Status" : status}
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
                {["All", "BRONZE", "SILVER", "GOLD", "DIAMOND", "PLATINUM"].map(
                  (item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setStatus(item);
                        setFilters((prev) => ({
                          ...prev,
                          tire: item === "All" ? undefined : item === "Yes",
                          page: 1,
                        }));
                      }}
                      className={item === status ? "font-medium" : ""}
                    >
                      {item}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* content secion */}
        <LeadsTable />
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
      </div>
    </Card>
  );
};

export default Leads;
