"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { TComboPackage } from "@/types/comboPackage";
import { debounce } from "@/utills/debounce";
import { Input } from "@/components/ui/input";
import { TPackageReportFIlter } from "../PackageReport";
import { Check } from "lucide-react";

const SearchPackageInput = ({
  reportFilter,
  setReportFilter,
}: {
  reportFilter: TPackageReportFIlter;
  setReportFilter: Dispatch<SetStateAction<TPackageReportFIlter>>;
}) => {
  const [showUserList, setShowUserList] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 5,
    page: 1,
  });
  const { data, isLoading } = useGetAllComboPackageQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const packages = data?.data?.packages as TComboPackage[];

  const handleSearch = async (val: string) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });
  return (
    <div className="w-full sm:w-1/2 relative">
      <Input
        type="text"
        placeholder="Search by package name or sku"
        value={filters.search}
        onChange={(e) => debouncedLog(e.target.value)}
        onFocus={() => setShowUserList(true)}
        onBlur={() => setTimeout(() => setShowUserList(false), 150)}
        className="w-full text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
      />
      {showUserList && filters.search.trim() && (
        <div className="absolute top-10 bg-gray-700 p-2 rounded-xl">
          {filters.search.trim() ? (
            isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : packages?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users found.</p>
            ) : (
              packages.map((comboPackage: TComboPackage) => (
                <div
                  key={comboPackage?.id}
                  onClick={() => {
                    const id = comboPackage?.id.toString();

                    if (selectedPackageId === id) {
                      setSelectedPackageId(null);
                      setReportFilter({ ...reportFilter, packageId: "" });
                      return;
                    }

                    setSelectedPackageId(id);
                    setReportFilter({ ...reportFilter, packageId: id });
                  }}
                  className={`flex items-center justify-between py-2 px-3 cursor-pointer transition rounded-md mb-1
                ${
                  selectedPackageId === comboPackage?.id.toString()
                    ? "bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-500"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                }
              `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {comboPackage?.name} ({comboPackage?.sku})
                      </p>
                    </div>
                  </div>

                  {selectedPackageId === comboPackage?.id.toString() && (
                    <Check className="text-green-600 w-5 h-5" />
                  )}
                </div>
              ))
            )
          ) : null}

          {showUserList && !packages?.length && (
            <div className="absolute top-full left-0 w-full mt-1 p-3 bg-white dark:bg-gray-800 shadow-lg border rounded-md text-sm text-gray-500">
              No combo package found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPackageInput;
