"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { TComboPackage } from "@/types/comboPackage";
import { debounce } from "@/utills/debounce";
import { Funnel, LayoutGrid, Search, Table } from "lucide-react";
import { useState } from "react";
import TableView from "../allCombo/TableView";
import CardView from "../allCombo/CardView";
import CombocardSkeleton from "../allCombo/CombocardSkeleton";
import CustomPagination from "@/components/ui/CustomPagination";

const ComboDraft = () => {
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
        <h1 className="text-3xl font-semibold">Draft Combo Packs</h1>
        <p className="text-[#A1A1A1] leading-5">
          Browse and manage your complete product catalog
        </p>
      </div>

      {/* filtyer section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className=" w-full flex items-center gap-3">
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
              placeholder="Search product by name"
            />
          </div>

          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="12px">
            <Button className=" w-9 h-9 p-2.5 rounded-[12px] bg-transparent cursor-pointer">
              <Funnel size={16} />
            </Button>
          </LiquidGlass>
        </div>
        {/* view button table or grid */}
        <LiquidGlass
          glowIntensity="xs"
          shadowIntensity="xs"
          borderRadius="48px">
          <Button
            onClick={() => setTabulerView(!tabulerView)}
            variant="ghost"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-[48px] border-none cursor-pointer bg-transparent">
            {tabulerView ? <LayoutGrid /> : <Table />}
          </Button>
        </LiquidGlass>
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

export default ComboDraft;
