"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserResponse } from "@/types/user/organizationUsers.types";
import { format } from "date-fns";
import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

const UserDetails = ({ userDetails }: { userDetails: UserResponse }) => {
  const user = userDetails.data;

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">No user data available</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 hover:bg-green-600";
      case "INACTIVE":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "SUSPENDED":
        return "bg-orange-500 hover:bg-orange-600";
      case "DISABLED":
        return "bg-gray-500 hover:bg-gray-600";
      case "REJECTED":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP p");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border">
        <CardContent className="py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={user.avatar_secure_url || ""} alt={user.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                    {user.email_verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(user.status || "UNKNOWN")}>
                    {user.status || "UNKNOWN"}
                  </Badge>
                  {user.is_active ? (
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-500"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-red-500 text-red-500"
                    >
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" /> User ID
              </span>
              <span className="font-medium">{user.userId}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Full Name
              </span>
              <span className="font-medium">{user.name}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </span>
              <span className="font-medium break-all">{user.email}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone
              </span>
              <span className="font-medium">{user.phone || "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-[140px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" /> Roles
              </span>
              <div className="flex flex-wrap gap-1">
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map(
                    (
                      role: UserResponse["data"]["roles"][number],
                      index: number,
                    ) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {role.role?.name || "Unknown Role"}
                      </Badge>
                    ),
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No roles assigned
                  </span>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-[140px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" /> Approval Status
              </span>
              <span className="flex items-center gap-2">
                {user.is_approved ? (
                  <span className="text-sm font-medium text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Approved
                  </span>
                ) : (
                  <span className="text-sm font-medium text-yellow-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Pending
                  </span>
                )}
              </span>
            </div>
            <Separator />
            <div className="grid grid-cols-[140px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Created At
              </span>
              <span className="text-sm font-medium">
                {formatDate(user.created_at)}
              </span>
            </div>
            <Separator />
            <div className="grid grid-cols-[140px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Last Login
              </span>
              <span className="text-sm font-medium">
                {user.last_login ? formatDate(user.last_login) : "Never"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
