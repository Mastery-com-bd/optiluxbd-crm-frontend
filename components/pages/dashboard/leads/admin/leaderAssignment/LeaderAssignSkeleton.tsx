import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderAssignSkeleton = () => {
  return (
    <div className="lg:p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Summary Card */}
      <Card className="shadow-sm border dark:border-gray-700">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Total Teams */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-12" />
          </div>

          {/* Total Unassigned Agents */}
          <div className="flex flex-col items-center justify-center p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-12" />
          </div>

          {/* Team Report Dropdown Skeleton */}
          <Skeleton className="h-10 w-full" />

          {/* Assign Button Skeleton */}
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="shadow-sm border rounded-xl p-4 dark:border-gray-700"
          >
            {/* Header */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>

            {/* Members Box */}
            <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaderAssignSkeleton;
