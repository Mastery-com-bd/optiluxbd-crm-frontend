"use client";
import { useGetASingleReminderQuery } from "@/redux/features/reminders/reminderApi";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  StickyNote,
  CheckCircle2,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { IReminder } from "@/types/reminderTypes";
import { convertDate } from "@/utills/dateConverter";

const ACustomerReminder = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetASingleReminderQuery(id, {
    refetchOnMountOrArgChange: false,
  });
  const reminder = data?.data as IReminder;

  const statusConfig = {
    PENDING: { variant: "secondary" as const, label: "Pending", icon: Clock },
    COMPLETED: {
      variant: "default" as const,
      label: "Completed",
      icon: CheckCircle2,
    },
    CANCELLED: {
      variant: "destructive" as const,
      label: "Cancelled",
      icon: AlertCircle,
    },
  };

  const currentStatus =
    statusConfig[status.toUpperCase() as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {reminder?.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              Reminder details and customer information
            </p>
          </div>
          <Badge
            variant={currentStatus.variant}
            className="w-fit text-sm px-3 py-1"
          >
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {currentStatus.label}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Reminder Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reminder Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Reminder Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Remind At</p>
                      <p className="font-medium">
                        {convertDate(new Date(reminder?.remindAt)).creationDate}
                        <span className="text-muted-foreground ml-2">
                          {
                            convertDate(new Date(reminder?.remindAt))
                              .creationTime
                          }
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        reminder?.isNotified
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Notification
                      </p>
                      <p className="font-medium">
                        {reminder?.isNotified ? (
                          <span className="text-green-600">
                            Sent{" "}
                            {reminder?.notifiedAt &&
                              format(new Date(reminder?.notifiedAt), "p")}
                          </span>
                        ) : (
                          <span className="text-orange-600">Pending</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start gap-3">
                    <StickyNote className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">Note</p>
                      <p className="text-foreground whitespace-pre-wrap">
                        {reminder?.note || (
                          <span className="text-muted-foreground italic">
                            No additional note
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />
              </CardContent>
            </Card>
          </div>

          {/* Customer & Agent Info */}
          <div className="space-y-6">
            {/* Customer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10">
                      {reminder?.customer?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {reminder?.customer?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: {reminder?.customer?.customerId}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{reminder?.customer?.phone || ' like "—" '}</span>
                  </div>
                  {reminder?.customer?.email ? (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{reminder?.customer?.email}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No email provided
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <UserCheck className="w-4 h-4" />
                  Assigned Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900">
                      {reminder?.user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{reminder?.user?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Optional Action Buttons */}
        {/* <div className="flex flex-wrap gap-3 justify-end">
          <Button variant="outline">Mark as Completed</Button>
          <Button>Edit Reminder</Button>
        </div> */}
      </div>
    </div>
  );
};

export default ACustomerReminder;
