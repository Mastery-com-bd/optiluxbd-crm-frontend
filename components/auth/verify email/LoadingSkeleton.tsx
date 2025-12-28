import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full relative z-10 min-h-screen bg-[#030115] overflow-hidden flex items-center justify-center">
      {/* Card */}
      <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-8 relative w-[25vw]">
        {/* decorative borders */}
        <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/10 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/10 rounded-br-2xl pointer-events-none" />

        <div className="space-y-4">
          {/* Icon */}
          <div className="flex items-center justify-center">
            <Skeleton className="w-10 h-10 rounded-full bg-white/5" />
          </div>

          {/* Title */}
          <Skeleton className="h-8 w-3/4 mx-auto rounded-md bg-white/5" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded bg-white/5" />
            <Skeleton className="h-3 w-5/6 mx-auto rounded bg-white/5" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-lg bg-white/5 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
