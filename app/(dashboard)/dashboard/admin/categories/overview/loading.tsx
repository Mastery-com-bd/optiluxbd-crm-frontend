import OverviewSkeleton from "@/components/ui/OverviewSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryOverviewSkeleton = () => {
  return (
    <section className="space-y-6">
      <OverviewSkeleton />
      <div className="col-span-9 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-66 rounded" />
          <Skeleton className="h-10 w-44 rounded-xl" />
        </div>
        <div className="grid grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="max-w-[265px] rounded-[12px] space-y-4">
              <Skeleton className="w-44 h-44 mx-auto rounded-[12px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryOverviewSkeleton;
