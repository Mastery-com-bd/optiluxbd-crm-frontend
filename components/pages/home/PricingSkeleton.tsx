import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1240px] mx-auto py-40">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="relative rounded-4xl p-8 border border-white/20 bg-white/5 backdrop-blur-sm"
        >
          {/* Plan badge */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-[140px] rounded-xl bg-white/10" />

            {/* Price */}
            <Skeleton className="h-12 w-[180px] rounded-lg bg-white/10" />

            {/* Description */}
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-3/4 bg-white/10" />
          </div>

          {/* Features */}
          <div className="my-8 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
              </div>
            ))}
          </div>

          {/* Button */}
          <Skeleton className="h-12 w-full rounded-4xl bg-white/10" />
        </div>
      ))}
    </div>
  );
};

export default PricingSkeleton;
