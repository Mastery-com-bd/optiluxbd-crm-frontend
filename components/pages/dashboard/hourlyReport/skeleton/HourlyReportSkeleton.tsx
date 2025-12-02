import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex flex-col items-center space-y-3 w-full">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-60" />
      </div>
    </div>
  );
};

export default HourlyReportSkeleton;
