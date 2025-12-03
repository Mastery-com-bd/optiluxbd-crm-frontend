"use client";

import { useGetReminderStatisticsQuery } from "@/redux/features/reminders/reminderApi";
import { TReminderStats } from "@/types/reminderTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Calendar,
  XCircle,
  BarChart3,
} from "lucide-react";
import ReminderSummarySkeleton from "./ReminderSummarySkeleton";

const ReminderStatistics = () => {
  const { data, isLoading } = useGetReminderStatisticsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const stats = data?.data as TReminderStats;

  if (isLoading) {
    return <ReminderSummarySkeleton />;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {/* Total Reminders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Reminders
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total}</div>
          <p className="text-xs text-muted-foreground">All reminders</p>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.pending}</div>
          <p className="text-xs text-muted-foreground">Awaiting action</p>
        </CardContent>
      </Card>

      {/* Today's Reminders */}
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Today&apos;s Reminders
          </CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.todayReminders}</div>
          <p className="text-xs text-muted-foreground">Scheduled for today</p>
          {stats?.todayReminders > 0 && (
            <Badge className="absolute top-1 right-3" variant="secondary">
              Today
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Overdue */}
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overdue
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.overdueCount}</div>
          <p className="text-xs text-muted-foreground">Missed reminders</p>
          {stats?.overdueCount > 0 && (
            <Badge variant="destructive" className="absolute top-1 right-3">
              Attention
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Completed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completed
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.completed}</div>
          <p className="text-xs text-muted-foreground">Done</p>
        </CardContent>
      </Card>

      {/* Cancelled */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Cancelled
          </CardTitle>
          <XCircle className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.cancelled}</div>
          <p className="text-xs text-muted-foreground">Cancelled</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderStatistics;
