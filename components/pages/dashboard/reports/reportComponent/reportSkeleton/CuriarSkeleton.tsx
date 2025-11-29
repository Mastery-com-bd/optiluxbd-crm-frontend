import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CuriarSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse p-6">
      <div className="flex flex-col lg:flex-row items-end justify-between gap-4">
        <div className="w-full lg:w-36">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="w-full lg:w-36">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 space-y-3"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
          </Card>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <Card className="w-full h-[350px]">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[260px] w-full" />
          </CardContent>
        </Card>
        <Card className="w-full h-[350px]">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[260px]">
            <Skeleton className="h-44 w-44 rounded-full" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-52" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: 10 }).map((_, colIndex) => (
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
  );
};

export default CuriarSkeleton;
