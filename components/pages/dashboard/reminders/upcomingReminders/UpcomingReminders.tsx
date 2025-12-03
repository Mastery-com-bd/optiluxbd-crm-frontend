"use client";

import { Badge } from "@/components/ui/badge";
import { useGetUpcomingReminderQuery } from "@/redux/features/reminders/reminderApi";
import { IReminder } from "@/types/reminderTypes";
import { useState } from "react";
import ReminderTableSkeleton from "../allReminders/ReminderTableSkeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { convertDate } from "@/utills/dateConverter";
import Link from "next/link";

const UpcomingReminders = () => {
  const [filters, setFilters] = useState({
    withinMinutes: 60,
  });
  const { data, isLoading } = useGetUpcomingReminderQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  const reminders = (data?.data?.data as IReminder[]) || [];
  console.log(data);
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getNotificationStatus = (isNotified: boolean) => {
    return isNotified ? (
      <Badge variant="outline" className="text-green-700 border-green-700">
        Notified
      </Badge>
    ) : (
      <Badge variant="outline" className="text-orange-700 border-orange-700">
        Pending
      </Badge>
    );
  };
  if (isLoading) {
    return <ReminderTableSkeleton />;
  }
  return (
    <div className=" rounded-2xl shadow p-6 space-y-6 ">
      <Table>
        <TableCaption>A list of upcoming and past reminders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Remind At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notification</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No reminders found
              </TableCell>
            </TableRow>
          ) : (
            reminders.map((reminder) => (
              <TableRow key={reminder?.id}>
                <TableCell className="font-medium">
                  {/* <Link
                      href={`/dashboard/reminders/customer/${reminder?.customer?.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {reminder?.customer?.name}
                    </Link> */}
                  {reminder?.customer?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {reminder?.customer?.customerId}
                </TableCell>
                <TableCell>{reminder?.customer?.phone || "-"}</TableCell>
                <TableCell
                  className="max-w-xs truncate"
                  title={reminder?.title}
                >
                  {reminder?.title}
                </TableCell>
                <TableCell className="flex flex-col ">
                  <span>
                    {" "}
                    {convertDate(new Date(reminder?.remindAt)).creationDate}
                  </span>
                  <span>
                    {convertDate(new Date(reminder?.remindAt)).creationTime}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(reminder?.status)}>
                    {reminder?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getNotificationStatus(reminder?.isNotified)}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/reminders/${reminder?.id}`}>
                    <Button size="sm">
                      <span className="cursor-pointer ">View</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpcomingReminders;
