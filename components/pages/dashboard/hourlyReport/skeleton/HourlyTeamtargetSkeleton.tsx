import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";

const HourlyTeamtargetSkeleton = () => {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="w-full">
        <Skeleton className="h-10 w-full" />
      </div>

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
  );
};

export default HourlyTeamtargetSkeleton;
