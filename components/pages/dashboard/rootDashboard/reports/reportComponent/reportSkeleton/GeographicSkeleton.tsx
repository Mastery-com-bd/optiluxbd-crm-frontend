import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

const GeographicSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          {/* Division */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          {/* Reset Button */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-[90px]" />
          </div>
        </div>

        {/* Report Title & Date Range */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-56" />
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="p-4 space-y-2 bg-white dark:bg-gray-900 shadow-sm border-gray-200 dark:border-gray-700"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-20" />
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8 p-6 ">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-40" />
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px]">
            <Skeleton className="h-full w-full rounded-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-44" />
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px]">
            <Skeleton className="h-full w-full rounded-md" />
          </CardContent>
        </Card>

        {/* TOP COURIER USAGE */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] flex justify-center items-center">
            <Skeleton className="h-44 w-44 rounded-full" />
          </CardContent>
        </Card>

        {/* DATA TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-56" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array.from({ length: 8 }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographicSkeleton;
