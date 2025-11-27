import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const RolesSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="border shadow-sm dark:border-gray-700 transition-all"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </CardTitle>

                <Skeleton className="h-4 w-48" />
              </div>

              <Skeleton className="h-8 w-16 rounded-md" />
            </CardHeader>

            <CardContent className="space-y-4 flex flex-col h-full">
              {/* Assigned Users */}
              <div className="grow">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
              </div>

              {/* Permissions Table */}
              <div>
                <Skeleton className="h-4 w-32 mb-2" />

                <ScrollArea className="h-[350px] border rounded-md p-2 dark:border-gray-700">
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, row) => (
                      <div
                        key={row}
                        className="grid grid-cols-2 gap-4 py-2 border-b dark:border-gray-700"
                      >
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RolesSkeleton;
