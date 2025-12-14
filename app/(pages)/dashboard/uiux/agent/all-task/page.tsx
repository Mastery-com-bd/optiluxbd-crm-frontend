import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
import AllTaskTable from "@/components/pages/dashboard/agent/all-task/allTaskTable";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between ">
        <PageHeader
          title="All Calling Tasks"
          description="Browse and manage All Tasks"
        />
      </div>

      {/* Table */}
      <AllTaskTable />
    </div>
  );
};

export default Page;
