import { Skeleton } from "@/components/ui/skeleton";

const UserTableSkeleton = () => {
  return (
    <section className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-28 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <Skeleton className="w-full sm:w-1/2 h-10 bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {[
                "",
                "Customer Name",
                "Role",
                "Email",
                "Phone",
                "Is Active",
                "Status",
                "Joined",
                "Last Login",
                "Action",
              ].map((header, i) => (
                <th
                  key={i}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 py-3 px-2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
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

export default UserTableSkeleton;
