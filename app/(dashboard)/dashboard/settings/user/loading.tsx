import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserSettingsLoading = () => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen animate-pulse">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-72 rounded-md" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-60 rounded-md" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Repeat for each input field */}
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md" /> {/* Label */}
                  <Skeleton className="h-10 w-full rounded-lg" /> {/* Input */}
                </div>
              ))}

              {/* Switches */}
              <div className="flex items-center justify-between gap-4">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32 rounded-md" /> {/* Label */}
                    <Skeleton className="h-7 w-12 rounded-full" />{" "}
                    {/* Switch */}
                  </div>
                ))}
              </div>

              {/* Social Links Fields */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-4 w-40 rounded-md" /> {/* Label */}
                  {Array.from({ length: 3 }).map((__, j) => (
                    <Skeleton
                      key={j}
                      className="h-10 w-full rounded-lg"
                    /> /* Inputs */
                  ))}
                  <Skeleton className="h-8 w-24 mt-1 rounded-lg" />{" "}
                  {/* Add button */}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-36 rounded-2xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettingsLoading;
