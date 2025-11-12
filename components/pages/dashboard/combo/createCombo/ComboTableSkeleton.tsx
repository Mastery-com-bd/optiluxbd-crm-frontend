import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ComboTableSkeleton = () => {
  const rows = Array.from({ length: 8 });
  return (
    <Card className="bg-card text-card-foreground border shadow-sm mb-5">
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              {Array.from({ length: 5 }).map((_, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase"
                >
                  <Skeleton className="h-4 w-full rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-muted hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex items-center gap-2 mt-2">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16 rounded" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20 rounded" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-12 rounded" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-12 rounded" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16 rounded-full" />
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComboTableSkeleton;
