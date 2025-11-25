"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Shield } from "lucide-react";
import Link from "next/link";
import { useGetAllRolesQuery } from "@/redux/features/roles/roleApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { Role } from "@/types/role.types";
import AssignedUsers from "./AssignedUsers";

const AccessManagement: React.FC = () => {
  // get current user
  const user = useAppSelector(currentUser);
  const { permissions } = getPermissions(user as TAuthUSer);

  // get roles
  const { data: roleData, isLoading: roleIsLoading } = useGetAllRolesQuery(
    undefined,
    { refetchOnMountOrArgChange: false }
  );
  const roles: Role[] = roleData?.data || [];

  if (roleIsLoading)
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Shield className="h-5 w-5 animate-pulse" />
          <span className="text-sm">Loading roles…</span>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/hr&staff/roles/add">
            <Plus className="h-4 w-4" /> New Role
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="border shadow-sm hover:shadow-md transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {role.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/dashboard/hr&staff/roles/${role.id}`}>Edit</a>
                </Button>
                {/* <Button variant="destructive" size="sm" disabled>
                  <Trash2 className="h-4 w-4" />
                </Button> */}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 flex flex-col h-full">
              <div>
                <h4 className="font-medium text-sm mb-2">Permissions</h4>
                <ScrollArea className="h-[350px] border rounded-md p-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {role.permissions.map((rp) => (
                        <TableRow key={rp.id}>
                          <TableCell className="text-xs text-muted-foreground">
                            {rp.permission?.id}
                          </TableCell>
                          <TableCell className="text-xs">
                            {rp.permission?.name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="grow ">
                <AssignedUsers role={role} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccessManagement;
