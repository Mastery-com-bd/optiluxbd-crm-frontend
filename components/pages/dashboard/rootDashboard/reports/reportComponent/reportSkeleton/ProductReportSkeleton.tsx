import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductReportSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-4">
        <div className="w-full ">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="w-full lg:w-1/4">
          <Skeleton className="h-10 w-36 rounded-md" />
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

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-60" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[400px]">
            <Skeleton className="w-56 h-56 rounded-full" />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-60" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-80">
            <Skeleton className="w-full h-64 rounded-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-72" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-auto border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>

              {Array.from({ length: 8 }).map((_, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-8 gap-4 py-2">
                  {Array.from({ length: 8 }).map((_, colIdx) => (
                    <Skeleton key={colIdx} className="h-5 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductReportSkeleton;
