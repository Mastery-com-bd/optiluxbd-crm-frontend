import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AgentReportSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse p-6">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-4">
        <div className="w-full lg:w-1/4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="w-full lg:w-1/4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Start Date
          </label>
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            End Date
          </label>
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-transparent">Reset</label>
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Skeleton className="h-5 w-60 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full h-24">
            <CardContent className="h-full flex flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="w-full h-80">
        <CardContent className="w-full h-full flex items-center justify-center">
          <Skeleton className="w-56 h-56 rounded-full" />
        </CardContent>
      </Card>

      <Card>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-11 gap-2">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="h-5 w-full">
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>

          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-11 gap-2 py-2">
              {Array.from({ length: 11 }).map((_, colIdx) => (
                <div key={colIdx} className="h-5 w-full">
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AgentReportSkeleton;
