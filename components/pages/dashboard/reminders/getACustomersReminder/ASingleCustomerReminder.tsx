"use client";

import { useGetCustomerReminderQuery } from "@/redux/features/reminders/reminderApi";
import { IReminder } from "@/types/reminderTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ASingleCustomerReminderSkeleton from "./ASingleCustomerReminderSkeleton";

const ASingleCustomerReminder = ({ id }: { id: string }) => {
  const filters = {
    allUsers: false,
  };
  const { data, isLoading } = useGetCustomerReminderQuery(
    { filters, id },
    { refetchOnMountOrArgChange: false }
  );
  const reminders = data?.data as IReminder[];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "PPP 'at' p");
  };

  const getStatusBadge = (status: string, isNotified: boolean) => {
    if (isNotified) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Notified
        </Badge>
      );
    }

    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "COMPLETED":
        return <Badge variant="default">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <ASingleCustomerReminderSkeleton />;
  }

  if (!reminders || reminders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reminders found.
      </div>
    );
  }

  return (
    <div className="rounded-md border p-6">
      <Table>
        <TableCaption>Customer reminders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Remind At</TableHead>
            <TableHead>Notified At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders.map((reminder) => (
            <TableRow key={reminder?.id}>
              <TableCell className="font-medium">{reminder?.title}</TableCell>

              <TableCell>
                {reminder?.customer ? (
                  <div>
                    <div className="font-medium">
                      {reminder?.customer?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ID: {reminder?.customer?.customerId} •{" "}
                      {reminder?.customer?.phone}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    ID: {reminder?.customerId}
                  </span>
                )}
              </TableCell>

              <TableCell>
                <div>
                  <div className="font-medium">{reminder?.user?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Agent ID: {reminder?.user?.id}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {formatDate(reminder?.remindAt)}
                </div>
              </TableCell>

              <TableCell>
                {reminder?.isNotified && reminder?.notifiedAt ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    {formatDate(reminder?.notifiedAt)}
                  </div>
                ) : (
                  <span className="text-muted-foreground">No Date</span>
                )}
              </TableCell>

              <TableCell>
                {getStatusBadge(reminder?.status, reminder?.isNotified)}
              </TableCell>

              <TableCell className="text-right">
                <Link href={`/dashboard/reminders/${reminder?.id}`}>
                  <Button size="sm" className="cursor-pointer">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ASingleCustomerReminder;
