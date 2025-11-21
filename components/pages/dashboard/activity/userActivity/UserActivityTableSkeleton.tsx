import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const UserActivityTableSkeleton = () => {
  return (
    <section className="w-full rounded-2xl shadow p-6 space-y-6 border">
      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search */}
        <div className="w-full sm:w-1/2">
          <Skeleton className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>

        {/* Role Dropdown */}
        <Skeleton className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-gray-600" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-600" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-600" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-600" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-16 mx-auto bg-gray-300 dark:bg-gray-600" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 20 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                <TableCell>
                  <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36 bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-8 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-3 mt-4">
        <Skeleton className="h-9 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
        <Skeleton className="h-9 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
      </div>
    </section>
  );
};

export default UserActivityTableSkeleton;
