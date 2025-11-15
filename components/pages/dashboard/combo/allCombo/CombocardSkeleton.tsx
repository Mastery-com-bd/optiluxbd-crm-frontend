import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CombocardSkeleton = () => {
  const skeletons = Array.from({ length: 9 });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
      {skeletons.map((_, idx) => (
        <Card
          key={idx}
          className="border border-border bg-card text-card-foreground shadow-sm animate-pulse"
        >
          <CardHeader className="pb-3 flex flex-row justify-between items-start">
            <div className="flex-1 space-y-2">
              <CardTitle className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mt-1" />
            </div>

            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Pricing Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                <p className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              </div>

              <div className="space-y-1">
                <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                <p className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              </div>

              <div className="space-y-1">
                <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                <p className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              </div>

              <div className="space-y-1">
                <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                <p className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex gap-2">
              <span className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <span className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <p className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4" />
              <div className="flex flex-wrap gap-2">
                <span className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <span className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <span className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CombocardSkeleton;
