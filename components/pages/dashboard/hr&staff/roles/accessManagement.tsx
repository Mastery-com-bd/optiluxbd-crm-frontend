
"use client";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Users, Shield, Trash2, UserPlus } from "lucide-react";
import { debounce } from "@/utills/debounce";
import Link from "next/link";
import { useGetAllRolesQuery } from "@/redux/features/roles/roleApi";



interface User {
  id: number;
  name: string;
  email: string;
}

interface RoleUser {
  id: number;
  userId: number;
  roleId: number;
  user: User;
}

interface Permission {
  id: number;
  key: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}


interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  created_at: string;
  permission: Permission;
}

interface Role {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: RolePermission[];
  users: RoleUser[];
}

interface Props {
  roles: Role[];
}

const AccessManagement: React.FC<Props> = () => {

    const { data: roleData, isLoading: roleIsLoading } = useGetAllRolesQuery(undefined);
    console.log(roleData);

const roles: Role[] = roleData?.data || [];

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  const handleAddUser = (roleId: number) => {
    console.log("Add user to role", roleId, newUser);
  };
  
  const handleSearch = async (query: string) => {
    // search the users by query
    setSearchQuery(query);
    // set the user details
    setNewUser({ name: "", email: "" });
    // add the user to the role
    console.log(searchQuery)
  };
  const debouncedLog = debounce(handleSearch, 1000, { leading: false });

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
        <h1 className="text-2xl font-semibold tracking-tight">
          Access Management
        </h1>
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
                <Button variant="destructive" size="sm" disabled>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Assigned Users
                </h4>
                {role.users.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {role.users.map((ru) => (
                      <Badge key={ru.id} variant="secondary">
                        {ru.user.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No users assigned.
                  </p>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" /> Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add User to {role.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                      <Input
                        onChange={(e) => debouncedLog(e.target.value)}
                        placeholder="Search by Name, mail or Phone Number"
                      />

                      <Button
                        className="w-full"
                        onClick={() => handleAddUser(role.id)}
                      >
                        Add User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccessManagement;
