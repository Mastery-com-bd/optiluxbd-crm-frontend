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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Permission {
  id: string;
  name: string;
  description?: string;
}

interface RoleFormProps {
  mode?: "create" | "edit";
  roleId?: string;
  existingData?: {
    name: string;
    permissions: string[];
  };
  allPermissions: Permission[];
}

export default function RoleForm({
  mode = "create",
  roleId,
  existingData,
  allPermissions,
}: RoleFormProps) {
  const router = useRouter();

  const [name, setName] = useState(existingData?.name || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    existingData?.permissions || []
  );
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("3");

  // Toggle permission checkbox
  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      permissions: selectedPermissions,
    };

    try {
      const res = await fetch(
        mode === "create" ? "/api/roles" : `/api/roles/${roleId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save role");

      toast.success(
        mode === "create"
          ? "Role created successfully"
          : "Role updated successfully"
      );

      router.push("/dashboard/roles");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                <SelectItem value="4">4 Column Layout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              placeholder="e.g. Admin, Editor, Manager"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                    setSelectedPermissions(
                      selectedPermissions.length === allPermissions.length
                        ? []
                        : allPermissions.map((p) => p.id)
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
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() =>
                      handlePermissionToggle(permission.id)
                    }
                  />
                  <div>
                    <Label htmlFor={permission.id} className="font-medium">
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
