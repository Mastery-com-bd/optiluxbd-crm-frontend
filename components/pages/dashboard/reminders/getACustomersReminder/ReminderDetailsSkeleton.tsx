import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReminderDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-60 mt-2" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Reminder Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="h-5 w-40" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5" />
                    <div>
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-36 mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5" />
                    <div>
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-28 mt-1" />
                    </div>
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Customer & Agent Info */}
          <div className="space-y-6">
            {/* Customer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderDetailsSkeleton;
