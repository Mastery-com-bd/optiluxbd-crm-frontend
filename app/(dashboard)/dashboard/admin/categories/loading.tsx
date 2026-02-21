import PageHeaderSkeleton from "@/components/ui/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPageLoading = () => {
  return (
    <section className="space-y-10 p-4">
      <PageHeaderSkeleton>
        <div className="flex  items-center gap-2">
          <Skeleton className="h-10 w-40" />
        </div>
      </PageHeaderSkeleton>
      <div className="flex  items-center gap-2">
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 space-y-3">
          <Skeleton className="h-6 w-40 rounded" />
          <div className="space-y-3 ">
            {[...Array(5)].map((_, i) => (
              <div key={i} className=" flex items-center gap-6 rounded-xl">
                <Skeleton className="w-44 h-44 rounded-[12px]" />
              </div>
            ))}
          </div>
        </aside>

        <section className="col-span-9 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-10 w-44 rounded-xl" />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="max-w-[265px] rounded-[12px] space-y-4">
                <Skeleton className="w-44 h-44 mx-auto rounded-[12px]" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default CategoryPageLoading;
