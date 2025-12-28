import { Skeleton } from "@/components/ui/skeleton";

const CustomerTableSkeleton = () => {
  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6 animate-in fade-in">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-2">
                  <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                </td>

                <td className="py-3 px-2">
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                </td>
                <td className="py-3 px-2 flex justify-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomerTableSkeleton;
