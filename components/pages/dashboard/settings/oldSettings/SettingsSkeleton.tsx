import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SettingsSkeleton = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Badge variant="secondary" className="hidden sm:inline-flex">
          <Skeleton className="h-4 w-40 rounded-md" />
        </Badge>
      </div>

      <Separator />

      {/* Branding Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>

      {/* System Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <Skeleton className="h-5 w-24 rounded-md" />
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsSkeleton;
