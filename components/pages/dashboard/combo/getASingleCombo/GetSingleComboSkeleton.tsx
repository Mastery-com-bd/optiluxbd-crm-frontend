import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const GetSingleComboSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Header Section Skeleton */}
      <Card className="shadow-sm border dark:border-gray-700">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-56" />
            </div>
            <Skeleton className="h-4 w-80" />
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </CardHeader>

        {/* Grid Info Skeleton */}
        <CardContent className="grid sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Items Table Skeleton */}
      <Card className="shadow-sm border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Skeleton className="h-5 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-2 px-4 py-2 border-b dark:border-gray-700">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-16" />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-8 gap-2 px-4 py-3 border-b dark:border-gray-800"
              >
                {Array.from({ length: 8 }).map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button Skeleton */}
      <div className="flex items-center justify-end">
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
    </div>
  );
};

export default GetSingleComboSkeleton;
