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

export enum UserAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export enum EntityType {
  Customer = "Customer",
  User = "User",
  Order = "Order",
  Product = "Product",
  Package = "Package",
  Role = "Role",
  Address = "Address",
}

export interface ActionEntityCount {
  action: UserAction;
  entityType: EntityType;
  count: number;
}

export interface UserActivityStatistics {
  byAction: Record<UserAction, number>;
  byEntityType: Record<EntityType, number>;
  byActionAndEntity: ActionEntityCount[];
}

const ActivityStats = () => {
  const { data, isLoading } = useGetAuditStatisticsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const stats = data?.data as UserActivityStatistics;
  if (isLoading) return <p>Loading statistics...</p>;

  const actionsData = Object.values(UserAction).map((action) => ({
    name: action,
    value: stats.byAction?.[action] ?? 0,
  }));

  const entitiesData = Object.values(EntityType).map((entity) => ({
    name: entity,
    value: stats.byEntityType?.[entity] ?? 0,
  }));

  const chartData = Object.values(EntityType).map((entity) => {
    const dataForEntity: any = { entity };
    Object.values(UserAction).forEach((action) => {
      const match = stats.byActionAndEntity.find(
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

  return (
    <div className="space-y-8 w-full">
      {/* Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Action Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actionsData.map((item) => (
            <Card key={item.name}>
              <CardContent className="text-2xl font-bold flex items-center justify-between w-full">
                <p className="text-sm text-gray-500"> {item.name}</p>
                {item.value}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Entities */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Entity Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {entitiesData.map((item) => (
            <Card key={item.name}>
              <CardContent className="text-2xl font-bold flex items-center justify-between w-full">
                <p className="text-sm text-gray-500"> {item.name}</p>
                {item.value}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>User Activity Statistics</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[500px]">
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
  );
};

export default ActivityStats;
