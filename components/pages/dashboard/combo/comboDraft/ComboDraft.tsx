"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { TComboPackage } from "@/types/comboPackage";
import { debounce } from "@/utills/debounce";
import { Funnel, Grid2X2, LayoutGrid, Search, Table } from "lucide-react";
import { useState } from "react";
import TableView from "../allCombo/TableView";
import CardView from "../allCombo/CardView";
import CombocardSkeleton from "../allCombo/CombocardSkeleton";
import PageHeader from "../../shared/pageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/ui/CustomPagination";

const ComboDraft = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [status, setStatus] = useState("all");
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [show, setShow] = useState("10");
  // get all combo
  const { data, isLoading } = useGetAllComboPackageQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const comboPackages = data?.data?.packages as TComboPackage[];
  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };
  const [inputValue, setInputValue] = useState("");
  const [tabulerView, setTabulerView] = useState(true);

  const handleSearch = async (val: string) => {
    setFilters({ ...filters, search: val });
  };
  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  if (isLoading) {
    return <CombocardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-4 w-full px-4">
      {/* header section */}
      <div>
        {/* <h1 className="text-3xl font-semibold">Draft Combo Packs</h1>
        <p className="text-[#A1A1A1] leading-5">
          Browse and manage your complete product catalog
        </p> */}
        <PageHeader
          title="Draft Combo Packs"
          description="Browse and manage your complete product catalog"
        />
      </div>

      {/* filtyer section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="flex  gap-3 items-center">
          <Input
            className="w-64 text-sm bg-transparent"
            value={inputValue}
            icon={<Search />}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search combo by name"
          />
          <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
            <Funnel size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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

      {tabulerView ? (
        <div className="flex justify-center">
          <TableView packages={comboPackages} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-8">
            {comboPackages.map((item, i) => (
              <CardView key={i} item={item} />
            ))}
          </div>
        </div>
      )}

      <CustomPagination
        currentPage={pagination.page}
        totalPages={10}
        onPageChange={(page) => setFilters({ ...filters, page })}
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ComboDraft;
