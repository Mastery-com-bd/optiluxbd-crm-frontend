import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DailyReportSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4 px-6">
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 mt-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col items-center justify-center"
            >
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-2 w-full mt-2" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent className="h-64 flex justify-center items-center">
              <Skeleton className="h-44 w-44 rounded-full" />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="h-64">
              <Skeleton className="h-full w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyReportSkeleton;
