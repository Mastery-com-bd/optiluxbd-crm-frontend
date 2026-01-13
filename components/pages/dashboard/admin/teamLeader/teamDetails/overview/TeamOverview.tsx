"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, Phone, Target, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import OverviewChart from "./OverviewChart";

const TeamOverview = () => {
  const [year, setYear] = useState("2025");

  return (
    <div className="space-y-4">
      {/* card section */}
      <div className="flex items-center gap-5">
        {/* first card */}
        <Card className="effect flex flex-row px-4 w-full relative rounded-3xl overflow-hidden">
          <TrendingUp
            size={100}
            className="text-[rgba(5,223,114,0.10)] absolute top-6 right-10"
          />

          {/* icon*/}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(0,201,80,0.20)_0%,rgba(0,166,62,0.20)_100%)] rounded-xl border border-[rgba(0,201,80,0.40)] flex items-center justify-center">
            <span>
              <TrendingUp className="text-[#05DF72]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Conversion Rate</p>
            <h1 className="text-3xl">68.5%</h1>
          </div>
        </Card>

        {/* second card */}
        <Card className="effect flex flex-row px-4 w-full relative rounded-3xl">
          <Phone
            size={70}
            className="text-[rgba(81,162,255,0.20)] absolute top-6 right-12"
          />

          {/* icon */}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(43,127,255,0.20)_0%,rgba(21,93,252,0.20))] rounded-xl border border-[rgba(43,127,255,0.30)] flex items-center justify-center">
            <span>
              <TrendingUp className="text-[#51A2FF]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Calls This Month</p>
            <h1 className="text-3xl">892</h1>
          </div>
        </Card>

        {/* third card */}
        <Card className="effect flex flex-row px-4 w-full relative rounded-3xl">
          <Target
            size={70}
            className="text-[rgba(194,122,255,0.10)] absolute top-6 right-12"
          />

          {/* icon */}
          <div className="h-10 w-10 p-1 bg-[linear-gradient(135deg,rgba(173,70,255,0.20)_0%,rgba(152,16,250,0.20)_100%)] rounded-xl border border-[rgba(173,70,255,0.30)] flex items-center justify-center">
            <span>
              <Target className="text-[#C27AFF]" />
            </span>
          </div>

          {/* text */}
          <div>
            <p className="text-sm text-[#B1B1B1] ">Todat`s Target</p>
            <h1 className="text-3xl">98%</h1>
          </div>
        </Card>
      </div>

      {/* chart section */}
      <Card className="effect w-full h-full relative rounded-3xl pb-4 ">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl pt-4">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-xl font-semibold">Team Performance</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="focus:outline-none">
                <button className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent">
                  <p className="flex items-center gap-2 text-brand">
                    <span className="text-[14px]"> {year}</span>
                    <ChevronDown size={18} />
                  </p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="text-gray-100 bg-white/5 backdrop-blur-2xl"
              >
                {["2024", "2023", "2022", "2021", "2020"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => {
                      setYear(item);
                      //   setFilters((prev) => ({
                      //     ...prev,
                      //     is_featured: item === "All" ? undefined : item === "Yes",
                      //     page: 1,
                      //   }));
                    }}
                    className={item === year ? "font-medium" : ""}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-end px-4 gap-8">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[rgba(143,207,185,1)]" />{" "}
              <span className="text-sm font-medium">Conversion Rate</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />{" "}
              <span className="text-sm font-medium">Call</span>
            </p>
          </div>
          <OverviewChart />
        </div>
      </Card>
    </div>
  );
};

export default TeamOverview;
