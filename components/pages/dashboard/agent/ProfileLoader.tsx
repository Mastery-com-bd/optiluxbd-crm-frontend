import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center space-y-10 animate-pulse">
      <div className="w-full lg:w-[60vw] bg-white rounded-2xl shadow p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <section className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-56 w-56 rounded-full border-2 border-yellow-400" />
            <div className="space-y-3 w-full sm:w-auto">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-12 w-full sm:w-[30vw]" />
            </div>
          </div>
          <Skeleton className="h-4 w-48" />
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 relative">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
            <div className="sm:col-span-2 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileLoader;
