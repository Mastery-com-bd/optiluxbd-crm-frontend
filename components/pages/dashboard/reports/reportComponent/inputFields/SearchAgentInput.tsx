"use client";

import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user/user.types";
import { debounce } from "@/utills/debounce";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TAgentReportFilter } from "../AgentReport";
import Image from "next/image";
import { Check } from "lucide-react";

const SearchAgentInput = ({
  reportFilter,
  setReportFilter,
}: {
  reportFilter: TAgentReportFilter;
  setReportFilter: Dispatch<SetStateAction<TAgentReportFilter>>;
}) => {
  const [showUserList, setShowUserList] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 5,
    page: 1,
    role: "AGENT",
  });
  const { data, isLoading } = useGetAllUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const agents = data?.data as TUser[];
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
        placeholder="Search by agent name or id"
        ref={inputRef}
        value={filters.search}
        onChange={(e) => debouncedLog(e.target.value)}
        onFocus={() => setShowUserList(true)}
        className="w-full text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
      />
      {showUserList && filters.search.trim() && (
        <div
          ref={dropdownRef}
          className="absolute top-10 bg-gray-700 p-2 rounded-xl"
        >
          {filters.search.trim() ? (
            isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : agents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users found.</p>
            ) : (
              agents.map((user: TUser) => (
                <div
                  key={user?.id}
                  onClick={() => {
                    const id = user?.id.toString();

                    if (selectedAgentId === id) {
                      setSelectedAgentId(null);
                      setReportFilter({ ...reportFilter, agentId: "" });
                      return;
                    }

                    setSelectedAgentId(id);
                    setReportFilter({ ...reportFilter, agentId: id });
                  }}
                  className={`flex items-center justify-between py-2 px-3 cursor-pointer transition rounded-md mb-1
              ${
                selectedAgentId === user?.id.toString()
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
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {user?.name} ({user?.userId})
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {selectedAgentId === user.id.toString() && (
                    <Check className="text-green-600 w-5 h-5" />
                  )}
                </div>
              ))
            )
          ) : null}

          {showUserList && !agents?.length && (
            <div className="absolute top-full left-0 w-full mt-1 p-3 bg-white dark:bg-gray-800 shadow-lg border rounded-md text-sm text-gray-500">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAgentInput;
