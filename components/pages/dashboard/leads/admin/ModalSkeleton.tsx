import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ModalSkeleton = () => {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-lg animate-pulse">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-5 w-40" />
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="w-full sm:w-1/2">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-y-auto border rounded-md pb-4 dark:border-gray-700">
          <Table>
            {/* Table Header */}
            <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
              <TableRow>
                <TableHead className="text-center">
                  <Skeleton className="h-4 w-10 mx-auto" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body (6 rows) */}
            <TableBody>
              {Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={idx} className="h-12">
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between px-4 mt-4">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSkeleton;
