import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      <div className="space-y-8 animate-pulse">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-4 w-48 rounded" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-10 w-full sm:w-36 rounded" />
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-10 w-full sm:w-36 rounded" />
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <Skeleton className="h-3 w-20 rounded opacity-0" />
            <Skeleton className="h-10 w-full sm:w-24 rounded" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-36 rounded" />
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="p-5 bg-white dark:bg-gray-800 shadow-sm rounded-lg"
            >
              <Skeleton className="h-10 w-10 rounded-full mb-4" />
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-6" />
          <div className="grid grid-cols-1 gap-3">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-full rounded" />
              ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl lg:col-span-2">
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="grid grid-cols-3 gap-2 mb-6">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-full rounded" />
              ))}
          </div>
          <Skeleton className="h-64 w-full rounded" />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-2xl mb-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col gap-3"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-3 w-full rounded" />
                    ))}
                </div>
                <Skeleton className="h-1.5 w-full rounded-full mt-2" />
              </div>
            ))}
        </div>
      </div>

      {/* Product Inventory & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <Skeleton className="h-5 w-32 mb-5" />
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full mb-3 rounded" />
            ))}
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <Skeleton className="h-5 w-32 mb-5" />
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-14 w-full mb-3 rounded" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
