import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ActivityStatsSkeleton = () => {
  return (
    <div className="py-4 space-y-4 w-full">
      {/* Top Filter Skeleton */}
      <Card className="bg-card text-card-foreground border shadow-sm p-4 flex">
        <div className="flex lg:flex-row flex-col items-end justify-between gap-4 w-full">
          <Skeleton className="w-full sm:w-1/2 h-10 rounded-md" />{" "}
          {/* Search input */}
          <Skeleton className="w-full sm:w-1/3 h-10 rounded-md" />{" "}
          {/* Start date */}
          <Skeleton className="w-full sm:w-1/3 h-10 rounded-md" />{" "}
          {/* End date */}
          <Skeleton className="w-full sm:w-1/4 h-10 rounded-md" />{" "}
          {/* Entity dropdown */}
          <Skeleton className="w-full sm:w-auto h-10  rounded-md" />{" "}
          {/* Reset button */}
        </div>
      </Card>

      {/* Tabs Skeleton */}
      <Tabs defaultValue="Action Stats" className="w-full space-y-4">
        <TabsList className="w-full grid grid-cols-2 gap-2">
          <TabsTrigger value="Action Stats">
            <Skeleton className="h-10 w-full rounded-md" />
          </TabsTrigger>
          <TabsTrigger value="Entity Type Stats">
            <Skeleton className="h-10 w-full rounded-md" />
          </TabsTrigger>
        </TabsList>

        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          {/* Left side: Cards skeleton */}
          <div className="space-y-3 w-full lg:w-1/2">
            {/* Action Cards */}
            <TabsContent
              value="Action Stats"
              className="flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-2 lg:gap-0"
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <Card key={idx}>
                  <CardContent className="flex items-center justify-between gap-2">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Entity Cards */}
            <TabsContent value="Entity Type Stats" className="space-y-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Card key={idx}>
                  <CardContent className="flex items-center justify-between gap-2">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>

          {/* Right side: Chart Skeleton */}
          <div className="w-full lg:w-1/2">
            <Card className="p-4 w-full">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-64 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full h-[500px]">
                <Skeleton className="w-full h-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ActivityStatsSkeleton;
