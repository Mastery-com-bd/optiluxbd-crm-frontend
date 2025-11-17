import { Skeleton } from "@/components/ui/skeleton";

const LeadersSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/5" /> {/* Title */}
        <Skeleton className="h-4 w-2/5" /> {/* Subtitle */}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="border dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50"
          >
            <Skeleton className="h-4 w-2/5 mb-2" /> {/* Label */}
            <Skeleton className="h-8 w-12" /> {/* Value */}
          </div>
        ))}
      </div>

      {/* Actions Card */}
      <div className="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <Skeleton className="h-10 w-40" />{" "}
          {/* Team Report Modal placeholder */}
          <Skeleton className="h-10 w-40" />{" "}
          {/* InProgress Modal placeholder */}
          <Skeleton className="h-10 w-44 md:ml-auto" />{" "}
          {/* Assign button placeholder */}
        </div>
      </div>

      {/* Agents Card */}
      <div className="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
        <Skeleton className="h-6 w-32 mb-4" /> {/* Card header */}
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadersSkeleton;
