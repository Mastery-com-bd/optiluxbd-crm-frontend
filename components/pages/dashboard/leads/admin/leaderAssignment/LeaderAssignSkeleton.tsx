import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderAssignSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="shadow-sm border rounded-xl animate-pulse">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              <Skeleton className="h-5 w-32 rounded-md dark:bg-gray-700" />
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-40 rounded-md dark:bg-gray-600" />
            </p>
          </CardHeader>

          <CardContent className="text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">
                <Skeleton className="h-4 w-20 rounded-md dark:bg-gray-700" />
              </span>
              <span>
                <Skeleton className="h-4 w-10 rounded-md dark:bg-gray-600" />
              </span>

              <span className="font-medium">
                <Skeleton className="h-4 w-20 rounded-md dark:bg-gray-700" />
              </span>
              <span>
                <Skeleton className="h-4 w-10 rounded-md dark:bg-gray-600" />
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeaderAssignSkeleton;
