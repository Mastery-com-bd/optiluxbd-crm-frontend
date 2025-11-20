import { Skeleton } from "@/components/ui/skeleton";

const ActivityListSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div
          key={idx}
          className="space-y-0 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition border dark:border-gray-700"
        >
          <div className="flex items-start justify-between w-full">
            {/* Left: main sentence */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-4 w-24 rounded" /> {/* user */}
                <Skeleton className="h-4 w-16 rounded" /> {/* action */}
                <Skeleton className="h-4 w-20 rounded" /> {/* entity */}
                <Skeleton className="h-4 w-28 rounded" />{" "}
                {/* optional entity info */}
              </div>
              {/* Right: date */}
              <Skeleton className="h-4 w-32 rounded mt-1 sm:mt-0" />
            </div>

            {/* Chevron placeholder */}
            <Skeleton className="h-5 w-5 rounded ml-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityListSkeleton;
