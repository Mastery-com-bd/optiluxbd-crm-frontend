import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReminderSummarySkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>

          <CardContent>
            <Skeleton className="h-7 w-16 mb-1" />
            <Skeleton className="h-3 w-20" />

            {/* Badge placeholder */}
            <Skeleton className="h-5 w-12 absolute top-3 right-3 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReminderSummarySkeleton;
