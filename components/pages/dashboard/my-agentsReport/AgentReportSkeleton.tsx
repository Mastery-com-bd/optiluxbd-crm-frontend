import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock } from "lucide-react";

const AgentReportSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end gap-4">
        {/* Select Gap Skeleton */}
        <div className="flex flex-col gap-1 w-72">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Date Picker Skeleton */}
        <div className="flex flex-col gap-1 w-40">
          <Skeleton className="h-4 w-16" />
          <div className="h-10 w-full flex items-center gap-2 border rounded-md px-3 dark:border-gray-700">
            <CalendarIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Reset Button Skeleton */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Summary Cards */}
        <Card className="px-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-56" />{" "}
              <Skeleton className="h-4 w-40" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="w-full h-24">
              <CardContent className="h-full flex flex-col justify-center space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Skeleton className="h-5 w-56 mb-4" />
            <Skeleton className="h-[260px] w-full" />

            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-10" />
                </div>
              ))}
            </div>
          </Card>

          {/* Composed Chart Skeleton */}
          <Card className="lg:col-span-2 p-6">
            <Skeleton className="h-5 w-72 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
        </div>

        {/* Table Skeleton */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <Skeleton className="h-5 w-56 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {["Rank", "Time Slot", "Orders", "Revenue", "Avg Order"].map(
                    (h, i) => (
                      <th key={i} className="py-3 px-2">
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

export default AgentReportSkeleton;
