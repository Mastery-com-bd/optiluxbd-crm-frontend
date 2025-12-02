"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user/user.types";
import { debounce } from "@/utills/debounce";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Check } from "lucide-react";
import { THourlyReport } from "./HourlyTeamreport";

const LeaderList = ({
  reportFilter,
  setReportFilter,
  field,
}: {
  reportFilter: THourlyReport;
  setReportFilter: Dispatch<SetStateAction<THourlyReport>>;
  field: string;
}) => {
  const [showUserList, setShowUserList] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
    role: "TEAM_LEADER",
  });
  const { data, isLoading } = useGetAllUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const teams = data?.data as TUser[];

  const handleSearch = async (val: string) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowUserList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full sm:w-1/2 relative">
      <Input
        type="text"
        placeholder="Search by team leader name or id"
        ref={inputRef}
        value={filters.search}
        onChange={(e) => debouncedLog(e.target.value)}
        onFocus={() => setShowUserList(true)}
        className="w-full text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
      />
      {showUserList && (
        <div
          ref={dropdownRef}
          className="absolute top-10 bg-gray-700 p-2 rounded-xl"
        >
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : teams.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : (
            teams.map((user: TUser) => (
              <div
                key={user.id}
                onMouseDown={() => {
                  const id = user.id.toString();
                  if (selectedLeaderId === id) {
                    setSelectedLeaderId(null);
                    if (field === "teamLeaderId") {
                      setReportFilter({
                        ...reportFilter,
                        teamLeaderId: "",
                      });
                      return;
                    }
                    if (field === "leaderId") {
                      setReportFilter({
                        ...reportFilter,
                        leaderId: "",
                      });
                      return;
                    }
                  } else {
                    setSelectedLeaderId(id);
                    if (field === "teamLeaderId") {
                      setReportFilter({ ...reportFilter, teamLeaderId: id });
                    } else {
                      setReportFilter({ ...reportFilter, leaderId: id });
                    }
                  }
                }}
                className={`flex items-center justify-between py-1 px-2 cursor-pointer transition rounded-md border border-red-600
                ${
                  selectedLeaderId === user.id.toString()
                    ? "bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-500"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      user?.avatar_secure_url ||
                      "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&q=80&w=687"
                    }
                    alt={user?.name}
                    width={200}
                    height={200}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-900 dark:text-gray-100">
                      {user?.name} ({user?.userId})
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {selectedLeaderId === user.id.toString() && (
                  <Check className="text-green-600 w-5 h-5" />
                )}
              </div>
            ))
          )}

          {showUserList && !teams?.length && (
            <div className="absolute top-full left-0 w-full mt-1 p-3 bg-white dark:bg-gray-800 shadow-lg border rounded-md text-sm text-gray-500">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaderList;
