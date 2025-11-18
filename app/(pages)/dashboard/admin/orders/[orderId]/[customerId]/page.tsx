"use client";
import { Summary } from "@/components/pages/dashboard/admin/orders/signleOrder/cusomerSummary/Summary";
import TotalOrderTable from "@/components/pages/dashboard/admin/orders/signleOrder/cusomerSummary/TotalOrderTable";

const CustomerStat = () => {
  return (
    <div>
      <Summary />
      <TotalOrderTable />
    </div>
  );
};

export default CustomerStat;
