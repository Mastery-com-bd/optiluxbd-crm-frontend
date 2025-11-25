/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAuditStatisticsQuery } from "@/redux/features/audit/statistics/auditStatisticsApi";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  EntityType,
  UserAction,
  UserActivityStatistics,
} from "@/types/auditStats.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ActivityStatsFilter from "./ActivityStatsFilter";
import ActivityStatsSkeleton from "./ActivityStatsSkeleton";

const ActivityStats = () => {
  const [filters, setFilters] = useState({
    entityType: "",
    userId: "",
    startDate: "",
    endDate: "",
  });
  // get all stats
  const { data, isLoading } = useGetAuditStatisticsQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const stats = data?.data as UserActivityStatistics;
  const actionsData = Object.values(UserAction).map((action) => ({
    name: action,
    value: stats?.byAction?.[action] ?? 0,
  }));

  const entitiesData = Object.values(EntityType).map((entity) => ({
    name: entity,
    value: stats?.byEntityType?.[entity] ?? 0,
  }));

  const chartData = Object.values(EntityType).map((entity) => {
    const dataForEntity: any = { entity };
    Object.values(UserAction).forEach((action) => {
      const match = stats?.byActionAndEntity.find(
        (ae) => ae.entityType === entity && ae.action === action
      );
      dataForEntity[action] = match ? match.count : 0;
    });
    return dataForEntity;
  });

  const colors: Record<UserAction, string> = {
    CREATE: "#facc15", // yellow
    UPDATE: "#3b82f6", // blue
    DELETE: "#ef4444", // red
    LOGIN: "#10b981", // green
    LOGOUT: "#8b5cf6", // purple
  };

  if (isLoading) return <ActivityStatsSkeleton />;

  return (
    <div className="py-4 space-y-2 w-full">
      <ActivityStatsFilter
        statsFilters={filters}
        setStatsFilters={setFilters}
      />
      <Tabs defaultValue="Action Stats" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="Action Stats">Action Stats</TabsTrigger>
          <TabsTrigger value="Entity Type Stats">Entity Type Stats</TabsTrigger>
        </TabsList>

        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          {/* LEFT SIDE: CARDS BASED ON TAB */}
          <div className="space-y-3">
            {/* ACTION CARDS */}
            <TabsContent
              value="Action Stats"
              className="lg:space-y-2 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-2 lg:gap-0"
            >
              {actionsData.map((item) => (
                <Card key={item.name}>
                  <CardContent className="text-2xl font-bold flex items-center justify-between gap-2 ">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.name}
                    </p>
                    <p>{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* ENTITY CARDS */}
            <TabsContent value="Entity Type Stats" className="space-y-2">
              {entitiesData.map((item) => (
                <Card key={item.name}>
                  <CardContent className="text-2xl font-bold flex items-center justify-between gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.name}
                    </p>
                    {item.value}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>

          {/* RIGHT SIDE: ALWAYS SAME */}
          <div className="w-full">
            <Card className="p-4 w-full ">
              <CardHeader>
                <CardTitle>User Activity Statistics</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-[500px] ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="entity"
                      angle={-30}
                      textAnchor="end"
                      interval={0}
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />

                    {Object.values(UserAction).map((action) => (
                      <Bar
                        key={action}
                        dataKey={action}
                        fill={colors[action]}
                        name={action}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ActivityStats;
