"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetRoleByIdQuery,
  useUpdateRoleInfoMutation,
  useAddRoleMutation,
  useGetAllPermissionsQuery,
} from "@/redux/features/roles/roleApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Users {
  id: number;
  userId: number;
  roleId: number;
  user: User;
}

interface Permission {
  id: number;
  key: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface Permissions {
  id: number;
  roleId: number;
  permissionId: number;
  created_at: string;
  permission: Permission;
}

interface ExistingRolePermission {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  permissions: Permissions[];
  users: Users[];
}

interface RoleFormProps {
  roleId: string;
  mode?: "create" | "edit";
  existingRole?: ExistingRolePermission;
}

export default function RoleForm({ roleId, mode = "create" }: RoleFormProps) {
  const { data: roleData, isLoading } = useGetRoleByIdQuery(roleId);
  const { data: allPermissionsData, isLoading: isLoadingPermissions } =
    useGetAllPermissionsQuery(undefined);
  const allPermissions: Permission[] = allPermissionsData?.data;
  const existingRole: ExistingRolePermission = roleData?.data;

  // Local state is null until user edits; before that we derive from existingRole
  const [localName, setLocalName] = useState<string | null>(
    mode === "create" ? "" : null
  );
  const [localDescription, setLocalDescription] = useState<string | null>(
    mode === "create" ? "" : null
  );
  const [localSelectedPermissions, setLocalSelectedPermissions] = useState<
    string[] | null
  >(mode === "create" ? [] : null);
  const [loading, setLoading] = useState(false);
  const [updateInfo] = useUpdateRoleInfoMutation();
  const [addRole] = useAddRoleMutation();
  const router = useRouter();

  const [level, setLevel] = useState("3");

  // Derived values shown until user interacts
  const derivedName = useMemo(() => {
    if (mode === "edit" && existingRole) return existingRole?.name || "";
    return "";
  }, [mode, existingRole]);

  const derivedDescription = useMemo(() => {
    if (mode === "edit" && existingRole) return existingRole?.description || "";
    return "";
  }, [mode, existingRole]);

  const derivedSelected = useMemo(() => {
    if (mode === "edit" && existingRole) {
      return (existingRole?.permissions
        ?.map((p) => p?.permission?.key)
        .filter(Boolean) || []) as string[];
    }
    return [] as string[];
  }, [mode, existingRole]);

  const name = localName ?? derivedName;
  const description = localDescription ?? derivedDescription;
  const selectedPermissions = localSelectedPermissions ?? derivedSelected;

  // Toggle permission checkbox (derive current if user hasn't interacted)
  const handlePermissionToggle = (permission: string) => {
    setLocalSelectedPermissions((prev) => {
      const base = (prev ?? derivedSelected) as string[];
      return base.includes(permission)
        ? base.filter((p) => p !== permission)
        : [...base, permission];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Updating role...");

    try {
      if (mode === "edit") {
        const payload = {
          id: existingRole?.id || 0,
          permissions: {
            permissions: selectedPermissions,
          },
        };
        const res = await updateInfo(payload).unwrap();
        console.log("Upgrade Response", res);
        if (res?.success) {
          toast.dismiss();
          toast.success(res?.message, {
            duration: 3000,
          });
          router.refresh();
          setLoading(false);
        }
      } else {
        const payload = {
          name,
          permissions: {
            permissions: selectedPermissions,
          },
        };
        const res = await addRole(payload).unwrap();
        console.log("Add Role Response", res);
        if (res?.success) {
          toast.dismiss();
          toast.success(res?.message, {
            duration: 3000,
          });
          router.refresh();
          setLoading(false);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.dismiss();
      toast.dismiss();
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading role...</span>
        </div>
      </div>
    );

  if (isLoadingPermissions)
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading role...</span>
        </div>
      </div>
    );

  return (
    <Card className="m-10 shadow-sm border">
      <CardHeader>
        <div className="flex items-start justify-between gap-6">
          <div>
            <CardTitle>
              {mode === "create" ? "Create New Role" : "Edit Role"}
            </CardTitle>
            <CardDescription>
              {mode === "create"
                ? "Define a new role and assign permissions."
                : "Update role details and modify permissions."}
            </CardDescription>
          </div>
          <div className="">
            <Select value={level} onValueChange={(value) => setLevel(value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Column Layout</SelectItem>
                <SelectItem value="3">3 Column Layout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              placeholder="e.g. Admin, Editor, Manager"
              value={name}
              onChange={(e) => setLocalName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roleDescription">Role Description</Label>
            <Input
              id="roleDescription"
              placeholder="e.g. Admin, Editor, Manager"
              value={description}
              onChange={(e) => setLocalDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Permissions</Label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {selectedPermissions.length} / {allPermissions.length}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setLocalSelectedPermissions(
                      selectedPermissions.length === allPermissions.length
                        ? []
                        : allPermissions.map((p) => p.key)
                    )
                  }
                >
                  {selectedPermissions.length === allPermissions.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>
            </div>
            <div className={`grid gap-4 grid-cols-${level}`}>
              {allPermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-start space-x-2 border p-2 rounded-lg hover:bg-muted/40"
                >
                  <Checkbox
                    id={permission.id.toString()}
                    checked={selectedPermissions.includes(permission.key)}
                    onCheckedChange={() =>
                      handlePermissionToggle(permission.key)
                    }
                    className="bg-gray-600"
                  />
                  <div>
                    <Label
                      htmlFor={permission.id.toString()}
                      className="font-medium"
                    >
                      {permission.name}
                    </Label>
                    {permission.description && (
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Role" : "Update Role"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
