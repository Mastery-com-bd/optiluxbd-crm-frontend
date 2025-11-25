import { Skeleton } from "@/components/ui/skeleton";

const PackageReportSkeleton = () => {
  return (
    <section>
      <div className="space-y-6">
        {/* 🔍 Filters Row */}
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
          {/* Search */}
          <div className="w-full sm:w-1/3">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>

          {/* Reset */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>

        {/* Report Title */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-4 w-56 rounded-md" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="border rounded-xl p-4 shadow-sm 
                        bg-white dark:bg-gray-900 
                        border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-20" />
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                        bg-white dark:bg-gray-900 
                        border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-20" />
          </div>

          <div
            className="border rounded-xl p-4 shadow-sm 
                        bg-white dark:bg-gray-900 
                        border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageReportSkeleton;
