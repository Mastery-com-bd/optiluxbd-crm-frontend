"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/user/user.types";
import { debounce } from "@/utills/debounce";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type TStatsFilter = {
  entityType: string;
  userId: string;
  startDate: string;
  endDate: string;
};

interface Props {
  statsFilters: TStatsFilter;
  setStatsFilters: React.Dispatch<React.SetStateAction<TStatsFilter>>;
}

const ActivityStatsFilter = ({ setStatsFilters, statsFilters }: Props) => {
  const [filters, setFilters] = useState({
    search: "",
    limit: 5,
  });
  // get alll users
  const { data, isLoading } = useGetAllUsersQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const users = data?.data as TUser[];

  const [entityType, setEntityType] = useState("All");
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSearch = async (val: string) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  const handleReset = () => {
    setStatsFilters({
      entityType: "",
      userId: "",
      startDate: "",
      endDate: "",
    });
    setFilters({
      search: "",
      limit: 5,
    });
    setEntityType("All");
    setShowUserList(false);
    setSelectedUserId(null);
  };

  return (
    <Card className="bg-card text-card-foreground border shadow-sm p-4 flex">
      <div className="flex lg:flex-row flex-col items-end justify-between gap-4">
        {/* search user */}
        <div className="w-full sm:w-1/2 relative">
          <Input
            type="text"
            placeholder="Search by name"
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
                ) : users.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No users found.
                  </p>
                ) : (
                  users.map((user: TUser) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        const id = user.id.toString();

                        if (selectedUserId === id) {
                          setSelectedUserId(null);
                          setStatsFilters({ ...statsFilters, userId: "" });
                          return;
                        }

                        setSelectedUserId(id);
                        setStatsFilters({ ...statsFilters, userId: id });
                      }}
                      className={`flex items-center justify-between py-2 px-3 cursor-pointer transition rounded-md mb-1
              ${
                selectedUserId === user.id.toString()
                  ? "bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-500"
                  : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }
            `}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            user.avatar_secure_url ||
                            "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&q=80&w=687"
                          }
                          alt={user.name}
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

                      {selectedUserId === user.id.toString() && (
                        <Check className="text-green-600 w-5 h-5" />
                      )}
                    </div>
                  ))
                )
              ) : null}

              {showUserList && !users?.length && (
                <div className="absolute top-full left-0 w-full mt-1 p-3 bg-white dark:bg-gray-800 shadow-lg border rounded-md text-sm text-gray-500">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
        {/* start date */}
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <Input
            type="date"
            value={
              statsFilters.startDate ? statsFilters.startDate.split("T")[0] : ""
            }
            max={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
            onChange={(e) => {
              const date = e.target.value;
              const iso = date ? `${date}T00:00:00Z` : "";
              setStatsFilters((prev) => ({ ...prev, startDate: iso, page: 1 }));
            }}
          />
        </div>
        {/* End Date */}
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            End Date
          </label>

          <Input
            type="date"
            value={
              statsFilters.endDate ? statsFilters.endDate.split("T")[0] : ""
            }
            max={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
            onChange={(e) => {
              const date = e.target.value;
              const iso = date ? `${date}T23:59:59Z` : "";
              setStatsFilters((prev) => ({ ...prev, endDate: iso, page: 1 }));
            }}
          />
        </div>
        {/*  filter by entity */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
            >
              {entityType === "All" ? "Filter by entity" : entityType}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <DropdownMenuItem
              onClick={() => {
                setEntityType("All");
                setStatsFilters((prev) => ({
                  ...prev,
                  entityType: "",
                  page: 1,
                }));
              }}
              className={entityType === "All" ? "font-medium" : ""}
            >
              All
            </DropdownMenuItem>
            {["Customer", "User", "Order", "Product", "Test"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => {
                  setEntityType(item);
                  setStatsFilters((prev) => ({
                    ...prev,
                    entityType: item === "All" ? "" : item,
                    page: 1,
                  }));
                }}
                className={item === entityType ? "font-medium" : ""}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="cursor-pointer" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default ActivityStatsFilter;
