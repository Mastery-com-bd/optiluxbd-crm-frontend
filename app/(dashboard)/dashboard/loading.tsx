import { Card } from "@/components/ui/card";
import OverviewSkeleton from "@/components/ui/OverviewSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <section className="space-y-6">
      {/* overview section */}
      <OverviewSkeleton />

      {/* revenew section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 lg:gap-6">
        <Card className="effect h-full relative rounded-3xl px-6 py-6 w-full border-0">
          <div className="w-full h-full rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-9 w-24 rounded-[12px]" />
            </div>
            <Skeleton className="w-full h-[300px] rounded-2xl" />
          </div>
        </Card>

        <Card className="effect border-0 h-full relative rounded-3xl px-6 py-4 w-full">
          <div className="w-full h-full rounded-3xl space-y-6">
            <div className="flex justify-center">
              <Skeleton className="h-[220px] w-[220px] rounded-full" />
            </div>
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* footer section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-6">
        <Card className="effect h-full relative rounded-3xl px-6 py-6 w-full">
          <div className="w-full h-full rounded-3xl space-y-6">
            <Skeleton className="h-5 w-40 rounded" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              ))}
            </div>
            <div className="w-full flex items-center relative rounded-3xl effect">
              <Skeleton className="w-full h-8 rounded-2xl" />
            </div>
          </div>
        </Card>

        <Card className="effect border-0 h-full relative rounded-3xl px-6 py-4 w-full">
          <div className="w-full h-full rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-52 rounded" />
              <Skeleton className="h-9 w-28 rounded-[12px]" />
            </div>
            <Skeleton className="w-full h-80 rounded-2xl" />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DashboardLoading;
