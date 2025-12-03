import { Skeleton } from "@/components/ui/skeleton";

const ASingleCustomerReminderSkeleton = () => {
  return (
    <div className="rounded-md border p-6">
      <div className="text-sm text-muted-foreground mb-4">
        Customer reminders
      </div>

      <div className="w-full overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="py-3 text-left font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row} className="border-b py-6">
                {/* Title */}
                <td className="py-4">
                  <Skeleton className="h-4 w-32" />
                </td>

                {/* Customer */}
                <td className="py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </td>

                {/* Agent */}
                <td className="py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </td>

                {/* Remind At */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </td>

                {/* Notified At */}
                <td className="py-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Status */}
                <td className="py-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>

                {/* Action */}
                <td className="py-4 text-right">
                  <Skeleton className="h-8 w-16 rounded-md ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ASingleCustomerReminderSkeleton;
