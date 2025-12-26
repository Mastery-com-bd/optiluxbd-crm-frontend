import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 lg:w-[30vw] space-y-6 rounded-xl w-full max-w-md mx-auto">
      <div className="w-[40vw] lg:w-[8vw] mx-auto flex justify-center">
        <Skeleton className="h-12 w-32 rounded-md" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-[70%]" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-3 w-[70%]" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex justify-center space-x-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
