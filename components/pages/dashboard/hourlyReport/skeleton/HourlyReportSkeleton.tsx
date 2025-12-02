import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

const HourlyReportSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      {/* Top Filters Row */}
      <div className="flex items-end justify-between gap-4 w-full">
        <div className="w-full ">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Gap Select */}
        <div className="w-72">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Reset Button */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Report Summary Section */}
      <Card className="px-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Left Section */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
          </div>

          {/* Right Section */}
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {/* First Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-full h-24">
              <CardContent className="h-full flex flex-col justify-center space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bar Chart Skeleton */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6 lg:col-span-2">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-3 w-64 mb-6" />

          <div className="flex items-center gap-6 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-64 w-full" />
        </Card>

        {/* Top Performing Hours Table Skeleton */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {["Rank", "Time Slot", "Orders", "Revenue", "Avg Order"].map(
                    (_, idx) => (
                      <th key={idx} className="py-3 px-2">
                        <Skeleton className="h-3 w-20" />
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-4 px-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </td>
                    <td className="py-4 px-2">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HourlyReportSkeleton;
