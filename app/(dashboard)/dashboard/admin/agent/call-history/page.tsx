import CallHistoryTable from "@/components/pages/dashboard/agent/call-history/callHistoryTable";
import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between ">
        <PageHeader
          title="Call History"
          description="Browse and manage Call History"
        />
      </div>

      {/* Table */}
      <CallHistoryTable />
    </div>
  );
};

export default Page;
