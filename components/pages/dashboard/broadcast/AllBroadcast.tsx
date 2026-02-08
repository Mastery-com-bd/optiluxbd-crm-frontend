"use client";

import { TBroadcast } from "@/types/broadcast.types";
import PageHeader from "../shared/pageHeader";
import { broadcastTableColumn } from "./BroadcastTableColumn";
import CustomPagination from "@/components/ui/CustomPagination";
import TableComponent from "@/components/ui/CustomTableComponent";
import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Download, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import YellowSVGForButton from "@/components/svgIcon/YellowSVGForButton";

const AllBroadcast = ({ broadcasts }: { broadcasts: TBroadcast[] }) => {
  const [show, setShow] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const column = broadcastTableColumn();

  const handleChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    router.push(`${pathName}`);
    setShow("10");
    setCurrentPage(1);
    setStatus("All");
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full px-4">
      {/* header */}
      <div>
        <PageHeader
          title="All the boradcasts"
          description="This is all the boradcast till now from the system"
        />
      </div>

      {/* filter section */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            handleChange("status", value);
          }}
        >
          <SelectTrigger className="w-40" aria-label="Category Filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {["unread", "read"].map((item, i) => (
              <SelectItem key={i} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <ButtonComponent
            icon={Download}
            buttonName="Export"
            varient="yellow"
          />
          <button
            type="button"
            onClick={handleReset}
            className="relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden"
          >
            {/* top and bottom line */}
            <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />

            {/* Button text */}
            <p className="flex items-center gap-2">
              <RotateCcw />
              <span className="text-sm">Reset</span>
            </p>

            {/* Variant effects */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <div className="pointer-events-none">
              <YellowSVGForButton />
            </div>
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <TableComponent data={broadcasts} columns={column} />

      {/* Pagination */}
      <CustomPagination
        totalPage={2}
        show={show}
        currentPage={currentPage}
        setShow={setShow}
        setCurrentPage={setCurrentPage}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AllBroadcast;
